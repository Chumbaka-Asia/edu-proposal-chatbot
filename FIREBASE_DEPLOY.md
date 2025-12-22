# Firebase Deployment Guide

This guide will help you deploy the DSLC Proposal Chatbot to your existing Firebase project (`RnD Experiment`).

## Prerequisites

1.  **Node.js**: Ensure you have Node.js installed (v20 or v22 recommended).
2.  **Firebase CLI**: If you haven't installed the Firebase command line tool, run:
    ```bash
    npm install -g firebase-tools
    ```
3.  **Install Function Dependencies**:
    **Crucial Step:** You must install the dependencies for the serverless function before deploying.
    ```bash
    cd functions
    npm install
    cd ..
    ```

## Step 1: Login and Connect

1.  Log in to Firebase:
    ```bash
    firebase login
    ```
2.  Connect this folder to your existing project (`rnd-experiment-473900`):
    ```bash
    firebase use --add
    ```
    - Select **RnD Experiment** (rnd-experiment-473900) from the list.
    - When asked for an alias, you can name it `default`.

## Step 2: Hosting Configuration (Important!)

**⚠️ Warning:** Since you already have widgets published at `rnd-experiment-473900.web.app`, running a standard deploy **will overwrite** that website with this chatbot.

To keep both running side-by-side, you should create a new **Site** in the Firebase Console.

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Open the **RnD Experiment** project.
3.  Go to **Hosting** in the sidebar.
4.  Scroll down to the "Advanced" section (or look for "Add another site") and click **Add another site**.
5.  Name it something like `dslc-chatbot-rnd`.
    - This will give you a new URL: `https://dslc-chatbot-rnd.web.app`.
6.  Now, configure this project to deploy to that specific site:
    ```bash
    firebase target:apply hosting chatbot dslc-chatbot-rnd
    ```
7.  Update `firebase.json` to use this target.

### Update `firebase.json`
Modify your `firebase.json` to look like this (replace the `hosting` section):

```json
{
  "hosting": {
    "target": "chatbot",
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "/api/gemini",
        "function": "geminiProxy"
      }
    ]
  },
  "functions": {
    "source": "functions"
  }
}
```

## Step 3: Set the API Key Secret

This project uses Google Cloud Secret Manager to securely store your Gemini API Key.

1.  Run the following command to set the secret:
    ```bash
    firebase functions:secrets:set GEMINI_API_KEY
    ```
2.  When prompted, paste your **Gemini API Key** (starts with `AIza...`).
3.  If asked to enable the Secret Manager API, type `y` and press Enter.

## Step 4: Deploy

Now you can deploy both the website and the serverless function.

1.  Run the deploy command:
    ```bash
    firebase deploy
    ```

    **Note:** During deployment, you might be asked:
    > "How many days do you want to keep container images before they're deleted?"
    
    You can safely enter **30** (or press Enter to accept the default). This just cleans up old build files to save storage space and does not affect the live chatbot.

This command will:
- Upload the `public` folder to your new site (`dslc-chatbot-rnd.web.app`).
- Deploy the `geminiProxy` function to Google Cloud.

## Step 5: Verify

1.  Visit your new URL (e.g., `https://dslc-chatbot-rnd.web.app`).
2.  Try sending a message in the chat.
3.  If it replies, the function and hosting are working correctly!

## How to Publish Future Changes

When you make changes to the code (e.g., editing `public/index.html` or `functions/index.js`), follow these steps to update the live site:

1.  **Make your edits** in VS Code.
2.  **Deploy** the changes:
    ```bash
    firebase deploy
    ```
    *Tip: If you only changed the frontend (HTML), you can run `firebase deploy --only hosting` to be faster.*

---

### Troubleshooting

-   **Error: Runtime Node.js 18 was decommissioned**:
    Open `functions/package.json` and change `"engines": { "node": "18" }` to `"node": "22"`.

-   **Error: Cannot find module 'firebase-functions'**:
    You forgot to install dependencies. Run:
    ```bash
    cd functions
    npm install
    cd ..
    ```

-   **Error: HTTP Error: 403, the client does not have access**: Make sure you are logged in with the account that owns the Firebase project.

-   **Gemini API Error**: If the chat replies with an error, check the logs:
    ```bash
    firebase functions:log
    ```
