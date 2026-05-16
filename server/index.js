import express from "express";
import cors from "cors";
import process from "node:process";
import { buildMessages, getFallbackReply, isQuotaError } from "./chatSupport.js";
import { callGemini } from "./geminiClient.js";

import { config as loadEnv } from "dotenv";

// Load local .env.local in development if present.
loadEnv({ path: new URL("../.env.local", import.meta.url) });

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_KEY) {
    console.warn("OPENAI_API_KEY not set — falling back to local chat answers.");
}

console.log('LLM_PROVIDER=', (process.env.LLM_PROVIDER || 'openai'));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function callOpenAI(messages) {
    const maxRetries = 2;
    let attempt = 0;

    while (true) {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages,
                max_tokens: 300,
                temperature: 0.2,
            }),
        });

        if (response.ok) {
            return { ok: true, data: await response.json() };
        }

        const text = await response.text();
        const status = response.status;

        // If rate-limited, respect Retry-After header or exponential backoff and retry
        if (status === 429 && attempt < maxRetries) {
            attempt += 1;
            const ra = response.headers.get("retry-after");
            const wait = ra ? parseInt(ra, 10) * 1000 : Math.pow(2, attempt) * 1000;
            console.warn(`OpenAI 429 received — retrying after ${wait}ms (attempt ${attempt})`);
            await sleep(wait);
            continue;
        }

        return { ok: false, status, text };
    }
}

app.post("/api/chat", async (req, res) => {
    try {
        const { message, history } = req.body || {};

        if (!message) {
            return res.status(400).json({ error: "message required" });
        }

        const messages = buildMessages(message, history);

        if (!OPENAI_KEY) {
            return res.json({ reply: getFallbackReply(message), mode: "local" });
        }

        // Choose provider: google (Gemini) or openai (default)
        const provider = (process.env.LLM_PROVIDER || 'openai').toLowerCase();
        console.log('Request provider:', provider);

        if (provider === 'google') {
            const gResult = await callGemini(messages);
            if (!gResult.ok) {
                const { status, text } = gResult;
                console.error('Gemini request failed:', status, text);
                return res.json({ reply: getFallbackReply(message), mode: 'local', note: 'Gemini unavailable' });
            }

            const reply = gResult.data?.reply ?? "Sorry, I couldn't generate a response.";
            return res.json({ reply });
        }

        const result = await callOpenAI(messages);

        if (!result.ok) {
            const { status, text } = result;
            console.error("OpenAI request failed:", status, text);

            if (isQuotaError(text) || status === 429) {
                return res.json({ reply: getFallbackReply(message), mode: "local", note: "OpenAI quota unavailable" });
            }

            return res.json({ reply: getFallbackReply(message), mode: "local", note: "OpenAI unavailable" });
        }

        const data = result.data;
        const reply = data?.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";

        return res.json({ reply });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message || String(err) });
    }
});

const port = process.env.PORT || 5173;
app.listen(port, () => console.log(`Chat proxy running on http://localhost:${port}/api/chat`));
