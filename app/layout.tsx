import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Cinzel, Roboto, Teko } from "next/font/google";
import "./globals.css";
import { SanityLive } from "@/sanity/lib/live";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  weight: ["700"],

  subsets: ["latin"],
});

const teko = Teko({
  variable: "--font-teko",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

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
    googleBot: {
      index: true,
      follow: true,
    },
  },

  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="scroll-smooth" data-scroll-behavior="smooth">
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
