import { useEffect, useMemo, useState } from "react";
import { FiArrowLeft, FiStar } from "react-icons/fi";
import { Link, useParams } from "react-router";
import { siteTokens } from "../lib/siteTheme";

const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
});

const FALLBACK_REVIEWS = [
    {
        reviewerName: "Ariane Leclercq",
        rating: 5,
        comment: "The finish feels impeccably considered. It reads quiet in the best way.",
        date: "2026-04-12",
    },
    {
        reviewerName: "Kenji Watanabe",
        rating: 5,
        comment: "Material, silhouette, and packaging all feel aligned with a premium edit.",
        date: "2026-04-18",
    },
    {
        reviewerName: "Sofia Marchetti",
        rating: 4,
        comment: "Elegant, minimal, and easy to style into a larger wardrobe system.",
        date: "2026-04-27",
    },
];

function Stars({ value = 0 }) {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
                <FiStar
                    key={index}
                    className={index < Math.round(value) ? "text-[#c9a96e]" : "text-white/20"}
                    size={14}
                    fill={index < Math.round(value) ? "currentColor" : "none"}
                />
            ))}
        </div>
    );
}

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {
        if (!id) {
            setError("Missing product id.");
            setLoading(false);
            return undefined;
        }

        const controller = new AbortController();

        async function loadProduct() {
            setLoading(true);
            setError("");

            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`, {
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }

                const data = await response.json();
                setProduct(data);
            } catch (fetchError) {
                if (fetchError.name !== "AbortError") {
                    setError("We could not load this product right now. Please try again.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadProduct();
        return () => controller.abort();
    }, [id]);

    const images = useMemo(() => {
        const list = [product?.thumbnail, ...(product?.images || [])].filter(Boolean);
        return Array.from(new Set(list));
    }, [product]);

    useEffect(() => {
        setSelectedImage(images[0] || "");
    }, [images]);

    const reviews = useMemo(() => {
        return product?.reviews?.length ? product.reviews : FALLBACK_REVIEWS;
    }, [product]);

    const heroImage = selectedImage || images[0] || "";

    return (
        <main className="relative w-full overflow-hidden bg-[#0e0e0e] text-[#f5f2ed]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,169,110,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_28%)]" />

            <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <Link
                    to="/collections"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#c9a96e] transition-transform duration-300 hover:-translate-x-1"
                    style={{ fontFamily: siteTokens.fontMono }}
                >
                    <FiArrowLeft />
                    Back to Collections
                </Link>

                {loading ? (
                    <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                        <div className="h-[70vh] animate-pulse rounded-4xl border border-white/10 bg-white/5" />
                        <div className="space-y-4 rounded-4xl border border-white/10 bg-white/5 p-8 animate-pulse">
                            <div className="h-4 w-32 rounded-full bg-white/10" />
                            <div className="h-12 w-3/4 rounded-full bg-white/10" />
                            <div className="h-4 w-full rounded-full bg-white/10" />
                            <div className="h-4 w-11/12 rounded-full bg-white/10" />
                            <div className="h-4 w-5/6 rounded-full bg-white/10" />
                        </div>
                    </div>
                ) : error ? (
                    <div className="mt-8 rounded-4xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
                        <p className="text-lg font-semibold text-[#f5f2ed]" style={{ fontFamily: siteTokens.fontDisplay }}>
                            Unable to load product
                        </p>
                        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#d8d1c7]">{error}</p>
                        <Link
                            to="/collections"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#c9a96e] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#0e0e0e] transition-transform duration-300 hover:scale-[1.02]"
                        >
                            Return to collections
                        </Link>
                    </div>
                ) : product ? (
                    <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
                        <div className="space-y-5">
                            <div className="rounded-4xl border border-white/10 bg-[#121111] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.35)] sm:p-5">
                                <div className="flex items-center justify-between gap-4 pb-4">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.28em] text-[#c9a96e]" style={{ fontFamily: siteTokens.fontMono }}>
                                            Product {product.id}
                                        </p>
                                        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#f5f2ed] sm:text-4xl" style={{ fontFamily: siteTokens.fontDisplay }}>
                                            {product.title}
                                        </h1>
                                    </div>
                                    <div className="rounded-full border border-white/10 bg-black/45 px-4 py-2 text-right backdrop-blur-sm">
                                        <p className="text-[10px] uppercase tracking-[0.28em] text-[#a39989]">Rating</p>
                                        <p className="mt-1 text-lg font-semibold text-[#f5f2ed]">{product.rating}</p>
                                    </div>
                                </div>

                                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#090909]">
                                    <img
                                        src={heroImage}
                                        alt={product.title}
                                        className="mx-auto max-h-125 w-full object-contain sm:max-h-115"
                                        loading="eager"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                {images.slice(0, 4).map((image, index) => (
                                    <button
                                        key={`${product.id}-${index}`}
                                        type="button"
                                        onClick={() => setSelectedImage(image)}
                                        className={`overflow-hidden rounded-3xl border transition-all duration-300 ${heroImage === image ? "border-[#c9a96e] ring-1 ring-[#c9a96e]/40" : "border-white/10 hover:border-white/20"}`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.title} preview ${index + 1}`}
                                            className="aspect-square h-full w-full object-cover"
                                            loading="lazy"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6 rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f5f2ed]" style={{ fontFamily: siteTokens.fontMono }}>
                                    {product.category}
                                </span>
                                <span className="text-xs uppercase tracking-[0.28em] text-[#c9a96e]" style={{ fontFamily: siteTokens.fontMono }}>
                                    {product.availabilityStatus || "Availability not listed"}
                                </span>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-[0.3em] text-[#a39989]" style={{ fontFamily: siteTokens.fontMono }}>
                                    Price
                                </p>
                                <p className="mt-2 text-4xl font-semibold text-[#c9a96e] sm:text-5xl">
                                    {currencyFormatter.format(product.price)}
                                </p>
                            </div>

                            <p className="text-sm leading-8 text-[#ddd3c5] sm:text-base">
                                {product.description}
                            </p>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-3xl border border-white/10 bg-black/15 p-4">
                                    <p className="text-xs uppercase tracking-[0.28em] text-[#a39989]" style={{ fontFamily: siteTokens.fontMono }}>
                                        Stock
                                    </p>
                                    <p className="mt-2 text-lg font-semibold text-[#f5f2ed]">{product.stock} units</p>
                                </div>
                                <div className="rounded-3xl border border-white/10 bg-black/15 p-4">
                                    <p className="text-xs uppercase tracking-[0.28em] text-[#a39989]" style={{ fontFamily: siteTokens.fontMono }}>
                                        Tags
                                    </p>
                                    <p className="mt-2 text-lg font-semibold text-[#f5f2ed]">
                                        {(product.tags || []).slice(0, 2).join(" • ") || "Curated edit"}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.28em] text-[#a39989]" style={{ fontFamily: siteTokens.fontMono }}>
                                            Customer reviews
                                        </p>
                                        <p className="mt-2 text-sm text-[#d8d1c7]">A small selection of recent notes from the community.</p>
                                    </div>
                                    <Stars value={product.rating} />
                                </div>

                                <div className="mt-5 space-y-4">
                                    {reviews.map((review, index) => (
                                        <article key={`${review.reviewerName || review.reviewer || index}-${index}`} className="rounded-3xl border border-white/10 bg-black/20 p-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className="font-semibold text-[#f5f2ed]">
                                                        {review.reviewerName || review.reviewer || "Anonymous"}
                                                    </p>
                                                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-[#a39989]" style={{ fontFamily: siteTokens.fontMono }}>
                                                        {review.date || "Recent"}
                                                    </p>
                                                </div>
                                                <Stars value={review.rating || product.rating} />
                                            </div>
                                            <p className="mt-3 text-sm leading-7 text-[#d8d1c7]">
                                                {review.comment || "A refined and dependable piece."}
                                            </p>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </section>
        </main>
    );
}