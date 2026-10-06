import { IconArrowRight } from "@tabler/icons-react";
import { getImageProps } from "next/image";
import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";
import { buttonStyles } from "@/components/ui/button";
import { getUpcomingShows, type SanityShow } from "@/lib/shows";
import { externalLinkProps } from "@/lib/site";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { HERO_QUERY, SHOWS_QUERY } from "@/sanity/lib/queries";

interface HeroData {
  heroImage: SanityImageSource;
  imageAlt: string;
  subheading?: string;
  headingLine1?: string;
  headingLine2?: string;
  cta?: {
    label?: string;
    link?: string;
  };
}

/** Imagem com direção de arte: recorte paisagem no desktop e retrato no
 *  mobile, ambos respeitando o hotspot definido no Sanity. */
function HeroPicture({
  image,
  alt,
}: {
  image: SanityImageSource;
  alt: string;
}) {
  const common = { alt, sizes: "100vw", quality: 85 };

  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: 1920,
    height: 1080,
    src: urlFor(image).width(1920).height(1080).url(),
  });

  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 900,
    height: 1400,
    src: urlFor(image).width(900).height(1400).url(),
    loading: "eager",
    fetchPriority: "high",
  });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <source media="(max-width: 767px)" srcSet={mobile} />
      <img
        {...rest}
        alt={alt}
        className="animate-hero-zoom absolute inset-0 h-full w-full object-cover"
      />
    </picture>
  );
}

export default async function TheHero() {
  const [{ data: heroData }, { data: showsData }] = await Promise.all([
    sanityFetch({ query: HERO_QUERY }),
    sanityFetch({ query: SHOWS_QUERY }),
  ]);

  const hero = heroData as HeroData | null;
  if (!hero) return null;

  const nextShow = getUpcomingShows(showsData as SanityShow[])[0];

  return (
    <section
      aria-label="Banner principal"
      className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden md:min-h-svh"
    >
      {/* Fundo */}
      <div className="bg-ink-900 absolute inset-0 -z-20">
        {hero.heroImage && (
          <HeroPicture
            image={hero.heroImage}
            alt={hero.imageAlt || "Banda Rosa dos Ventos ao vivo"}
          />
        )}
      </div>
      <div
        aria-hidden="true"
        className="from-ink-950 via-ink-950/45 absolute inset-0 -z-10 bg-linear-to-t via-45% to-transparent"
      />
      <div
        aria-hidden="true"
        className="from-ink-950/60 absolute inset-x-0 top-0 -z-10 h-32 bg-linear-to-b to-transparent"
      />

      {/* Conteúdo */}
      <div className="container-site pt-32 pb-14 md:pb-20">
        <div className="max-w-3xl">
          {hero.subheading && (
            <p className="animate-fade-up text-bone/85 font-mono text-[11px] tracking-[0.3em] uppercase [text-shadow:0_1px_12px_rgb(0_0_0/0.6)] sm:text-xs">
              {hero.subheading}
            </p>
          )}

          {(hero.headingLine1 || hero.headingLine2) && (
            <h1 className="animate-fade-up font-display text-bone mt-4 text-[clamp(2.75rem,7vw,5.75rem)] leading-[0.92] font-extrabold tracking-tight text-balance uppercase [animation-delay:100ms] [text-shadow:0_2px_24px_rgb(0_0_0/0.45)]">
              {hero.headingLine1}
              {hero.headingLine2 && (
                <span className="text-brass block">{hero.headingLine2}</span>
              )}
            </h1>
          )}

          <div className="animate-fade-up mt-8 flex flex-col items-start gap-5 [animation-delay:200ms] sm:flex-row sm:items-center sm:gap-8">
            {hero.cta?.link && hero.cta?.label && (
              <Link
                href={hero.cta.link}
                {...externalLinkProps(hero.cta.link)}
                className={buttonStyles()}
              >
                {hero.cta.label}
                <IconArrowRight
                  size={18}
                  stroke={2.25}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </Link>
            )}

            {nextShow && (
              <a
                href="#agenda"
                className="group text-bone-muted hover:text-bone text-sm transition-colors"
              >
                <span className="text-brass mb-1 block font-mono text-[11px] tracking-[0.2em] uppercase sm:mr-2 sm:mb-0 sm:inline">
                  Próximo show
                </span>
                {nextShow.dia} {nextShow.mes} · {nextShow.local},{" "}
                {nextShow.cidade}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
