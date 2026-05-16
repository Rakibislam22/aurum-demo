import { FiArrowRight, FiFeather, FiHeart, FiShield, FiSunrise } from "react-icons/fi";
import { Link } from "react-router";

const VALUES = [
    {
        icon: FiFeather,
        title: "Refined Craft",
        text: "Pieces are selected for finish, proportion, and the quiet confidence they bring to a room or wardrobe.",
    },
    {
        icon: FiHeart,
        title: "Intentional Living",
        text: "We believe the right object changes how a space feels and how a day moves.",
    },
    {
        icon: FiShield,
        title: "Considered Longevity",
        text: "Every collection is edited to remain relevant beyond the season in which it launches.",
    },
];

export default function About() {
    return (
        <main className="relative overflow-hidden bg-[#0e0e0e] text-[#f5f2ed]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,169,110,0.1),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_18%)]" />

            <section className="relative mx-auto max-w-7xl px-4 pb-24 pt-36 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
                    <div className="max-w-xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c9a96e]">
                            About Aurum
                        </p>
                        <h1 className="mt-4 font-['Playfair_Display',Georgia,serif] text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                            A minimalist house built around beauty, restraint, and staying power.
                        </h1>
                        <p className="mt-5 text-sm leading-7 text-[#d8d1c7] sm:text-base">
                            Aurum exists to curate objects and garments with an editorial eye.
                            We value silhouette, material, and the emotional weight of things that
                            are made well and meant to last.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                to="/collections"
                                className="inline-flex items-center gap-2 rounded-full bg-[#c9a96e] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#0e0e0e] transition-transform duration-300 hover:scale-[1.02]"
                            >
                                Shop collections
                                <FiArrowRight />
                            </Link>
                            <Link
                                to="/lookbook"
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#f5f2ed] transition-colors duration-300 hover:border-[#c9a96e] hover:text-[#c9a96e]"
                            >
                                View lookbook
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-4xl border border-white/8 bg-white/4 p-6 sm:p-8">
                            <p className="text-xs uppercase tracking-[0.3em] text-[#a39989]">Mission</p>
                            <p className="mt-4 text-base leading-8 text-[#f1ece5] sm:text-lg">
                                To create a shopping experience that feels calm, curated, and quietly
                                luxurious without losing clarity or usefulness.
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="rounded-4xl border border-white/8 bg-linear-to-br from-[#1b1714] to-[#0f0e0d] p-6 sm:p-7">
                                <p className="text-xs uppercase tracking-[0.3em] text-[#a39989]">Founder</p>
                                <h2 className="mt-4 font-['Playfair_Display',Georgia,serif] text-2xl font-semibold tracking-[-0.03em] text-[#f5f2ed]">
                                    Founded by a collector, styled like an atelier.
                                </h2>
                                <p className="mt-3 text-sm leading-7 text-[#d8d1c7]">
                                    The brand began with a private edit of objects chosen for their
                                    balance, tactility, and emotional resonance.
                                </p>
                            </div>

                            <div className="rounded-4xl border border-white/8 bg-white/4 p-6 sm:p-7">
                                <FiSunrise className="text-2xl text-[#c9a96e]" />
                                <h2 className="mt-4 font-['Playfair_Display',Georgia,serif] text-2xl font-semibold tracking-[-0.03em] text-[#f5f2ed]">
                                    Core Values
                                </h2>
                                <p className="mt-3 text-sm leading-7 text-[#d8d1c7]">
                                    Edit less, choose better, and let every detail earn its place.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 grid gap-5 lg:grid-cols-3">
                    {VALUES.map((value) => {
                        const Icon = value.icon;

                        return (
                            <article
                                key={value.title}
                                className="rounded-[28px] border border-white/8 bg-[#121111] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.24)]"
                            >
                                <Icon className="text-2xl text-[#c9a96e]" />
                                <h3 className="mt-5 font-['Playfair_Display',Georgia,serif] text-2xl font-semibold tracking-[-0.03em] text-[#f5f2ed]">
                                    {value.title}
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-[#d8d1c7]">{value.text}</p>
                            </article>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}