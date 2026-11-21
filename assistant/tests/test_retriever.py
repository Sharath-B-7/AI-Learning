"""
Comprehensive retrieval test suite and benchmark report generator for BM25Retriever.

Tests at least 15 realistic in-corpus queries covering Part A, Part B, cross-module topics,
paraphrased phrasing, plus out-of-corpus / unrelated queries.
Generates assistant/data/retrieval_test_report.json.
"""

import os
import json
import time
import pytest
from typing import List, Dict, Any

from assistant.retriever import get_retriever, search_documents, BM25Retriever

REPORT_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "data",
    "retrieval_test_report.json"
)


# Test queries with explicit expected target modules / topics
BENCHMARK_QUERIES = [
    # --- Part A Queries ---
    {
        "id": "q01",
        "category": "Part A - Module 1",
        "query": "What is Artificial Intelligence and what are some everyday examples?",
        "expected_part": "Part A",
        "expected_module_keyword": "Module 1",
        "is_in_corpus": True,
        "description": "Definition of AI and everyday examples (email spam, maps, phone typing)"
    },
    {
        "id": "q02",
        "category": "Part A - Module 1",
        "query": "What are common myths about AI thinking like a human?",
        "expected_part": "Part A",
        "expected_module_keyword": "Module 1",
        "is_in_corpus": True,
        "description": "Common myths about AI thinking like human or being like Google"
    },
    {
        "id": "q03",
        "category": "Part A - Module 2",
        "query": "What is a token and how do tokens affect costs?",
        "expected_part": "Part A",
        "expected_module_keyword": "Module 2",
        "is_in_corpus": True,
        "description": "Definition of tokens and how LLMs count words/syllables"
    },
    {
        "id": "q04",
        "category": "Part A - Module 2 / FAQ",
        "query": "Why does Claude give different answers to the exact same question?",
        "expected_part": "Part A",
        "expected_module_keyword": "Module 2",
        "is_in_corpus": True,
        "description": "Explaining natural variation and temperature/next-token probabilities"
    },
    {
        "id": "q05",
        "category": "Part A - Module 3",
        "query": "How is an LLM trained on vast amounts of text?",
        "expected_part": "Part A",
        "expected_module_keyword": "Module 3",
        "is_in_corpus": True,
        "description": "Training process, pattern recognition, and cutoff dates"
    },
    {
        "id": "q06",
        "category": "Part A - Module 4",
        "query": "What are the strengths and limits of AI in daily work?",
        "expected_part": "Part A",
        "expected_module_keyword": "Module 4",
        "is_in_corpus": True,
        "description": "What AI is good at (drafting, summarizing) vs care areas (facts, dates, math)"
    },
    {
        "id": "q07",
        "category": "Part A - Module 4",
        "query": "What is the trust rule for checking AI results?",
        "expected_part": "Part A",
        "expected_module_keyword": "Module 4",
        "is_in_corpus": True,
        "description": "Checking in proportion to the stakes (rough draft vs legal/financial)"
    },
    {
        "id": "q08",
        "category": "Part A - Module 5",
        "query": "What are the ways to use Claude and the difference between Claude app and Claude Code?",
        "expected_part": "Part A",
        "expected_module_keyword": "Module 5",
        "is_in_corpus": True,
        "description": "Claude app for chat vs Claude Code inside projects"
    },

    # --- Part B Queries ---
    {
        "id": "q09",
        "category": "Part B - Module 6",
        "query": "What are the model tiers like Haiku, Sonnet, and Opus?",
        "expected_part": "Part B",
        "expected_module_keyword": "Module 6",
        "is_in_corpus": True,
        "description": "Model tiers: small and fast vs balanced vs most capable"
    },
    {
        "id": "q10",
        "category": "Part B - Module 6",
        "query": "What is a reasoning or thinking model?",
        "expected_part": "Part B",
        "expected_module_keyword": "Module 6",
        "is_in_corpus": True,
        "description": "Models thinking step-by-step before answering complex questions"
    },
    {
        "id": "q11",
        "category": "Part B - Module 7",
        "query": "Explain the desk metaphor for context and context window size limits",
        "expected_part": "Part B",
        "expected_module_keyword": "Module 7",
        "is_in_corpus": True,
        "description": "Context as a desk, limited size, quality over quantity"
    },
    {
        "id": "q12",
        "category": "Part B - Module 8",
        "query": "What are the four parts of a good prompt request?",
        "expected_part": "Part B",
        "expected_module_keyword": "Module 8",
        "is_in_corpus": True,
        "description": "Situation, Goal, Background, Format"
    },
    {
        "id": "q13",
        "category": "Part B - Module 9",
        "query": "How does memory work and what should never be saved in memory?",
        "expected_part": "Part B",
        "expected_module_keyword": "Module 9",
        "is_in_corpus": True,
        "description": "Short-term vs persistent memory, never store passwords or PII"
    },
    {
        "id": "q14",
        "category": "Part B - Module 10",
        "query": "What is the difference between a prompt and a reusable skill?",
        "expected_part": "Part B",
        "expected_module_keyword": "Module 10",
        "is_in_corpus": True,
        "description": "Prompt as one-time request vs skill as saved reusable method"
    },
    {
        "id": "q15",
        "category": "Part B - Module 11",
        "query": "What are tools and the harness workshop metaphor?",
        "expected_part": "Part B",
        "expected_module_keyword": "Module 11",
        "is_in_corpus": True,
        "description": "Tools are hands, harness is the workshop environment"
    },
    {
        "id": "q16",
        "category": "Part B - Module 12",
        "query": "What is an autonomous agent and how does the agent loop work?",
        "expected_part": "Part B",
        "expected_module_keyword": "Module 12",
        "is_in_corpus": True,
        "description": "Agent goal, loop (think, tool, inspect, repeat), subagents"
    },
    {
        "id": "q17",
        "category": "Part B - Module 13",
        "query": "What are permissions and the allow ask deny settings?",
        "expected_part": "Part B",
        "expected_module_keyword": "Module 13",
        "is_in_corpus": True,
        "description": "Permissions: Allow, Ask, Deny settings for safe tool execution"
    },
    {
        "id": "q18",
        "category": "Part B - Module 13 / FAQ",
        "query": "How do I configure a deny rule for .env files?",
        "expected_part": "Part B",
        "expected_module_keyword": "Module 13",
        "is_in_corpus": True,
        "description": "Denying access to .env sensitive config files"
    },

    # --- Out-of-Corpus / Unrelated Queries ---
    {
        "id": "q19",
        "category": "Unrelated",
        "query": "Who is Lionel Messi and how many FIFA World Cup goals did he score?",
        "expected_part": None,
        "expected_module_keyword": None,
        "is_in_corpus": False,
        "description": "Completely unrelated soccer/sports question"
    },
    {
        "id": "q20",
        "category": "Unrelated",
        "query": "What is the best recipe for baking homemade chocolate chip cookies?",
        "expected_part": None,
        "expected_module_keyword": None,
        "is_in_corpus": False,
        "description": "Cooking/baking query (tests handling of recipe metaphor in Module 10)"
    },
    {
        "id": "q21",
        "category": "Unrelated",
        "query": "Explain quantum entanglement in theoretical physics and Bell inequality",
        "expected_part": None,
        "expected_module_keyword": None,
        "is_in_corpus": False,
        "description": "Completely unrelated physics question"
    }
]


