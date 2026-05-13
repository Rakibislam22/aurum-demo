import { useState, useEffect, useRef } from "react";
import {
  Search, ShoppingCart, User, ArrowRight, Star, Shield,
  Truck, Headphones, ChevronLeft, ChevronRight, Mail,
  Sparkles, Zap, Heart,
  TrendingUp, Package, RotateCcw
} from "lucide-react";
import { IoLogoInstagram, IoLogoTwitter, IoLogoYoutube } from "react-icons/io5";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const tokens = {
  fontDisplay: "'Playfair Display', Georgia, serif",
  fontBody: "'DM Sans', sans-serif",
  fontMono: "'DM Mono', monospace",
};

// ─── GOOGLE FONTS INJECTOR ─────────────────────────────────────────────────────
function FontLoader() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
  return null;
}

// ─── GLOBAL STYLES ─────────────────────────────────────────────────────────────

// ─── NAVIGATION ────────────────────────────────────────────────────────────────
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [cartCount] = useState(3);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 32px",
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
        height: 72
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
            fontSize: 22, fontWeight: 700,
            letterSpacing: "-0.02em", color: "var(--chalk)"
          }}>Aurum</span>
        </div>

        {/* Nav Links */}
        <div className="hide-mobile" style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {["Collections", "New Arrivals", "Lookbook", "About"].map(l => (
            <a key={l} href="#" className="nav-link">{l}</a>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
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
        </div>
      </nav>
    </header>
  );
}

// ─── HERO SECTION ──────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
      padding: "120px 32px 80px"
    }}>
      {/* Background gradient mesh */}
      <div style={{
        position: "absolute", inset: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 70% 40%, rgba(201,169,110,0.12) 0%, transparent 60%),
          radial-gradient(ellipse 50% 50% at 20% 80%, rgba(46,41,35,0.8) 0%, transparent 50%),
          linear-gradient(160deg, #1a1612 0%, #0e0e0e 60%)
        `
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

      {/* Floating product card */}
      <div className="animate-float hide-mobile" style={{
        position: "absolute", right: "8%", top: "50%",
        transform: "translateY(-50%)",
        width: 280,
      }}>
        <div style={{
          borderRadius: 6,
          overflow: "hidden",
          boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
          border: "1px solid rgba(201,169,110,0.2)"
        }}>
          <div style={{
            height: 320,
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

      {/* Content */}
      <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 640 }}>
          <div className="animate-fade-up opacity-0-init stagger-1" style={{ marginBottom: 24 }}>
            <span className="tag-pill" style={{ alignItems: "center", display: "inline-flex" }}>
              <TrendingUp size={10} style={{ verticalAlign: "middle" }} />
              SS 2026 Collection
            </span>
          </div>

          <h1
            className="display-text animate-fade-up opacity-0-init stagger-2 hero-title"
            style={{ fontSize: "clamp(52px, 7.5vw, 98px)", marginBottom: 28 }}
          >
            Objects of{" "}
            <em className="shimmer-text" style={{ fontStyle: "italic" }}>
              Enduring
            </em>
            <br />Beauty.
          </h1>

          <p className="animate-fade-up opacity-0-init stagger-3" style={{
            fontSize: 17, color: "var(--stone)",
            lineHeight: 1.75, marginBottom: 44,
            maxWidth: 480, fontWeight: 300
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
      </div>

      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
        background: "linear-gradient(to top, var(--ink), transparent)",
        pointerEvents: "none"
      }} />
    </section>
  );
}

// ─── MARQUEE TICKER ────────────────────────────────────────────────────────────
function MarqueeTicker() {
  const items = ["New Arrivals", "Free Shipping Over $150", "Handcrafted Excellence",
    "Limited Editions", "Artisan Collection", "Sustainable Materials",
    "New Arrivals", "Free Shipping Over $150", "Handcrafted Excellence",
    "Limited Editions", "Artisan Collection", "Sustainable Materials"];
  return (
    <div style={{
      borderTop: "1px solid rgba(201,169,110,0.15)",
      borderBottom: "1px solid rgba(201,169,110,0.15)",
      padding: "14px 0", overflow: "hidden", background: "var(--deep)"
    }}>
      <div className="animate-marquee" style={{ display: "flex", whiteSpace: "nowrap", gap: 0 }}>
        {items.map((item, i) => (
          <span key={i} style={{
            fontFamily: tokens.fontMono, fontSize: 11,
            letterSpacing: "0.16em", textTransform: "uppercase",
            color: i % 2 === 0 ? "var(--stone)" : "var(--accent)",
            paddingRight: 48
          }}>
            {i % 2 === 0 ? "◆" : "○"}&nbsp;&nbsp;{item}
          </span>
        ))}
      </div>
    </div>
  );
}

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

function BentoGrid() {
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

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "300px 280px",
        gap: 12
      }}>
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

// ─── VALUE PROPS ───────────────────────────────────────────────────────────────
const VALUES = [
  { Icon: Truck, title: "Free Delivery", desc: "Complimentary shipping on all orders above $150. Express options available.", color: "#6ab4d4" },
  { Icon: Shield, title: "Secure & Insured", desc: "Every purchase protected with end-to-end encryption and full insurance.", color: "#8ad46a" },
  { Icon: RotateCcw, title: "30-Day Returns", desc: "Changed your mind? Free returns within 30 days, no questions asked.", color: "#d4a96a" },
  { Icon: Headphones, title: "Concierge Support", desc: "Dedicated specialists available around the clock to assist you.", color: "#d46a8a" },
];

function ValueProps() {
  return (
    <section style={{
      padding: "80px 32px",
      background: "var(--deep)",
      borderTop: "1px solid rgba(245,242,237,0.04)",
      borderBottom: "1px solid rgba(245,242,237,0.04)"
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 2
        }}>
          {VALUES.map(({ Icon, title, desc, color }, i) => (
            <div key={i} className="value-card">
              <div style={{
                width: 48, height: 48, marginBottom: 20,
                background: `${color}18`,
                border: `1px solid ${color}30`,
                borderRadius: 2,
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <Icon size={20} color={color} />
              </div>
              <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{title}</h4>
              <p style={{ fontSize: 14, color: "var(--stone)", lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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

function Testimonials() {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setIdx((i) => (i + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[idx];

  return (
    <section style={{ padding: "100px 32px", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <p className="section-label" style={{ marginBottom: 12 }}>What Collectors Say</p>
        <h2 className="display-text" style={{ fontSize: "clamp(28px, 3.5vw, 46px)" }}>
          Voices of the Community
        </h2>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
        <div className="testimonial-card" style={{ textAlign: "center", position: "relative" }}>
          {/* Quote mark */}
          <div style={{
            fontFamily: tokens.fontDisplay,
            fontSize: 80, lineHeight: 0.8,
            color: "var(--accent)", opacity: 0.25,
            marginBottom: 20, userSelect: "none"
          }}>"</div>

          <p style={{
            fontSize: 18, lineHeight: 1.8,
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: "var(--mid)",
              border: "2px solid var(--accent)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22
            }}>{t.avatar}</div>
            <div style={{ textAlign: "left" }}>
              <p style={{ fontWeight: 600, fontSize: 15 }}>{t.name}</p>
              <p style={{ fontSize: 13, color: "var(--stone)" }}>{t.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 32, alignItems: "center" }}>
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

// ─── NEWSLETTER ────────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email.includes("@")) setSubmitted(true);
  };

  return (
    <section style={{ padding: "80px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="glass" style={{
          borderRadius: 6,
          padding: "72px 60px",
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
            <h2 className="display-text" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", marginBottom: 16 }}>
              Early Access & Exclusive Drops
            </h2>
            <p style={{ color: "var(--stone)", marginBottom: 36, lineHeight: 1.7, fontSize: 15 }}>
              Subscribe to receive priority access to new collections, private sales,
              and curatorial notes from our selection team.
            </p>

            {!submitted ? (
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  className="input-field"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  style={{ flex: 1 }}
                />
                <button className="btn-primary" onClick={handleSubmit} style={{ whiteSpace: "nowrap" }}>
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
                color: "#8ad46a"
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

// ─── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
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
      padding: "80px 32px 40px"
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 48, marginBottom: 64
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
                <Sparkles size={16} color="#0e0e0e" />
              </div>
              <span style={{
                fontFamily: tokens.fontDisplay,
                fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em"
              }}>Aurum</span>
            </div>
            <p style={{ fontSize: 14, color: "var(--stone)", lineHeight: 1.8, maxWidth: 260, marginBottom: 28 }}>
              Curated objects for lives lived with intention.
              Beauty at the intersection of craft and concept.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
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
          <div style={{ display: "flex", gap: 28 }}>
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

// ─── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <FontLoader />
      <div className="grain-overlay" />

      <Navigation />

      <main>
        <HeroSection />
        <MarqueeTicker />
        <BentoGrid />
        <ValueProps />
        <Testimonials />
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}
