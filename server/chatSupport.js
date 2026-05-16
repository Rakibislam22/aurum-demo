const FALLBACK_RULES = [
    {
        terms: ["shipping", "delivery", "ship"],
        reply: "Shipping is handled during checkout. If you need help choosing an address or checking your order, open Cart and continue to Checkout.",
    },
    {
        terms: ["return", "refund", "exchange"],
        reply: "Returns and refunds are handled by support after your order is placed. Share your order details and I can guide you to My Orders.",
    },
    {
        terms: ["login", "sign in", "register", "account"],
        reply: "Use the account icon in the top-right to log in or register. Once signed in, you can view Cart, Checkout, and My Orders.",
    },
    {
        terms: ["cart", "checkout", "buy", "order"],
        reply: "Add items to Cart, then go to Checkout to place the order. If you're signed in, your addresses and order history are saved for that account.",
    },
    {
        terms: ["search", "find", "collection", "product"],
        reply: "Use the search icon or the Collections page to find products. You can also filter by category from the homepage links.",
    },
];

export function buildMessages(message, history = []) {
    const systemPrompt = "You are Aurum e-commerce assistant. Help users with site navigation, product info, ordering, and support. Keep answers concise and friendly.";
    const messages = [{ role: "system", content: systemPrompt }];

    if (Array.isArray(history)) {
        for (const item of history) {
            if (item && typeof item.role === "string" && typeof item.content === "string") {
                messages.push(item);
            }
        }
    }

    messages.push({ role: "user", content: message });
    return messages;
}

export function getFallbackReply(message) {
    const normalized = String(message || "").toLowerCase();

    for (const rule of FALLBACK_RULES) {
        if (rule.terms.some((term) => normalized.includes(term))) {
            return rule.reply;
        }
    }

    return "I’m in limited support mode right now. I can still help with search, cart, checkout, login, and orders. Try asking something specific like 'How do I checkout?'";
}

export function isQuotaError(payloadText = "") {
    const text = String(payloadText).toLowerCase();
    return text.includes("insufficient_quota") || text.includes("quota") || text.includes("billing") || text.includes("rate limit");
}
