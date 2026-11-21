"""
Automated unit, integration, and general-purpose tests for the AI MASTERCLASS FastAPI backend.

Tests:
1. Health endpoint (/api/health) reporting general-purpose Gemini provider
2. Modules endpoint (/api/modules) reporting course structure for portal
3. Input validation & error handling (empty messages, invalid schema)
4. General-purpose chat answering (science, greetings, programming, Messi, quantum physics)
5. Multi-turn conversation context and follow-up handling
6. Server-Sent Events (SSE) streaming endpoint (/api/chat/stream)
7. Error propagation (quota 429, timeout 504, service error 503)
8. Preserved retrieval functions and short-query heuristics (standalone tests)
9. Question suites verification (answering all topics without document refusal)
"""

import json
from unittest.mock import patch, AsyncMock
import pytest
from fastapi.testclient import TestClient

from assistant.main import (
    app,
    validate_relevance,
    check_generated_answer_grounding
)
from assistant.gemini_generator import GeminiServiceError, GeminiQuotaError, GeminiTimeoutError
from assistant.retriever import get_retriever

client = TestClient(app)


# --- 1. Endpoint & Schema Tests ---

def test_health_endpoint():
    """Verify health endpoint reports running backend, general-purpose Gemini, and retriever status."""
    resp = client.get("/api/health")
    assert resp.status_code == 200
    data = resp.json()
    assert data["backend"] == "running"
    assert data["status"] == "ok"
    assert data["generation_provider"] == "gemini"
    assert data["gemini"]["mode"] == "general_purpose"
    assert data["retriever"]["used_for_chat"] is False
    assert data["retriever"]["chunks_count"] == 46
    assert "Part A" in data["retriever"]["parts"]
    assert "Part B" in data["retriever"]["parts"]


def test_modules_endpoint():
    """Verify modules endpoint dynamically returns Part A and Part B with module lists."""
    resp = client.get("/api/modules")
    assert resp.status_code == 200
    data = resp.json()
    assert "parts" in data
    assert len(data["parts"]) == 2

    part_names = [p["part"] for p in data["parts"]]
    assert "Part A" in part_names
    assert "Part B" in part_names

    for p in data["parts"]:
        assert len(p["modules"]) > 0
        assert isinstance(p["title"], str)


def test_empty_message_validation():
    """Verify that empty or whitespace-only messages are rejected with HTTP 400."""
    resp1 = client.post("/api/chat", json={"message": ""})
    assert resp1.status_code == 400 or resp1.status_code == 422

    resp2 = client.post("/api/chat", json={"message": "    "})
    assert resp2.status_code == 400

    resp3 = client.post("/api/chat/stream", json={"message": "   "})
    assert resp3.status_code == 400


def test_invalid_payload_schema():
    """Verify invalid payloads return HTTP 422 Unprocessable Entity."""
    resp = client.post("/api/chat", json={"wrong_key": 123})
    assert resp.status_code == 422


# --- 2. General-Purpose Chat Tests ---

@patch("assistant.main.gemini_generate_answer")
def test_general_purpose_answering(mock_gen):
    """Verify that general out-of-corpus queries (e.g. Messi, recipe, quantum physics) are answered by Gemini."""
    mock_gen.return_value = "Lionel Messi is an Argentine professional footballer widely regarded as one of the greatest of all time."
    resp = client.post("/api/chat", json={"message": "Who is Lionel Messi?"})
    assert resp.status_code == 200
    data = resp.json()
    assert "Lionel Messi" in data["answer"]
    assert data["grounded"] is True
    assert data["sources"] == []
    mock_gen.assert_called_once()


@patch("assistant.main.gemini_generate_answer")
def test_greetings_and_code_questions(mock_gen):
    """Verify greetings and code generation requests are routed to Gemini."""
    # 1. Greeting
    mock_gen.return_value = "Hello! How can I help you today?"
    resp_hello = client.post("/api/chat", json={"message": "Hello"})
    assert resp_hello.status_code == 200
    assert "Hello" in resp_hello.json()["answer"]

    # 2. Code request
    mock_gen.return_value = "def is_prime(n):\n    if n <= 1: return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0: return False\n    return True"
    resp_code = client.post("/api/chat", json={"message": "Write a Python program to check prime numbers."})
    assert resp_code.status_code == 200
    assert "def is_prime" in resp_code.json()["answer"]


