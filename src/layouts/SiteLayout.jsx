import { useEffect } from "react";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { siteTokens } from "../lib/siteTheme";

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

export default function SiteLayout() {
    return (
        <>
            <FontLoader />
            <div className="grain-overlay" />
            <Navigation />
            <main className="min-h-screen ">
                <Outlet />
            </main>
            <Footer tokens={siteTokens} />
        </>
    );
}