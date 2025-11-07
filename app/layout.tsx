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

export const metadata: Metadata = {
  title: "Rosa dos Ventos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="scroll-smooth">
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
