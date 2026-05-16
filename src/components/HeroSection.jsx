import { ArrowRight, Star, TrendingUp, Zap } from "lucide-react";

// ─── HERO SECTION ──────────────────────────────────────────────────────────────
function HeroSection({tokens}) {
    return (
        <section style={{
            minHeight: "100vh",
            display: "flex", alignItems: "center",
            position: "relative", overflow: "hidden",
            padding: "clamp(80px, 15vh, 120px) clamp(16px, 5vw, 32px) clamp(40px, 10vh, 80px)",
            background: "#0e0e0e"
        }}>
            {/* Background gradient mesh */}
            <div style={{
                position: "absolute", inset: 0,
                background: `
          radial-gradient(ellipse 80% 60% at 70% 40%, rgba(201,169,110,0.12) 0%, transparent 60%),
          radial-gradient(ellipse 50% 50% at 20% 80%, rgba(46,41,35,0.8) 0%, transparent 50%),
          linear-gradient(160deg, #1a1612 0%, #0e0e0e 60%)
        `,
                pointerEvents: "none"
            }} />

            {/* Decorative lines */}
            <div style={{
                position: "absolute", top: "20%", right: "8%",
                width: 320, height: 320, opacity: 0.06,
                border: "1px solid var(--chalk)",
                borderRadius: "50%", pointerEvents: "none"
            }} />
            <div style={{
                position: "absolute", top: "25%", right: "10%",
                width: 220, height: 220, opacity: 0.04,
                border: "1px solid var(--chalk)",
                borderRadius: "50%", pointerEvents: "none"
            }} />

            <div style={{
                maxWidth: 1280,
                margin: "0 auto",
                width: "100%",
                position: "relative",
                zIndex: 1,
                minHeight: "500px",
                display: "flex",
                alignItems: "center"
            }}>

                {/* Left Side Content */}
                <div style={{ maxWidth: "clamp(340px, 50vw, 640px)", position: "relative", zIndex: 2 }}>
                    <div className="animate-fade-up opacity-0-init stagger-1" style={{ marginBottom: 24 }}>
                        <span className="tag-pill" style={{ alignItems: "center", display: "inline-flex" }}>
                            <TrendingUp size={10} style={{ verticalAlign: "middle" }} />
                            &nbsp;SS 2026 Collection
                        </span>
                    </div>

                    <h1
                        className="display-text animate-fade-up opacity-0-init stagger-2 hero-title"
                        style={{ fontSize: "clamp(36px, 5.5vw, 84px)", marginBottom: 28, lineHeight: 1.1 }}
                    >
                        Objects of{" "}
                        <em className="shimmer-text" style={{ fontStyle: "italic" }}>
                            Enduring
                        </em>
                        <br />Beauty.
                    </h1>

                    <p className="animate-fade-up opacity-0-init stagger-3" style={{
                        fontSize: 16, color: "var(--stone)",
                        lineHeight: 1.75, marginBottom: 44,
                        maxWidth: 460, fontWeight: 300
                    }}>
                        Curated artifacts at the intersection of craft and concept.
                        Each piece selected for those who see the world differently.
                    </p>

                    <div className="animate-fade-up opacity-0-init stagger-4"
                        style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                        <button className="btn-primary">
                            Shop the Edit <ArrowRight size={16} />
                        </button>
                        <button className="btn-ghost">
                            Explore Lookbook
                        </button>
                    </div>

                    {/* Social proof strip */}
                    <div className="animate-fade-up opacity-0-init stagger-5"
                        style={{ marginTop: 60, display: "flex", alignItems: "center", gap: 20 }}>
                        <div style={{ display: "flex" }}>
                            {["🧑‍🎨", "👩", "🧑‍💼", "👩‍🦱"].map((e, i) => (
                                <div key={i} style={{
                                    width: 36, height: 36, borderRadius: "50%",
                                    border: "2px solid var(--ink)",
                                    background: `hsl(${30 + i * 15}, 30%, ${25 + i * 5}%)`,
                                    marginLeft: i > 0 ? -10 : 0,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 16
                                }}>{e}</div>
                            ))}
                        </div>
                        <div>
                            <div style={{ display: "flex", gap: 2, marginBottom: 3 }}>
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={12} fill="#c9a96e" color="#c9a96e" />
                                ))}
                            </div>
                            <p style={{ fontSize: 13, color: "var(--stone)" }}>
                                <strong style={{ color: "var(--chalk)" }}>4,800+</strong> collectors worldwide
                            </p>
                        </div>
                    </div>
                </div>

                <div className="animate-float hide-mobile" style={{
                    position: "absolute",
                    right: "0px",
                    bottom: "20px",
                    width: "clamp(240px, 22vw, 290px)",
                    zIndex: 1
                }}>
                    <div style={{
                        borderRadius: 6,
                        overflow: "hidden",
                        boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
                        border: "1px solid rgba(201,169,110,0.2)"
                    }}>
                        <div style={{
                            height: "clamp(240px, 25vh, 320px)",
                            background: "linear-gradient(145deg, #2a2420 0%, #1a1410 100%)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 80
                        }}>🏺</div>
                        <div style={{ padding: "20px", background: "var(--mid)" }}>
                            <div className="tag-pill" style={{ marginBottom: 10 }}>
                                <Zap size={9} /> New Season
                            </div>
                            <p style={{ fontFamily: tokens.fontDisplay, fontSize: 18, marginBottom: 4 }}>
                                Artisan Vessel No. 7
                            </p>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ color: "var(--accent)", fontWeight: 600, fontSize: 17 }}>$248</span>
                                <div style={{ display: "flex", gap: 2 }}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={11} fill="#c9a96e" color="#c9a96e" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Floating badge */}
                    <div style={{
                        position: "absolute", top: -16, left: -16,
                        background: "var(--accent)",
                        color: "var(--ink)",
                        borderRadius: 2,
                        padding: "8px 14px",
                        fontSize: 12, fontWeight: 700,
                        fontFamily: tokens.fontMono,
                        letterSpacing: "0.06em",
                        boxShadow: "0 8px 24px rgba(201,169,110,0.4)"
                    }}>★ TRENDING</div>
                </div>

            </div>

            {/* Bottom fade */}
            <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
                background: "linear-gradient(to top, var(--ink), transparent)",
                pointerEvents: "none",
                zIndex: 2
            }} />
        </section>
    );
}

export default HeroSection;