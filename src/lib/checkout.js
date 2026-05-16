const DEFAULT_ADDRESS_KEY_PREFIX = "checkout:addresses:";
const DEFAULT_ORDER_KEY_PREFIX = "checkout:orders:";

function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
}

function getStorageKey(prefix, email) {
    return `${prefix}${normalizeEmail(email)}`;
}

function readJson(key, fallback) {
    if (typeof window === "undefined") {
        return fallback;
    }

    try {
        const raw = window.localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

function writeJson(key, value) {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.setItem(key, JSON.stringify(value));
}

export function getSavedAddresses(email) {
    const addresses = readJson(getStorageKey(DEFAULT_ADDRESS_KEY_PREFIX, email), []);
    return Array.isArray(addresses) ? addresses : [];
}

export function saveAddress(email, address) {
    const key = getStorageKey(DEFAULT_ADDRESS_KEY_PREFIX, email);
    const existing = getSavedAddresses(email);
    const nextAddress = {
        id: address.id || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        name: String(address.name || "").trim(),
        email: String(address.email || email || "").trim(),
        phone: String(address.phone || "").trim(),
        line1: String(address.line1 || "").trim(),
        line2: String(address.line2 || "").trim(),
        city: String(address.city || "").trim(),
        state: String(address.state || "").trim(),
        postalCode: String(address.postalCode || "").trim(),
        country: String(address.country || "").trim(),
        createdAt: new Date().toISOString(),
    };

    const duplicateIndex = existing.findIndex((item) =>
        item.line1 === nextAddress.line1 &&
        item.city === nextAddress.city &&
        item.postalCode === nextAddress.postalCode &&
        item.country === nextAddress.country,
    );

    let nextAddresses;
    if (duplicateIndex >= 0) {
        nextAddresses = existing.map((item, index) => (index === duplicateIndex ? { ...item, ...nextAddress, id: item.id } : item));
    } else {
        nextAddresses = [nextAddress, ...existing];
    }

    writeJson(key, nextAddresses);
    return nextAddresses;
}

export function getSavedOrders(email) {
    const orders = readJson(getStorageKey(DEFAULT_ORDER_KEY_PREFIX, email), []);
    return Array.isArray(orders) ? orders : [];
}

export function saveOrder(email, order) {
    const key = getStorageKey(DEFAULT_ORDER_KEY_PREFIX, email);
    const existing = getSavedOrders(email);
    const nextOrder = {
        id: order.id || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        createdAt: new Date().toISOString(),
        ...order,
    };

    writeJson(key, [nextOrder, ...existing]);
    return nextOrder;
}
