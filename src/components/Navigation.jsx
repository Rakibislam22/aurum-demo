import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FiMenu, FiSearch, FiShoppingBag, FiStar, FiUser, FiX } from "react-icons/fi";
import AuthModal from "./AuthModal";
import { getCurrentUser, logout, subscribeAuth } from "../lib/auth";
import { getCartCount, subscribeCart } from "../lib/cart";
import { siteLinks } from "../lib/siteTheme";

function Navigation() {
    const navigate = useNavigate();
    const searchPanelRef = useRef(null);
    const searchButtonRef = useRef(null);
    const accountButtonRef = useRef(null);
    const accountMenuRef = useRef(null);
    const [scrolled, setScrolled] = useState(false);
    const [cartCount, setCartCount] = useState(() => getCartCount());
    const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState("login");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState("");

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [mobileMenuOpen]);

    useEffect(() => subscribeCart(() => setCartCount(getCartCount())), []);

    useEffect(() => subscribeAuth(() => setCurrentUser(getCurrentUser())), []);

    useEffect(() => {
        function handlePointerDown(event) {
            const clickedSearchButton = searchButtonRef.current?.contains(event.target);
            const clickedSearchPanel = searchPanelRef.current?.contains(event.target);
            const clickedAccountButton = accountButtonRef.current?.contains(event.target);
            const clickedAccountPanel = accountMenuRef.current?.contains(event.target);

            if (searchOpen && !clickedSearchButton && !clickedSearchPanel) {
                setSearchOpen(false);
            }

            if (accountMenuOpen && !clickedAccountButton && !clickedAccountPanel) {
                setAccountMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handlePointerDown);

        return () => document.removeEventListener("mousedown", handlePointerDown);
    }, [accountMenuOpen, searchOpen]);

    useEffect(() => {
        const query = searchQuery.trim();

        if (!searchOpen) {
            return undefined;
        }

        if (!query) {
            return undefined;
        }

        const controller = new AbortController();
        const timeoutId = window.setTimeout(async () => {
            setSearchLoading(true);
            setSearchError("");

            try {
                const response = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`, {
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error(`Search failed with status ${response.status}`);
                }

                const data = await response.json();
                setSearchResults((data.products || []).slice(0, 5));
            } catch (fetchError) {
                if (fetchError.name !== "AbortError") {
                    setSearchError("Search failed. Try again.");
                    setSearchResults([]);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setSearchLoading(false);
                }
            }
        }, 220);

        return () => {
            controller.abort();
            window.clearTimeout(timeoutId);
        };
    }, [searchOpen, searchQuery]);

    const navButtonStyle = {
        background: "none",
        border: "none",
        color: "rgba(245,242,237,0.7)",
        width: 40,
        height: 40,
        borderRadius: "2px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "color 0.2s, background 0.2s",
    };

    const primaryLinks = siteLinks.map((link) => (link.label === "About" && currentUser ? { label: "My Orders", to: "/my-orders" } : link));

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: "0 20px",
                transition: "all 0.4s ease",
                ...(scrolled
                    ? {
                        background: "rgba(14,14,14,0.82)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        borderBottom: "1px solid rgba(201,169,110,0.12)",
                        boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
                    }
                    : {
                        background: "transparent",
                        borderBottom: "1px solid transparent",
                        boxShadow: "none",
                        backdropFilter: "none",
                        WebkitBackdropFilter: "none",
                    }),
            }}
        >
            <nav
                style={{
                    maxWidth: 1280,
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: 72,
                    gap: 16,
                }}
            >
                <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, flex: "0 0 auto", textDecoration: "none" }}>
                    <div
                        style={{
                            width: 34,
                            height: 34,
                            background: "linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%)",
                            borderRadius: "2px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <FiStar size={16} color="#0e0e0e" />
                    </div>
                    <span
                        style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: "clamp(18px, 3vw, 22px)",
                            fontWeight: 700,
                            letterSpacing: "-0.02em",
                            color: "var(--chalk)",
                        }}
                    >
                        Aurum
                    </span>
                </Link>

                <div className="hide-mobile" style={{ display: "flex", gap: 36, alignItems: "center", justifyContent: "center", flex: 1 }}>
                    {primaryLinks.map((link) => (
                        <NavLink key={link.to} to={link.to} className="nav-link">
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6, flex: "0 0 auto" }}>
                    <button
                        ref={searchButtonRef}
                        type="button"
                        style={navButtonStyle}
                        aria-label="search"
                        onClick={() => setSearchOpen((s) => !s)}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = "var(--chalk)";
                            e.currentTarget.style.background = "rgba(245,242,237,0.06)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = "rgba(245,242,237,0.7)";
                            e.currentTarget.style.background = "none";
                        }}
                    >
                        <FiSearch size={18} />
                    </button>

                    {searchOpen && (
                        <div ref={searchPanelRef} style={{ position: "relative" }}>
                            <div
                                style={{
                                    position: "absolute",
                                    right: 0,
                                    top: 48,
                                    width: 360,
                                    maxWidth: "calc(100vw - 40px)",
                                    background: "rgba(14,14,14,0.98)",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                    padding: 12,
                                    borderRadius: 8,
                                    boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
                                    zIndex: 120,
                                }}
                            >
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const query = searchQuery.trim();

                                        if (!query) {
                                            return;
                                        }

                                        setSearchOpen(false);
                                        navigate(`/collections?q=${encodeURIComponent(query)}`);
                                    }}
                                >
                                    <div style={{ display: "flex", gap: 8 }}>
                                        <input
                                            autoFocus
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search products... (try: phone)"
                                            onKeyDown={(e) => {
                                                if (e.key === "Escape") {
                                                    setSearchOpen(false);
                                                }
                                            }}
                                            style={{
                                                flex: 1,
                                                padding: "10px 12px",
                                                borderRadius: 6,
                                                border: "1px solid rgba(255,255,255,0.06)",
                                                background: "transparent",
                                                color: "var(--chalk)",
                                            }}
                                        />
                                        <button type="submit" style={{ ...navButtonStyle, width: 44 }} aria-label="submit search">
                                            <FiSearch size={16} />
                                        </button>
                                    </div>
                                </form>

                                <div style={{ marginTop: 10, color: "#a39a8c", fontSize: 13, lineHeight: 1.6 }}>
                                    Search by product name or category, then press Enter to view matching results on Collections.
                                </div>

                                <div style={{ marginTop: 12, maxHeight: 320, overflow: "auto" }}>
                                    {searchLoading && <div style={{ color: "#a39a8c", fontSize: 13 }}>Searching…</div>}
                                    {searchError && <div style={{ color: "#ff6b6b", fontSize: 13 }}>{searchError}</div>}
                                    {!searchLoading && !searchError && searchQuery.trim() && searchResults.length === 0 && (
                                        <div style={{ color: "#a39a8c", fontSize: 13 }}>No results found</div>
                                    )}

                                    {searchResults.map((product) => (
                                        <Link
                                            key={product.id}
                                            to={`/products/${product.id}`}
                                            onClick={() => {
                                                setSearchOpen(false);
                                                setSearchQuery("");
                                            }}
                                            style={{
                                                display: "flex",
                                                gap: 10,
                                                alignItems: "center",
                                                textDecoration: "none",
                                                color: "var(--chalk)",
                                                padding: 10,
                                                borderRadius: 8,
                                                border: "1px solid rgba(255,255,255,0.06)",
                                                background: "rgba(255,255,255,0.02)",
                                                marginTop: 8,
                                            }}
                                        >
                                            <img
                                                src={product.thumbnail || product.images?.[0] || ""}
                                                alt={product.title}
                                                style={{ width: 52, height: 52, objectFit: "cover", borderRadius: 8, flex: "0 0 auto" }}
                                            />

                                            <div style={{ minWidth: 0, flex: 1 }}>
                                                <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>
                                                    {product.title}
                                                </div>
                                                <div style={{ marginTop: 4, display: "flex", flexWrap: "wrap", gap: 8, fontSize: 12, color: "#a39a8c" }}>
                                                    <span>{product.category}</span>
                                                    <span>{Math.round(product.price)} USD</span>
                                                    {product.brand && <span>{product.brand}</span>}
                                                </div>
                                            </div>

                                            <div style={{ color: "#c9a96e", fontSize: 12, fontWeight: 600, flex: "0 0 auto" }}>
                                                View
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        ref={accountButtonRef}
                        type="button"
                        style={navButtonStyle}
                        aria-label="account"
                        onClick={() => setAccountMenuOpen((open) => !open)}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = "var(--chalk)";
                            e.currentTarget.style.background = "rgba(245,242,237,0.06)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = "rgba(245,242,237,0.7)";
                            e.currentTarget.style.background = "none";
                        }}
                    >
                        <FiUser size={18} />
                    </button>

                    {accountMenuOpen && (
                        <div
                            ref={accountMenuRef}
                            style={{
                                position: "absolute",
                                right: 78,
                                top: 58,
                                width: 260,
                                maxWidth: "calc(100vw - 40px)",
                                background: "rgba(14,14,14,0.98)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: 14,
                                padding: 14,
                                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                                zIndex: 320,
                            }}
                        >
                            <div style={{ marginBottom: 12 }}>
                                <p style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "#a39a8c" }}>
                                    Account
                                </p>
                                <p style={{ marginTop: 8, fontSize: 15, fontWeight: 600, color: "var(--chalk)" }}>
                                    {currentUser ? `Hi, ${currentUser.name}` : "Welcome back"}
                                </p>
                                <p style={{ marginTop: 6, fontSize: 12, color: "#a39a8c", lineHeight: 1.6 }}>
                                    {currentUser ? currentUser.email : "Login here or create an account to save your session."}
                                </p>
                            </div>

                            {!currentUser ? (
                                <div style={{ display: "grid", gap: 8 }}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAuthMode("login");
                                            setAuthModalOpen(true);
                                            setAccountMenuOpen(false);
                                        }}
                                        style={{
                                            width: "100%",
                                            border: "1px solid rgba(201,169,110,0.25)",
                                            background: "rgba(201,169,110,0.08)",
                                            color: "var(--chalk)",
                                            borderRadius: 12,
                                            padding: "12px 14px",
                                            fontSize: 13,
                                            fontWeight: 600,
                                            textAlign: "left",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Login here
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAuthMode("register");
                                            setAuthModalOpen(true);
                                            setAccountMenuOpen(false);
                                        }}
                                        style={{
                                            width: "100%",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            background: "transparent",
                                            color: "var(--chalk)",
                                            borderRadius: 12,
                                            padding: "12px 14px",
                                            fontSize: 13,
                                            fontWeight: 600,
                                            textAlign: "left",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Create account
                                    </button>
                                </div>
                            ) : (
                                <div style={{ display: "grid", gap: 8 }}>
                                    <button
                                        type="button"
                                        onClick={() => navigate("/my-orders")}
                                        style={{
                                            width: "100%",
                                            border: "1px solid rgba(201,169,110,0.25)",
                                            background: "rgba(201,169,110,0.08)",
                                            color: "var(--chalk)",
                                            borderRadius: 12,
                                            padding: "12px 14px",
                                            fontSize: 13,
                                            fontWeight: 600,
                                            textAlign: "left",
                                            cursor: "pointer",
                                        }}
                                    >
                                        My Orders
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => navigate("/cart")}
                                        style={{
                                            width: "100%",
                                            border: "1px solid rgba(201,169,110,0.25)",
                                            background: "rgba(201,169,110,0.08)",
                                            color: "var(--chalk)",
                                            borderRadius: 12,
                                            padding: "12px 14px",
                                            fontSize: 13,
                                            fontWeight: 600,
                                            textAlign: "left",
                                            cursor: "pointer",
                                        }}
                                    >
                                        View cart
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            logout();
                                            setCurrentUser(null);
                                            setAccountMenuOpen(false);
                                        }}
                                        style={{
                                            width: "100%",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            background: "transparent",
                                            color: "var(--chalk)",
                                            borderRadius: 12,
                                            padding: "12px 14px",
                                            fontSize: 13,
                                            fontWeight: 600,
                                            textAlign: "left",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    <Link
                        to="/cart"
                        style={{ ...navButtonStyle, position: "relative", textDecoration: "none" }}
                        aria-label="cart"
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = "var(--chalk)";
                            e.currentTarget.style.background = "rgba(245,242,237,0.06)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = "rgba(245,242,237,0.7)";
                            e.currentTarget.style.background = "none";
                        }}
                    >
                        <FiShoppingBag size={18} />
                        {cartCount > 0 && (
                            <span
                                style={{
                                    position: "absolute",
                                    top: 6,
                                    right: 6,
                                    width: 16,
                                    height: 16,
                                    borderRadius: "50%",
                                    background: "var(--accent)",
                                    color: "var(--ink)",
                                    fontSize: 9,
                                    fontWeight: 700,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <button
                        className="show-mobile"
                        type="button"
                        onClick={() => setMobileMenuOpen((open) => !open)}
                        style={navButtonStyle}
                        aria-label="toggle menu"
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = "var(--chalk)";
                            e.currentTarget.style.background = "rgba(245,242,237,0.06)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = "rgba(245,242,237,0.7)";
                            e.currentTarget.style.background = "none";
                        }}
                    >
                        {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                    </button>
                </div>
            </nav>

            {mobileMenuOpen && (
                <div
                    style={{
                        position: "absolute",
                        top: 72,
                        left: 0,
                        right: 0,
                        background: "rgba(14,14,14,0.95)",
                        backdropFilter: "blur(24px)",
                        borderBottom: "1px solid rgba(201,169,110,0.12)",
                        padding: "24px 20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                    }}
                >
                    {primaryLinks.map((link) => (
                        <NavLink key={link.to} to={link.to} onClick={() => setMobileMenuOpen(false)} className="nav-link">
                            {link.label}
                        </NavLink>
                    ))}
                </div>
            )}

            <AuthModal
                key={`${authMode}-${authModalOpen ? "open" : "closed"}`}
                open={authModalOpen}
                mode={authMode}
                onClose={() => setAuthModalOpen(false)}
                onSuccess={(user) => setCurrentUser(user)}
                switchMode={(nextMode) => setAuthMode(nextMode)}
            />
        </header>
    );
}

export default Navigation;