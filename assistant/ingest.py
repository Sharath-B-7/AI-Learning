"""
DOCX Ingestion and Intelligent Chunking for AI MASTERCLASS Assistant.

Ingests ONLY:
- AI_Training_Part_A_Fundamentals.docx
- AI_Training_Part_B_Concepts.docx

Preserves document structure, headings, subheadings, tables, and original wording.
Generates structured chunks targeting ~120-250 words and an ingestion report.
"""

import os
import json
import logging
from typing import List, Dict, Any, Tuple
import docx

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

DOC_A_DEFAULT = "/home/sharath/Downloads/AI_Training_Part_A_Fundamentals.docx"
DOC_B_DEFAULT = "/home/sharath/Downloads/AI_Training_Part_B_Concepts.docx"

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
CHUNKS_FILE = os.path.join(DATA_DIR, "chunks.json")
REPORT_FILE = os.path.join(DATA_DIR, "ingestion_report.json")


def format_table_as_text(table: docx.table.Table) -> Tuple[List[str], List[List[str]], str]:
    """Extract headers and rows from a docx table and return formatted text."""
    if not table.rows:
        return [], [], ""

    headers = [cell.text.strip().replace("\n", " ") for cell in table.rows[0].cells]
    rows = []
    for row in table.rows[1:]:
        row_cells = [cell.text.strip().replace("\n", " ") for cell in row.cells]
        # Ignore completely empty rows
        if any(row_cells):
            rows.append(row_cells)

    # Markdown-style table text
    lines = [" | ".join(headers)]
    lines.append("-" * max(len(lines[0]), 10))
    for row in rows:
        lines.append(" | ".join(row))

    return headers, rows, "\n".join(lines)


