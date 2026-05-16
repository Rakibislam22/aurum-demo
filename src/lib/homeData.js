const CATEGORY_META = {
    smartphones: { label: "Phones", accent: "#6ab4d4" },
    laptops: { label: "Laptops", accent: "#8ad46a" },
    fragrances: { label: "Fragrance", accent: "#d46a8a" },
    skincare: { label: "Skincare", accent: "#d4a96a" },
    groceries: { label: "Groceries", accent: "#8ad46a" },
    "home-decoration": { label: "Home Decor", accent: "#d4a96a" },
    furniture: { label: "Furniture", accent: "#c9a96e" },
    tops: { label: "Tops", accent: "#6ab4d4" },
    "womens-dresses": { label: "Dresses", accent: "#d46a8a" },
    "mens-shirts": { label: "Shirts", accent: "#8ad46a" },
    "mens-shoes": { label: "Shoes", accent: "#d4a96a" },
    "womens-shoes": { label: "Shoes", accent: "#d46a8a" },
    "womens-bags": { label: "Bags", accent: "#c9a96e" },
    jewellery: { label: "Jewellery", accent: "#6ab4d4" },
    "womens-jewellery": { label: "Jewellery", accent: "#6ab4d4" },
    "mobile-accessories": { label: "Accessories", accent: "#6ab4d4" },
    "sports-accessories": { label: "Sport", accent: "#8ad46a" },
    sunglasses: { label: "Eyewear", accent: "#d4a96a" },
    "kitchen-accessories": { label: "Kitchen", accent: "#d4a96a" },
};

const CATEGORY_FALLBACK = { label: "Edit", accent: "#c9a96e" };

export function normalizeHomeProduct(product) {
    return {
        ...product,
        image: product.thumbnail || product.images?.[0] || "",
    };
}

function getCategoryMeta(category) {
    return CATEGORY_META[category] || CATEGORY_FALLBACK;
}

function formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(price);
}

export function buildHomePageData(products) {
    const normalizedProducts = (products || []).map(normalizeHomeProduct);
    const categoryMap = new Map();

    for (const product of normalizedProducts) {
        const meta = getCategoryMeta(product.category);
        const entry = categoryMap.get(product.category) || {
            category: product.category,
            label: meta.label,
            accent: meta.accent,
            count: 0,
            sampleProduct: product,
        };

        entry.count += 1;
        if (!entry.sampleProduct || (product.rating || 0) > (entry.sampleProduct.rating || 0)) {
            entry.sampleProduct = product;
        }

        categoryMap.set(product.category, entry);
    }

    const categoryCards = Array.from(categoryMap.values())
        .sort((a, b) => b.count - a.count)
        .slice(0, 4)
        .map((entry) => ({
            category: entry.category,
            title: entry.label,
            subtitle: `${entry.count} products`,
            tag: entry.sampleProduct?.brand || entry.sampleProduct?.title || "Live edit",
            accent: entry.accent,
            sampleImage: entry.sampleProduct?.image || "",
        }));

    const trendingProducts = [...normalizedProducts]
        .sort((a, b) => {
            const ratingDiff = (b.rating || 0) - (a.rating || 0);
            if (ratingDiff !== 0) return ratingDiff;
            const reviewDiff = (b.reviews?.length || 0) - (a.reviews?.length || 0);
            if (reviewDiff !== 0) return reviewDiff;
            return (b.price || 0) - (a.price || 0);
        })
        .slice(0, 5)
        .map((product) => ({
            ...product,
            priceLabel: formatPrice(product.price),
            categoryLabel: getCategoryMeta(product.category).label,
        }));

    const featuredProduct = trendingProducts[0] || null;
    const secondaryProduct = trendingProducts[1] || featuredProduct;

    const tickerItems = [];
    if (featuredProduct) {
        tickerItems.push(`Trending ${featuredProduct.title}`);
    }

    for (const card of categoryCards) {
        tickerItems.push(`${card.title} ${card.subtitle}`);
    }

    tickerItems.push(`Live catalog ${normalizedProducts.length} products`);
    tickerItems.push(`Top category ${categoryCards[0]?.title || "Curated edit"}`);
    tickerItems.push(`Editor’s pick ${secondaryProduct?.title || "New edit"}`);

    return {
        totalProducts: normalizedProducts.length,
        totalCategories: categoryCards.length,
        featuredProduct,
        secondaryProduct,
        categoryCards,
        trendingProducts,
        tickerItems,
    };
}