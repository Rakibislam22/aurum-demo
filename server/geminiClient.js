import process from 'node:process';

// Minimal Gemini (Generative Language) REST client using API key.
// Expects `GOOGLE_API_KEY` env var and will call the text-bison model.

export async function callGemini(messages) {
    const key = process.env.GOOGLE_API_KEY;
    if (!key) {
        return { ok: false, status: 401, text: 'GOOGLE_API_KEY not set' };
    }

    // Flatten messages into a single prompt (system + history + user)
    const promptText = messages.map((m) => `${m.role}: ${m.content}`).join('\n');

    const url = `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate?key=${encodeURIComponent(
        key
    )}`;

    try {
        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: { text: promptText },
                temperature: 0.2,
                maxOutputTokens: 300,
            }),
        });

        if (!resp.ok) {
            const text = await resp.text();
            return { ok: false, status: resp.status, text };
        }

        const data = await resp.json();

        // Response shape: { candidates: [{ output: '...' , content: '...' }, ...] }
        const reply = data?.candidates?.[0]?.content || data?.candidates?.[0]?.output || data?.output?.[0]?.content || '';

        return { ok: true, data: { reply } };
    } catch (err) {
        return { ok: false, status: 500, text: String(err) };
    }
}

export default { callGemini };
