# Lesson Template

This template must be used by all agents when creating educational content. It enforces the pedagogical framework requirements and ensures consistency across all lessons.

---

## Template Structure

```markdown
<!-- Version: vX.Y -->
<!-- Last updated: 2025-MM-DD -->
<!-- Changelog: … -->

# {{PROJECT_ID}} {{SESSION_TYPE}} <!-- e.g., A1 Class -->

> **Session type**: {{CLASS_OR_LAB}} ({{INSTRUCTION_TYPE}})  
> *{{SESSION_DESCRIPTION}}*

> **Learning objectives**
> - {{OBJECTIVE_1}}
> - {{OBJECTIVE_2}}
> - {{OBJECTIVE_3}}
>
> **3P focus**: Phenomenon → Principle → Practice

## Scenario
{{CONTEXTUAL_INTRODUCTION_1_TO_3_SENTENCES}}

{{OPTIONAL_IMAGE}}
![{{ALT_TEXT}}]({{IMAGE_PATH}} "" width="{{WIDTH}}")

## Steps
### Step 1 — {{STEP_TITLE}}
1. {{INSTRUCTION_LINE_1}}. 👉 {{ENSURE_STATEMENT}}
    - {{SUB_STEP_WITH_4_SPACE_INDENT}}
    > 💡 {{TIP_OR_INSIGHT}}
2. {{INSTRUCTION_LINE_2}}
    - {{SUB_STEP}}
    > {{REFLECTION_PROMPT}}

### Step {{N-1}} — {{STEP_TITLE}}
[Continue with additional steps as needed]

### Step {{N}} — Share and reflect
- {{GUIDING_QUESTION_1}}
- {{GUIDING_QUESTION_2}}
- {{PEER_DISCUSSION_PROMPT}}
```

---

## Session Type Specifications

### For Class Sessions (Mentor-led)
```
> **Session type**: Class (Mentor-led)  
> *(Introduce principles through guided instruction)*
```

### For Lab Sessions (Student-led)
```
> **Session type**: Lab (Student-led with mentor support)  
> *(Apply previously learned concepts through hands-on work)*
```

---

## Placeholder Replacement Guidelines

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{{PROJECT_ID}}` | Project and lesson identifier | `A1`, `B2`, `C1` |
| `{{SESSION_TYPE}}` | Class or Lab | `Class`, `Lab` |
| `{{CLASS_OR_LAB}}` | Same as SESSION_TYPE | `Class`, `Lab` |
| `{{INSTRUCTION_TYPE}}` | Teaching approach | `Mentor-led`, `Student-led with mentor support` |
| `{{SESSION_DESCRIPTION}}` | Brief purpose statement | `Introduce principles through guided instruction` |
| `{{OBJECTIVE_N}}` | Specific learning objective | `Identify three key principles of...` |
| `{{CONTEXTUAL_INTRODUCTION}}` | 1-3 sentences with real-world hook | `Imagine you're building...` |
| `{{STEP_TITLE}}` | Action-oriented step name | `Set up your development environment` |
| `{{INSTRUCTION_LINE}}` | Clear, actionable instruction | `Open your terminal and navigate to...` |
| `{{ENSURE_STATEMENT}}` | Verification or emphasis | `Ensure your file is saved before...` |
| `{{SUB_STEP}}` | Indented sub-instruction | `Check that the output matches...` |
| `{{REFLECTION_PROMPT}}` | Question for learner thinking | `How does this connect to what you learned in...?` |
| `{{GUIDING_QUESTION}}` | Discussion starter | `What challenges did you encounter?` |

---

## Required Elements Checklist

### Structure Requirements
- [ ] Version and changelog comments at top
- [ ] Project ID and session type in title
- [ ] Session type callout with description
- [ ] Learning objectives in blockquote format
- [ ] 3P focus statement
- [ ] Scenario section with contextual introduction
- [ ] Numbered steps with clear titles
- [ ] Final "Share and reflect" step

### Content Requirements
- [ ] Real-world hook in scenario (Phenomenon)
- [ ] Clear concept explanation in steps (Principle)
- [ ] Hands-on activities in steps (Practice)
- [ ] Reflection prompts embedded throughout
- [ ] Peer discussion opportunities
- [ ] Action-oriented language
- [ ] 4-space indentation for sub-steps

### Style Requirements
- [ ] Title-style capitalization for main heading
- [ ] Sentence-style capitalization for subheadings
- [ ] Bold for key terms
- [ ] Appropriate callouts (💡, ⚠️, 📖)
- [ ] Proper image formatting with alt text
- [ ] Consistent terminology

---

*This template must be used by all content creation agents and verified by QA agents during review processes.*