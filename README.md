# DSLC Mentor Chatbot — Gemini Canvas

A tiny, single-file web app that guides students through the Data Science Lifecycle (Define → Collect → Clean → Train → Deploy) and uses Google Gemini to act as a mentor and generate a one-page proposal.

**Short version:** open `public/index.html` or deploy to Vercel, set `GEMINI_API_KEY`, then use the chat interface to step through a project and generate a proposal.

---

## Features

- Guided linear workflow for students (age ~13–17) to create a one-page data science proposal
- Upload CSVs, inspect and apply dataset-specific cleaning, and download cleaned CSV
- In-browser state and persistence (localStorage) — small datasets are kept client-side
- Small serverless proxy (`/api/gemini`) that forwards requests to Google Gemini
- No build step (see `vercel.json`) — ready for static hosting

## How it works

- Frontend: `public/index.html` — a single-page app using Tailwind CSS, PapaParse and tiny helpers.
- Backend: `api/gemini.js` — a serverless function that forwards a POST body to Google Generative Language (`generateContent`) using `GEMINI_API_KEY`.
- Data flow: CSV handling and cleaning happens in the browser; only prompts and messages are sent to Gemini via the serverless proxy.

> [!note]
> The app intentionally keeps CSVs in the browser. Large datasets are not persisted to localStorage — see `MAX_CSV_BYTES_FOR_STORAGE` in `public/index.html` (≈ 4.5 MB).

## Quickstart (local)

1. Install the Vercel CLI (recommended to run serverless functions locally):

```bash
npm i -g vercel
# or
npx vercel dev
```

2. Set your Gemini API key locally (example for PowerShell):

```powershell
$Env:GEMINI_API_KEY = "YOUR_KEY"
npx vercel dev
```

3. Open `http://localhost:3000` (or the URL shown by `vercel dev`) and interact with the app.

### Quick test for the API proxy

You can test the serverless function directly with curl (after `vercel dev` is running):

```bash
curl -X POST http://localhost:3000/api/gemini \
  -H "Content-Type: application/json" \
  -d '{"systemInstruction": {"parts":[{"text":"Hello"}]}, "contents": [{"role":"user","parts":[{"text":"Say hi"}]}]}'
```

The function forwards the request body to Gemini and returns the response JSON.

---

## Environment variables

- **GEMINI_API_KEY** — Required. Your Google Generative Language API key.

> [!warning]
> Keep `GEMINI_API_KEY` secret. Do not commit it to version control; set it in your deployment provider (Vercel dashboard, etc.). Billing may apply when calling the API.

---

## Deployment

- This repo is ready for Vercel (see `vercel.json`). There is **no build step** — the single HTML file is served statically and the serverless function is deployed with the project.

Steps:

1. Create a Vercel project and link the repo.
2. Add `GEMINI_API_KEY` in the project Environment Variables (Production and Preview as needed).
3. Deploy.

---

## Files of interest

- `public/index.html` — the entire frontend UI and app logic (single-file HTML).
- `api/gemini.js` — serverless function proxy to Google Gemini.
- `vercel.json` — indicates no build step. (Updated to allow framing from `https://lms.chumbaka.asia` for LMS course pages under `/courses/200*`.)
- `package.json` — basic project metadata (Node 24.x).

---

### Embedding in an LMS 🔧

The site is configured to allow being embedded in the LMS at `https://lms.chumbaka.asia` (course pages matching `/courses/200*`) via a Content-Security-Policy header in `vercel.json`:

```
Content-Security-Policy: frame-ancestors 'self' https://lms.chumbaka.asia;
```

> **Note:** CSP's `frame-ancestors` accepts origins/hosts only — it cannot restrict by path. If you need path-level restrictions (e.g., allow only `/courses/200*`), implement a server-side check (for example, inspect the `Referer` header and conditionally include the CSP header) or host a proxy/redirect on the LMS domain.


## Notes & tips

- The app enforces a linear workflow (Define → Collect → Clean → Train → Deploy). Use the **Loop back** button if you need to fix earlier stages.
- The mentor's tone and behaviour are defined in the system prompt inside `public/index.html` (look for `buildSystemPrompt`). You can adapt the prompt to change guidance style or supported device/age group.
- If you need a different Gemini model, edit the `model` constant in `api/gemini.js`.

---

If you'd like, I can also add a small development checklist, CI presets, or a lightweight demo deployment guide for Vercel. Let me know which you'd prefer.