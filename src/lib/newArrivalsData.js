export const NEW_ARRIVALS = [
    {
        id: "column-coat",
        name: "Column Coat",
        category: "Outerwear",
        price: 320,
        description: "Sharp shoulders, deep drape, and a matte wool finish.",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
        story:
            "A disciplined outer layer designed to frame the body with structure and quiet drama.",
        details: [
            "Matte wool blend",
            "Relaxed tailored silhouette",
            "Midweight layering piece",
        ],
    },
    {
        id: "studio-shirt",
        name: "Studio Shirt",
        category: "Tailoring",
        price: 180,
        description: "A clean silhouette with quiet structure through the body.",
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
        story:
            "A refined staple that shifts easily from polished daywear to pared-back evening styling.",
        details: [
            "Crisp cotton blend",
            "Straight fit",
            "Designed for layering",
        ],
    },
    {
        id: "linear-tote",
        name: "Linear Tote",
        category: "Accessories",
        price: 145,
        description: "Designed to move from day edits to after-dark appointments.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
        story:
            "Minimal in form, generous in utility, and tuned for daily movement.",
        details: [
            "Structured carryall",
            "Soft handles",
            "Room for daily essentials",
        ],
    },
    {
        id: "noir-loafer",
        name: "Noir Loafer",
        category: "Footwear",
        price: 240,
        description: "Polished, minimal, and built for long wear.",
        image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=1200&q=80",
        story:
            "A balanced shoe with a sleek profile and enough ease for all-day use.",
        details: [
            "Low-profile loafer",
            "Soft leather upper",
            "Comfort-led insole",
        ],
    },
    {
        id: "vessel-candle",
        name: "Vessel Candle",
        category: "Home",
        price: 62,
        description: "A low, warm profile with a scent that lingers softly.",
        image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=80",
        story:
            "Created to bring atmosphere to a room without overwhelming it.",
        details: [
            "Wax vessel candle",
            "Warm ambient scent",
            "Ideal for shelf or table",
        ],
    },
    {
        id: "silk-line-dress",
        name: "Silk Line Dress",
        category: "Evening",
        price: 410,
        description: "Liquid movement, precise cut, and a refined finish.",
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80",
        story:
            "Built for movement, this piece balances softness with exacting lines.",
        details: [
            "Silk finish",
            "Fluid drape",
            "Evening-ready silhouette",
        ],
    },
];

export function formatNewArrivalPrice(price) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(price);
}

export function getNewArrivalById(id) {
    return NEW_ARRIVALS.find((item) => item.id === id);
}
