"use server";

import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { HERO_QUERY } from "@/sanity/lib/queries";

interface HeroData {
  imageUrl: string;
  imageAlt: string;
  subheading?: string;
  headingLine1?: string;
  headingLine2?: string;
  cta?: {
    label?: string;
    link?: string;
  };
}

export default async function TheHero() {
  const { data } = await sanityFetch({ query: HERO_QUERY });
  const hero = data as HeroData | null;

  if (!hero) return null;

  return (
    <section
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
      aria-label="Banner principal"
    >
      {/* Background image */}
      <Image
        src={hero.imageUrl}
        alt={hero.imageAlt}
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
        quality={85}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-black/50 to-black/30" />
      <div className="absolute inset-0 bg-linear-to-r from-black/40 to-transparent" />

      {/* Decorative line */}
      <div className="absolute right-0 bottom-0 left-0 h-px bg-linear-to-r from-transparent via-(--gold) to-transparent opacity-60" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {hero.subheading && (
          <p className="font-teko mb-4 inline-flex items-center gap-3 text-lg tracking-[0.3em] text-(--gold) uppercase sm:text-2xl">
            <span className="h-px w-8 bg-(--gold) sm:w-12" aria-hidden="true" />
            {hero.subheading}
            <span className="h-px w-8 bg-(--gold) sm:w-12" aria-hidden="true" />
          </p>
        )}

        {(hero.headingLine1 || hero.headingLine2) && (
          <h1 className="font-cinzel my-4 text-4xl leading-tight font-bold tracking-wider text-white uppercase [text-shadow:0_4px_30px_rgba(0,0,0,0.9)] sm:text-5xl md:text-6xl lg:text-7xl">
            {hero.headingLine1}
            {hero.headingLine2 && (
              <>
                <br />
                <span className="bg-linear-to-r from-(--gold-light) to-(--gold) bg-clip-text text-transparent">
                  {hero.headingLine2}
                </span>
              </>
            )}
          </h1>
        )}

        {hero.cta?.link && hero.cta?.label && (
          <Link
            href={hero.cta.link}
            className="font-teko mt-8 inline-block border border-(--gold) px-8 py-3 text-xl tracking-[0.2em] text-(--gold) uppercase transition-all duration-300 hover:bg-(--gold) hover:text-black hover:shadow-[0_0_30px_rgba(201,162,39,0.3)] sm:px-10 sm:text-2xl"
          >
            {hero.cta.label}
          </Link>
        )}
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-hidden="true"
      >
        <div className="h-10 w-6 rounded-full border-2 border-(--gold) p-1 opacity-60">
          <div
            className="mx-auto h-2 w-1 rounded-full bg-(--gold)"
            style={{ animation: "scrollDot 1.5s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  );
}
