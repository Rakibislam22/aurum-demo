import { IoLogoInstagram, IoLogoTwitter, IoLogoYoutube } from "react-icons/io5";
import { FiStar } from "react-icons/fi";

// ─── FOOTER ────────────────────────────────────────────────────────────────────
function Footer({ tokens }) {
    const cols = [
        {
            title: "Shop",
            links: ["New Arrivals", "Collections", "Ceramics", "Jewellery", "Home Ritual", "Print & Paper"]
        },
        {
            title: "Company",
            links: ["Our Story", "The Process", "Sustainability", "Careers", "Press", "Contact"]
        },
        {
            title: "Support",
            links: ["FAQ", "Shipping Policy", "Returns", "Size Guide", "Gift Cards", "Accessibility"]
        },
    ];

    return (
        <footer style={{
            background: "var(--deep)",
            borderTop: "1px solid rgba(245,242,237,0.06)",
            padding: "clamp(40px, 8vw, 80px) clamp(16px, 5vw, 32px) clamp(24px, 5vw, 40px)"
        }}>
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "clamp(24px, 5vw, 48px)", marginBottom: "clamp(40px, 8vw, 64px)"
                }}>
                    {/* Brand column */}
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                            <div style={{
                                width: 34, height: 34,
                                background: "linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%)",
                                borderRadius: "2px",
                                display: "flex", alignItems: "center", justifyContent: "center"
                            }}>
                                <FiStar size={16} color="#0e0e0e" />
                            </div>
                            <span style={{
                                fontFamily: tokens.fontDisplay,
                                fontSize: "clamp(18px, 3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em"
                            }}>Aurum</span>
                        </div>
                        <p style={{ fontSize: 14, color: "var(--stone)", lineHeight: 1.8, maxWidth: 260, marginBottom: 28 }}>
                            Curated objects for lives lived with intention.
                            Beauty at the intersection of craft and concept.
                        </p>
                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                            {[IoLogoInstagram, IoLogoTwitter, IoLogoYoutube].map((Icon, i) => (
                                <a key={i} href="#" style={{
                                    width: 36, height: 36, borderRadius: 2,
                                    border: "1px solid rgba(245,242,237,0.1)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "var(--stone)", textDecoration: "none",
                                    transition: "border-color 0.2s, color 0.2s"
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(245,242,237,0.1)"; e.currentTarget.style.color = "var(--stone)"; }}
                                >
                                    <Icon size={15} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {cols.map((col) => (
                        <div key={col.title}>
                            <p style={{
                                fontFamily: tokens.fontMono, fontSize: 11,
                                letterSpacing: "0.14em", textTransform: "uppercase",
                                color: "var(--chalk)", marginBottom: 20
                            }}>{col.title}</p>
                            {col.links.map(link => (
                                <a key={link} href="#" className="footer-link">{link}</a>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div style={{
                    borderTop: "1px solid rgba(245,242,237,0.06)",
                    paddingTop: 28,
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    flexWrap: "wrap", gap: 16
                }}>
                    <p style={{ fontSize: 13, color: "var(--stone)" }}>
                        © 2026 Aurum Studio Ltd. All rights reserved.
                    </p>
                    <div style={{ display: "flex", gap: "clamp(16px, 3vw, 28px)", flexWrap: "wrap" }}>
                        {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(l => (
                            <a key={l} href="#" style={{
                                fontSize: 13, color: "var(--stone)", textDecoration: "none",
                                transition: "color 0.2s"
                            }}
                                onMouseEnter={e => e.currentTarget.style.color = "var(--chalk)"}
                                onMouseLeave={e => e.currentTarget.style.color = "var(--stone)"}
                            >{l}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;