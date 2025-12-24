# Copilot instructions (DSLC Mentor Chatbot)

## Repo shape (no build step)
- Frontend is a single file: `public/index.html` (UI + state + CSV parsing/cleaning + prompt builders). Uses CDN scripts (Tailwind, Lucide, PapaParse) — no bundler.
- Backend is a thin same-origin proxy at `POST /api/gemini` implemented in two places:
  - Vercel: `api/gemini.js` (reads `process.env.GEMINI_API_KEY`).
  - Firebase: `functions/index.js` (`defineSecret("GEMINI_API_KEY")`) + `firebase.json` rewrite to `geminiProxy`.

## Key data flows to keep consistent
- Session state is the `state` object seeded from `DEFAULT_STATE`; it persists to localStorage key `dslcMentorSession.v1` via `persistDebounced()`.
- Large CSV handling: `buildPersistedPayload()` strips raw CSV / row arrays when the payload would exceed `MAX_CSV_BYTES_FOR_STORAGE`.
- CSV is client-only: `parseCsvText()` → `computeColumnStats()` → `applyCleaning()` → download cleaned CSV.
- Gemini calls are made from the frontend (`callGemini()` / `callGeminiWithSystemPrompt()`) using a body shaped like:
  `{"systemInstruction":{"parts":[{"text":"..."}]},"contents":[{"role":"user","parts":[{"text":"..."}]}]}`
- The proxy returns `{ text, raw }` and the UI reads `data.text`.
- Proposal generation: tries Gemini (`buildProposalSynthesisSystemPrompt()`), then falls back to deterministic `buildProposalText()`.

## Stage workflow conventions
- Stage order is `STAGES` and is enforced: users can’t jump forward; gating is in `canAdvance()` and `markCompletedIfReady()`.
- If you change `STAGES`, also update: `canAdvance()`, `markCompletedIfReady()`, and the relevant `render*Stage()` functions.

## Local dev & deployment touchpoints
- Static: open `public/index.html` or serve the `public/` folder with any static server.
- Vercel local serverless: use Vercel dev tooling; requires `GEMINI_API_KEY` in env.
- Firebase: install deps in `functions/`, set the secret, and deploy/emulate per `FIREBASE_DEPLOY.md`.

## Common edits (keep Vercel/Firebase in sync)
- Prompting/mentor behavior: `buildSystemPrompt()` and `buildProposalSynthesisSystemPrompt()` in `public/index.html`.
- Gemini model/version: update `const model = ...` in BOTH `api/gemini.js` and `functions/index.js`.
- Embedding/CSP: `vercel.json` sets `Content-Security-Policy` (`frame-ancestors ...`).

## Agent workflow conventions
- For multi-step or non-trivial changes, present a detailed plan using **#planReview** and wait for approval before editing.
- If the plan is rejected, incorporate feedback and resubmit with **#planReview**.
- For step-by-step guides/walkthroughs, use **#walkthroughReview**.
- Before finishing any task, use **#askUser** to confirm the result matches what the user asked for.

