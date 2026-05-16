import { ArrowRight } from "lucide-react";

// ─── BENTO GRID ────────────────────────────────────────────────────────────────
const BENTO_ITEMS = [
    {
        id: 1, emoji: "🏺", title: "Ceramics", subtitle: "The Earth Collection",
        tag: "87 pieces", col: "1 / 3", row: "1 / 2",
        bg: "linear-gradient(145deg, #2a2018 0%, #1c1610 100%)", accent: "#d4a96a"
    },
    {
        id: 2, emoji: "💎", title: "Jewellery", subtitle: "Fine & Minimal",
        tag: "42 pieces", col: "3 / 4", row: "1 / 2",
        bg: "linear-gradient(145deg, #18202a 0%, #101618 100%)", accent: "#6ab4d4"
    },
    {
        id: 3, emoji: "🕯️", title: "Home Ritual", subtitle: "Scent & Warmth",
        tag: "29 pieces", col: "1 / 2", row: "2 / 3",
        bg: "linear-gradient(145deg, #20181a 0%, #161012 100%)", accent: "#d46a8a"
    },
    {
        id: 4, emoji: "📖", title: "Print & Paper", subtitle: "Collector's Editions",
        tag: "16 pieces", col: "2 / 4", row: "2 / 3",
        bg: "linear-gradient(145deg, #1a2018 0%, #121610 100%)", accent: "#8ad46a"
    },
];

function BentoGrid( {tokens} ) {
    return (
        <section style={{ padding: "100px 32px", maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ marginBottom: 56, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                    <p className="section-label" style={{ marginBottom: 12 }}>Featured Categories</p>
                    <h2 className="display-text" style={{ fontSize: "clamp(32px, 4vw, 52px)" }}>
                        Curated for<br />
                        <span style={{ color: "var(--accent)" }}>Refined Taste</span>
                    </h2>
                </div>
                <a href="#" className="hide-mobile" style={{
                    display: "flex", alignItems: "center", gap: 8,
                    color: "var(--accent)", textDecoration: "none",
                    fontSize: 14, fontWeight: 500,
                    fontFamily: tokens.fontMono, letterSpacing: "0.06em"
                }}>
                    All Categories <ArrowRight size={14} />
                </a>
            </div>

            <div className="bento-grid" style={{ gap: 12 }}>
                {BENTO_ITEMS.map((item) => (
                    <div key={item.id} className="bento-card" style={{
                        gridColumn: item.col,
                        gridRow: item.row,
                        background: item.bg,
                        border: "1px solid rgba(245,242,237,0.05)"
                    }}>
                        <div className="card-overlay" />

                        {/* Emoji art */}
                        <div style={{
                            position: "absolute", top: "50%", left: "50%",
                            transform: "translate(-50%, -60%)",
                            fontSize: item.col === "1 / 3" ? 80 : 64,
                            pointerEvents: "none", userSelect: "none",
                            filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))"
                        }}>{item.emoji}</div>

                        {/* Tag */}
                        <div style={{
                            position: "absolute", top: 20, right: 20
                        }}>
                            <span style={{
                                background: "rgba(14,14,14,0.6)",
                                backdropFilter: "blur(8px)",
                                border: `1px solid ${item.accent}33`,
                                color: item.accent,
                                padding: "5px 12px",
                                borderRadius: 2,
                                fontSize: 11,
                                fontFamily: tokens.fontMono,
                                letterSpacing: "0.08em"
                            }}>{item.tag}</span>
                        </div>

                        {/* Content */}
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 28px" }}>
                            <p style={{
                                fontSize: 12, fontFamily: tokens.fontMono,
                                letterSpacing: "0.1em", color: "rgba(245,242,237,0.5)",
                                marginBottom: 6, textTransform: "uppercase"
                            }}>{item.subtitle}</p>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <h3 className="display-text" style={{ fontSize: 24 }}>{item.title}</h3>
                                <div className="card-cta" style={{
                                    width: 36, height: 36,
                                    background: "var(--accent)",
                                    borderRadius: 2,
                                    display: "flex", alignItems: "center", justifyContent: "center"
                                }}>
                                    <ArrowRight size={16} color="#0e0e0e" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default BentoGrid;