"""
FastAPI Backend for AI MASTERCLASS Assistant (TAVI).

Connects:
- User questions
- BM25 Document Retriever (Part A & Part B exclusive)
- Refined Multi-Tier Relevance & Grounding Validation
- Google Gemini API (gemini-3.5-flash-lite via google-genai SDK)
- Server-Sent Events (SSE) Streaming
- Post-Generation Grounding Heuristics
"""

import os
import re
import json
import logging
from typing import List, Dict, Any, Optional, AsyncGenerator, Tuple, Set

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
import httpx

from assistant.retriever import get_retriever, tokenize_text, DEFAULT_CHUNKS_PATH
from assistant.gemini_generator import (
    get_gemini_config,
    generate_answer as gemini_generate_answer,
    generate_stream as gemini_generate_stream,
    GeminiConfigError,
    GeminiAuthError,
    GeminiQuotaError,
    GeminiTimeoutError,
    GeminiServiceError,
    TAVI_SYSTEM_INSTRUCTION
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("assistant.main")

OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://127.0.0.1:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "qwen2.5:1.5b")

MIN_RELEVANCE_SCORE_MULTI = float(os.getenv("MIN_RELEVANCE_SCORE_MULTI", "1.2"))
MIN_RELEVANCE_SCORE_TWO = float(os.getenv("MIN_RELEVANCE_SCORE_TWO", "1.0"))
MIN_RELEVANCE_SCORE_SINGLE = float(os.getenv("MIN_RELEVANCE_SCORE_SINGLE", "0.40"))
MIN_MATCH_RATIO_MULTI = float(os.getenv("MIN_MATCH_RATIO_MULTI", "0.40"))

REFUSAL_MESSAGE = (
    "I cannot answer this based on the official training documents, "
    "as this topic is not covered in Part A or Part B."
)

SYSTEM_PROMPT = TAVI_SYSTEM_INSTRUCTION

# Generic English question framing & imperative meta-words (filtered when assessing content match ratio)
GENERIC_QUERY_WORDS = {
    "what", "is", "are", "how", "can", "do", "does", "did", "why", "who", "whom",
    "where", "which", "when", "explain", "tell", "give", "best", "good", "make", "show",
    "describe", "define", "definition", "difference", "differ", "like", "using", "used", "work",
    "works", "working", "mean", "meaning", "say", "said", "about", "write", "writing",
    "build", "building", "create", "creating", "help", "need", "want", "learn", "think", "know",
    "this", "that", "these", "those", "it", "more", "much", "something", "anything", "nothing",
    "metaphor", "analogy", "concept", "idea", "summary", "overview", "question", "topic", "thing", "things"
}

_CACHED_CORE_CONCEPTS: Optional[Set[str]] = None


def get_core_concepts() -> Set[str]:
    """
    Extracts and caches core training concepts from:
    - Module titles, headings, and subheadings
    - Glossary defined terms
    - Explicit technical tier identifiers (Haiku, Sonnet, Opus) and tools (Claude, LLM, AI, Desk).
    """
    global _CACHED_CORE_CONCEPTS
    if _CACHED_CORE_CONCEPTS is not None:
        return _CACHED_CORE_CONCEPTS

    retriever = get_retriever()
    concepts = set()

    for c in retriever.chunks:
        h_text = f"{c['module']} {c['heading']} {c['subheading']}"
        for w in tokenize_text(h_text, remove_stopwords=True):
            concepts.add(w)

        if "Glossary" in c["module"]:
            for line in c["content"].split("\n"):
                if "|" in line:
                    term = line.split("|")[0].strip()
                    for w in tokenize_text(term, remove_stopwords=True):
                        concepts.add(w)

    # Core explicit identifiers and key analogies directly referenced in course headings
    concepts.update({
        "haiku", "sonnet", "opus", "claude", "llm", "ai", "ml", "gpt",
        "token", "tokens", "desk", "allow", "ask", "deny", "harness"
    })

    _CACHED_CORE_CONCEPTS = concepts
    logger.info(f"Loaded {len(_CACHED_CORE_CONCEPTS)} core course concepts for short-query gating.")
    return _CACHED_CORE_CONCEPTS


# --- Pydantic Schemas ---

class ChatMessage(BaseModel):
    role: str = Field(..., description="Message role: 'user' or 'assistant'")
    content: str = Field(..., min_length=1, description="Message text")

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, description="User's query")
    history: Optional[List[ChatMessage]] = Field(default=None, description="Previous conversation turns")
    top_k: Optional[int] = Field(3, ge=1, le=10, description="Max chunks to retrieve (legacy parameter)")

