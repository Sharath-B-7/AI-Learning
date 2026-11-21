"""
Comprehensive Phase 6 Scenario Verification Suite for TAVI General-Purpose AI Assistant.

Explicitly tests the 10 user-required questions and architectural conditions:
1. Hello (Greeting)
2. Who is Lionel Messi? (General Knowledge / Non-Course Entity)
3. What is Artificial Intelligence? (Technical Explanation)
4. Explain quantum physics simply. (Science / Physics)
5. Write a Python program to check prime numbers. (Code Generation)
6. Explain machine learning with an example. (AI / ML Concept + Example)
7. Ask a follow-up question that depends on previous answer. (Multi-turn Context)
8. Test streaming generation (SSE event contract: token, sources, done)
9. Test unsupported-by-training-document topics (Answered normally without document refusal)
10. Test Gemini quota errors (429) and timeout handling (504)

Verifies:
- No BM25 retrieval is called by either chatbot endpoint.
- No Part A / Part B chunks are sent to Gemini.
- No document-only refusal appears anywhere.
- Conversation history works correctly.
- SSE frontend event contract is preserved.
"""

import json
from unittest.mock import patch, AsyncMock, MagicMock
import pytest
from fastapi.testclient import TestClient

from assistant.main import app
from assistant.gemini_generator import (
    GeminiQuotaError,
    GeminiTimeoutError,
    format_gemini_contents,
    TAVI_SYSTEM_INSTRUCTION
)

client = TestClient(app)


# --- 1. Hello (Greeting) ---
@patch("assistant.main.gemini_generate_answer")
@patch("assistant.retriever.BM25Retriever.search")
def test_scenario_01_hello(mock_bm25, mock_gen):
    mock_gen.return_value = "Hello! I'm TAVI, your AI assistant. How can I help you today?"
    resp = client.post("/api/chat", json={"message": "Hello"})
    assert resp.status_code == 200
    data = resp.json()
    assert "Hello" in data["answer"]
    assert data["grounded"] is True
    assert data["sources"] == []
    mock_bm25.assert_not_called()
    mock_gen.assert_called_once()


# --- 2. Who is Lionel Messi? (General Knowledge) ---
@patch("assistant.main.gemini_generate_answer")
@patch("assistant.retriever.BM25Retriever.search")
def test_scenario_02_lionel_messi(mock_bm25, mock_gen):
    mock_gen.return_value = "Lionel Messi is an Argentine professional footballer widely regarded as one of the greatest players in the history of the sport."
    resp = client.post("/api/chat", json={"message": "Who is Lionel Messi?"})
    assert resp.status_code == 200
    data = resp.json()
    assert "Lionel Messi" in data["answer"]
    assert "not covered in Part A or Part B" not in data["answer"]
    assert data["grounded"] is True
    assert data["sources"] == []
    mock_bm25.assert_not_called()


# --- 3. What is Artificial Intelligence? (Technical Explanation) ---
@patch("assistant.main.gemini_generate_answer")
@patch("assistant.retriever.BM25Retriever.search")
def test_scenario_03_what_is_ai(mock_bm25, mock_gen):
    mock_gen.return_value = "Artificial Intelligence (AI) refers to the simulation of human intelligence in computers and machines programmed to think and learn."
    resp = client.post("/api/chat", json={"message": "What is Artificial Intelligence?"})
    assert resp.status_code == 200
    data = resp.json()
    assert "Artificial Intelligence" in data["answer"]
    assert data["grounded"] is True
    assert data["sources"] == []
    mock_bm25.assert_not_called()


# --- 4. Explain quantum physics simply. (Science) ---
@patch("assistant.main.gemini_generate_answer")
@patch("assistant.retriever.BM25Retriever.search")
def test_scenario_04_quantum_physics(mock_bm25, mock_gen):
    mock_gen.return_value = "Quantum physics is the science of the ultra-small. It studies how atoms, electrons, and light behave in ways that seem magical compared to everyday objects."
    resp = client.post("/api/chat", json={"message": "Explain quantum physics simply."})
    assert resp.status_code == 200
    data = resp.json()
    assert "Quantum physics" in data["answer"]
    assert "not covered in Part A or Part B" not in data["answer"]
    assert data["grounded"] is True
    assert data["sources"] == []
    mock_bm25.assert_not_called()


# --- 5. Write a Python program to check prime numbers. (Code Generation) ---
@patch("assistant.main.gemini_generate_answer")
@patch("assistant.retriever.BM25Retriever.search")
def test_scenario_05_prime_numbers_code(mock_bm25, mock_gen):
    mock_gen.return_value = """Here is a Python program to check for prime numbers:

```python
def is_prime(n: int) -> bool:
    if n <= 1:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True
```"""
    resp = client.post("/api/chat", json={"message": "Write a Python program to check prime numbers."})
    assert resp.status_code == 200
    data = resp.json()
    assert "def is_prime" in data["answer"]
    assert data["grounded"] is True
    assert data["sources"] == []
    mock_bm25.assert_not_called()


