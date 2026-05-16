import { useEffect, useState } from "react";
import { FiArrowRight, FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import { clearCart, getCartItems, removeCartItem, subscribeCart, updateCartItemQuantity } from "../lib/cart";
import { siteTokens } from "../lib/siteTheme";

const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
});

function Cart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(() => getCartItems());

    useEffect(() => subscribeCart(() => setCartItems(getCartItems())), []);

    const subtotal = cartItems.reduce((total, item) => total + (Number(item.price) || 0) * (item.quantity || 0), 0);
    const shipping = cartItems.length ? 18 : 0;
    const total = subtotal + shipping;

    return (
        <main className="relative overflow-hidden bg-[#0e0e0e] text-[#f5f2ed]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,169,110,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_20%)]" />

            <section className="relative mx-auto max-w-7xl px-4 pb-24 pt-36 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c9a96e]" style={{ fontFamily: siteTokens.fontMono }}>
                        Cart
                    </p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl" style={{ fontFamily: siteTokens.fontDisplay }}>
                        Your saved selections
                    </h1>
                    <p className="mt-5 text-sm leading-7 text-[#d8d1c7] sm:text-base">
                        Items you add from the collection, product detail, and new arrivals pages are stored in your browser and stay here until you clear them.
                    </p>
                </div>

                {cartItems.length === 0 ? (
                    <div className="mt-10 rounded-4xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-sm">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-black/20 text-[#c9a96e]">
                            <FiShoppingBag size={24} />
                        </div>
                        <h2 className="mt-5 text-2xl font-semibold" style={{ fontFamily: siteTokens.fontDisplay }}>
                            Your cart is empty
                        </h2>
                        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#d8d1c7]">
                            Start by adding a product from Collections, New Arrivals, or a product detail page.
                        </p>
                        <Link
                            to="/collections"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#c9a96e] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#0e0e0e] transition-transform duration-300 hover:scale-[1.02]"
                        >
                            Browse collections
                            <FiArrowRight />
                        </Link>
                    </div>
                ) : (
                    <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <article key={item.id} className="flex flex-col gap-4 rounded-4xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:flex-row sm:items-center">
                                    <div className="h-28 w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0e0e0e] sm:h-24 sm:w-24 sm:flex-none">
                                        <img
                                            src={item.image || ""}
                                            alt={item.title}
                                            className="h-full w-full object-contain"
                                        />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-start justify-between gap-3">
                                            <div>
                                                <h2 className="text-xl font-semibold tracking-[-0.03em]" style={{ fontFamily: siteTokens.fontDisplay }}>
                                                    {item.title}
                                                </h2>
                                                <p className="mt-1 text-xs uppercase tracking-[0.28em] text-[#a39989]" style={{ fontFamily: siteTokens.fontMono }}>
                                                    {item.category || "Curated item"}
                                                </p>
                                            </div>
                                            <p className="text-lg font-semibold text-[#c9a96e]">{currencyFormatter.format(item.price * item.quantity)}</p>
                                        </div>

                                        <div className="mt-4 flex flex-wrap items-center gap-3">
                                            <div className="inline-flex items-center rounded-full border border-white/10 bg-black/20">
                                                <button
                                                    type="button"
                                                    onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                                                    className="flex h-10 w-10 items-center justify-center text-[#f5f2ed] transition-colors hover:text-[#c9a96e]"
                                                    aria-label={`Decrease quantity for ${item.title}`}
                                                >
                                                    <FiMinus />
                                                </button>
                                                <span className="min-w-10 px-3 text-center text-sm font-semibold">{item.quantity}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                                                    className="flex h-10 w-10 items-center justify-center text-[#f5f2ed] transition-colors hover:text-[#c9a96e]"
                                                    aria-label={`Increase quantity for ${item.title}`}
                                                >
                                                    <FiPlus />
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeCartItem(item.id)}
                                                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#f5f2ed] transition-colors hover:border-[#c9a96e] hover:text-[#c9a96e]"
                                            >
                                                <FiTrash2 />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <aside className="h-fit rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
                            <p className="text-xs uppercase tracking-[0.28em] text-[#a39989]" style={{ fontFamily: siteTokens.fontMono }}>
                                Order summary
                            </p>

                            <div className="mt-5 space-y-3 text-sm text-[#d8d1c7]">
                                <div className="flex items-center justify-between">
                                    <span>Subtotal</span>
                                    <span>{currencyFormatter.format(subtotal)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Shipping</span>
                                    <span>{shipping ? currencyFormatter.format(shipping) : "Free"}</span>
                                </div>
                                <div className="border-t border-white/10 pt-3 flex items-center justify-between text-base font-semibold text-[#f5f2ed]">
                                    <span>Total</span>
                                    <span>{currencyFormatter.format(total)}</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => navigate("/checkout")}
                                disabled={cartItems.length === 0}
                                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#c9a96e] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#0e0e0e] transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Checkout
                                <FiArrowRight />
                            </button>

                            <button
                                type="button"
                                onClick={clearCart}
                                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#f5f2ed] transition-colors hover:border-[#c9a96e] hover:text-[#c9a96e]"
                            >
                                Clear cart
                            </button>
                        </aside>
                    </div>
                )}
            </section>
        </main>
    );
}

export default Cart;
