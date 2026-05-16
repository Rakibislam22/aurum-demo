import HeroSection from "./components/HeroSection";
import MarqueeTicker from "./components/MarqueeTicker";
import BentoGrid from "./components/BentoGrid";
import ValueProps from "./components/ValueProps";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import { siteTokens } from "./lib/siteTheme";

// ─── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <main>
      <HeroSection tokens={siteTokens} />
      <MarqueeTicker tokens={siteTokens} />
      <BentoGrid tokens={siteTokens} />
      <ValueProps />
      <Testimonials tokens={siteTokens} />
      <Newsletter />
    </main>
  );
}
