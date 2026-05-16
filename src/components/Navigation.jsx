import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { FiMenu, FiSearch, FiShoppingBag, FiStar, FiUser, FiX } from "react-icons/fi";
import { siteLinks } from "../lib/siteTheme";

function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [cartCount] = useState(3);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [mobileMenuOpen]);

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
                    : {}),
            }}
        >
            <nav style={{
                maxWidth: 1280,
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: 72,
                gap: 16,
            }}>
                <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, flex: "0 0 auto", textDecoration: "none" }}>
                    <div style={{
                        width: 34,
                        height: 34,
                        background: "linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%)",
                        borderRadius: "2px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <FiStar size={16} color="#0e0e0e" />
                    </div>
                    <span style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "clamp(18px, 3vw, 22px)",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        color: "var(--chalk)",
                    }}>Aurum</span>
                </Link>

                <div className="hide-mobile" style={{ display: "flex", gap: 36, alignItems: "center", justifyContent: "center", flex: 1 }}>
                    {siteLinks.map((link) => (
                        <NavLink key={link.to} to={link.to} className="nav-link">
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6, flex: "0 0 auto" }}>
                    <button
                        type="button"
                        style={navButtonStyle}
                        aria-label="search"
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

                    <button
                        type="button"
                        style={navButtonStyle}
                        aria-label="account"
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

                    <button
                        type="button"
                        style={{ ...navButtonStyle, position: "relative" }}
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
                            <span style={{
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
                            }}>{cartCount}</span>
                        )}
                    </button>

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
                <div style={{
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
                }}>
                    {siteLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={() => setMobileMenuOpen(false)}
                            className="nav-link"
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>
            )}
        </header>
    );
}

export default Navigation;