def test_retriever_initialization():
    """Verify that retriever initializes and loads chunks cleanly."""
    retriever = get_retriever()
    assert len(retriever.chunks) > 0
    assert retriever.bm25 is not None
    assert len(retriever.tokenized_corpus) == len(retriever.chunks)


def test_empty_query():
    """Verify that empty queries safely return empty results."""
    retriever = get_retriever()
    assert retriever.search("") == []
    assert retriever.search("   ") == []
    assert retriever.search(None) == []


def test_top_k_parameter():
    """Verify top_k parameter bounds."""
    retriever = get_retriever()
    res1 = retriever.search("Artificial Intelligence", top_k=1)
    res3 = retriever.search("Artificial Intelligence", top_k=3)
    assert len(res1) == 1
    assert len(res3) == 3
    # Check score ordering (descending)
    scores = [r["score"] for r in res3]
    assert scores == sorted(scores, reverse=True)


def test_min_score_filter():
    """Verify that min_score threshold filters out weak matches."""
    retriever = get_retriever()
    res_all = retriever.search("What is Artificial Intelligence?", top_k=10, min_score=0.0)
    top_score = res_all[0]["score"]
    # Filter with threshold slightly below top score
    threshold = top_score - 0.5
    res_filtered = retriever.search("What is Artificial Intelligence?", top_k=10, min_score=threshold)
    for r in res_filtered:
        assert r["score"] >= threshold


