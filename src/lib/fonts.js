import { useEffect } from "react";

export const fontSerif = { fontFamily: '"Instrument Serif", serif' };
export const fontMono = { fontFamily: '"Inconsolata", monospace' };
export const fontSans = { fontFamily: '"Geist", system-ui, sans-serif' };

const FONT_URL =
    "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inconsolata:wght@400;500&family=Geist:wght@300;400;500&display=swap";

/**
 * Injects the Google Fonts stylesheet once.
 * Safe to call from multiple pages — it dedupes via the link id.
 */
export function useAuthFonts() {
    useEffect(() => {
        const id = "auth-fonts";
        if (document.getElementById(id)) return;

        const link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href = FONT_URL;
        document.head.appendChild(link);
    }, []);
}