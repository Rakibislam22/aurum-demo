import { FiArrowRight, FiMapPin, FiPlus } from "react-icons/fi";
import { Link } from "react-router";

const STORIES = [
    {
        title: "Morning Light",
        text: "A study in softened tailoring and quiet textures for the start of the day.",
        image:
            "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1400&q=80",
        tags: [
            { label: "Tailored Coat", price: "$320", top: "18%", left: "55%" },
            { label: "Studio Shirt", price: "$180", top: "64%", left: "20%" },
        ],
    },
    {
        title: "Evening Volume",
        text: "High-impact silhouettes balanced by an edited palette and sculptural lines.",
        image:
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=80",
        tags: [
            { label: "Silk Dress", price: "$410", top: "20%", left: "22%" },
            { label: "Linear Clutch", price: "$125", top: "70%", left: "66%" },
        ],
    },
];

function ShoppableImage({ story }) {
    return (
        <article className="group overflow-hidden rounded-[32px] border border-white/8 bg-[#121111] shadow-[0_24px_90px_rgba(0,0,0,0.35)]">
            <div className="relative aspect-[4/5] overflow-hidden lg:aspect-[3/4]">
                <img
                    src={story.image}
                    alt={story.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,14,14,0.05),rgba(14,14,14,0.65))]" />

                <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f5f2ed] backdrop-blur-sm">
                    Look 0{story.title === "Morning Light" ? 1 : 2}
                </div>

                {story.tags.map((tag) => (
                    <button
                        key={tag.label}
                        type="button"
                        className="absolute inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-3 py-2 text-[11px] font-medium text-[#f5f2ed] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm transition-transform duration-300 hover:scale-105"
                        style={{ top: tag.top, left: tag.left }}
                    >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#c9a96e] text-[10px] font-semibold text-[#0e0e0e]">
                            <FiPlus />
                        </span>
                        <span className="hidden sm:inline">{tag.label}</span>
                        <span className="text-[#c9a96e]">{tag.price}</span>
                    </button>
                ))}
            </div>

            <div className="space-y-3 p-6 sm:p-7">
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#c9a96e]">
                    <FiMapPin />
                    Shoppable story
                </p>
                <h2 className="font-['Playfair_Display',Georgia,serif] text-3xl font-semibold tracking-[-0.03em] text-[#f5f2ed]">
                    {story.title}
                </h2>
                <p className="max-w-xl text-sm leading-7 text-[#d8d1c7]">{story.text}</p>
            </div>
        </article>
    );
}

export default function Lookbook() {
    return (
        <main className="relative overflow-hidden bg-[#0e0e0e] text-[#f5f2ed]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(201,169,110,0.12),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.04),_transparent_26%)]" />

            <section className="relative mx-auto max-w-7xl px-4 pb-24 pt-36 sm:px-6 lg:px-8">
                <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="max-w-3xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c9a96e]">
                            Lookbook
                        </p>
                        <h1 className="mt-4 font-['Playfair_Display',Georgia,serif] text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                            Editorial stories, composed to feel cinematic and tactile.
                        </h1>
                        <p className="mt-5 max-w-2xl text-sm leading-7 text-[#d8d1c7] sm:text-base">
                            Each spread pairs high-impact imagery with quiet shoppable details,
                            letting the brand narrative lead while keeping the path to product clear.
                        </p>
                    </div>

                    <div className="rounded-[28px] border border-white/8 bg-white/4 p-5 backdrop-blur-sm">
                        <p className="text-xs uppercase tracking-[0.32em] text-[#a39989]">Season note</p>
                        <p className="mt-3 text-sm leading-7 text-[#ddd3c5]">
                            Built around texture, proportion, and movement, the lookbook treats
                            every frame as a still from a longer visual essay.
                        </p>
                        <Link
                            to="/collections"
                            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#c9a96e] transition-transform duration-300 hover:translate-x-1"
                        >
                            Explore collections
                            <FiArrowRight />
                        </Link>
                    </div>
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-2">
                    {STORIES.map((story) => (
                        <ShoppableImage key={story.title} story={story} />
                    ))}
                </div>
            </section>
        </main>
    );
}