import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Cinzel, Roboto, Teko } from "next/font/google";
import "./globals.css";
import { SanityLive } from "@/sanity/lib/live";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
});

const teko = Teko({
  variable: "--font-teko",
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

const siteUrl = "https://bandarosadosventos.com.br";

export const metadata: Metadata = {
  title: {
    template: "%s | Rosa dos Ventos",
    default: "Rosa dos Ventos - Banda de Rock",
  },
  description:
    "Site oficial da banda Rosa dos Ventos. Confira nossa agenda de shows, fotos, vídeos e biografia. Contrate a banda para seu evento.",
  keywords: [
    "Rosa dos Ventos",
    "banda",
    "música ao vivo",
    "rock",
    "pop rock",
    "agenda de shows",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rosa dos Ventos - Banda de Pop Rock",
    description:
      "Site oficial da banda Rosa dos Ventos. Confira nossa agenda de shows, fotos, vídeos e biografia.",
    url: siteUrl,
    siteName: "Rosa dos Ventos",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Logo da banda Rosa dos Ventos",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rosa dos Ventos - Banda de Rock",
    description: "Agenda de shows, fotos e contato da banda.",
    images: ["/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Rosa dos Ventos",
  url: siteUrl,
  genre: ["Pop Rock", "Rock"],
  foundingLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressCountry: "BR",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${cinzel.variable} ${teko.variable} ${roboto.variable} antialiased`}
      >
        {children}
        <SanityLive />
        <Analytics />
      </body>
    </html>
  );
}
