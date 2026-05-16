import { useEffect, useRef, useState } from "react";
import { FiCpu, FiMessageCircle, FiSend, FiX } from "react-icons/fi";
import { askChat } from "../lib/chatClient";

const STORAGE_KEY = "aurum:chat:history";
const WELCOME_KEY = "aurum:chat:welcome-seen";
const AUTO_OPEN_KEY = "aurum:chat:auto-open-seen";

const WELCOME_MESSAGE = {
    role: "assistant",
    content: "Hi, I’m Aurum AI. I can help you find products, check cart and checkout steps, or answer order and account questions.",
};

function loadHistory() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        const welcomeSeen = localStorage.getItem(WELCOME_KEY) === "1";

        if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
        }

        if (!welcomeSeen) {
            localStorage.setItem(WELCOME_KEY, "1");
            return [WELCOME_MESSAGE];
        }

        return [];
    } catch {
        return [];
    }
}

function saveHistory(h) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(h || []));
    } catch {
        // ignore
    }
}

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState(() => loadHistory());
    const listRef = useRef(null);

    useEffect(() => saveHistory(messages), [messages]);

    useEffect(() => {
        if (typeof window === "undefined") {
            return undefined;
        }

        const autoOpenSeen = window.localStorage.getItem(AUTO_OPEN_KEY) === "1";

        if (autoOpenSeen) {
            return undefined;
        }

        const timeoutId = window.setTimeout(() => {
            window.localStorage.setItem(AUTO_OPEN_KEY, "1");
            setOpen(true);
        }, 4000);

        return () => window.clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        if (open && listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [open, messages]);

    async function send() {
        const text = input.trim();
        if (!text) return;

        const userMsg = { role: "user", content: text };
        setMessages((m) => [...m, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const reply = await askChat(text, messages.slice(-8));
            const botMsg = { role: "assistant", content: reply };
            setMessages((m) => [...m, botMsg]);
        } catch (err) {
            const errMsg = { role: "assistant", content: "Sorry, chat is unavailable right now." };
            setMessages((m) => [...m, errMsg]);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {open ? (
                <div className="chat-widget" role="dialog" aria-label="Support chat">
                    <div className="chat-header">
                        <div className="chat-title">
                            <span className="chat-title-badge">
                                <FiCpu size={13} />
                            </span>
                            <div>
                                <div>Aurum AI</div>
                                <div className="chat-title-sub">Always-on support</div>
                            </div>
                        </div>
                        <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">
                            <FiX />
                        </button>
                    </div>

                    <div ref={listRef} className="chat-list">
                        {messages.map((m, i) => (
                            <div key={i} className={`chat-message ${m.role === "user" ? "user" : "bot"}`}>
                                {m.content}
                            </div>
                        ))}
                    </div>

                    <div className="chat-input-row">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") send();
                            }}
                            placeholder="Ask about orders, products, shipping..."
                        />
                        <button onClick={send} disabled={loading} aria-label="Send">
                            <FiSend />
                        </button>
                    </div>
                </div>
            ) : (
                <button className="chat-fab" onClick={() => setOpen(true)} aria-label="Open chat">
                    <span className="chat-fab-ring" aria-hidden="true" />
                    <span className="chat-fab-icon">
                        <FiCpu size={18} />
                    </span>
                    <span className="chat-fab-bubble">
                        <FiMessageCircle size={10} />
                    </span>
                </button>
            )}
        </div>
    );
}