class SourceReference(BaseModel):
    chunk_id: str
    part: str
    module: str
    heading: str
    subheading: str

class ChatResponse(BaseModel):
    answer: str
    sources: List[SourceReference] = Field(default_factory=list)
    grounded: bool = True

class HealthResponse(BaseModel):
    status: str
    backend: str
    generation_provider: str = "gemini"
    gemini: Dict[str, Any]
    ollama: Optional[Dict[str, Any]] = None
    retriever: Dict[str, Any]

class ModulesResponse(BaseModel):
    parts: List[Dict[str, Any]]


# --- Relevance & Grounding Logic ---

def validate_relevance(query: str, results: List[Dict[str, Any]]) -> Tuple[bool, str]:
    """
    Validates whether the query is grounded in the training documents.
    Handles all query lengths deterministically:
      - 0 substantive tokens (generic/stopwords only): REJECT
      - 1 substantive token: must be in CORE_CONCEPTS and matched in corpus (score >= 0.40)
      - 2 substantive tokens: BOTH tokens must be matched in corpus (score >= 1.0)
      - 3+ substantive tokens: at least 2 tokens matched, ratio >= 40%, score >= 1.2
    """
    if not results:
        return False, "No chunks returned from retriever."

    all_q_tokens = tokenize_text(query, remove_stopwords=True)
    if not all_q_tokens:
        return False, "Query contains only stopwords or symbols."

    content_q_tokens = [w for w in all_q_tokens if w not in GENERIC_QUERY_WORDS]

    # Case A: Generic queries with zero substantive domain tokens
    if not content_q_tokens:
        return False, "Query contains only generic question framing without a specific subject or topic."

    top_result = results[0]
    top_score = top_result.get("score", 0.0)

    # Union matched terms across top 2 results
    matched_all = set(top_result.get("matched_terms", []))
    if len(results) > 1:
        matched_all = matched_all.union(set(results[1].get("matched_terms", [])))

    content_matched = [t for t in content_q_tokens if t in matched_all]
    match_ratio = len(content_matched) / len(content_q_tokens) if content_q_tokens else 0.0

    core_concepts = get_core_concepts()

    # Case B: Single substantive token (e.g. "AI", "Token", "Prompting", "Recipe", "Bitcoin")
    if len(content_q_tokens) == 1:
        single_term = content_q_tokens[0]
        if single_term not in matched_all:
            return False, f"Term '{single_term}' does not appear in document corpus."
        if single_term not in core_concepts:
            return False, f"Term '{single_term}' is an incidental analogy word rather than a recognized course concept."
        if top_score < MIN_RELEVANCE_SCORE_SINGLE:
            return False, f"Score {top_score:.2f} too low even for recognized concept."
        return True, f"Valid single-term core concept match: '{single_term}' (score: {top_score:.2f})"

    # Case C: Two substantive tokens (e.g. "Context window", "Model tiers", "Bitcoin company")
    if len(content_q_tokens) == 2:
        if len(content_matched) < 2:
            missing = [t for t in content_q_tokens if t not in matched_all]
            return False, f"Two-term query requires both terms in corpus; missing: {missing}"
        if top_score < MIN_RELEVANCE_SCORE_TWO:
            return False, f"Score {top_score:.2f} below threshold {MIN_RELEVANCE_SCORE_TWO} for two-term query."
        return True, f"Valid two-term match: {content_matched} (score: {top_score:.2f})"

    # Case D: Three or more substantive tokens
    if len(content_q_tokens) >= 3:
        if top_score < MIN_RELEVANCE_SCORE_MULTI:
            return False, f"Score {top_score:.2f} below threshold {MIN_RELEVANCE_SCORE_MULTI}"
        if len(content_matched) < 2:
            return False, f"Multi-term query matched only {len(content_matched)} terms: {content_matched}"
        if match_ratio < MIN_MATCH_RATIO_MULTI:
            return False, f"Low match ratio {match_ratio:.1%} ({len(content_matched)}/{len(content_q_tokens)} matched: {content_matched})"
        return True, f"Valid multi-term match: {content_matched} (ratio {match_ratio:.0%}, score: {top_score:.2f})"

    return False, f"Insufficient match: {content_matched} of {content_q_tokens} (score: {top_score:.2f})"