@patch("assistant.main.gemini_generate_answer")
def test_conversation_history_forwarding(mock_gen):
    """Verify conversation history turns are forwarded to the Gemini generator."""
    mock_gen.return_value = "Quantum superposition means a particle can exist in multiple states at once."
    payload = {
        "message": "Can you explain superposition simply?",
        "history": [
            {"role": "user", "content": "What is quantum physics?"},
            {"role": "assistant", "content": "Quantum physics is the study of matter and radiation at an atomic level."}
        ]
    }
    resp = client.post("/api/chat", json=payload)
    assert resp.status_code == 200
    assert "superposition" in resp.json()["answer"]
    mock_gen.assert_called_once_with(
        user_query="Can you explain superposition simply?",
        history=[
            {"role": "user", "content": "What is quantum physics?"},
            {"role": "assistant", "content": "Quantum physics is the study of matter and radiation at an atomic level."}
        ]
    )


# --- 3. Streaming Chat Tests (SSE) ---

@patch("assistant.main.gemini_generate_stream")
def test_streaming_general_query(mock_stream):
    """Verify SSE streaming emits live tokens, empty sources, and done event for general questions."""
    async def mock_token_generator(*args, **kwargs):
        yield "Artificial Intelligence "
        yield "is a branch of computer science."

    mock_stream.return_value = mock_token_generator()

    resp = client.post("/api/chat/stream", json={"message": "What is Artificial Intelligence?"})
    assert resp.status_code == 200
    assert "text/event-stream" in resp.headers.get("content-type", "")

    events = [line for line in resp.iter_lines() if line and line.startswith("data: ")]
    assert len(events) >= 3

    types = [json.loads(e.replace("data: ", ""))["type"] for e in events]
    assert "token" in types
    assert "sources" in types
    assert "done" in types

    sources_event = next(json.loads(e.replace("data: ", "")) for e in events if json.loads(e.replace("data: ", ""))["type"] == "sources")
    assert sources_event["grounded"] is True
    assert sources_event["sources"] == []


# --- 4. Error Handling Tests ---

@patch("assistant.main.gemini_generate_answer")
def test_generation_service_error_handling(mock_gen):
    """Verify graceful HTTP 503 when generation encounters a service error."""
    mock_gen.side_effect = GeminiServiceError("Service unavailable")
    resp = client.post("/api/chat", json={"message": "Explain machine learning."})
    assert resp.status_code == 503
    assert "unavailable" in resp.json()["detail"].lower()


@patch("assistant.main.gemini_generate_answer")
def test_generation_quota_error_handling(mock_gen):
    """Verify graceful HTTP 429 when Gemini quota is exceeded."""
    mock_gen.side_effect = GeminiQuotaError("Gemini API rate limit or quota exceeded.")
    resp = client.post("/api/chat", json={"message": "Explain machine learning."})
    assert resp.status_code == 429
    assert "quota exceeded" in resp.json()["detail"].lower()


@patch("assistant.main.gemini_generate_answer")
def test_generation_timeout_error_handling(mock_gen):
    """Verify graceful HTTP 504 when Gemini API times out."""
    mock_gen.side_effect = GeminiTimeoutError("Gemini API request timed out.")
    resp = client.post("/api/chat", json={"message": "Explain machine learning."})
    assert resp.status_code == 504
    assert "timed out" in resp.json()["detail"].lower()


# --- 5. Standalone Retriever & Heuristics Validation Tests ---

VALID_SHORT_QUERIES = [
    "What is AI?", "AI", "What is a token?", "Token", "Tokens",
    "Model tiers", "Context window", "Prompting", "Allow ask deny",
    "Memory", "Agent", "Model", "Trust", "Skills", "Haiku", "Desk metaphor"
]

