import express from "express";
import cors from "cors";
import process from "node:process";
import { buildMessages, getFallbackReply, isQuotaError } from "./chatSupport.js";

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_KEY) {
    console.warn("OPENAI_API_KEY not set — falling back to local chat answers.");
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

        if (!response.ok) {
            const text = await response.text();
            console.error("OpenAI error:", text);
            if (isQuotaError(text)) {
                return res.json({ reply: getFallbackReply(message), mode: "local", note: "OpenAI quota unavailable" });
            }

            return res.json({ reply: getFallbackReply(message), mode: "local", note: "OpenAI unavailable" });
        }

        const data = await response.json();
        const reply = data?.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";

        return res.json({ reply });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message || String(err) });
    }
});

const port = process.env.PORT || 5173;
app.listen(port, () => console.log(`Chat proxy running on http://localhost:${port}/api/chat`));
