# DSLC Mentor Chatbot

A tiny, single-file web app that helps students (≈13–17) create a one-page Data Science Lifecycle proposal. The frontend is a single HTML file (`public/index.html`) and a small serverless proxy (`/api/gemini`) forwards prompts to Google Gemini.

**Quick:** open `public/index.html`, set `GEMINI_API_KEY` in your environment or Vercel, then use the chat UI to step through Define → Collect → Clean → Train → Deploy.

---

## Table of contents

- [Features](#features)
- [Deployment](#deployment)
- [Embedding in an LMS](#embedding-in-an-lms)
- [Files of interest](#files-of-interest)
- [Customization & tips](#customization--tips)

---

## Features

- Guided linear workflow for students to build a concise project proposal
- Upload, inspect, clean, and download CSVs entirely in-browser
- Local persistence (localStorage) for small datasets
- Serverless proxy (`/api/gemini`) that forwards chat prompts to Google Generative Language
- No build step — ready for static hosting

---

## Deployment

This repository is ready for Vercel. There is **no build step** — the single HTML file is served statically and the serverless function is deployed automatically.

Steps:

1. Create a Vercel project and link this repository.
2. Add `GEMINI_API_KEY` in Environment Variables for Production/Preview as needed.
3. Deploy.

---

## Embedding in an LMS

`vercel.json` sets a CSP to allow embedding from `https://lms.chumbaka.asia` (course pages like `/courses/200*`).

```
Content-Security-Policy: frame-ancestors 'self' https://lms.chumbaka.asia;
```

> [!note]
> `frame-ancestors` only accepts origins — path-level restrictions require server-side checks (for example inspect `Referer`).

Recommended iframe snippet (replace the URL):

```html
<iframe src="https://your-deployment.vercel.app" title="DSLC Mentor Chatbot" width="100%" height="1800" style="border:0; min-height:600px;" loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms" referrerpolicy="no-referrer" allow="clipboard-write"></iframe>
```

---

## Files of interest

- `public/index.html` — frontend UI and CSV handling
- `api/gemini.js` — serverless proxy to Google Generative Language
- `vercel.json` — static hosting + CSP settings
- `package.json` — metadata and scripts

---

## Customization & tips

- Change mentor tone/behaviour in `public/index.html` (`buildSystemPrompt`).
- To use a different Gemini model, edit the `model` constant in `api/gemini.js`.
- The app enforces a linear workflow. Use the **Loop back** button to revisit earlier stages.