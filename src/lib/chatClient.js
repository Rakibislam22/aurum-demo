export async function askChat(message, history = []) {
    const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
    });

    if (!resp.ok) {
        const text = await resp.text();
        throw new Error(text || "Chat request failed");
    }

    const data = await resp.json();
    return data.reply;
}
