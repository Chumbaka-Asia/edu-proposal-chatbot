# Copilot instructions (DSLC Mentor Chatbot)

## Architecture (no build step, single-file frontend)
- **Frontend**: `public/index.html` is fully self-contained (~3500 lines) containing UI, state management, CSV processing, and Gemini prompt builders. Uses CDN scripts only (Tailwind, Lucide, PapaParse)  no bundler or transpilation.
- **Backend**: Thin same-origin proxy at `POST /api/gemini` implemented twice:
  - Vercel: `api/gemini.js` (reads `process.env.GEMINI_API_KEY`)
  - Firebase: `functions/index.js` (uses `defineSecret("GEMINI_API_KEY")`) with `firebase.json` rewrite to `geminiProxy`
- **Design system**: Uses CSS custom properties (`--color-primary`, `--font-display`, etc.) with DM Sans, Inter, and JetBrains Mono from Google Fonts. Educational-friendly gradient background.

## State management & persistence
- **Single state object**: `state` is cloned from `DEFAULT_STATE` (defines structure for all 5 stages).
- **localStorage strategy**: Persists to `dslcMentorSession.v1` via `persistDebounced()` (250ms debounce).
- **Large CSV handling**: `buildPersistedPayload()` strips raw CSV and row arrays when payload exceeds `MAX_CSV_BYTES_FOR_STORAGE` (4.5MB), sets `csvTooLargeToPersist: true`, keeps only `fields` and `stats`.
- **Session recovery**: `loadSession()` validates `schemaVersion: 1` before restoring.

## CSV processing pipeline (client-only)
1. **Upload**: User selects file  `parseCsvText(csvText)` uses PapaParse
2. **Stats**: `computeColumnStats(fields, rows)` generates per-column analytics (missing %, unique values, numeric ranges)
3. **Cleaning**: User selects options  `applyCleaning(parsed, plan)` transforms data (missing value handling, outlier removal, duplicates, whitespace, capitalization, label encoding)
4. **Download**: Cleaned CSV generated in-browser, no server involved

## Gemini integration patterns
- **Frontend calls**: `callGemini()` and `callGeminiWithSystemPrompt()` send to proxy with structure:
  ```json
  {
    "systemInstruction": {"parts": [{"text": "..."}]},
    "contents": [{"role": "user", "parts": [{"text": "..."}]}]
  }
  ```
- **Response shape**: Proxy returns `{ text, raw }`, UI reads `data.text`
- **System prompts**: 
  - `buildSystemPrompt()`: Stage-specific mentor guidance (changes per DSLC stage)
  - `buildProposalSynthesisSystemPrompt()`: Final proposal generation
- **CSV summarization**: `summariseCsvForPrompt()` limits fields/numeric columns to stay under token limits

## Stage workflow (linear progression)
- **Stage order**: `STAGES` array defines `define  collect  clean  train  deploy`
- **Gating logic**: 
  - `canAdvance()`: Checks if current stage requirements are met
  - `markCompletedIfReady()`: Updates `state.completed[key]` 
  - Users cannot jump ahead, only navigate backwards
- **Rendering**: Each stage has `render*Stage(container)` function (e.g., `renderDefineStage()`, `renderCollectStage()`)
- **Critical**: When modifying `STAGES`, update `canAdvance()`, `markCompletedIfReady()`, and all `render*Stage()` functions

## Stage-specific completion criteria
- **Define**: Requires both `problemStatement` and `successMeasure` filled
- **Collect**: Requires CSV uploaded and parsed (`validation.hasUpload`)
- **Clean**: Requires all cleaning choices made and cleaned CSV downloaded (`downloaded: true`)
- **Train**: Requires `problemType` selected
- **Deploy**: Requires all deployment fields filled (`usageContext`, `alertPlan`, `riskPlan`, `improvementPlan`)

## Development & deployment
- **Local static**: Open `public/index.html` directly or serve `public/` folder
- **Vercel serverless**: Use `vercel dev`, set `GEMINI_API_KEY` env var
- **Firebase**: 
  1. `cd functions && npm install` (required before deploy)
  2. Set secret: `firebase functions:secrets:set GEMINI_API_KEY`
  3. Follow `FIREBASE_DEPLOY.md` for multi-site setup (avoid overwriting existing widgets)
- **No build step**: `vercel.json` sets `buildCommand: "echo ''No build needed''"`

## Critical synchronization points
- **Gemini model version**: Update `const model = ...` in BOTH `api/gemini.js` AND `functions/index.js`
- **CSP for embedding**: `vercel.json` sets `Content-Security-Policy` with `frame-ancestors` directive for LMS integration
- **Session schema**: If changing `DEFAULT_STATE` structure, increment `schemaVersion` to invalidate old sessions

## Common modification patterns
- **Mentor behavior**: Edit `buildSystemPrompt()` and `buildProposalSynthesisSystemPrompt()` in `public/index.html`
- **UI customization**: Modify CSS custom properties in `:root` section
- **Persistence limits**: Adjust `MAX_CSV_BYTES_FOR_STORAGE` constant
- **Stage progression**: Always update gating functions + render functions together

## Agent workflow conventions
- For multi-step or non-trivial changes, present a detailed plan using **#planReview** and wait for approval before editing.
- If the plan is rejected, incorporate feedback and resubmit with **#planReview**.
- For step-by-step guides/walkthroughs, use **#walkthroughReview**.
- Before finishing any task, use **#askUser** to confirm the result matches what the user asked for.
