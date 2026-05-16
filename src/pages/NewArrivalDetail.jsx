import { FiArrowLeft, FiArrowRight, FiShoppingBag, FiStar } from "react-icons/fi";
import { Link, useParams } from "react-router";
import { siteTokens } from "../lib/siteTheme";
import { formatNewArrivalPrice, getNewArrivalById } from "../lib/newArrivalsData";

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

export default function NewArrivalDetail() {
    const { id } = useParams();
    const item = id ? getNewArrivalById(id) : null;

    if (!item) {
        return (
            <main className="relative min-h-screen overflow-hidden bg-[#0e0e0e] text-[#f5f2ed]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,169,110,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_28%)]" />
                <section className="relative mx-auto max-w-7xl px-4 pb-24 pt-36 sm:px-6 lg:px-8">
                    <Link
                        to="/new-arrivals"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#c9a96e] transition-transform duration-300 hover:-translate-x-1"
                        style={{ fontFamily: siteTokens.fontMono }}
                    >
                        <FiArrowLeft />
                        Back to New Arrivals
                    </Link>

                    <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
                        <p className="text-lg font-semibold text-[#f5f2ed]" style={{ fontFamily: siteTokens.fontDisplay }}>
                            Item not found
                        </p>
                        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#d8d1c7]">
                            The requested New Arrivals item could not be found.
                        </p>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="relative overflow-hidden bg-[#0e0e0e] text-[#f5f2ed]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,169,110,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_28%)]" />

            <section className="relative mx-auto max-w-7xl px-4 pb-24 pt-36 sm:px-6 lg:px-8">
                <Link
                    to="/new-arrivals"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#c9a96e] transition-transform duration-300 hover:-translate-x-1"
                    style={{ fontFamily: siteTokens.fontMono }}
                >
                    <FiArrowLeft />
                    Back to New Arrivals
                </Link>

                <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
                    <div className="space-y-5">
                        <div className="rounded-[28px] border border-white/10 bg-[#121111] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.35)] sm:p-5">
                            <div className="flex items-center justify-between gap-4 pb-4">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.28em] text-[#c9a96e]" style={{ fontFamily: siteTokens.fontMono }}>
                                        New Arrival
                                    </p>
                                    <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#f5f2ed] sm:text-4xl" style={{ fontFamily: siteTokens.fontDisplay }}>
                                        {item.name}
                                    </h1>
                                </div>
                                <div className="rounded-full border border-white/10 bg-black/45 px-4 py-2 text-right backdrop-blur-sm">
                                    <p className="text-[10px] uppercase tracking-[0.28em] text-[#a39989]">Category</p>
                                    <p className="mt-1 text-lg font-semibold text-[#f5f2ed]">{item.category}</p>
                                </div>
                            </div>

                            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#090909]">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="mx-auto max-h-125 w-full object-cover sm:max-h-115"
                                    loading="eager"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f5f2ed]" style={{ fontFamily: siteTokens.fontMono }}>
                                {item.category}
                            </span>
                            <span className="text-xs uppercase tracking-[0.28em] text-[#c9a96e]" style={{ fontFamily: siteTokens.fontMono }}>
                                Curated drop
                            </span>
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-[#a39989]" style={{ fontFamily: siteTokens.fontMono }}>
                                Price
                            </p>
                            <p className="mt-2 text-4xl font-semibold text-[#c9a96e] sm:text-5xl">
                                {formatNewArrivalPrice(item.price)}
                            </p>
                        </div>

                        <p className="text-sm leading-8 text-[#ddd3c5] sm:text-base">
                            {item.description}
                        </p>

                        <p className="text-sm leading-8 text-[#ddd3c5] sm:text-base">
                            {item.story}
                        </p>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {item.details.map((detail) => (
                                <div key={detail} className="rounded-3xl border border-white/10 bg-black/15 p-4">
                                    <p className="text-sm font-medium text-[#f5f2ed]">{detail}</p>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-black/15 p-4">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.28em] text-[#a39989]" style={{ fontFamily: siteTokens.fontMono }}>
                                        Rating
                                    </p>
                                    <p className="mt-2 text-lg font-semibold text-[#f5f2ed]">4.8 / 5</p>
                                </div>
                                <Stars value={4} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c9a96e] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#0e0e0e] transition-transform duration-300 hover:scale-[1.02]"
                            >
                                <FiShoppingBag />
                                Add to Cart
                            </button>
                            <Link
                                to="/new-arrivals"
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#f5f2ed] transition-colors duration-300 hover:border-[#c9a96e] hover:text-[#c9a96e]"
                            >
                                See all arrivals
                                <FiArrowRight />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
