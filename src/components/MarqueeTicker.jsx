// ─── MARQUEE TICKER ────────────────────────────────────────────────────────────
function MarqueeTicker({ tokens, items = [] }) {
    const defaultItems = ["New Arrivals", "Free Shipping Over $150", "Handcrafted Excellence",
        "Limited Editions", "Artisan Collection", "Sustainable Materials",
        "New Arrivals", "Free Shipping Over $150", "Handcrafted Excellence",
        "Limited Editions", "Artisan Collection", "Sustainable Materials"];
    const displayItems = items.length ? [...items, ...items] : defaultItems;
    return (
        <div style={{
            borderTop: "1px solid rgba(201,169,110,0.15)",
            borderBottom: "1px solid rgba(201,169,110,0.15)",
            padding: "14px 0", overflow: "hidden", background: "var(--deep)"
        }}>
            <div className="animate-marquee" style={{ display: "flex", whiteSpace: "nowrap", gap: 0 }}>
                {displayItems.map((item, i) => (
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

export default MarqueeTicker;