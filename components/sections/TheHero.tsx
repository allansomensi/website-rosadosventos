import { IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";
import { getImageProps } from "next/image";
import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";
import { buttonStyles } from "@/components/ui/button";
import CompassRose from "@/components/ui/CompassRose";
import { getUpcomingShows, type SanityShow } from "@/lib/shows";
import { CONTRATANTE_LINK, externalLinkProps } from "@/lib/site";
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
      className="relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden md:min-h-svh"
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
        className="from-ink-950 via-ink-950/55 absolute inset-0 -z-10 bg-linear-to-t via-35% to-transparent"
      />
      <div
        aria-hidden="true"
        className="from-ink-950/80 absolute inset-0 -z-10 hidden bg-linear-to-r via-transparent to-transparent md:block"
      />
      <div
        aria-hidden="true"
        className="from-ink-950/70 absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b to-transparent"
      />

      <CompassRose className="text-brass/20 animate-spin-slow pointer-events-none absolute top-1/2 -right-[30%] -z-10 hidden w-[70vw] max-w-[1100px] -translate-y-1/2 md:block lg:-right-[18%]" />

      {/* Conteúdo */}
      <div className="container-site pt-32 pb-8 md:pb-12">
        <div className="max-w-5xl">
          {hero.subheading && (
            <p className="animate-fade-up text-brass flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase sm:text-xs">
              <span className="bg-brass h-px w-10" aria-hidden="true" />
              {hero.subheading}
            </p>
          )}

          {(hero.headingLine1 || hero.headingLine2) && (
            <h1 className="animate-fade-up font-display text-bone mt-5 text-[clamp(3.25rem,10vw,8.75rem)] leading-[0.84] font-black tracking-tight text-balance uppercase [animation-delay:120ms] [text-shadow:0_4px_40px_rgb(0_0_0/0.5)]">
              {hero.headingLine1}
              {hero.headingLine2 && (
                <span className="text-brass-gradient block pb-2 [text-shadow:none]">
                  {hero.headingLine2}
                </span>
              )}
            </h1>
          )}

          <div className="animate-fade-up mt-8 flex flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            {hero.cta?.link && hero.cta?.label && (
              <Link
                href={hero.cta.link}
                {...externalLinkProps(hero.cta.link)}
                className={buttonStyles({ size: "lg" })}
              >
                {hero.cta.label}
                <IconArrowRight
                  size={20}
                  stroke={2.25}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </Link>
            )}
            <Link
              href={CONTRATANTE_LINK.href}
              className={buttonStyles({ variant: "outline", size: "lg" })}
            >
              Contrate a banda
              <IconArrowUpRight size={20} stroke={2} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Rodapé do hero: próximo show + indicador de scroll */}
        <div className="animate-fade-up border-bone/10 mt-12 flex items-end justify-between gap-6 border-t pt-6 [animation-delay:360ms] md:mt-16">
          {nextShow ? (
            <a
              href="#agenda"
              className="group bg-ink-950/50 border-bone/12 hover:border-brass/60 flex max-w-md min-w-0 flex-1 items-center gap-4 rounded-sm border p-2.5 pr-4 backdrop-blur-md transition-colors sm:flex-none"
            >
              <span className="bg-brass text-ink-950 flex w-14 shrink-0 flex-col items-center rounded-xs py-1.5">
                <span className="font-display text-3xl leading-none font-black">
                  {nextShow.dia}
                </span>
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase">
                  {nextShow.mes}
                </span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="text-brass flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase">
                  <span
                    className="relative flex h-1.5 w-1.5"
                    aria-hidden="true"
                  >
                    <span className="bg-brass absolute inset-0 animate-ping rounded-full opacity-75" />
                    <span className="bg-brass relative h-1.5 w-1.5 rounded-full" />
                  </span>
                  Próximo show
                </span>
                <span className="font-display text-bone mt-0.5 block truncate text-xl leading-tight font-bold uppercase">
                  {nextShow.local}
                </span>
                <span className="text-bone-muted block truncate text-sm">
                  {nextShow.cidade} · {nextShow.horario}
                </span>
              </span>
              <IconArrowRight
                size={20}
                aria-hidden="true"
                className="text-bone-muted group-hover:text-brass shrink-0 transition-all group-hover:translate-x-1"
              />
            </a>
          ) : (
            <span />
          )}

          <a
            href="#agenda"
            aria-label="Rolar para a agenda"
            className="text-bone-muted hover:text-bone hidden shrink-0 flex-col items-center gap-3 transition-colors md:flex"
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase [writing-mode:vertical-rl]">
              Role
            </span>
            <span className="bg-bone/15 relative h-14 w-px overflow-hidden">
              <span className="bg-brass animate-scroll-line absolute inset-0" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
