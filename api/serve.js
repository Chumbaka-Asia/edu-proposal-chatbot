import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    // Read the HTML file
    const htmlPath = path.join(process.cwd(), 'dslc_proposal_vercel.html');
    let html = fs.readFileSync(htmlPath, 'utf-8');

    // Serve HTML as-is (do not inject sensitive API keys into client-side code)
    // The client should call the server-side proxy at /api/gemini for all Gemini requests.

    // Set response headers
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).json({ error: 'Failed to serve page', details: error.message });
  }
}
