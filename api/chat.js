import process from "node:process";
import { buildMessages, getFallbackReply, isQuotaError } from "../server/chatSupport.js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ error: "Method not allowed" });
    }

    const OPENAI_KEY = process.env.OPENAI_API_KEY;

    try {
        const { message, history } = req.body || {};

        if (!message) {
            return res.status(400).json({ error: "message required" });
        }

        if (!OPENAI_KEY) {
            return res.json({ reply: getFallbackReply(message), mode: "local" });
        }

        const messages = buildMessages(message, history);

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

            if (isQuotaError(text)) {
                return res.json({ reply: getFallbackReply(message), mode: "local", note: "OpenAI quota unavailable" });
            }

            return res.json({ reply: getFallbackReply(message), mode: "local", note: "OpenAI unavailable" });
        }

        const data = await response.json();
        const reply = data?.choices?.[0]?.message?.content ?? getFallbackReply(message);

        return res.json({ reply, mode: "openai" });
    } catch (err) {
        console.error(err);
        return res.json({ reply: getFallbackReply(req.body?.message), mode: "local", note: err.message || String(err) });
    }
}
