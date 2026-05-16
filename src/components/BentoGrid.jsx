import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

// ─── BENTO GRID ────────────────────────────────────────────────────────────────
const DEFAULT_BENTO_ITEMS = [
    { id: 1, emoji: "🏺", title: "Ceramics", subtitle: "The Earth Collection", tag: "87 pieces", col: "1 / 3", row: "1 / 2", bg: "linear-gradient(145deg, #2a2018 0%, #1c1610 100%)", accent: "#d4a96a" },
    { id: 2, emoji: "💎", title: "Jewellery", subtitle: "Fine & Minimal", tag: "42 pieces", col: "3 / 4", row: "1 / 2", bg: "linear-gradient(145deg, #18202a 0%, #101618 100%)", accent: "#6ab4d4" },
    { id: 3, emoji: "🕯️", title: "Home Ritual", subtitle: "Scent & Warmth", tag: "29 pieces", col: "1 / 2", row: "2 / 3", bg: "linear-gradient(145deg, #20181a 0%, #161012 100%)", accent: "#d46a8a" },
    { id: 4, emoji: "📖", title: "Print & Paper", subtitle: "Collector's Editions", tag: "16 pieces", col: "2 / 4", row: "2 / 3", bg: "linear-gradient(145deg, #1a2018 0%, #121610 100%)", accent: "#8ad46a" },
];

const GRID_POSITIONS = [
    { col: "1 / 3", row: "1 / 2" },
    { col: "3 / 4", row: "1 / 2" },
    { col: "1 / 2", row: "2 / 3" },
    { col: "2 / 4", row: "2 / 3" },
];

function BentoGrid({ tokens, categoryCards = [], trendingProducts = [] }) {
    const items = categoryCards.length
        ? categoryCards.slice(0, 4).map((card, index) => ({
            id: `${card.category}-${index}`,
            category: card.category,
            emoji: card.emoji,
            title: card.title,
            subtitle: card.subtitle,
            tag: card.tag,
            col: GRID_POSITIONS[index]?.col || "1 / 2",
            row: GRID_POSITIONS[index]?.row || "1 / 2",
            sampleImage: card.sampleImage || "",
            // only use a background gradient when there is no sample image
            bg: card.sampleImage
                ? `linear-gradient(145deg, ${card.accent}20 0%, #121610 100%)`
                : `linear-gradient(145deg, ${card.accent}20 0%, #121610 100%)`,
            accent: card.accent,
        }))
        : DEFAULT_BENTO_ITEMS;

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
                <Link to="/collections" className="hide-mobile" style={{
                    display: "flex", alignItems: "center", gap: 8,
                    color: "var(--accent)", textDecoration: "none",
                    fontSize: 14, fontWeight: 500,
                    fontFamily: tokens.fontMono, letterSpacing: "0.06em"
                }}>
                    All Categories {trendingProducts[0]?.title ? `• ${trendingProducts[0].title}` : ""} <ArrowRight size={14} />
                </Link>
            </div>

            <div className="bento-grid" style={{ gap: 12 }}>
                {items.map((item) => (
                    <Link
                        key={item.id}
                        to={item.category ? `/collections?q=${encodeURIComponent(item.category)}` : "/collections"}
                        className="bento-card"
                        style={{
                            gridColumn: item.col,
                            gridRow: item.row,
                            background: item.sampleImage ? "transparent" : item.bg,
                            border: "1px solid rgba(245,242,237,0.05)",
                            textDecoration: "none",
                            color: "inherit",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <div className="card-overlay" />

                        <div style={{ position: "absolute", inset: 0 }}>
                            {item.sampleImage ? (
                                <img
                                    src={item.sampleImage}
                                    alt={item.title}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                        objectPosition: "center",
                                        display: "block",
                                    }}
                                />
                            ) : (
                                <div style={{ width: "100%", height: "100%", background: item.bg }} />
                            )}

                            <div style={{
                                position: "absolute",
                                inset: 0,
                                background: "radial-gradient(circle at top, rgba(201,169,110,0.18), transparent 38%), linear-gradient(180deg, transparent 25%, rgba(0,0,0,0.65) 100%)"
                            }} />
                        </div>

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
                            <p style={{ marginTop: 10, fontSize: 13, color: "rgba(245,242,237,0.72)" }}>{item.tag}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default BentoGrid;