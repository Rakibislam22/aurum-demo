import { Mail, Sparkles } from "lucide-react";
import { useState } from "react";

// ─── NEWSLETTER ────────────────────────────────────────────────────────────────
function Newsletter() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        if (email.includes("@")) setSubmitted(true);
    };

    return (
        <section style={{ padding: "clamp(40px, 8vw, 80px) clamp(16px, 5vw, 32px)" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <div className="glass" style={{
                    borderRadius: 6,
                    padding: "clamp(36px, 8vw, 72px) clamp(24px, 5vw, 60px)",
                    background: "linear-gradient(135deg, rgba(201,169,110,0.08) 0%, rgba(26,22,18,0.4) 100%)",
                    backdropFilter: "blur(24px)",
                    position: "relative", overflow: "hidden"
                }}>
                    {/* Decorative */}
                    <div style={{
                        position: "absolute", right: -60, top: -60,
                        width: 320, height: 320,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)",
                        pointerEvents: "none"
                    }} />

                    <div style={{ maxWidth: 560, position: "relative", zIndex: 1 }}>
                        <p className="section-label" style={{ marginBottom: 16 }}>Join the Inner Circle</p>
                        <h2 className="display-text" style={{ fontSize: "clamp(24px, 5vw, 44px)", marginBottom: 16 }}>
                            Early Access & Exclusive Drops
                        </h2>
                        <p style={{ color: "var(--stone)", marginBottom: 36, lineHeight: 1.7, fontSize: "clamp(14px, 2vw, 15px)" }}>
                            Subscribe to receive priority access to new collections, private sales,
                            and curatorial notes from our selection team.
                        </p>

                        {!submitted ? (
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                <input
                                    className="input-field"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    onKeyDown={e => e.key === "Enter" && handleSubmit()}
                                    style={{ flex: "1 1 auto", minWidth: "200px" }}
                                />
                                <button className="btn-primary" onClick={handleSubmit} style={{ whiteSpace: "nowrap", flex: "0 1 auto" }}>
                                    Subscribe <Mail size={15} />
                                </button>
                            </div>
                        ) : (
                            <div style={{
                                display: "flex", alignItems: "center", gap: 12,
                                padding: "16px 24px",
                                background: "rgba(138,212,106,0.1)",
                                border: "1px solid rgba(138,212,106,0.25)",
                                borderRadius: 2,
                                color: "#8ad46a",
                                flexWrap: "wrap"
                            }}>
                                <Sparkles size={18} />
                                <span style={{ fontWeight: 500 }}>Welcome to the Inner Circle. Watch your inbox.</span>
                            </div>
                        )}
                        <p style={{ marginTop: 16, fontSize: 12, color: "var(--stone)" }}>
                            No spam, ever. Unsubscribe at any time.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Newsletter;