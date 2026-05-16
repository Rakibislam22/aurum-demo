import { toast } from "react-toastify";

const USERS_STORAGE_KEY = "auth:users";
const CURRENT_USER_KEY = "auth:currentUser";
const AUTH_EVENT_NAME = "auth:changed";

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
    window.dispatchEvent(new Event(AUTH_EVENT_NAME));
}

export function getStoredUsers() {
    const users = readJson(USERS_STORAGE_KEY, []);
    return Array.isArray(users) ? users : [];
}

export function getCurrentUser() {
    const user = readJson(CURRENT_USER_KEY, null);
    return user && typeof user === "object" ? user : null;
}

export function subscribeAuth(listener) {
    if (typeof window === "undefined") {
        return () => { };
    }

    const handler = () => listener();
    window.addEventListener(AUTH_EVENT_NAME, handler);
    window.addEventListener("storage", handler);

    return () => {
        window.removeEventListener(AUTH_EVENT_NAME, handler);
        window.removeEventListener("storage", handler);
    };
}

export function createAccount({ name, email, password }) {
    const trimmedName = String(name || "").trim();
    const trimmedEmail = String(email || "").trim().toLowerCase();
    const trimmedPassword = String(password || "").trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
        throw new Error("Please fill in all fields.");
    }

    const users = getStoredUsers();
    const existingUser = users.find((user) => user.email.toLowerCase() === trimmedEmail);

    if (existingUser) {
        throw new Error("An account with this email already exists.");
    }

    const user = {
        id: crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
        createdAt: new Date().toISOString(),
    };

    users.push(user);
    writeJson(USERS_STORAGE_KEY, users);
    setCurrentUser(user);
    toast.success(`Welcome, ${trimmedName}. Account created successfully.`, {
        toastId: `auth-create-${trimmedEmail}`,
    });
    return user;
}

export function login({ email, password }) {
    const trimmedEmail = String(email || "").trim().toLowerCase();
    const trimmedPassword = String(password || "").trim();

    if (!trimmedEmail || !trimmedPassword) {
        throw new Error("Please enter your email and password.");
    }

    const users = getStoredUsers();
    const user = users.find((entry) => entry.email.toLowerCase() === trimmedEmail && entry.password === trimmedPassword);

    if (!user) {
        throw new Error("Invalid email or password.");
    }

    setCurrentUser(user);
    toast.success(`Logged in as ${user.name}`, {
        toastId: `auth-login-${trimmedEmail}`,
    });
    return user;
}

export function setCurrentUser(user) {
    if (!user) {
        clearCurrentUser();
        return;
    }

    const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt || new Date().toISOString(),
    };

    writeJson(CURRENT_USER_KEY, safeUser);
}

export function clearCurrentUser() {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.removeItem(CURRENT_USER_KEY);
    window.dispatchEvent(new Event(AUTH_EVENT_NAME));
}

export function logout() {
    clearCurrentUser();
    toast.info("Logged out successfully", {
        toastId: "auth-logout",
    });
}