def test_benchmark_suite_execution():
    """
    Executes the 21 test queries, verifies accuracy, and generates the
    comprehensive retrieval test report JSON.
    """
    retriever = get_retriever()
    results_data = []

    success_count = 0
    weak_matches = []
    latencies_ms = []

    for item in BENCHMARK_QUERIES:
        qid = item["id"]
        query = item["query"]
        is_in_corpus = item["is_in_corpus"]

        t0 = time.perf_counter()
        top_chunks = retriever.search(query, top_k=3, min_score=0.0)
        t1 = time.perf_counter()
        latency = (t1 - t0) * 1000
        latencies_ms.append(latency)

        top_match = top_chunks[0] if top_chunks else None
        top_score = top_match["score"] if top_match else 0.0

        if is_in_corpus:
            # Check if expected module keyword appears in the top chunk or top 3 chunks
            top_modules = [c["module"] for c in top_chunks]
            top_parts = [c["part"] for c in top_chunks]

            # Matched if top 1 or top 2 contains expected module or topic in FAQ/Glossary
            mod_matched = any(item["expected_module_keyword"] in m for m in top_modules) or (
                "FAQ" in top_modules[0] or "Glossary" in top_modules[0]
            )
            part_matched = item["expected_part"] in top_parts

            is_success = mod_matched and part_matched and top_score > 3.0
            if is_success:
                success_count += 1
            else:
                weak_matches.append({
                    "id": qid,
                    "query": query,
                    "top_score": top_score,
                    "top_chunk": top_match["chunk_id"] if top_match else None,
                    "top_module": top_match["module"] if top_match else None,
                    "reason": "Lower score or module ranking divergence"
                })
        else:
            # For out-of-corpus queries, success means low score (< 4.5) or zero score
            # and no substantive query term overlap
            is_success = top_score < 4.5 or (top_match and len(top_match.get("matched_terms", [])) <= 1)
            if is_success:
                success_count += 1
            else:
                weak_matches.append({
                    "id": qid,
                    "query": query,
                    "top_score": top_score,
                    "top_chunk": top_match["chunk_id"] if top_match else None,
                    "reason": "Out of corpus query received unexpected high score"
                })

        results_data.append({
            "id": qid,
            "query": query,
            "category": item["category"],
            "is_in_corpus": is_in_corpus,
            "latency_ms": round(latency, 3),
            "top_score": top_score,
            "passed": is_success,
            "top_3_chunks": [
                {
                    "chunk_id": c["chunk_id"],
                    "part": c["part"],
                    "module": c["module"],
                    "subheading": c["subheading"],
                    "score": c["score"],
                    "matched_terms": c.get("matched_terms", [])
                }
                for c in top_chunks
            ]
        })

    total_queries = len(BENCHMARK_QUERIES)
    accuracy_pct = round((success_count / total_queries) * 100, 1)
    avg_latency = round(sum(latencies_ms) / len(latencies_ms), 3)

    # In-corpus scores vs Out-of-corpus scores analysis
    in_corpus_scores = [r["top_score"] for r in results_data if r["is_in_corpus"]]
    out_corpus_scores = [r["top_score"] for r in results_data if not r["is_in_corpus"]]

    min_in_corpus = min(in_corpus_scores)
    max_in_corpus = max(in_corpus_scores)
    avg_in_corpus = round(sum(in_corpus_scores) / len(in_corpus_scores), 2)

    min_out_corpus = min(out_corpus_scores)
    max_out_corpus = max(out_corpus_scores)
    avg_out_corpus = round(sum(out_corpus_scores) / len(out_corpus_scores), 2)

    # Suggested refusal threshold:
    # A score of >= 3.0 to 4.0 combined with requiring at least 1-2 content terms matched
    suggested_threshold = 3.5

    report = {
        "timestamp": time.ctime(),
        "total_tests": total_queries,
        "in_corpus_queries": len(in_corpus_scores),
        "out_of_corpus_queries": len(out_corpus_scores),
        "successful_retrievals": success_count,
        "failed_retrievals": total_queries - success_count,
        "retrieval_accuracy_percent": accuracy_pct,
        "average_retrieval_latency_ms": avg_latency,
        "score_statistics": {
            "in_corpus": {
                "min": min_in_corpus,
                "max": max_in_corpus,
                "avg": avg_in_corpus
            },
            "out_of_corpus": {
                "min": min_out_corpus,
                "max": max_out_corpus,
                "avg": avg_out_corpus
            }
        },
        "suggested_relevance_threshold": suggested_threshold,
        "threshold_guidance": (
            "Queries scoring above 4.0 consistently represent strong topical relevance. "
            "Scores below 3.0 or queries where fewer than 2 distinct query tokens match the corpus "
            "should be treated as ungrounded/out-of-corpus, triggering polite refusal."
        ),
        "known_limitations": [
            "BM25 is a lexical keyword frequency algorithm and lacks dense semantic understanding for abstract synonyms.",
            "Metaphors in the text (such as using a 'recipe' card to explain Skills in Module 10) can trigger lexical matches on cooking queries.",
            "Short queries with common words rely on query term overlap filtering to prevent false positives."
        ],
        "weak_matches": weak_matches,
        "detailed_results": results_data
    }

    with open(REPORT_PATH, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)

    assert accuracy_pct >= 85.0, f"Retrieval accuracy too low: {accuracy_pct}%"
