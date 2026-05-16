import { useEffect } from "react";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import MarqueeTicker from "./components/MarqueeTicker";
import BentoGrid from "./components/BentoGrid";
import ValueProps from "./components/ValueProps";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const tokens = {
  fontDisplay: "'Playfair Display', Georgia, serif",
  fontBody: "'DM Sans', sans-serif",
  fontMono: "'DM Mono', monospace",
};

// ─── GOOGLE FONTS INJECTOR ─────────────────────────────────────────────────────
function FontLoader() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
  return null;
}

// ─── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <FontLoader />
      <div className="grain-overlay" />

      <Navigation />

      <main>
        <HeroSection tokens={tokens} />
        <MarqueeTicker tokens={tokens} />
        <BentoGrid tokens={tokens} />
        <ValueProps />
        <Testimonials tokens={tokens} />
        <Newsletter />
      </main>

      <Footer tokens={tokens} />
    </>
  );
}