def check_generated_answer_grounding(answer: str, chunks: List[Dict[str, Any]]) -> Tuple[bool, Optional[str]]:
    """
    Lightweight post-generation validation to detect self-admitted model refusals
    or complete vocabulary divergence without requiring an expensive secondary LLM call.
    """
    if not answer or not answer.strip():
        return False, "Model produced an empty answer."

    ans_lower = answer.lower()

    # 1. Check for model-admitted lack of evidence / internal refusal
    internal_refusal_patterns = [
        "not mentioned in the provided excerpts",
        "not mentioned in the excerpts",
        "not found in the provided excerpts",
        "provided excerpts do not contain",
        "available documents do not provide",
        "available training documents do not provide",
        "excerpts do not provide sufficient information",
        "the provided excerpts do not mention",
        "cannot answer this based on the provided",
        "no information in the provided excerpts"
    ]
    for pattern in internal_refusal_patterns:
        if pattern in ans_lower:
            return False, f"Model indicated insufficient excerpt evidence: '{pattern}'"

    # 2. Check that the answer shares substantive vocabulary with the retrieved chunks
    chunk_terms = set()
    for c in chunks:
        chunk_terms.update(tokenize_text(c["content"], remove_stopwords=True))

    ans_tokens = tokenize_text(answer, remove_stopwords=True)
    if ans_tokens and len(ans_tokens) >= 10:
        overlap = [t for t in ans_tokens if t in chunk_terms]
        overlap_ratio = len(overlap) / len(ans_tokens)
        if overlap_ratio < 0.20:
            return False, f"Low vocabulary overlap with excerpts ({overlap_ratio:.1%})."

    return True, None


def extract_sources(chunks: List[Dict[str, Any]]) -> List[SourceReference]:
    """Formats source references from retrieved chunks."""
    return [
        SourceReference(
            chunk_id=c["chunk_id"],
            part=c["part"],
            module=c["module"],
            heading=c["heading"],
            subheading=c["subheading"]
        )
        for c in chunks
    ]


# --- FastAPI Application ---

app = FastAPI(
    title="TAVI Assistant Backend",
    description="Document-grounded RAG chatbot powered by Google Gemini API (gemini-3.8-flash) and BM25",
    version="2.0.0"
)

# CORS configuration restricted to local MkDocs / development origins
origins = [
    "http://127.0.0.1:8000",
    "http://localhost:8000",
    "http://127.0.0.1:8008",
    "http://localhost:8008",
    "http://127.0.0.1:8080",
    "http://localhost:8080",
    "http://127.0.0.1:3000",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.get("/api/health", response_model=HealthResponse)
async def health_check():
    """Live health check inspecting Gemini configuration, BM25 retriever, and auxiliary services."""
    gemini_cfg = get_gemini_config()
    gemini_info = {
        "generation_provider": "gemini",
        "model_configured": gemini_cfg["model"],
        "api_key_configured": gemini_cfg["is_configured"],
        "timeout_seconds": gemini_cfg["timeout_seconds"],
        "temperature": gemini_cfg.get("temperature", 0.4),
        "max_output_tokens": gemini_cfg.get("max_output_tokens", 1024),
    }

    # Check Retriever
    retriever_ok = False
    chunk_count = 0
    parts_list = []
    modules_count = 0
    try:
        retriever = get_retriever()
        chunk_count = len(retriever.chunks)
        retriever_ok = chunk_count > 0
        parts_list = sorted(list({c["part"] for c in retriever.chunks}))
        modules_count = len({c["module"] for c in retriever.chunks})
    except Exception as e:
        logger.warning(f"Retriever health probe failed: {e}")

    # Auxiliary Ollama probe (preserved for inspection without falling back)
    ollama_info: Dict[str, Any] = {
        "available": False,
        "endpoint": OLLAMA_BASE_URL,
        "model_configured": OLLAMA_MODEL
    }
    try:
        async with httpx.AsyncClient(timeout=1.0) as client:
            resp = await client.get(f"{OLLAMA_BASE_URL}/api/tags")
            if resp.status_code == 200:
                ollama_info["available"] = True
                data = resp.json()
                ollama_info["available_models"] = [m.get("name", "") for m in data.get("models", [])]
    except Exception:
        pass

    gemini_info["mode"] = "general_purpose"
    overall_status = "ok" if (retriever_ok and gemini_cfg["is_configured"]) else "degraded"

    return HealthResponse(
        status=overall_status,
        backend="running",
        generation_provider="gemini",
        gemini=gemini_info,
        ollama=ollama_info,
        retriever={
            "available": retriever_ok,
            "chunks_count": chunk_count,
            "parts": parts_list,
            "modules_count": modules_count,
            "used_for_chat": False,
        }
    )


@app.get("/api/modules", response_model=ModulesResponse)
async def get_modules():
    """Returns available parts and modules dynamically derived from ingested document chunks."""
    try:
        retriever = get_retriever()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Document retriever index is not loaded."
        )

    parts_dict = {}
    for c in retriever.chunks:
        part = c["part"]
        mod = c["module"]
        if part not in parts_dict:
            parts_dict[part] = []
        if mod not in parts_dict[part]:
            parts_dict[part].append(mod)

    parts_result = []
    for part_name, mods in parts_dict.items():
        title = "AI Fundamentals" if "Part A" in part_name else "AI Concepts for Working with AI Systems"
        parts_result.append({
            "part": part_name,
            "title": title,
            "modules": mods
        })

    return ModulesResponse(parts=parts_result)


