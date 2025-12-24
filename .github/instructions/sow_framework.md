'''# Scheme of Work Page Generation Instructions

## Task Overview
Generate a professional scheme of work page in Markdown format and save it as `docs/sow.md`. The scheme of work page should follow the established template structure and be suitable for an LMS (Learning Management System) environment.

## Input Requirements
- **Course Content**: Markdown files located in the `docs` directory. The files for `Project A` consists of `A1_Class.md`, `A1_Lab.md`, `A2_Class.md`, and `A2_Lab.md`. Similarly, the files for `Project B` consists of `B1_Class.md`, `B1_Lab.md`, `B2_Class.md`, and `B2_Lab.md`. The files for `Project C` consists of `C1_Class.md`, `C1_Lab.md`, `C2_Class.md`, and `C2_Lab.md`.
- **Course Metadata**: Title, description, prerequisites, duration, and learning objectives.
- **Cover Image**: Reference to course cover image (if available).

## Output Format
Generate a complete `docs/sow.md` file with the following structure:

### Required Sections

1.  **Main Title**
    -   The main title of the course.

2.  **Header with Cover Image**
    -   Include course cover image if provided
    -   Use placeholder image reference if not available

3.  **Synopsis Section**
    -   Brief course overview (2-3 sentences)
    -   **Technical objective**: Clear statement of what students will learn technically
    -   **Life skills objective**: Practical skills and competencies gained

4.  **Prerequisites Section**
    -   Target audience description
    -   Technical requirements (hardware/software)
    -   Prerequisite courses (if any)

5.  **Course Structure Table**
    -   A markdown table with four columns: Project, Topic, Objective, and Content.
    -   The table summarizes the projects, learning objectives, and lesson content, with each lesson on a new row.

## Content Analysis Guidelines

### Extract from Course Content:
-   **Course title and main topic**
-   **Project-specific learning objectives and outcomes** from each project file.
-   **Project Topic**: The title of the project (e.g., `MQTT Publish-Subscribe System`).
-   **Project Content**: The titles of the individual lessons within each project.
-   **Prerequisites and target audience**
-   **Estimated duration**
-   **Key technical concepts covered**
-   **Practical applications**

### Synthesize Information:
-   Create engaging synopsis that highlights value proposition
-   Identify both technical and life skills outcomes
-   Determine appropriate prerequisites
-   Structure modules logically in the summary table.
-   Estimate realistic contact hours

## Writing Style Requirements

### Tone and Voice:
-   Professional yet approachable
-   Educational and informative
-   Engaging and motivational
-   Clear and concise

### Technical Writing:
-   Use active voice
-   Write in second person ("you will learn")
-   Include specific, measurable outcomes
-   Balance technical depth with accessibility

### Formatting:
-   Use Markdown syntax for structure
-   Include proper headings hierarchy (###)
-   Add emphasis with `**bold**` and `*italic*` tags
-   Use horizontal rules (`---`) for separation
-   Format links as `[text](url)`

## Template Structure Reference

```markdown
##2 [COURSE_TITLE]

### ![Cover Image]([COVER_IMAGE_URL])

### Synopsis

[BRIEF_OVERVIEW]

**Technical objective:** [TECHNICAL_LEARNING_OUTCOMES]

**Life skills objective:** [PRACTICAL_SKILLS_OUTCOMES]

### Prerequisite

[TARGET_AUDIENCE_DESCRIPTION]

[TECHNICAL_REQUIREMENTS]

**Prerequisite course(s)**: [PREREQUISITES_OR_NONE]

### Content
| Project | Topic | Objective | Content |
| :---: | :---: | :--- | :--- |
| A | [PROJECT_A_TOPIC] | [PROJECT_A_OBJECTIVE] | [PROJECT_A_LESSON_1] |
| | | | [PROJECT_A_LESSON_2] |
| | | | ... |
| B | [PROJECT_B_TOPIC] | [PROJECT_B_OBJECTIVE] | [PROJECT_B_LESSON_1] |
| | | | [PROJECT_B_LESSON_2] |
| | | | ... |
| C | [PROJECT_C_TOPIC] | [PROJECT_C_OBJECTIVE] | [PROJECT_C_LESSON_1] |
| | | | [PROJECT_C_LESSON_2] |
| | | | ... |
| **Showcase Project** | | [SHOWCASE_OBJECTIVE] | |

```

## Example Table
The generated table should look like this:

| Project | Topic | Objective | Content |
| :---: | :---: | ----- | ----- |
| A | Jumping Sprite | By the end of this module, you will be able to: make a sprite jump use camera to add sprites and backdrops | A1 \- Make a sprite jump |
|  |  |  | A2 \- Bring objects to life |
| B | Rotating Patterns | By the end of this module, you will be able to: use loops make sprites turn change size and colour of sprites | B1 \- Create rotating patterns |
|  |  |  | B2 \- Build a kaleidoscope |
| C | Tilt to Move | By the end of this module, you will be able to: move sprites to specific locations on screen use the "tilt" block to move sprites | C1 \- Move sprites |
|  |  |  | C2 \- Use drawing as backdrop |
| D | Make Music | By the end of this module, you will be able to: use the "shake" block to trigger events collaborate with friends to make music | D1 \- Make music with coding |
|  |  |  | D2 \- Perform a mini orchestra |
| E | Story Time | By the end of this module, you will be able to: animate stories with dialogues use the "send message" block to trigger events | E1 \- Animate interactive stories |
|  |  |  | E2 \- Experiment with a view |
| F | Sports Games | By the end of this module, you will be able to: create a simple ball game trigger events when sprites touch one another | F1 \- Create a sports game |
|  |  |  | F2 \- Make a score counter |
| Showcase Project |  | By the end of this module, you will be able to: identify a project of your choice apply the various tools learned earlier to complete the project develop your confidence and communication skills by presenting your project to the public |  |

## Content Processing Steps

1.  **Analyze Course Content**
    -   Read all provided course materials from the `docs` directory (`project-a.md`, `project-b.md`, etc.).
    -   Identify main topics and themes.
    -   Extract the main **Course Title**.
    -   Extract overall learning objectives for the synopsis.
    -   Assess skill level and prerequisites.

2.  **Synthesize Information for Header**
    -   Create compelling course synopsis.
    -   Define clear technical and life skills objectives.
    -   Determine appropriate prerequisites.

3.  **Generate Course Structure Table**
    -   For each project file (`project-a.md`, `project-b.md`, `project-c.md`):
        -   Extract the **Project Letter** and **Topic**.
        -   Extract the **Objective**. The objective should be a single string that starts with "By the end of this module, you will be able to:" and includes the list of objectives as bullet points.
        -   Extract all **Lesson Titles** for the project.
        -   Create the first row for the project with the Project, Topic, Objective, and the title of the first lesson.
        -   For each subsequent lesson in the same project, create a new row with blank Project, Topic, and Objective columns, and place the lesson title in the Content column.
    -   For the `showcase.md` file, create a final row with "Showcase Project" in the **Project** column and its Objective in the **Objective** column, formatted in the same way as the other projects.

4.  **Generate Scheme of Work Page**
    -   Create the file at `docs/sow.md`.
    -   Follow the template structure.
    -   Replace placeholders with extracted/synthesized content, including the main `[COURSE_TITLE]`.
    -   Ensure proper Markdown formatting.
    -   Include all required sections.
    -   Maintain professional tone.

## Quality Assurance Checklist

- [ ] Main title is included.
- [ ] All required sections included.
- [ ] Synopsis is engaging and informative.
- [ ] Technical and life skills objectives are clear.
- [ ] Prerequisites are appropriate for target audience.
- [ ] Course structure table is correctly populated from project files in the multi-row format.
- [ ] Table alignment is correct (`:---: | :---: | :--- | :---`).
- [ ] Markdown formatting is correct.
- [ ] Professional tone maintained throughout.

## Example Usage Command

```bash
gemini "Please analyze the course content files (project-a.md, project-b.md, project-c.md, showcase.md) in the `docs` directory and generate a `docs/sow.md` file following the instructions in cli-tasks/GEMINI-sow.md."
```

## Notes for Gemini CLI

-   Process multiple input files as specified.
-   Maintain context across course modules to create a cohesive summary.
-   Generate professional output based on the template.
-   Replace placeholder URLs with appropriate values if available.
-   Ensure all content is original and educational.
''