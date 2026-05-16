import { useMemo, useState } from "react";
import { FiArrowRight, FiFilter } from "react-icons/fi";
import { Link } from "react-router";

const CATEGORY_FILTERS = ["All", "Men", "Women", "Accessories", "Home"];

const COLLECTIONS = [
    {
        name: "Men",
        category: "Men",
        description: "Tailored layers, sculpted knits, and quiet utility.",
        items: 18,
        tone: "from-[#1f1a17] to-[#0f0d0c]",
        chip: "Foundations",
    },
    {
        name: "Women",
        category: "Women",
        description: "Fluid tailoring and soft structure with an editorial finish.",
        items: 22,
        tone: "from-[#161615] to-[#0f0e0d]",
        chip: "Signature",
    },
    {
        name: "Accessories",
        category: "Accessories",
        description: "Objects that sharpen an edit without overpowering it.",
        items: 14,
        tone: "from-[#2a221a] to-[#120f0d]",
        chip: "Details",
    },
    {
        name: "Home",
        category: "Home",
        description: "Ritual pieces designed to bring calm into the room.",
        items: 12,
        tone: "from-[#1a1c20] to-[#101112]",
        chip: "Atmosphere",
    },
    {
        name: "Atelier Edit",
        category: "Women",
        description: "Limited pieces chosen for precise silhouettes and tactile depth.",
        items: 9,
        tone: "from-[#181513] to-[#0f0d0b]",
        chip: "Limited",
    },
    {
        name: "Travel Objects",
        category: "Accessories",
        description: "Compact essentials for movement, travel, and daily carry.",
        items: 11,
        tone: "from-[#161513] to-[#0f0d0b]",
        chip: "Utility",
    },
];

function CollectionsHeader() {
    return (
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-36 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c9a96e]">
                    Collections
                </p>
                <h1 className="mt-4 font-['Playfair_Display',Georgia,serif] text-4xl font-semibold tracking-[-0.03em] text-[#f5f2ed] sm:text-5xl lg:text-6xl">
                    Curated categories, arranged with calm precision.
                </h1>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-[#d8d1c7] sm:text-base">
                    Filter the assortment across menswear, womenswear, accessories, and
                    home. Each edit is designed as a gallery-like grid with room to breathe.
                </p>
            </div>
        </div>
    );
}

export default function Collections() {
    const [activeFilter, setActiveFilter] = useState("All");

    const visibleCollections = useMemo(() => {
        if (activeFilter === "All") {
            return COLLECTIONS;
        }
        return COLLECTIONS.filter((collection) => collection.category === activeFilter);
    }, [activeFilter]);

    return (
        <main className="relative w-full overflow-hidden bg-[#0e0e0e] text-[#f5f2ed]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,169,110,0.12),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_28%)]" />
            <div className="relative w-full">
                <CollectionsHeader />

                <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
                    {/* Filter bar configuration fix */}
                    <div className="flex flex-col gap-6 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-3 text-sm text-[#d8d1c7]">
                            <FiFilter className="text-[#c9a96e]" />
                            <span>Refine the edit</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {CATEGORY_FILTERS.map((filter) => (
                                <button
                                    key={filter}
                                    type="button"
                                    onClick={() => setActiveFilter(filter)}
                                    aria-pressed={activeFilter === filter}
                                    className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] transition-all duration-300 ${activeFilter === filter
                                        ? "border-[#c9a96e] bg-[#c9a96e] text-[#0e0e0e]"
                                        : "border-white/10 bg-transparent text-[#d8d1c7] hover:border-white/20 hover:bg-white/5"
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Responsive Grid Layout constraints fix */}
                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {visibleCollections.map((collection) => (
                            <article
                                key={collection.name}
                                className={`group relative flex min-h-95 flex-col overflow-hidden rounded-[28px] border border-white/10 bg-linear-to-br ${collection.tone} shadow-[0_24px_80px_rgba(0,0,0,0.35)] transition-transform duration-500 hover:-translate-y-1`}
                            >
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_32%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                                {/* Structural flex column wrapping everything cleanly */}
                                <div className="relative flex flex-1 flex-col justify-between p-8">
                                    <div className="flex items-start justify-between gap-3">
                                        <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f5f2ed]">
                                            {collection.chip}
                                        </span>
                                        <span className="text-xs uppercase tracking-[0.28em] text-[#c9a96e]">
                                            {collection.items.toString().padStart(2, "0")} pieces
                                        </span>
                                    </div>

                                    <div className="my-6">
                                        <h2 className="font-['Playfair_Display',Georgia,serif] text-2xl font-semibold tracking-[-0.03em] text-[#f8f4ef] sm:text-3xl">
                                            {collection.name}
                                        </h2>
                                        <p className="mt-3 text-sm leading-7 text-[#ddd3c5]">
                                            {collection.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-white/10 pt-5 text-sm text-[#f5f2ed]">
                                        <span>Explore the category</span>
                                        <Link
                                            to="/new-arrivals"
                                            className="inline-flex items-center gap-2 text-[#c9a96e] transition-transform duration-300 group-hover:translate-x-1"
                                        >
                                            View edit
                                            <FiArrowRight />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}