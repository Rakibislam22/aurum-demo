import { useEffect, useState } from "react";
import { FiArrowRight, FiMapPin, FiSave, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import AuthModal from "../components/AuthModal";
import CheckoutSuccessModal from "../components/CheckoutSuccessModal";
import { getCurrentUser, subscribeAuth } from "../lib/auth";
import { clearCart, getCartItems, subscribeCart } from "../lib/cart";
import { getSavedAddresses, saveAddress, saveOrder } from "../lib/checkout";
import { siteTokens } from "../lib/siteTheme";
import { toast } from "react-toastify";

const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
});

const EMPTY_FORM = {
    name: "",
    email: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
};

function buildFormFromUser(user) {
    return {
        ...EMPTY_FORM,
        name: user?.name || "",
        email: user?.email || "",
    };
}

export default function Checkout() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
    const [cartItems, setCartItems] = useState(() => getCartItems());
    const [savedAddresses, setSavedAddresses] = useState(() => {
        const user = getCurrentUser();
        return user ? getSavedAddresses(user.email) : [];
    });
    const [selectedAddressId, setSelectedAddressId] = useState(() => {
        const user = getCurrentUser();
        const addresses = user ? getSavedAddresses(user.email) : [];
        return addresses[0]?.id || "";
    });
    const [formValues, setFormValues] = useState(() => {
        const user = getCurrentUser();
        const addresses = user ? getSavedAddresses(user.email) : [];
        const activeAddress = addresses[0];

        return activeAddress
            ? {
                ...EMPTY_FORM,
                name: activeAddress.name || user?.name || "",
                email: activeAddress.email || user?.email || "",
                phone: activeAddress.phone || "",
                line1: activeAddress.line1 || "",
                line2: activeAddress.line2 || "",
                city: activeAddress.city || "",
                state: activeAddress.state || "",
                postalCode: activeAddress.postalCode || "",
                country: activeAddress.country || "",
            }
            : buildFormFromUser(user);
    });
    const [saveAddressChecked, setSaveAddressChecked] = useState(true);
    const [successOpen, setSuccessOpen] = useState(false);
    const [orderNumber, setOrderNumber] = useState("");
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState("login");

    useEffect(() => subscribeAuth(() => {
        const nextUser = getCurrentUser();
        setCurrentUser(nextUser);

        if (nextUser) {
            const nextAddresses = getSavedAddresses(nextUser.email);
            setSavedAddresses(nextAddresses);
            setSelectedAddressId(nextAddresses[0]?.id || "");

            const activeAddress = nextAddresses[0];
            setFormValues(activeAddress ? {
                ...EMPTY_FORM,
                name: activeAddress.name || nextUser.name || "",
                email: activeAddress.email || nextUser.email || "",
                phone: activeAddress.phone || "",
                line1: activeAddress.line1 || "",
                line2: activeAddress.line2 || "",
                city: activeAddress.city || "",
                state: activeAddress.state || "",
                postalCode: activeAddress.postalCode || "",
                country: activeAddress.country || "",
            } : buildFormFromUser(nextUser));
        } else {
            setSavedAddresses([]);
            setSelectedAddressId("");
            setFormValues(buildFormFromUser(null));
        }
    }), []);
    useEffect(() => subscribeCart(() => setCartItems(getCartItems())), []);

    useEffect(() => {
        if (!currentUser) {
            setAuthModalOpen(true);
        } else {
            setAuthModalOpen(false);
        }
    }, [currentUser]);

    const subtotal = cartItems.reduce((total, item) => total + (Number(item.price) || 0) * (item.quantity || 0), 0);
    const shipping = cartItems.length ? 18 : 0;
    const total = subtotal + shipping;


    function handleSelectAddress(address) {
        setSelectedAddressId(address.id);
        setSaveAddressChecked(false);
        setFormValues({
            ...EMPTY_FORM,
            name: address.name || currentUser.name || "",
            email: address.email || currentUser.email || "",
            phone: address.phone || "",
            line1: address.line1 || "",
            line2: address.line2 || "",
            city: address.city || "",
            state: address.state || "",
            postalCode: address.postalCode || "",
            country: address.country || "",
        });
    }

    function handleSaveCurrentAddress(values = formValues) {
        const nextAddress = {
            name: values.name,
            email: values.email,
            phone: values.phone,
            line1: values.line1,
            line2: values.line2,
            city: values.city,
            state: values.state,
            postalCode: values.postalCode,
            country: values.country,
        };

        const updatedAddresses = saveAddress(currentUser.email, nextAddress);
        setSavedAddresses(updatedAddresses);
        const latestAddress = updatedAddresses[0];
        if (latestAddress) {
            setSelectedAddressId(latestAddress.id);
            setFormValues({
                ...EMPTY_FORM,
                name: latestAddress.name || currentUser.name || "",
                email: latestAddress.email || currentUser.email || "",
                phone: latestAddress.phone || "",
                line1: latestAddress.line1 || "",
                line2: latestAddress.line2 || "",
                city: latestAddress.city || "",
                state: latestAddress.state || "",
                postalCode: latestAddress.postalCode || "",
                country: latestAddress.country || "",
            });
        }
        toast.success("Address saved for future checkout.");
    }

    function validateForm(values) {
        const requiredFields = ["name", "email", "phone", "line1", "city", "country"];
        const missing = requiredFields.find((field) => !String(values[field] || "").trim());
        if (missing) {
            return "Please complete the contact and address fields.";
        }
        return "";
    }

    function handlePlaceOrder() {
        const error = validateForm(formValues);
        if (error) {
            toast.error(error);
            return;
        }

        if (saveAddressChecked) {
            handleSaveCurrentAddress(formValues);
        }

        const newOrder = {
            id: `ORD-${Date.now()}`,
            email: formValues.email,
            phone: formValues.phone,
            address: {
                name: formValues.name,
                line1: formValues.line1,
                line2: formValues.line2,
                city: formValues.city,
                state: formValues.state,
                postalCode: formValues.postalCode,
                country: formValues.country,
            },
            items: cartItems,
            total,
        };

        saveOrder(currentUser.email, newOrder);
        clearCart();
        setOrderNumber(newOrder.id);
        setSuccessOpen(true);
    }

    return (
        <main className="relative overflow-hidden bg-[#0e0e0e] text-[#f5f2ed]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,169,110,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_20%)]" />

            {currentUser && (
            <section className="relative mx-auto max-w-7xl px-4 pb-24 pt-36 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c9a96e]" style={{ fontFamily: siteTokens.fontMono }}>
                        Checkout
                    </p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl" style={{ fontFamily: siteTokens.fontDisplay }}>
                        Confirm your details
                    </h1>
                    <p className="mt-5 text-sm leading-7 text-[#d8d1c7] sm:text-base">
                        Use your account email, save multiple addresses for later, and place your order when everything is ready.
                    </p>
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="space-y-6">
                        <div className="rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a96e]/25 bg-[#c9a96e]/10 text-[#c9a96e]">
                                    <FiUser />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-[0.28em] text-[#a39989]" style={{ fontFamily: siteTokens.fontMono }}>
                                        Contact
                                    </p>
                                    <h2 className="mt-1 text-xl font-semibold">Your account details</h2>
                                </div>
                            </div>

                            <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                <label className="block">
                                    <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-[#a39989]">Name</span>
                                    <input
                                        value={formValues.name}
                                        onChange={(event) => setFormValues((current) => ({ ...current, name: event.target.value }))}
                                        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-[#f5f2ed] outline-none placeholder:text-[#6f665b]"
                                        placeholder="Your name"
                                    />
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-[#a39989]">Email</span>
                                    <input
                                        value={formValues.email}
                                        onChange={(event) => setFormValues((current) => ({ ...current, email: event.target.value }))}
                                        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-[#f5f2ed] outline-none placeholder:text-[#6f665b]"
                                        placeholder="Email"
                                    />
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-[#a39989]">Phone</span>
                                    <input
                                        value={formValues.phone}
                                        onChange={(event) => setFormValues((current) => ({ ...current, phone: event.target.value }))}
                                        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-[#f5f2ed] outline-none placeholder:text-[#6f665b]"
                                        placeholder="Phone number"
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a96e]/25 bg-[#c9a96e]/10 text-[#c9a96e]">
                                    <FiMapPin />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-[0.28em] text-[#a39989]" style={{ fontFamily: siteTokens.fontMono }}>
                                        Address
                                    </p>
                                    <h2 className="mt-1 text-xl font-semibold">Choose or save multiple addresses</h2>
                                </div>
                            </div>

                            {savedAddresses.length > 0 && (
                                <div className="mt-5 grid gap-3">
                                    {savedAddresses.map((address) => (
                                        <button
                                            key={address.id}
                                            type="button"
                                            onClick={() => handleSelectAddress(address)}
                                            className={`rounded-3xl border p-4 text-left transition-colors duration-300 ${selectedAddressId === address.id ? "border-[#c9a96e] bg-[#c9a96e]/10" : "border-white/10 bg-black/15 hover:border-white/20"}`}
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <p className="font-semibold text-[#f5f2ed]">{address.name}</p>
                                                    <p className="mt-1 text-sm text-[#d8d1c7]">
                                                        {address.line1}{address.line2 ? `, ${address.line2}` : ""}
                                                    </p>
                                                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-[#a39989]" style={{ fontFamily: siteTokens.fontMono }}>
                                                        {address.city}, {address.state} {address.postalCode} • {address.country}
                                                    </p>
                                                </div>
                                                <span className="text-xs uppercase tracking-[0.24em] text-[#c9a96e]" style={{ fontFamily: siteTokens.fontMono }}>
                                                    Use
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                <label className="block sm:col-span-2">
                                    <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-[#a39989]">Address line 1</span>
                                    <input
                                        value={formValues.line1}
                                        onChange={(event) => setFormValues((current) => ({ ...current, line1: event.target.value }))}
                                        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-[#f5f2ed] outline-none placeholder:text-[#6f665b]"
                                        placeholder="House, street, area"
                                    />
                                </label>
                                <label className="block sm:col-span-2">
                                    <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-[#a39989]">Address line 2</span>
                                    <input
                                        value={formValues.line2}
                                        onChange={(event) => setFormValues((current) => ({ ...current, line2: event.target.value }))}
                                        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-[#f5f2ed] outline-none placeholder:text-[#6f665b]"
                                        placeholder="Apartment, landmark (optional)"
                                    />
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-[#a39989]">City</span>
                                    <input
                                        value={formValues.city}
                                        onChange={(event) => setFormValues((current) => ({ ...current, city: event.target.value }))}
                                        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-[#f5f2ed] outline-none placeholder:text-[#6f665b]"
                                        placeholder="City"
                                    />
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-[#a39989]">State</span>
                                    <input
                                        value={formValues.state}
                                        onChange={(event) => setFormValues((current) => ({ ...current, state: event.target.value }))}
                                        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-[#f5f2ed] outline-none placeholder:text-[#6f665b]"
                                        placeholder="State"
                                    />
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-[#a39989]">Postal code</span>
                                    <input
                                        value={formValues.postalCode}
                                        onChange={(event) => setFormValues((current) => ({ ...current, postalCode: event.target.value }))}
                                        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-[#f5f2ed] outline-none placeholder:text-[#6f665b]"
                                        placeholder="Postal code"
                                    />
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-[#a39989]">Country</span>
                                    <input
                                        value={formValues.country}
                                        onChange={(event) => setFormValues((current) => ({ ...current, country: event.target.value }))}
                                        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-[#f5f2ed] outline-none placeholder:text-[#6f665b]"
                                        placeholder="Country"
                                    />
                                </label>
                            </div>

                            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <label className="inline-flex items-center gap-3 text-sm text-[#d8d1c7]">
                                    <input
                                        type="checkbox"
                                        checked={saveAddressChecked}
                                        onChange={(event) => setSaveAddressChecked(event.target.checked)}
                                        className="h-4 w-4 accent-[#c9a96e]"
                                    />
                                    Save this address for next time
                                </label>
                                <button
                                    type="button"
                                    onClick={() => handleSaveCurrentAddress()}
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#f5f2ed] transition-colors hover:border-[#c9a96e] hover:text-[#c9a96e]"
                                >
                                    <FiSave />
                                    Save address
                                </button>
                            </div>
                        </div>
                    </div>

                    <aside className="h-fit rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
                        <p className="text-xs uppercase tracking-[0.28em] text-[#a39989]" style={{ fontFamily: siteTokens.fontMono }}>
                            Order summary
                        </p>

                        <div className="mt-5 space-y-3 text-sm text-[#d8d1c7]">
                            <div className="flex items-center justify-between">
                                <span>Items</span>
                                <span>{cartItems.length}</span>
                            </div>
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
                            onClick={handlePlaceOrder}
                            disabled={cartItems.length === 0}
                            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#c9a96e] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#0e0e0e] transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Place order
                            <FiArrowRight />
                        </button>

                        <Link
                            to="/cart"
                            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#f5f2ed] transition-colors hover:border-[#c9a96e] hover:text-[#c9a96e]"
                        >
                            Back to cart
                        </Link>
                    </aside>
                </div>
            </section>
            )}

            <CheckoutSuccessModal
                open={successOpen}
                orderNumber={orderNumber}
                onClose={() => {
                    setSuccessOpen(false);
                    navigate("/collections");
                }}
            />

            <AuthModal
                open={authModalOpen}
                mode={authMode}
                onClose={() => {
                    setAuthModalOpen(false);
                    navigate("/cart");
                }}
                onSuccess={() => setAuthModalOpen(false)}
                switchMode={(newMode) => setAuthMode(newMode)}
            />
        </main>
    );
}
