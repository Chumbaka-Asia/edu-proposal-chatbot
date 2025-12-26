# Copilot instructions (DSLC Mentor Chatbot)

## What this repo is
- Single-file frontend: `public/index.html` (Tailwind + Lucide + PapaParse via versioned CDNs). **No build step**.
- Same-origin Gemini proxy: `POST /api/gemini`
  - Vercel serverless: `api/gemini.js` (reads `process.env.GEMINI_API_KEY`)
  - Firebase Hosting rewrite → Function: `firebase.json` routes `/api/gemini` to `functions/index.js` (`geminiProxy`, Secret Manager `GEMINI_API_KEY`).
- Proxy response contract: `{ text, raw }` where `text` is extracted from `candidates[0].content.parts[0].text`.

## Frontend conventions (in `public/index.html`)
- UI theming uses CSS custom properties in `:root` (fonts, colours, radii) — prefer changing tokens there.
- State: `DEFAULT_STATE` → `state`; persisted to localStorage key `dslcMentorSession.v1` via `persistDebounced()` (250ms).
- Large CSV safeguard: `buildPersistedPayload()` strips `collect.csvText` and row arrays when payload exceeds `MAX_CSV_BYTES_FOR_STORAGE` (~4.5MB) and sets `collect.csvTooLargeToPersist=true`.
- Gemini request shape (see `callGemini()` / `callGeminiWithSystemPrompt()`):
  - `systemInstruction.parts[].text`
  - `contents[]` with `{ role: 'user'|'model', parts:[{text}] }`
- Mentor tone/format rules live in `buildSystemPrompt()` and `buildProposalSynthesisSystemPrompt()` (e.g., “no emojis”, short answers).
- Stage system is intentionally linear:
  - Stage list in `STAGES`.
  - Behaviour registry in `App.Stages.registry` (prefer editing `get*StageView()` + `canAdvance()` there).
  - Current gating rules: Define (problemStatement + successMeasure), Collect (any plan field), Clean (cleaned && downloaded), Train (problemType), Deploy (proposal.text).

## Footguns / sync points
- If you change the Gemini model string, update it in **both** `api/gemini.js` and `functions/index.js`.
- `vercel.json` sets CSP `frame-ancestors` for LMS embedding—treat changes as security-sensitive.
- Keep CDN URLs version-pinned (matches current pattern in `public/index.html`).

## Developer workflows (no test suite in repo)
- Local static: open `public/index.html` directly (or serve the `public/` folder).
- Firebase deploy steps + multi-site warning: see `FIREBASE_DEPLOY.md`.
- Firebase Functions scripts live in `functions/package.json` (e.g., `serve`, `deploy`, `logs`).

## Agent workflow conventions
- When the task requires multiple steps or non-trivial changes, present a detailed plan using `plan_review` (also referred to as `#planReview`) and wait for approval before executing.
- If the plan is rejected, incorporate the comments and submit an updated plan with `plan_review`.
- When the user asks for a step-by-step guide or walkthrough, present it using `walkthrough_review`.
- Always use `ask_user` before completing any task to confirm the result matches what the user asked for.

## User-facing content rules
- For user-facing content, use `#file:writing.instructions.md`.