# --- 6. Explain machine learning with an example. (ML Concept + Example) ---
@patch("assistant.main.gemini_generate_answer")
@patch("assistant.retriever.BM25Retriever.search")
def test_scenario_06_machine_learning_example(mock_bm25, mock_gen):
    mock_gen.return_value = "Machine learning is a way of teaching computers to learn from experience rather than following fixed rules. For example, spam filters learn by looking at thousands of emails."
    resp = client.post("/api/chat", json={"message": "Explain machine learning with an example."})
    assert resp.status_code == 200
    data = resp.json()
    assert "spam" in data["answer"].lower() or "example" in data["answer"].lower()
    assert data["grounded"] is True
    assert data["sources"] == []
    mock_bm25.assert_not_called()


# --- 7. Follow-up Question Dependent on Previous Answer (Multi-turn Context) ---
@patch("assistant.main.gemini_generate_answer")
@patch("assistant.retriever.BM25Retriever.search")
def test_scenario_07_follow_up_question(mock_bm25, mock_gen):
    mock_gen.return_value = "He currently plays as a forward for Inter Miami in MLS."
    payload = {
        "message": "Which team does he currently play for?",
        "history": [
            {"role": "user", "content": "Who is Lionel Messi?"},
            {"role": "assistant", "content": "Lionel Messi is an Argentine football legend."}
        ]
    }
    resp = client.post("/api/chat", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert "Inter Miami" in data["answer"]
    assert data["grounded"] is True
    assert data["sources"] == []
    mock_bm25.assert_not_called()

    # Verify history was forwarded to generator
    mock_gen.assert_called_once_with(
        user_query="Which team does he currently play for?",
        history=[
            {"role": "user", "content": "Who is Lionel Messi?"},
            {"role": "assistant", "content": "Lionel Messi is an Argentine football legend."}
        ]
    )


# --- 8. Streaming Generation (SSE Event Contract) ---
@patch("assistant.main.gemini_generate_stream")
@patch("assistant.retriever.BM25Retriever.search")
def test_scenario_08_streaming_generation(mock_bm25, mock_stream):
    async def mock_tokens(*args, **kwargs):
        yield "Deep learning "
        yield "is a subset of machine learning."

    mock_stream.return_value = mock_tokens()

    resp = client.post("/api/chat/stream", json={"message": "What is deep learning?"})
    assert resp.status_code == 200
    assert "text/event-stream" in resp.headers.get("content-type", "")

    events = [line for line in resp.iter_lines() if line and line.startswith("data: ")]
    payloads = [json.loads(e.replace("data: ", "")) for e in events]

    assert len(payloads) >= 4
    assert payloads[0] == {"type": "token", "token": "Deep learning "}
    assert payloads[1] == {"type": "token", "token": "is a subset of machine learning."}
    assert payloads[2] == {"type": "sources", "sources": [], "grounded": True}
    assert payloads[3] == {"type": "done"}
    mock_bm25.assert_not_called()


# --- 9. Unsupported-by-Training-Document Topics (Answered Normally) ---
@patch("assistant.main.gemini_generate_answer")
@patch("assistant.retriever.BM25Retriever.search")
def test_scenario_09_unsupported_topics_answered_normally(mock_bm25, mock_gen):
    unsupported_topics = [
        ("What is the capital of France?", "The capital of France is Paris."),
        ("How do airplanes fly in the sky?", "Airplanes fly by generating aerodynamic lift with their wings."),
        ("Can you recommend a recipe for pancakes?", "To make fluffy pancakes, mix flour, milk, egg, and baking powder."),
        ("Explain gravitational waves in astronomy.", "Gravitational waves are ripples in spacetime caused by accelerating massive objects.")
    ]

    for question, expected_ans in unsupported_topics:
        mock_gen.return_value = expected_ans
        resp = client.post("/api/chat", json={"message": question})
        assert resp.status_code == 200
        data = resp.json()
        assert data["answer"] == expected_ans
        assert "not covered in Part A or Part B" not in data["answer"]
        assert data["grounded"] is True
        assert data["sources"] == []

    mock_bm25.assert_not_called()


# --- 10. Gemini Quota Errors (429) & Timeout (504) Handling ---
@patch("assistant.main.gemini_generate_answer")
def test_scenario_10_quota_and_timeout_errors(mock_gen):
    # 1. Quota 429
    mock_gen.side_effect = GeminiQuotaError("Gemini API rate limit or quota exceeded. Please try again shortly.")
    resp_quota = client.post("/api/chat", json={"message": "Any question"})
    assert resp_quota.status_code == 429
    assert "quota exceeded" in resp_quota.json()["detail"].lower()

    # 2. Timeout 504
    mock_gen.side_effect = GeminiTimeoutError("Gemini API request timed out after 90 seconds.")
    resp_timeout = client.post("/api/chat", json={"message": "Any question"})
    assert resp_timeout.status_code == 504
    assert "timed out" in resp_timeout.json()["detail"].lower()
