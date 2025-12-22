# DSLC Mentor Chatbot

A compact, single-file web app that helps students (≈13–17) create a one-page Data Science Lifecycle (DSLC) proposal. The app guides learners through five focused stages — **Define → Collect → Clean → Train → Deploy** — and generates a professional one-page proposal using Google Gemini.

---

## Quick start

1. Clone the repo and open `public/index.html` in a browser or deploy to static hosting.
2. Provide a Gemini API key via the `GEMINI_API_KEY` environment variable (Vercel, Firebase Secret Manager, or local env).
3. Use the chat UI to step through the stages and generate a one-page proposal.

> **Tip:** There is no build step — `public/index.html` is fully standalone.

---

## Features

- Linear, educational workflow designed for classroom use (Define → Collect → Clean → Train → Deploy).
- Upload, preview, clean, and download CSV files entirely in-browser (no server-side CSV processing).
- Local session persistence (localStorage) for small CSVs to preserve progress.
- Serverless Gemini proxy endpoints: `api/gemini.js` (Vercel) and `functions/index.js` (Firebase) for forwarding prompts to Google Generative Language.
- Lightweight and easy to embed in an LMS via iframe (CSP configured in `vercel.json`).

---

## Deployment

Supported environments:

- **Vercel (recommended):** add the `GEMINI_API_KEY` environment variable and deploy — no build step required.
- **Firebase Functions:** `functions/index.js` is provided and uses Secret Manager for `GEMINI_API_KEY`.

Minimal steps for Vercel:

1. Create a Vercel project connected to this repository.
2. Add `GEMINI_API_KEY` to your project Environment Variables.
3. Deploy (the static site and serverless function will be published automatically).

---

## Embedding in an LMS

`vercel.json` sets a conservative CSP allowing embedding from authorised LMS domains. Use an iframe similar to:

```html
<iframe src="https://your-deployment.vercel.app" title="DSLC Mentor Chatbot" width="100%" height="1200" style="border:0; min-height:600px;" loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms" referrerpolicy="no-referrer" allow="clipboard-write"></iframe>
```

> **Note:** CSP `frame-ancestors` only accepts origins. Path-level access control requires extra server-side checks (for example, validating `Referer`).

---

## Files of interest

- `public/index.html` — single-file frontend (UI, CSV handling, prompts)
- `api/gemini.js` — Vercel serverless proxy to Google Gemini
- `functions/index.js` — Firebase Functions proxy example (uses Secret Manager)
- `vercel.json` — hosting configuration and CSP settings
- `package.json` — metadata and scripts

---

## Customization

- Tweak mentor prompts and behaviour in `public/index.html` (look for `buildSystemPrompt`).
- Change the Gemini model by editing the `model` constant in either `api/gemini.js` or `functions/index.js`.
- Adjust local persistence limits via `MAX_CSV_BYTES_FOR_STORAGE` in `public/index.html`.

---

## Security & privacy

- The app stores small session payloads in `localStorage` — avoid uploading sensitive data.
- The provided serverless proxies simply forward requests to Google — ensure `GEMINI_API_KEY` is stored securely (Vercel env vars or Firebase Secret Manager).

