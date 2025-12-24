---
mode: ask
---

## Objective:
Analyse the appropriate source files under docs/ and generate a concise, verifiable report.

## Detection rules (pick whichever set exists):
- Preferred: lesson-style files such as A0_Cover.md, A1_Class.md, A1_Lab.md, A2_Class.md, A2_Lab.md, ..., C2_Lab.md.
- Fallback: project-a.md, project-b.md, project-c.md.
- If both sets exist, prefer the lesson-style files for each project area.
- If a required file is missing, report which files were found and ask the user for guidance.

## Analysis and output requirements:
1. Read the selected source files. Understand their contents, context, intentions and objectives.
2. Produce a report with these sections:
   - Abstract: Brief overview of the projects' purpose and scope.
   - Executive Summary: One paragraph summarising key themes and goals.
   - High-Level Information Architecture: Outline the main components and relationships.
   - High-Level Structure and Objectives: Condensed statement of overall structure and objectives (do not summarise content).
   - Detailed Structure and Objectives by Projects: Condensed details for Project A, Project B, and Project C (or corresponding lesson groups).
   - Conclusion: Final thoughts on implications and next steps.
3. After the report, crosscheck the findings against the source files for:
   - Accuracy
   - Relevance
   - Ease of understanding
   - Accessibility (ease of retrieval)
   Report any mismatches, missing elements, or clarity issues.

## Style and constraints:
- Use short, simple sentences.
- Use British English spelling.
- Ensure accuracy and relevance.
- Keep content easy to retrieve.
- If files are missing or ambiguous, ask a clarifying question rather than guessing.

## Output format:
- Produce the report text only. Do not include raw file contents unless needed for the crosscheck notes.
- Keep the report concise and actionable.