## Generating Cover Pages for Projects

When generating a cover page (e.g., `A0_Cover.md` for Project A), follow this structure and guidelines. The cover page summarizes the entire project based on its lessons (e.g., A1_Class.md, A1_Lab.md, etc.). Each project consists of 4 lessons (2 Class + 2 Lab, ~1 hour each).

### Structure
1. **Project Title**: Create a concise, outcome-focused title (e.g., "Project A - Predictive Modelling with K-Nearest Neighbours"). It must reflect the overall results of completing all lessons.
2. **Learning Objectives**: Use a blockquote with bullet points for high-level objectives. These should be broader than individual lessons and cover the project's scope.
3. **Three Short Paragraphs** (1-2 sentences each):
   - **Paragraph 1 (Phenomenon)**: Introduce an engaging, real-world phenomenon relevant to 13–17-year-olds (e.g., recommendation systems like Netflix). Make it relatable and hook-like.
   - **Paragraph 2 (Principles)**: Describe key principles learned across lessons (e.g., supervised learning, distance metrics, hyperparameter tuning).
   - **Paragraph 3 (Practice/Outcome)**: Explain the practical outcome of completing the project (e.g., building and tuning a k-NN model for classification).

### Guidelines
- **Tone and Style**: Keep accessible, engaging, and age-appropriate. Use British English. Follow markdown rules (e.g., no H1, proper lists, line length <400 chars).
- **Content Sources**: Base the content on the project's lessons (e.g., extract themes from A1_Class.md, A1_Lab.md, etc.). Ensure 3P alignment: Phenomenon as hook, Principles as concepts, Outcome as practice.
- **Length and Formatting**: Title as H1-equivalent (but use #). Objectives in blockquote. Paragraphs as numbered list items. Include front matter if applicable (e.g., version, date).
- **Avoid Assumptions**: Do not invent new content; synthesize from existing lessons. If lessons are incomplete, use placeholders and note for revision.
- **Validation**: Ensure compliance with `.github/instructions/markdown.instructions.md` and pedagogical framework.

Example Output for Project A:

```md
# Project A - Predictive Modelling with K-Nearest Neighbours

## Project A - Learning Objectives
> By the end of this project, you will be able to:
> - Understand and apply supervised learning techniques like k-NN for classification
> - Evaluate and tune models using distance metrics, scaling, and hyperparameters
> - Build real-world applications such as flower classification or recommendation systems

1. Have you ever wondered how apps like Netflix suggest movies just for you? This is the phenomenon of recommendation systems using similarity to predict what you'll enjoy.

2. In this project, you'll learn principles like measuring similarity with distance metrics, the importance of feature scaling, and tuning hyperparameters for better performance.

3. By the end of this module, you'll have built and optimised a k-NN classifier, ready to classify flowers or make predictions on new data.
```

### Example Prompt

```text
Use the instructions in `cover-page-instructions.md` to generate a cover page for Project A in `A0_Cover.md` based on lessons `A1_Class.md` , `A1_Lab.md` , `A2_Class.md` , and `A2_Lab.md` .
```
