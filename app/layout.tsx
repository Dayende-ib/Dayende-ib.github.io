import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { defaultLocale } from "../i18n";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const siteUrl = "https://ibrahimdayende.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ibrahim Dayende OUGDA | Full-Stack Web & Mobile Developer",
    template: "%s | Ibrahim Dayende OUGDA"
  },
  description:
    "Ibrahim Dayende OUGDA — Full-Stack Web & Mobile Developer. Web apps, mobile apps, AI automation and Meta/Google Ads. Based in West Africa, available for remote missions.",
  alternates: {
    canonical: "/",
    languages: {
      fr: "/fr",
      en: "/en",
      "x-default": "/"
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: "/favicon/apple-touch-icon.png",
    shortcut: "/favicon/favicon.ico"
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "Ibrahim Dayende OUGDA",
    title: "Ibrahim Dayende OUGDA | Full-Stack Web & Mobile Developer",
    description:
      "Développeur Full-Stack Web & Mobile. Découvrez mes projets, services et réalisations.",
    url: siteUrl,
    locale: "fr_FR",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Ibrahim Dayende OUGDA - Full-Stack Web & Mobile Developer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ibrahim Dayende OUGDA | Full-Stack Web & Mobile Developer",
    description:
      "Développeur Full-Stack Web & Mobile. Projets web/mobile, automatisation et livraison orientée impact.",
    images: [`${siteUrl}/og-image.png`]
  }
};

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang={defaultLocale} className={inter.variable} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* Security headers via meta (GitHub Pages static — no server-side headers) */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), payment=()" />
        <meta
          httpEquiv="Content-Security-Policy"
          content={[
            "default-src 'self'",
            /* unsafe-eval: React dev mode; unsafe-inline: Next.js hydration scripts */
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' data: https://fonts.gstatic.com",
            "img-src 'self' data: blob: https:",
            "connect-src 'self' https://api.web3forms.com https://vitals.vercel-insights.com https://va.vercel-scripts.com",
            "frame-src 'none'",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self' https://api.web3forms.com",
            "upgrade-insecure-requests",
          ].join("; ")}
        />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Ibrahim Dayende OUGDA",
                url: "https://ibrahimdayende.me",
                jobTitle: "Full-Stack Web & Mobile Developer",
                description: "I build modern web and mobile products, automate with AI, and help brands grow with Meta & Google Ads.",
                image: "https://ibrahimdayende.me/og-image.png",
                address: { "@type": "PostalAddress", addressRegion: "West Africa", addressCountry: "BF" },
                sameAs: [
                  "https://www.linkedin.com/in/ibrahimdayende",
                  "https://github.com/Dayende-ib"
                ],
                knowsAbout: ["Next.js","React","Flutter","Laravel","Node.js","TypeScript","PostgreSQL","Meta Ads","Google Ads","AI Automation","Make","n8n"]
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Ibrahim Dayende OUGDA",
                url: "https://ibrahimdayende.me",
                author: { "@type": "Person", name: "Ibrahim Dayende OUGDA" }
              }
            ])
            .replace(/</g, "\\u003c")
            .replace(/>/g, "\\u003e")
            .replace(/&/g, "\\u0026")
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
