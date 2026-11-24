"""
BM25 Search Index and Retrieval Engine for Claude Learning Hub Assistant.

Uses rank-bm25 (BM25Okapi) for fast, in-memory, zero-external-dependency retrieval
over structured chunks extracted from:
- AI_Training_Part_A_Fundamentals.docx
- AI_Training_Part_B_Concepts.docx
"""

import os
import re
import json
import logging
from typing import List, Dict, Any, Optional

try:
    from rank_bm25 import BM25Okapi
except ImportError:
    raise ImportError("rank-bm25 is required. Install via 'pip install rank-bm25'")

logger = logging.getLogger(__name__)

DEFAULT_DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
DEFAULT_CHUNKS_PATH = os.path.join(DEFAULT_DATA_DIR, "chunks.json")

# Standard English stopwords to filter non-informative terms during query matching
STOPWORDS = {
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are",
    "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but",
    "by", "could", "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from",
    "further", "had", "has", "have", "having", "he", "her", "here", "hers", "herself", "him",
    "himself", "his", "how", "i", "if", "in", "into", "is", "it", "its", "itself", "just",
    "me", "more", "most", "my", "myself", "no", "nor", "not", "now", "of", "off", "on", "once",
    "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same",
    "she", "should", "so", "some", "such", "than", "that", "the", "their", "theirs", "them",
    "themselves", "then", "there", "these", "they", "this", "those", "through", "to", "too",
    "under", "until", "up", "very", "was", "we", "were", "what", "when", "where", "which",
    "while", "who", "whom", "why", "with", "would", "you", "your", "yours", "yourself", "yourselves"
}


def tokenize_text(text: str, remove_stopwords: bool = True) -> List[str]:
    """
    Tokenizes text into normalized lowercase alphanumeric tokens.
    Handles hyphenated words and technical identifiers.
    """
    if not text:
        return []
    # Match alphanumeric words including hyphens
    tokens = [w.lower() for w in re.findall(r"\b[a-zA-Z0-9_\-]+\b", text) if len(w) > 1]
    if remove_stopwords:
        filtered = [w for w in tokens if w not in STOPWORDS]
        # Fallback to unfiltered tokens if all tokens were stopwords
        return filtered if filtered else tokens
    return tokens


class BM25Retriever:
    """
    In-memory BM25 retrieval index over the preprocessed DOCX chunks.
    Builds the index once and reuses it for high-speed queries.
    """

    def __init__(self, chunks_path: str = DEFAULT_CHUNKS_PATH):
        self.chunks_path = chunks_path
        self.chunks: List[Dict[str, Any]] = []
        self.tokenized_corpus: List[List[str]] = []
        self.bm25: Optional[BM25Okapi] = None
        self._load_and_index()

    def _load_and_index(self):
        """Loads chunks.json and builds the in-memory BM25Okapi index."""
        if not os.path.exists(self.chunks_path):
            raise FileNotFoundError(
                f"Chunks file not found at: {self.chunks_path}. "
                f"Please run 'python assistant/ingest.py' first."
            )

        with open(self.chunks_path, "r", encoding="utf-8") as f:
            try:
                self.chunks = json.load(f)
            except json.JSONDecodeError as e:
                raise ValueError(f"Failed to parse chunks JSON file: {e}")

        if not self.chunks:
            raise ValueError(f"Chunks file is empty: {self.chunks_path}")

        # Tokenize all chunks (content + metadata)
        self.tokenized_corpus = [
            tokenize_text(c["content"], remove_stopwords=True)
            for c in self.chunks
        ]
        self.bm25 = BM25Okapi(self.tokenized_corpus)
        logger.info(f"Built BM25 index over {len(self.chunks)} chunks.")

    def search(self, query: str, top_k: int = 4, min_score: float = 0.0) -> List[Dict[str, Any]]:
        """
        Searches the indexed chunks using BM25.
        Returns top_k matching chunks with scores >= min_score.
        """
        if not query or not query.strip():
            return []

        query_tokens = tokenize_text(query, remove_stopwords=True)
        if not query_tokens:
            return []

        scores = self.bm25.get_scores(query_tokens)

        # Sort indices descending by score
        ranked_indices = sorted(
            range(len(scores)),
            key=lambda i: scores[i],
            reverse=True
        )

        results = []
        for idx in ranked_indices:
            score = float(scores[idx])
            if score < min_score:
                break

            chunk = self.chunks[idx]
            chunk_tokens_set = set(self.tokenized_corpus[idx])
            matched_terms = [t for t in query_tokens if t in chunk_tokens_set]

            results.append({
                "chunk_id": chunk["chunk_id"],
                "content": chunk["content"],
                "source_file": chunk["source_file"],
                "part": chunk["part"],
                "module": chunk["module"],
                "heading": chunk["heading"],
                "subheading": chunk["subheading"],
                "score": round(score, 4),
                "matched_terms": matched_terms
            })

            if len(results) >= top_k:
                break

        return results


# Global singleton instance for in-memory reuse
_GLOBAL_RETRIEVER: Optional[BM25Retriever] = None


def get_retriever(chunks_path: str = DEFAULT_CHUNKS_PATH) -> BM25Retriever:
    """Returns the cached in-memory BM25Retriever instance."""
    global _GLOBAL_RETRIEVER
    if _GLOBAL_RETRIEVER is None or _GLOBAL_RETRIEVER.chunks_path != chunks_path:
        _GLOBAL_RETRIEVER = BM25Retriever(chunks_path=chunks_path)
    return _GLOBAL_RETRIEVER


def search_documents(query: str, top_k: int = 4, min_score: float = 0.0) -> List[Dict[str, Any]]:
    """Convenience search function meeting project specifications."""
    retriever = get_retriever()
    return retriever.search(query, top_k=top_k, min_score=min_score)


if __name__ == "__main__":
    import time
    print("Testing BM25Retriever...")
    t0 = time.perf_counter()
    retriever = get_retriever()
    t1 = time.perf_counter()
    print(f"Index loaded in {(t1 - t0)*1000:.2f} ms")

    sample_query = "What is the difference between AI and machine learning?"
    print(f"\nQuery: {sample_query}")
    t_search_0 = time.perf_counter()
    res = retriever.search(sample_query, top_k=3)
    t_search_1 = time.perf_counter()
    print(f"Search completed in {(t_search_1 - t_search_0)*1000:.3f} ms. Results: {len(res)}")
    for r in res:
        print(f"  Score: {r['score']} | [{r['chunk_id']}] {r['part']} - {r['module']} > {r['subheading']}")
        print(f"  Snippet: {r['content'][:150]}...\n")
