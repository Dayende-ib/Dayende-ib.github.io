import Script from "next/script";

const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

/**
 * Mesure d'audience Umami (sans cookies, compatible GitHub Pages).
 * Inactive tant que NEXT_PUBLIC_UMAMI_WEBSITE_ID n'est pas défini.
 * Les clics importants portent un attribut data-umami-event.
 */
export default function Analytics() {
  if (!websiteId) return null;
  return <Script src="https://cloud.umami.is/script.js" data-website-id={websiteId} strategy="afterInteractive" />;
}

type Umami = { track: (event: string, data?: Record<string, string>) => void };

/** Événement personnalisé, ignoré si Umami n'est pas chargé. */
export const trackEvent = (event: string, data?: Record<string, string>) => {
  (window as Window & { umami?: Umami }).umami?.track(event, data);
};
