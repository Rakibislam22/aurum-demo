import { useEffect, useMemo, useState } from "react";
import { FiArrowRight, FiMail, FiLock, FiUser, FiX } from "react-icons/fi";
import { createAccount, login } from "../lib/auth";

const MODES = {
    login: "login",
    register: "register",
};

const WELCOME_KEY = "aurum:auth-welcome-seen";

function initialFormState(mode) {
    return mode === MODES.register
        ? { name: "", email: "", password: "" }
        : { email: "demo@gmail.com", password: "1234" };
}

export default function AuthModal({ open, mode, onClose, onSuccess, switchMode }) {
    const [formValues, setFormValues] = useState(initialFormState(mode));
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);
    const [welcomeSeen] = useState(() => {
        if (typeof window === "undefined") {
            return true;
        }

        return window.localStorage.getItem(WELCOME_KEY) === "1";
    });

    useEffect(() => {
        function handleEscape(event) {
            if (event.key === "Escape") {
                onClose();
            }
        }

        if (!open) {
            return undefined;
        }

        const previousBodyOverflow = document.body.style.overflow;
        const previousHtmlOverflow = document.documentElement.style.overflow;
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        window.addEventListener("keydown", handleEscape);
        return () => {
            window.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = previousBodyOverflow;
            document.documentElement.style.overflow = previousHtmlOverflow;
        };
    }, [open, onClose]);

    useEffect(() => {
        if (!open) {
            return undefined;
        }

        if (!welcomeSeen) {
            window.localStorage.setItem(WELCOME_KEY, "1");
        }

        return undefined;
    }, [open, welcomeSeen]);

    const title = useMemo(() => {
        return mode === MODES.register ? "Create account" : "Login here";
    }, [mode]);

    if (!open) {
        return null;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setBusy(true);
        setError("");

        try {
            const result = mode === MODES.register
                ? createAccount(formValues)
                : login(formValues);

            onSuccess(result);
            onClose();
        } catch (submitError) {
            setError(submitError.message || "Something went wrong.");
        } finally {
            setBusy(false);
        }
    }

    return (
        <div
            className="fixed inset-0 z-[340] flex min-h-[100dvh] items-start justify-center overflow-y-auto bg-black/60 px-4 py-6 backdrop-blur-md sm:items-center"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="my-auto w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-[#121111] shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.34em] text-[#c9a96e]">Account</p>
                        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#f5f2ed]">{title}</h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#f5f2ed] transition-colors hover:border-[#c9a96e] hover:text-[#c9a96e]"
                        aria-label="Close authentication modal"
                    >
                        <FiX />
                    </button>
                </div>

                <div className="px-5 py-5">
                    {open && !welcomeSeen && (
                        <div className="mb-4 rounded-2xl border border-[#c9a96e]/20 bg-[#c9a96e]/10 px-4 py-3 text-sm leading-6 text-[#f5f2ed]">
                            Welcome to Aurum. Log in to save your cart, checkout details, and order history across visits.
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {mode === MODES.register && (
                            <label className="block">
                                <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-[#a39989]">Name</span>
                                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                                    <FiUser className="text-[#c9a96e]" />
                                    <input
                                        value={formValues.name || ""}
                                        onChange={(event) => setFormValues((current) => ({ ...current, name: event.target.value }))}
                                        className="w-full bg-transparent text-[#f5f2ed] outline-none placeholder:text-[#6f665b]"
                                        placeholder="Your name"
                                        autoComplete="name"
                                    />
                                </div>
                            </label>
                        )}

                        <label className="block">
                            <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-[#a39989]">Email</span>
                            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                                <FiMail className="text-[#c9a96e]" />
                                <input
                                    value={formValues.email}
                                    onChange={(event) => setFormValues((current) => ({ ...current, email: event.target.value }))}
                                    className="w-full bg-transparent text-[#f5f2ed] outline-none placeholder:text-[#6f665b]"
                                    placeholder="demo@gmail.com"
                                    autoComplete="email"
                                />
                            </div>
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-[#a39989]">Password</span>
                            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                                <FiLock className="text-[#c9a96e]" />
                                <input
                                    type="password"
                                    value={formValues.password}
                                    onChange={(event) => setFormValues((current) => ({ ...current, password: event.target.value }))}
                                    className="w-full bg-transparent text-[#f5f2ed] outline-none placeholder:text-[#6f665b]"
                                    placeholder="Password"
                                    autoComplete={mode === MODES.register ? "new-password" : "current-password"}
                                />
                            </div>
                        </label>

                        {error && <p className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p>}

                        <button
                            type="submit"
                            disabled={busy}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#c9a96e] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#0e0e0e] transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {busy ? "Please wait" : mode === MODES.register ? "Create account" : "Login here"}
                            <FiArrowRight />
                        </button>
                    </form>

                    <div className="mt-5 border-t border-white/10 pt-4 text-sm text-[#d8d1c7]">
                        {mode === MODES.register ? (
                            <button
                                type="button"
                                onClick={() => switchMode(MODES.login)}
                                className="text-[#c9a96e] transition-colors hover:text-[#e8c99a]"
                            >
                                Already have an account? Login here
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => switchMode(MODES.register)}
                                className="text-[#c9a96e] transition-colors hover:text-[#e8c99a]"
                            >
                                Need an account? Create account
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
