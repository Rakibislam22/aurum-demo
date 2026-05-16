import { 
  Shield,Truck, Headphones, RotateCcw
} from "lucide-react";

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
            padding: "clamp(40px, 8vw, 80px) clamp(16px, 5vw, 32px)",
            background: "var(--deep)",
            borderTop: "1px solid rgba(245,242,237,0.04)",
            borderBottom: "1px solid rgba(245,242,237,0.04)"
        }}>
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
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
                            <h4 style={{ fontSize: "clamp(14px, 2vw, 16px)", fontWeight: 600, marginBottom: 10 }}>{title}</h4>
                            <p style={{ fontSize: 14, color: "var(--stone)", lineHeight: 1.65 }}>{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ValueProps;