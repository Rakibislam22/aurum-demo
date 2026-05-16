import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

// ─── TESTIMONIALS ──────────────────────────────────────────────────────────────
const TESTIMONIALS = [
    {
        name: "Ariane Leclercq", role: "Interior Architect, Paris",
        avatar: "🧑‍🎨", rating: 5,
        text: "Aurum has completely changed how I source pieces for my projects. The curation is impeccable — every item feels like it belongs in a gallery, yet lives beautifully in a home."
    },
    {
        name: "Kenji Watanabe", role: "Creative Director, Tokyo",
        avatar: "👨‍💼", rating: 5,
        text: "I've purchased from dozens of curated stores, and nothing compares to the quality and attention to detail here. The packaging alone is an experience."
    },
    {
        name: "Sofia Marchetti", role: "Collector & Patron, Milan",
        avatar: "👩", rating: 5,
        text: "The ceramics collection is extraordinary. I own three pieces and each tells a story. This is not shopping — this is discovering."
    },
];

function Testimonials({tokens}) {
    const [idx, setIdx] = useState(0);

    const prev = () => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    const next = () => setIdx((i) => (i + 1) % TESTIMONIALS.length);

    const t = TESTIMONIALS[idx];

    return (
        <section style={{ padding: "clamp(40px, 8vw, 100px) clamp(16px, 5vw, 32px)", maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "clamp(40px, 8vw, 60px)" }}>
                <p className="section-label" style={{ marginBottom: 12 }}>What Collectors Say</p>
                <h2 className="display-text" style={{ fontSize: "clamp(24px, 5vw, 46px)" }}>
                    Voices of the Community
                </h2>
            </div>

            <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
                <div className="testimonial-card" style={{ textAlign: "center", position: "relative", padding: "clamp(24px, 5vw, 40px)" }}>
                    {/* Quote mark */}
                    <div style={{
                        fontFamily: tokens.fontDisplay,
                        fontSize: "clamp(48px, 10vw, 80px)", lineHeight: 0.8,
                        color: "var(--accent)", opacity: 0.25,
                        marginBottom: 20, userSelect: "none"
                    }}>"</div>

                    <p style={{
                        fontSize: "clamp(16px, 3vw, 18px)", lineHeight: 1.8,
                        color: "rgba(245,242,237,0.85)",
                        fontStyle: "italic",
                        fontFamily: tokens.fontDisplay,
                        marginBottom: 32
                    }}>{t.text}</p>

                    {/* Stars */}
                    <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 24 }}>
                        {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} size={16} fill="#c9a96e" color="#c9a96e" />
                        ))}
                    </div>

                    {/* Author */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
                        <div style={{
                            width: 48, height: 48, borderRadius: "50%",
                            background: "var(--mid)",
                            border: "2px solid var(--accent)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 22, flexShrink: 0
                        }}>{t.avatar}</div>
                        <div style={{ textAlign: "left" }}>
                            <p style={{ fontWeight: 600, fontSize: 15 }}>{t.name}</p>
                            <p style={{ fontSize: 13, color: "var(--stone)" }}>{t.role}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div style={{ display: "flex", justifyContent: "center", gap: "clamp(8px, 2vw, 12px)", marginTop: "clamp(24px, 5vw, 32px)", alignItems: "center", flexWrap: "wrap" }}>
                    <button onClick={prev} style={{
                        width: 40, height: 40, borderRadius: 2,
                        background: "none", border: "1px solid rgba(245,242,237,0.12)",
                        color: "var(--chalk)", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "border-color 0.2s, background 0.2s"
                    }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.background = "rgba(201,169,110,0.08)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(245,242,237,0.12)"; e.currentTarget.style.background = "none"; }}
                    >
                        <ChevronLeft size={16} />
                    </button>

                    {TESTIMONIALS.map((_, i) => (
                        <button key={i} onClick={() => setIdx(i)} style={{
                            width: i === idx ? 28 : 8,
                            height: 8, borderRadius: 4,
                            background: i === idx ? "var(--accent)" : "rgba(245,242,237,0.15)",
                            border: "none", cursor: "pointer",
                            transition: "all 0.35s ease"
                        }} />
                    ))}

                    <button onClick={next} style={{
                        width: 40, height: 40, borderRadius: 2,
                        background: "none", border: "1px solid rgba(245,242,237,0.12)",
                        color: "var(--chalk)", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "border-color 0.2s, background 0.2s"
                    }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.background = "rgba(201,169,110,0.08)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(245,242,237,0.12)"; e.currentTarget.style.background = "none"; }}
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;