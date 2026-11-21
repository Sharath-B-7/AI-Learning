"""
Unit and integration tests for DOCX ingestion and chunking.
"""

import os
import json
import pytest
from assistant.ingest import ingest_all, parse_docx, chunk_document_elements, DOC_A_DEFAULT, DOC_B_DEFAULT

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")
CHUNKS_FILE = os.path.join(DATA_DIR, "chunks.json")
REPORT_FILE = os.path.join(DATA_DIR, "ingestion_report.json")


def test_source_files_exist():
    """Verify that both original DOCX files exist."""
    assert os.path.exists(DOC_A_DEFAULT), f"Part A DOCX missing at {DOC_A_DEFAULT}"
    assert os.path.exists(DOC_B_DEFAULT), f"Part B DOCX missing at {DOC_B_DEFAULT}"


def test_ingestion_execution():
    """Verify that ingestion runs without errors and produces valid output."""
    chunks, report = ingest_all(
        part_a_path=DOC_A_DEFAULT,
        part_b_path=DOC_B_DEFAULT,
        output_chunks_path=CHUNKS_FILE,
        output_report_path=REPORT_FILE
    )
    assert len(chunks) > 0, "No chunks generated."
    assert report["documents_processed"] == 2
    assert report["chunks_per_part"]["part_a"] > 0
    assert report["chunks_per_part"]["part_b"] > 0


def test_both_parts_present():
    """Verify that both Part A and Part B chunks exist."""
    with open(CHUNKS_FILE, "r", encoding="utf-8") as f:
        chunks = json.load(f)

    parts = {c["part"] for c in chunks}
    assert "Part A" in parts, "Part A missing from chunks"
    assert "Part B" in parts, "Part B missing from chunks"


def test_chunk_fields_and_types():
    """Verify required metadata fields on every chunk."""
    with open(CHUNKS_FILE, "r", encoding="utf-8") as f:
        chunks = json.load(f)

    required_fields = [
        "chunk_id", "source_file", "part", "module",
        "heading", "subheading", "paragraph_start",
        "paragraph_end", "word_count", "content"
    ]

    for chunk in chunks:
        for field in required_fields:
            assert field in chunk, f"Field '{field}' missing from chunk {chunk.get('chunk_id')}"
        assert isinstance(chunk["chunk_id"], str) and len(chunk["chunk_id"]) > 0
        assert isinstance(chunk["content"], str) and len(chunk["content"].strip()) > 0
        assert chunk["word_count"] > 0
        assert chunk["paragraph_start"] <= chunk["paragraph_end"]
        assert os.path.exists(chunk["source_file"])


def test_unique_chunk_ids():
    """Ensure every chunk has a strictly unique ID."""
    with open(CHUNKS_FILE, "r", encoding="utf-8") as f:
        chunks = json.load(f)

    ids = [c["chunk_id"] for c in chunks]
    assert len(ids) == len(set(ids)), f"Duplicate chunk IDs found: {len(ids)} vs {len(set(ids))} unique"


def test_chunk_word_counts():
    """Verify chunks adhere to reasonable word count bounds."""
    with open(CHUNKS_FILE, "r", encoding="utf-8") as f:
        chunks = json.load(f)

    word_counts = [c["word_count"] for c in chunks]
    avg_words = sum(word_counts) / len(word_counts)

    # Average should be comfortably within 120-250 range
    assert 130 <= avg_words <= 220, f"Average word count {avg_words} out of expected range"
    # No ridiculously tiny chunks (< 50 words)
    assert min(word_counts) >= 60, f"Found chunk smaller than 60 words: {min(word_counts)}"
    # No massive runaway chunks (> 350 words)
    assert max(word_counts) <= 320, f"Found chunk larger than 320 words: {max(word_counts)}"


def test_original_text_preserved():
    """Verify specific original key phrases exist unaltered in the chunks."""
    with open(CHUNKS_FILE, "r", encoding="utf-8") as f:
        all_text = " ".join(c["content"] for c in json.load(f))

    key_phrases = [
        "Your email filters spam",
        "check in proportion to the stakes",
        "Haiku, Sonnet, and Opus",
        "Situation | Who you are and what is going on",
        "The context window is the size of the desk",
        "Allow | Claude may do it without asking you",
        "Read(./.env)"
    ]

    for phrase in key_phrases:
        assert phrase in all_text, f"Key phrase missing or altered: '{phrase}'"
