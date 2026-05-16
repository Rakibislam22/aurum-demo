import { useEffect, useMemo, useState } from "react";
import { FiArrowRight, FiFilter } from "react-icons/fi";
import { Link } from "react-router";
import { siteTokens } from "../lib/siteTheme";

const CATEGORY_FILTERS = ["All", "Men", "Women", "Accessories", "Home"];

const FILTER_CATEGORY_MAP = {
    Men: new Set(["mens-shirts", "mens-shoes", "mens-watches"]),
    Women: new Set(["womens-dresses", "womens-shoes", "womens-bags", "womens-jewellery", "tops"]),
    Accessories: new Set(["mobile-accessories", "sports-accessories", "sunglasses", "womens-bags", "womens-jewellery"]),
    Home: new Set(["furniture", "home-decoration", "kitchen-accessories", "groceries"]),
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
});

function normalizeProduct(product) {
    return {
        ...product,
        image: product.thumbnail || product.images?.[0] || "",
        chip: product.brand || product.tags?.[0] || "Aurum Edit",
    };
}

function matchesActiveFilter(product, activeFilter) {
    if (activeFilter === "All") {
        return true;
    }

    const allowedCategories = FILTER_CATEGORY_MAP[activeFilter];
    return allowedCategories ? allowedCategories.has(product.category) : false;
}

function CollectionsHeader() {
    return (
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-36 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c9a96e]" style={{ fontFamily: siteTokens.fontMono }}>
                    Collections
                </p>
                <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-[#f5f2ed] sm:text-5xl lg:text-6xl" style={{ fontFamily: siteTokens.fontDisplay }}>
                    Curated products, mapped from live product data.
                </h1>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-[#d8d1c7] sm:text-base">
                    Browse a premium grid powered by DummyJSON. Use the category filters to move between men, women,
                    accessories, and home without leaving the page.
                </p>
            </div>
        </div>
    );
}

function CollectionsSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="min-h-95 animate-pulse overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                    <div className="h-full w-full bg-linear-to-br from-white/6 via-white/3 to-transparent p-6">
                        <div className="mb-24 h-4 w-28 rounded-full bg-white/10" />
                        <div className="mb-4 h-8 w-3/4 rounded-full bg-white/10" />
                        <div className="mb-2 h-4 w-full rounded-full bg-white/10" />
                        <div className="mb-2 h-4 w-11/12 rounded-full bg-white/10" />
                        <div className="h-4 w-2/3 rounded-full bg-white/10" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function Collections() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function loadProducts() {
            setLoading(true);
            setError("");

            try {
                const response = await fetch("https://dummyjson.com/products?limit=500", {
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }

                const data = await response.json();
                setProducts((data.products || []).map(normalizeProduct));
            } catch (fetchError) {
                if (fetchError.name !== "AbortError") {
                    setError("We could not load the latest catalog right now. Please try again.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadProducts();
        return () => controller.abort();
    }, []);

    const visibleProducts = useMemo(() => products.filter((product) => matchesActiveFilter(product, activeFilter)), [activeFilter, products]);

    return (
        <main className="relative w-full overflow-x-hidden bg-[#0e0e0e] text-[#f5f2ed]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,169,110,0.12),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_28%)]" />
            <div className="relative w-full">
                <CollectionsHeader />

                <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
                    <div className="sticky top-18 z-40 mb-8 flex flex-col gap-6 rounded-3xl border border-white/10 bg-[#0e0e0e]/90 p-6 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-3 text-sm text-[#d8d1c7]" style={{ fontFamily: siteTokens.fontBody }}>
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
                                    className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] transition-all duration-300 ${activeFilter === filter ? "border-[#c9a96e] bg-[#c9a96e] text-[#0e0e0e]" : "border-white/10 bg-transparent text-[#d8d1c7] hover:border-white/20 hover:bg-white/5"}`}
                                    style={{ fontFamily: siteTokens.fontMono }}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8">
                        {loading ? (
                            <CollectionsSkeleton />
                        ) : error ? (
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
                                <p className="text-lg font-semibold text-[#f5f2ed]" style={{ fontFamily: siteTokens.fontDisplay }}>
                                    Unable to load products
                                </p>
                                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#d8d1c7]">{error}</p>
                                <button
                                    type="button"
                                    onClick={() => window.location.reload()}
                                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#c9a96e] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#f5f2ed] transition-colors duration-300 hover:bg-[#c9a96e] hover:text-[#0e0e0e]"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : visibleProducts.length === 0 ? (
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
                                <p className="text-lg font-semibold text-[#f5f2ed]" style={{ fontFamily: siteTokens.fontDisplay }}>
                                    No products match this filter
                                </p>
                                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#d8d1c7]">
                                    Try a different category or return to All to see the full selection.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setActiveFilter("All")}
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#c9a96e] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#0e0e0e] transition-transform duration-300 hover:scale-[1.02]"
                                >
                                    Show all products
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {visibleProducts.map((product) => (
                                    <article
                                        key={product.id}
                                        className="group relative flex min-h-128 flex-col overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-[#151311] via-[#121110] to-[#0b0b0b] shadow-[0_24px_80px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-1 hover:border-white/15"
                                    >
                                        <div className="relative h-[64%] min-h-[22rem] overflow-hidden bg-[#0c0b0a]">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        </div>

                                        <div className="relative flex flex-1 flex-col justify-end p-6 sm:p-7">
                                            <div className="flex items-start justify-between gap-3">
                                                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f5f2ed]" style={{ fontFamily: siteTokens.fontMono }}>
                                                    {product.chip}
                                                </span>
                                                <span className="text-xs uppercase tracking-[0.28em] text-[#c9a96e]" style={{ fontFamily: siteTokens.fontMono }}>
                                                    {currencyFormatter.format(product.price)}
                                                </span>
                                            </div>

                                            <div className="mt-10 flex flex-1 flex-col justify-end">
                                                <h2 className="max-w-[14ch] text-2xl font-semibold tracking-[-0.04em] text-[#f8f4ef] sm:text-[1.9rem]" style={{ fontFamily: siteTokens.fontDisplay }}>
                                                    {product.title}
                                                </h2>

                                                <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-5 text-sm text-[#f5f2ed]">
                                                    <span className="text-xs uppercase tracking-[0.24em] text-[#a39989]" style={{ fontFamily: siteTokens.fontMono }}>
                                                        Premium edit
                                                    </span>
                                                    <Link
                                                        to={`/products/${product.id}`}
                                                        className="inline-flex items-center gap-2 text-[#c9a96e] transition-transform duration-300 group-hover:translate-x-1"
                                                    >
                                                        View edit
                                                        <FiArrowRight />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}