@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(req: ChatRequest):
    """
    Synchronous general-purpose chat endpoint.
    Answers general knowledge, programming, AI, and everyday questions directly using Gemini API.
    Does not use BM25 retrieval or document-based relevance gating.
    """
    user_msg = req.message.strip()
    if not user_msg:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Message cannot be empty."
        )

    history_dicts = [m.model_dump() for m in req.history] if req.history else None

    # Call Google Gemini API directly for general-purpose response
    try:
        raw_answer = await gemini_generate_answer(
            user_query=user_msg,
            history=history_dicts
        )

        return ChatResponse(
            answer=raw_answer,
            sources=[],
            grounded=True
        )
    except GeminiConfigError as e:
        logger.warning(f"Gemini configuration error: {e}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(e)
        )
    except GeminiAuthError as e:
        logger.error(f"Gemini authentication error: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )
    except GeminiQuotaError as e:
        logger.warning(f"Gemini quota exceeded: {e}")
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=str(e)
        )
    except GeminiTimeoutError as e:
        logger.error(f"Gemini request timeout: {e}")
        raise HTTPException(
            status_code=status.HTTP_504_GATEWAY_TIMEOUT,
            detail=str(e)
        )
    except GeminiServiceError as e:
        logger.error(f"Gemini service error: {e}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Unexpected generation error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while generating the answer."
        )


@app.post("/api/chat/stream")
async def chat_stream_endpoint(req: ChatRequest):
    """
    Server-Sent Events (SSE) streaming chat endpoint.
    Streams general-purpose conversational tokens from Gemini, followed by sources and done events.
    Does not use BM25 retrieval or document-based relevance gating.
    """
    user_msg = req.message.strip()
    if not user_msg:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Message cannot be empty."
        )

    history_dicts = [m.model_dump() for m in req.history] if req.history else None

    async def sse_generator() -> AsyncGenerator[str, None]:
        try:
            async for token in gemini_generate_stream(
                user_query=user_msg,
                history=history_dicts
            ):
                yield f"data: {json.dumps({'type': 'token', 'token': token})}\n\n"

            yield f"data: {json.dumps({'type': 'sources', 'sources': [], 'grounded': True})}\n\n"
            yield f"data: {json.dumps({'type': 'done'})}\n\n"

        except GeminiConfigError as e:
            logger.warning(f"Streaming config error: {e}")
            yield f"data: {json.dumps({'type': 'error', 'error': str(e)})}\n\n"
            yield f"data: {json.dumps({'type': 'done'})}\n\n"
        except GeminiAuthError as e:
            logger.error(f"Streaming auth error: {e}")
            yield f"data: {json.dumps({'type': 'error', 'error': str(e)})}\n\n"
            yield f"data: {json.dumps({'type': 'done'})}\n\n"
        except GeminiQuotaError as e:
            logger.warning(f"Streaming quota error: {e}")
            yield f"data: {json.dumps({'type': 'error', 'error': str(e)})}\n\n"
            yield f"data: {json.dumps({'type': 'done'})}\n\n"
        except GeminiTimeoutError as e:
            logger.error(f"Streaming timeout error: {e}")
            yield f"data: {json.dumps({'type': 'error', 'error': 'Request timed out while waiting for AI response. Please try again.'})}\n\n"
            yield f"data: {json.dumps({'type': 'done'})}\n\n"
        except GeminiServiceError as e:
            logger.error(f"Streaming service error: {e}")
            yield f"data: {json.dumps({'type': 'error', 'error': str(e)})}\n\n"
            yield f"data: {json.dumps({'type': 'done'})}\n\n"
        except Exception as e:
            logger.error(f"Streaming failure: {e}")
            yield f"data: {json.dumps({'type': 'error', 'error': 'Generation service error. Please try again.'})}\n\n"
            yield f"data: {json.dumps({'type': 'done'})}\n\n"

    return StreamingResponse(
        sse_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("assistant.main:app", host="127.0.0.1", port=8000, reload=False)
