import { useEffect, useMemo, useState } from "react";
import { FiArrowRight, FiCalendar, FiCheckCircle, FiPackage, FiShoppingBag } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import { getCurrentUser, subscribeAuth } from "../lib/auth";
import { getSavedOrders } from "../lib/checkout";
import { siteTokens } from "../lib/siteTheme";
import { toast } from "react-toastify";

const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
});

function OrderCard({ order }) {
    return (
        <article className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <p className="text-[10px] uppercase tracking-[0.34em] text-[#c9a96e]" style={{ fontFamily: siteTokens.fontMono }}>
                        {order.id}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#f5f2ed]" style={{ fontFamily: siteTokens.fontDisplay }}>
                        Order placed
                    </h2>
                    <p className="mt-2 flex items-center gap-2 text-sm text-[#d8d1c7]">
                        <FiCalendar className="text-[#c9a96e]" />
                        {new Date(order.createdAt).toLocaleString()}
                    </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-right">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-[#a39989]" style={{ fontFamily: siteTokens.fontMono }}>
                        Total
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-[#c9a96e]">
                        {currencyFormatter.format(order.total || 0)}
                    </p>
                </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#a39989]" style={{ fontFamily: siteTokens.fontMono }}>
                <FiCheckCircle className="text-[#c9a96e]" />
                A person will connect you soon
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {(order.items || []).map((item) => (
                    <div key={`${order.id}-${item.id}`} className="flex items-center gap-3 rounded-3xl border border-white/10 bg-black/15 p-3">
                        <div className="h-14 w-14 flex-none overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e0e]">
                            <img src={item.image || ""} alt={item.title} className="h-full w-full object-contain" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate font-medium text-[#f5f2ed]">{item.title}</p>
                            <p className="mt-1 text-sm text-[#d8d1c7]">Qty {item.quantity || 1}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-5 rounded-3xl border border-white/10 bg-black/15 p-4">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#a39989]" style={{ fontFamily: siteTokens.fontMono }}>
                    Delivery details
                </p>
                <p className="mt-3 text-sm leading-7 text-[#d8d1c7]">
                    {order.address?.name}, {order.address?.line1}
                    {order.address?.line2 ? `, ${order.address.line2}` : ""}
                    , {order.address?.city}, {order.address?.state} {order.address?.postalCode}
                    , {order.address?.country}
                </p>
                <p className="mt-2 text-sm text-[#d8d1c7]">Phone: {order.phone}</p>
            </div>
        </article>
    );
}

export default function MyOrders() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
    const [orders, setOrders] = useState(() => (currentUser ? getSavedOrders(currentUser.email) : []));

    useEffect(() => subscribeAuth(() => {
        const nextUser = getCurrentUser();
        setCurrentUser(nextUser);
        setOrders(nextUser ? getSavedOrders(nextUser.email) : []);
    }), []);

    useEffect(() => {
        if (!currentUser) {
            toast.info("Please login to view your orders.");
            navigate("/", { replace: true });
        }
    }, [currentUser, navigate]);

    const latestOrder = useMemo(() => orders[0] || null, [orders]);

    if (!currentUser) {
        return null;
    }

    return (
        <main className="relative overflow-hidden bg-[#0e0e0e] text-[#f5f2ed]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,169,110,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_20%)]" />

            <section className="relative mx-auto max-w-7xl px-4 pb-24 pt-36 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c9a96e]" style={{ fontFamily: siteTokens.fontMono }}>
                        My Orders
                    </p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl" style={{ fontFamily: siteTokens.fontDisplay }}>
                        {currentUser.name}'s order history
                    </h1>
                    <p className="mt-5 text-sm leading-7 text-[#d8d1c7] sm:text-base">
                        All orders created from this account are stored locally and shown only when you are logged in.
                    </p>
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="space-y-5">
                        {orders.length === 0 ? (
                            <div className="rounded-[28px] border border-white/10 bg-white/5 p-10 text-center backdrop-blur-sm">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-black/20 text-[#c9a96e]">
                                    <FiPackage size={24} />
                                </div>
                                <h2 className="mt-5 text-2xl font-semibold" style={{ fontFamily: siteTokens.fontDisplay }}>
                                    No orders yet
                                </h2>
                                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#d8d1c7]">
                                    Once you place an order from checkout, it will appear here.
                                </p>
                                <Link
                                    to="/collections"
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#c9a96e] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#0e0e0e] transition-transform duration-300 hover:scale-[1.02]"
                                >
                                    Start shopping
                                    <FiArrowRight />
                                </Link>
                            </div>
                        ) : (
                            orders.map((order) => <OrderCard key={order.id} order={order} />)
                        )}
                    </div>

                    <aside className="h-fit rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
                        <p className="text-xs uppercase tracking-[0.28em] text-[#a39989]" style={{ fontFamily: siteTokens.fontMono }}>
                            Account summary
                        </p>

                        <div className="mt-5 space-y-4 text-sm text-[#d8d1c7]">
                            <div className="rounded-3xl border border-white/10 bg-black/15 p-4">
                                <p className="text-[10px] uppercase tracking-[0.28em] text-[#a39989]" style={{ fontFamily: siteTokens.fontMono }}>
                                    Logged in as
                                </p>
                                <p className="mt-2 text-lg font-semibold text-[#f5f2ed]">{currentUser.name}</p>
                                <p className="mt-1 text-sm text-[#d8d1c7]">{currentUser.email}</p>
                            </div>

                            <div className="rounded-3xl border border-white/10 bg-black/15 p-4">
                                <p className="text-[10px] uppercase tracking-[0.28em] text-[#a39989]" style={{ fontFamily: siteTokens.fontMono }}>
                                    Total orders
                                </p>
                                <p className="mt-2 text-3xl font-semibold text-[#c9a96e]">{orders.length}</p>
                            </div>

                            {latestOrder && (
                                <div className="rounded-3xl border border-white/10 bg-black/15 p-4">
                                    <p className="text-[10px] uppercase tracking-[0.28em] text-[#a39989]" style={{ fontFamily: siteTokens.fontMono }}>
                                        Latest order
                                    </p>
                                    <p className="mt-2 text-lg font-semibold text-[#f5f2ed]">{latestOrder.id}</p>
                                    <p className="mt-1 text-sm text-[#d8d1c7]">{latestOrder.items?.length || 0} items</p>
                                </div>
                            )}

                            <Link
                                to="/cart"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/12 px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#f5f2ed] transition-colors duration-300 hover:border-[#c9a96e] hover:text-[#c9a96e]"
                            >
                                Back to cart
                                <FiShoppingBag />
                            </Link>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}
