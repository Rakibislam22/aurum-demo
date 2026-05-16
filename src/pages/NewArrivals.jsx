import { FiArrowRight, FiEye, FiShoppingBag, FiStar } from "react-icons/fi";
import { Link } from "react-router";

const ARRIVALS = [
    {
        name: "Column Coat",
        category: "Outerwear",
        price: "$320",
        description: "Sharp shoulders, deep drape, and a matte wool finish.",
        image:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    },
    {
        name: "Studio Shirt",
        category: "Tailoring",
        price: "$180",
        description: "A clean silhouette with quiet structure through the body.",
        image:
            "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
    },
    {
        name: "Linear Tote",
        category: "Accessories",
        price: "$145",
        description: "Designed to move from day edits to after-dark appointments.",
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    },
    {
        name: "Noir Loafer",
        category: "Footwear",
        price: "$240",
        description: "Polished, minimal, and built for long wear.",
        image:
            "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=1200&q=80",
    },
    {
        name: "Vessel Candle",
        category: "Home",
        price: "$62",
        description: "A low, warm profile with a scent that lingers softly.",
        image:
            "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=80",
    },
    {
        name: "Silk Line Dress",
        category: "Evening",
        price: "$410",
        description: "Liquid movement, precise cut, and a refined finish.",
        image:
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80",
    },
];

function ArrivalCard({ item }) {
    return (
        <article className="group overflow-hidden rounded-[28px] border border-white/8 bg-[#131111] shadow-[0_24px_80px_rgba(0,0,0,0.28)] transition-all duration-500 hover:-translate-y-1 hover:border-[#c9a96e]/30">
            <div className="relative aspect-4/5 overflow-hidden">
                <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-transparent opacity-90" />

                <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f5f2ed] backdrop-blur-sm">
                    {item.category}
                </div>

                <div className="absolute inset-x-4 bottom-4 flex translate-y-4 flex-col gap-3 rounded-[22px] border border-white/10 bg-[#0e0e0e]/75 p-4 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:flex-row sm:items-center sm:justify-between">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-[#f5f2ed] transition-colors duration-300 hover:border-[#c9a96e] hover:text-[#c9a96e]"
                    >
                        <FiEye />
                        Quick View
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c9a96e] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#0e0e0e] transition-transform duration-300 hover:scale-[1.02]"
                    >
                        <FiShoppingBag />
                        Add to Cart
                    </button>
                </div>
            </div>

            <div className="space-y-4 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="font-['Playfair_Display',Georgia,serif] text-2xl font-semibold tracking-[-0.03em] text-[#f5f2ed]">
                            {item.name}
                        </h2>
                        <p className="mt-1 text-sm uppercase tracking-[0.28em] text-[#a39a8c]">
                            {item.category}
                        </p>
                    </div>
                    <span className="text-lg font-semibold text-[#c9a96e]">{item.price}</span>
                </div>

                <p className="text-sm leading-7 text-[#d8d1c7]">{item.description}</p>

                <div className="flex items-center justify-between border-t border-white/8 pt-4">
                    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#b1a595]">
                        <FiStar className="text-[#c9a96e]" />
                        Just dropped
                    </span>
                    <Link
                        to="/lookbook"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#f5f2ed] transition-colors duration-300 hover:text-[#c9a96e]"
                    >
                        View story
                        <FiArrowRight />
                    </Link>
                </div>
            </div>
        </article>
    );
}

export default function NewArrivals() {
    return (
        <main className="relative overflow-hidden bg-[#0e0e0e] text-[#f5f2ed]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,169,110,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_20%)]" />

            <section className="relative mx-auto max-w-7xl px-4 pb-24 pt-36 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c9a96e]">
                        New Arrivals
                    </p>
                    <h1 className="mt-4 font-['Playfair_Display',Georgia,serif] text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                        The latest pieces, presented with restraint.
                    </h1>
                    <p className="mt-5 text-sm leading-7 text-[#d8d1c7] sm:text-base">
                        Hover each product to reveal quick-view and add-to-cart actions,
                        keeping the grid clean while preserving direct interaction.
                    </p>
                </div>

                <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {ARRIVALS.map((item) => (
                        <ArrivalCard key={item.name} item={item} />
                    ))}
                </div>
            </section>
        </main>
    );
}