UNSUPPORTED_SHORT_QUERIES = [
    "Bitcoin", "Bitcoin company", "Messi", "Messi team", "Asthma",
    "Quantum physics", "Australian capital", "Chocolate cookies", "Chocolate recipe"
]

GENERIC_QUERIES = [
    "What is it?", "Explain this", "Tell me more", "How does it work?", "???", "the and or"
]


def test_standalone_retriever_search():
    """Verify retriever search functions correctly for course documentation portal."""
    retriever = get_retriever()
    results = retriever.search("What is Artificial Intelligence?", top_k=3)
    assert len(results) == 3
    assert any("Module 1" in r["module"] for r in results)


def test_standalone_relevance_validation():
    """Verify validate_relevance helper operates deterministically on retrieved chunks."""
    retriever = get_retriever()
    for q in VALID_SHORT_QUERIES:
        res = retriever.search(q, top_k=3)
        is_rel, reason = validate_relevance(q, res)
        assert is_rel is True, f"Valid query failed: {q} ({reason})"

    for q in UNSUPPORTED_SHORT_QUERIES:
        res = retriever.search(q, top_k=3)
        is_rel, reason = validate_relevance(q, res)
        assert is_rel is False, f"Unsupported query passed: {q} ({reason})"


def test_post_generation_grounding_heuristics():
    """Verify post-generation answer verification helper logic."""
    retriever = get_retriever()
    sample_chunks = retriever.search("What is a token?", top_k=2)

    valid_ans = "A token is a small piece of text, such as a word or part of a word, that an LLM reads and writes."
    ok, err = check_generated_answer_grounding(valid_ans, sample_chunks)
    assert ok is True
    assert err is None

    refusal_ans = "The provided excerpts do not contain information regarding this topic."
    ok, err = check_generated_answer_grounding(refusal_ans, sample_chunks)
    assert ok is False

    empty_ans = ""
    ok, err = check_generated_answer_grounding(empty_ans, sample_chunks)
    assert ok is False


# --- 6. 10 Supported + 10 General Questions Suite ---

SUPPORTED_TEST_QUESTIONS = [
    "What is Artificial Intelligence and what are some everyday examples?",
    "What are common myths about AI?",
    "What is a token and how do tokens affect LLM costs?",
    "Why does Claude give different answers to the same question?",
    "What are the strengths and limits of AI in daily work?",
    "What is the trust rule for checking AI results?",
    "What are the model tiers like Haiku, Sonnet, and Opus?",
    "Explain the desk metaphor for context window limits.",
    "What are the four parts of a good prompt?",
    "How do permissions work with allow, ask, and deny?"
]

GENERAL_TEST_QUESTIONS = [
    "What is the best recipe for baking chocolate chip cookies?",
    "Who is Lionel Messi in the FIFA World Cup?",
    "Explain quantum entanglement and Bell inequality in physics.",
    "Can you give me financial advice for buying Bitcoin cryptocurrency?",
    "What is the capital city of Australia and France?",
    "How to fix a flat tire on a mountain bicycle?",
    "Who won the 2024 Super Bowl football championship?",
    "Write a JavaScript React tutorial for building a calculator app.",
    "What are the symptoms and medical treatment for asthma?",
    "Write a poem about summer."
]


@patch("assistant.main.gemini_generate_answer")
def test_all_questions_answered_by_gemini(mock_gen):
    """Verify that both course questions and general-knowledge questions are answered by Gemini without refusal."""
    mock_gen.return_value = "Here is a helpful AI response."

    all_queries = SUPPORTED_TEST_QUESTIONS + GENERAL_TEST_QUESTIONS
    for q in all_queries:
        resp = client.post("/api/chat", json={"message": q})
        assert resp.status_code == 200
        data = resp.json()
        assert data["answer"] == "Here is a helpful AI response."
        assert data["grounded"] is True
        assert data["sources"] == []

    assert mock_gen.call_count == len(all_queries)
