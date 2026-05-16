import { useEffect, useMemo, useState } from "react";
import HeroSection from "./components/HeroSection";
import MarqueeTicker from "./components/MarqueeTicker";
import BentoGrid from "./components/BentoGrid";
import ValueProps from "./components/ValueProps";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import { siteTokens } from "./lib/siteTheme";
import { buildHomePageData, normalizeHomeProduct } from "./lib/homeData";

// ─── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadHomeProducts() {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=100", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setProducts((data.products || []).map(normalizeHomeProduct));
      } catch (error) {
        if (error.name !== "AbortError") {
          setProducts([]);
        }
      }
    }

    loadHomeProducts();
    return () => controller.abort();
  }, []);

  const homeData = useMemo(() => buildHomePageData(products), [products]);

  return (
    <main>
      <HeroSection
        tokens={siteTokens}
        featuredProduct={homeData.featuredProduct}
        totalProducts={homeData.totalProducts}
        totalCategories={homeData.totalCategories}
      />
      <MarqueeTicker tokens={siteTokens} items={homeData.tickerItems} />
      <BentoGrid tokens={siteTokens} categoryCards={homeData.categoryCards} trendingProducts={homeData.trendingProducts} />
      <ValueProps />
      <Testimonials tokens={siteTokens} />
      <Newsletter />
    </main>
  );
}
