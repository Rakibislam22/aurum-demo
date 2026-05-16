import { toast } from "react-toastify";

const CART_STORAGE_KEY = "cart";
const CART_EVENT_NAME = "cart:changed";

function readStorage() {
    if (typeof window === "undefined") {
        return [];
    }

    try {
        const raw = window.localStorage.getItem(CART_STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function writeStorage(items) {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(CART_EVENT_NAME));
}

export function getCartItems() {
    return readStorage();
}

export function getCartCount() {
    return readStorage().reduce((total, item) => total + (item.quantity || 0), 0);
}

export function getCartSubtotal() {
    return readStorage().reduce((total, item) => total + (Number(item.price) || 0) * (item.quantity || 0), 0);
}

export function addToCart(product) {
    if (!product || !product.id) {
        return [];
    }

    const cart = readStorage();
    const existingIndex = cart.findIndex((item) => String(item.id) === String(product.id));

    if (existingIndex >= 0) {
        cart[existingIndex] = {
            ...cart[existingIndex],
            quantity: (cart[existingIndex].quantity || 1) + 1,
        };
    } else {
        cart.push({
            id: product.id,
            title: product.title || product.name || "Unnamed item",
            price: Number(product.price) || 0,
            image: product.image || product.thumbnail || product.images?.[0] || "",
            category: product.category || "",
            quantity: 1,
        });
    }

    writeStorage(cart);
    toast.success(`${product.title || product.name || "Item"} added to cart`, {
        toastId: `cart-add-${product.id}`,
    });
    return cart;
}

export function updateCartItemQuantity(productId, quantity) {
    const nextQuantity = Math.max(0, Number(quantity) || 0);
    const cart = readStorage()
        .map((item) => (String(item.id) === String(productId) ? { ...item, quantity: nextQuantity } : item))
        .filter((item) => item.quantity > 0);

    writeStorage(cart);
    return cart;
}

export function removeCartItem(productId) {
    const existing = readStorage();
    const removedItem = existing.find((item) => String(item.id) === String(productId));
    const cart = existing.filter((item) => String(item.id) !== String(productId));
    writeStorage(cart);
    if (removedItem) {
        toast.info(`${removedItem.title || "Item"} removed from cart`, {
            toastId: `cart-remove-${productId}`,
        });
    }
    return cart;
}

export function clearCart() {
    writeStorage([]);
    toast.info("Cart cleared", { toastId: "cart-cleared" });
}

export function subscribeCart(listener) {
    if (typeof window === "undefined") {
        return () => { };
    }

    const handler = () => listener();
    window.addEventListener(CART_EVENT_NAME, handler);
    window.addEventListener("storage", handler);

    return () => {
        window.removeEventListener(CART_EVENT_NAME, handler);
        window.removeEventListener("storage", handler);
    };
}
