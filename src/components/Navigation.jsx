import { Menu, Search, User, ShoppingCart, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const tokens = {
    fontDisplay: "'Playfair Display', Georgia, serif",
    fontBody: "'DM Sans', sans-serif",
    fontMono: "'DM Mono', monospace",
};

// ─── NAVIGATION ────────────────────────────────────────────────────────────────
function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [cartCount] = useState(3);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close menu when scrolling
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [mobileMenuOpen]);

    return (
        <header style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
            padding: "0 20px",
            transition: "all 0.4s ease",
            ...(scrolled ? {
                background: "rgba(14,14,14,0.82)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderBottom: "1px solid rgba(201,169,110,0.12)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.4)"
            } : {})
        }}>
            <nav style={{
                maxWidth: 1280, margin: "0 auto",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                height: "72px",
                gap: "16px"
            }}>
                {/* Logo */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, flex: "0 0 auto" }}>
                    <div style={{
                        width: 34, height: 34,
                        background: "linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%)",
                        borderRadius: "2px",
                        display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                        <Sparkles size={16} color="#0e0e0e" />
                    </div>
                    <span style={{
                        fontFamily: tokens.fontDisplay,
                        fontSize: "clamp(18px, 3vw, 22px)", fontWeight: 700,
                        letterSpacing: "-0.02em", color: "var(--chalk)"
                    }}>Aurum</span>
                </div>

                {/* Nav Links - Desktop */}
                <div className="hide-mobile" style={{ display: "flex", gap: 36, alignItems: "center", justifyContent: "center", flex: 1 }}>
                    {["Collections", "New Arrivals", "Lookbook", "About"].map(l => (
                        <a key={l} href="#" className="nav-link">{l}</a>
                    ))}
                </div>

                {/* Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, flex: "0 0 auto" }}>
                    {[
                        { Icon: Search, label: "search" },
                        { Icon: User, label: "account" },
                    ].map(({ Icon, label }) => (
                        <button key={label} style={{
                            background: "none", border: "none",
                            color: "rgba(245,242,237,0.7)",
                            width: 40, height: 40, borderRadius: "2px",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", transition: "color 0.2s, background 0.2s"
                        }}
                            onMouseEnter={e => { e.currentTarget.style.color = "var(--chalk)"; e.currentTarget.style.background = "rgba(245,242,237,0.06)"; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "rgba(245,242,237,0.7)"; e.currentTarget.style.background = "none"; }}
                        >
                            <Icon size={18} />
                        </button>
                    ))}
                    <button style={{
                        background: "none", border: "none",
                        color: "rgba(245,242,237,0.7)",
                        width: 40, height: 40, borderRadius: "2px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", transition: "color 0.2s, background 0.2s",
                        position: "relative"
                    }}
                        onMouseEnter={e => { e.currentTarget.style.color = "var(--chalk)"; e.currentTarget.style.background = "rgba(245,242,237,0.06)"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = "rgba(245,242,237,0.7)"; e.currentTarget.style.background = "none"; }}
                    >
                        <ShoppingCart size={18} />
                        {cartCount > 0 && (
                            <span style={{
                                position: "absolute", top: 6, right: 6,
                                width: 16, height: 16, borderRadius: "50%",
                                background: "var(--accent)",
                                color: "var(--ink)", fontSize: 9, fontWeight: 700,
                                display: "flex", alignItems: "center", justifyContent: "center"
                            }}>{cartCount}</span>
                        )}
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button className="show-mobile" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        style={{
                            background: "none", border: "none",
                            color: "rgba(245,242,237,0.7)",
                            width: 40, height: 40, borderRadius: "2px",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", transition: "color 0.2s, background 0.2s"
                        }}
                        onMouseEnter={e => { e.currentTarget.style.color = "var(--chalk)"; e.currentTarget.style.background = "rgba(245,242,237,0.06)"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = "rgba(245,242,237,0.7)"; e.currentTarget.style.background = "none"; }}
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div style={{
                    position: "absolute", top: "72px", left: 0, right: 0,
                    background: "rgba(14,14,14,0.95)",
                    backdropFilter: "blur(24px)",
                    borderBottom: "1px solid rgba(201,169,110,0.12)",
                    padding: "24px 20px",
                    display: "flex", flexDirection: "column", gap: 16
                }}>
                    {["Collections", "New Arrivals", "Lookbook", "About"].map(l => (
                        <a key={l} href="#" style={{
                            color: "rgba(245,242,237,0.8)",
                            textDecoration: "none",
                            fontSize: "15px",
                            fontWeight: 500,
                            paddingBottom: "8px",
                            borderBottom: "1px solid rgba(245,242,237,0.1)",
                            transition: "color 0.2s"
                        }}
                            onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
                            onMouseLeave={e => e.currentTarget.style.color = "rgba(245,242,237,0.8)"}
                        >{l}</a>
                    ))}
                </div>
            )}
        </header>
    );
}

export default Navigation;