def parse_docx(file_path: str, part_label: str) -> Tuple[List[Dict[str, Any]], int, List[str]]:
    """
    Parses a single DOCX file, preserving paragraphs and tables in sequential document order.
    Returns:
      - raw_elements: structured element list
      - total_paragraphs_seen: total count of paragraphs scanned
      - warnings: any extraction warnings
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Source DOCX file not found: {file_path}")

    logger.info(f"Parsing {part_label} from {file_path}...")
    doc = docx.Document(file_path)
    warnings = []

    current_module = "Introduction"
    current_heading = "Introduction"
    current_subheading = ""

    elements = []
    p_counter = 0

    for elem in doc.element.body:
        if elem.tag.endswith("p"):
            p = docx.text.paragraph.Paragraph(elem, doc)
            text = p.text.strip()
            if not text:
                continue

            p_counter += 1
            style_name = p.style.name if p.style else "Normal"

            if style_name == "Heading 1":
                current_heading = text
                if text.startswith("Module "):
                    current_module = text
                elif "Glossary" in text:
                    current_module = "Glossary"
                elif "Commonly Asked Questions" in text or "FAQ" in text:
                    current_module = "FAQ"
                elif "Putting It All Together" in text:
                    current_module = "Worked Example"
                elif "What You Should Be Able to Do" in text:
                    current_module = "Checklist"
                else:
                    current_module = text
                current_subheading = ""
                continue
            elif style_name == "Heading 2":
                current_subheading = text
                continue

            # Regular paragraph or list paragraph
            elements.append({
                "type": "paragraph",
                "paragraph_index": p_counter,
                "source_file": file_path,
                "part": part_label,
                "module": current_module,
                "heading": current_heading,
                "subheading": current_subheading,
                "content": text,
                "word_count": len(text.split())
            })

        elif elem.tag.endswith("tbl"):
            tbl = docx.table.Table(elem, doc)
            p_counter += 1
            headers, rows, table_text = format_table_as_text(tbl)
            if not table_text:
                warnings.append(f"Empty table at position {p_counter} in {part_label}")
                continue

            elements.append({
                "type": "table",
                "paragraph_index": p_counter,
                "source_file": file_path,
                "part": part_label,
                "module": current_module,
                "heading": current_heading,
                "subheading": current_subheading,
                "content": table_text,
                "headers": headers,
                "rows": rows,
                "word_count": len(table_text.split())
            })

    logger.info(f"Parsed {len(elements)} meaningful content units from {part_label} (paragraphs scanned: {p_counter})")
    return elements, p_counter, warnings


def chunk_document_elements(elements: List[Dict[str, Any]], part_label: str) -> List[Dict[str, Any]]:
    """
    Groups document elements into structured, section-aware chunks.
    Target: 120 - 250 words per chunk.
    Enforces module boundaries and preserves headings/subheadings.
    """
    # Group elements by module to guarantee no chunks cross module boundaries
    modules_order = []
    modules_map = {}
    for el in elements:
        mod = el["module"]
        if mod not in modules_map:
            modules_order.append(mod)
            modules_map[mod] = []
        modules_map[mod].append(el)

    chunks = []
    chunk_counter = 1

    part_prefix = part_label.lower().replace(" ", "_")

    for mod_name in modules_order:
        mod_elements = modules_map[mod_name]
        curr_buffer = []
        curr_word_count = 0

        def emit_chunk(buffer_items: List[Dict[str, Any]]):
            nonlocal chunk_counter
            if not buffer_items:
                return

            p_start = buffer_items[0]["paragraph_index"]
            p_end = buffer_items[-1]["paragraph_index"]
            source_file = buffer_items[0]["source_file"]
            hd = buffer_items[0]["heading"]

            # Collect unique non-empty subheadings
            subheads = []
            for item in buffer_items:
                s = item["subheading"]
                if s and s not in subheads:
                    subheads.append(s)
            sub_str = " / ".join(subheads) if subheads else ""

            # Structured header context for the chunk content
            header_prefix = f"[{part_label} | {mod_name}"
            if sub_str:
                header_prefix += f" > {sub_str}"
            header_prefix += "]"

            # Combine textual contents
            body_parts = [item["content"] for item in buffer_items]
            full_content = header_prefix + "\n\n" + "\n\n".join(body_parts)
            w_count = len(full_content.split())

            chunk_id = f"{part_prefix}_{chunk_counter:03d}"
            chunk_counter += 1

            chunks.append({
                "chunk_id": chunk_id,
                "source_file": source_file,
                "part": part_label,
                "module": mod_name,
                "heading": hd,
                "subheading": sub_str,
                "paragraph_start": p_start,
                "paragraph_end": p_end,
                "word_count": w_count,
                "content": full_content
            })

        for el in mod_elements:
            # Special handling for large tables (like 18-row glossaries) to keep chunks within target size
            if el["type"] == "table" and len(el.get("rows", [])) > 10:
                headers = el["headers"]
                rows = el["rows"]
                # Split large tables into balanced halves
                mid = (len(rows) + 1) // 2
                half1_rows = rows[:mid]
                half2_rows = rows[mid:]

                def format_sub_tbl(sub_rows):
                    lines = [" | ".join(headers), "-" * max(len(" | ".join(headers)), 10)]
                    for r in sub_rows:
                        lines.append(" | ".join(r))
                    return "\n".join(lines)

                half1_item = dict(el, content=format_sub_tbl(half1_rows), word_count=len(format_sub_tbl(half1_rows).split()))
                half2_item = dict(el, content=format_sub_tbl(half2_rows), word_count=len(format_sub_tbl(half2_rows).split()))

                # If we have a small pending buffer (<60 words, e.g. intro to glossary), prepend it to half1
                if curr_buffer and curr_word_count < 60:
                    emit_chunk(curr_buffer + [half1_item])
                    curr_buffer = []
                    curr_word_count = 0
                else:
                    if curr_buffer:
                        emit_chunk(curr_buffer)
                        curr_buffer = []
                        curr_word_count = 0
                    emit_chunk([half1_item])

                curr_buffer = [half2_item]
                curr_word_count = half2_item["word_count"]
                continue

            el_w = el["word_count"]

            # If adding this element exceeds 250 words and we already have reasonable content, flush
            if curr_word_count > 0 and (curr_word_count + el_w > 250):
                emit_chunk(curr_buffer)
                curr_buffer = [el]
                curr_word_count = el_w
            else:
                # If moving to a new distinct subheading and buffer already has >= 120 words, flush cleanly
                if (curr_buffer and el["subheading"] != curr_buffer[-1]["subheading"]
                        and curr_word_count >= 120):
                    emit_chunk(curr_buffer)
                    curr_buffer = [el]
                    curr_word_count = el_w
                else:
                    curr_buffer.append(el)
                    curr_word_count += el_w

        if curr_buffer:
            # If the final buffer in a module is very small (<60 words) and we already emitted chunks in this module,
            # merge it with the last emitted chunk if total does not exceed 280 words.
            if curr_word_count < 60 and chunks and chunks[-1]["module"] == mod_name:
                last_chunk = chunks[-1]
                combined_words = last_chunk["word_count"] + curr_word_count
                if combined_words <= 280:
                    # Append content
                    appended_text = "\n\n".join([item["content"] for item in curr_buffer])
                    last_chunk["content"] += "\n\n" + appended_text
                    last_chunk["paragraph_end"] = curr_buffer[-1]["paragraph_index"]
                    last_chunk["word_count"] = len(last_chunk["content"].split())
                    # update subheading if not present
                    for item in curr_buffer:
                        sub = item["subheading"]
                        if sub and sub not in last_chunk["subheading"]:
                            last_chunk["subheading"] = (last_chunk["subheading"] + " / " + sub) if last_chunk["subheading"] else sub
                else:
                    emit_chunk(curr_buffer)
            else:
                emit_chunk(curr_buffer)

    return chunks


def ingest_all(part_a_path: str = DOC_A_DEFAULT,
               part_b_path: str = DOC_B_DEFAULT,
               output_chunks_path: str = CHUNKS_FILE,
               output_report_path: str = REPORT_FILE) -> Tuple[List[Dict[str, Any]], Dict[str, Any]]:
    """Ingests both Part A and Part B DOCX files, performs chunking, saves chunks and report."""
    os.makedirs(os.path.dirname(output_chunks_path), exist_ok=True)

    elems_a, p_count_a, warn_a = parse_docx(part_a_path, "Part A")
    elems_b, p_count_b, warn_b = parse_docx(part_b_path, "Part B")

    chunks_a = chunk_document_elements(elems_a, "Part A")
    chunks_b = chunk_document_elements(elems_b, "Part B")

    all_chunks = chunks_a + chunks_b

    # Quality validations
    if not all_chunks:
        raise ValueError("Ingestion failed: zero chunks were produced.")

    unique_ids = {c["chunk_id"] for c in all_chunks}
    if len(unique_ids) != len(all_chunks):
        raise ValueError(f"Duplicate chunk IDs detected! Unique: {len(unique_ids)}, Total: {len(all_chunks)}")

    word_counts = [c["word_count"] for c in all_chunks]
    total_words = sum(word_counts)
    min_words = min(word_counts)
    max_words = max(word_counts)
    avg_words = round(total_words / len(all_chunks), 1)

    # Count unique sections
    unique_sections = {(c["part"], c["module"], c["heading"], c["subheading"]) for c in all_chunks}

    all_warnings = warn_a + warn_b

    report = {
        "documents_processed": 2,
        "source_files": [part_a_path, part_b_path],
        "paragraph_count_per_document": {
            os.path.basename(part_a_path): p_count_a,
            os.path.basename(part_b_path): p_count_b
        },
        "extracted_elements_count": {
            "part_a": len(elems_a),
            "part_b": len(elems_b),
            "total": len(elems_a) + len(elems_b)
        },
        "meaningful_sections_count": len(unique_sections),
        "total_chunks": len(all_chunks),
        "chunks_per_part": {
            "part_a": len(chunks_a),
            "part_b": len(chunks_b)
        },
        "total_extracted_words": total_words,
        "min_chunk_word_count": min_words,
        "max_chunk_word_count": max_words,
        "avg_chunk_word_count": avg_words,
        "extraction_warnings": all_warnings
    }

    # Save to JSON
    with open(output_chunks_path, "w", encoding="utf-8") as f:
        json.dump(all_chunks, f, indent=2, ensure_ascii=False)

    with open(output_report_path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)

    logger.info(f"Successfully generated {len(all_chunks)} chunks saved to {output_chunks_path}")
    logger.info(f"Ingestion report saved to {output_report_path}")
    return all_chunks, report


if __name__ == "__main__":
    import time
    t0 = time.perf_counter()
    chunks, rep = ingest_all()
    t1 = time.perf_counter()
    print(f"\n--- INGESTION COMPLETE IN {(t1 - t0)*1000:.2f} ms ---")
    print(f"Total Chunks: {rep['total_chunks']} (Part A: {rep['chunks_per_part']['part_a']}, Part B: {rep['chunks_per_part']['part_b']})")
    print(f"Total Words: {rep['total_extracted_words']}")
    print(f"Word Counts: Min={rep['min_chunk_word_count']}, Max={rep['max_chunk_word_count']}, Avg={rep['avg_chunk_word_count']}")
