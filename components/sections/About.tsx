import { IconArrowDown } from "@tabler/icons-react";
import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { buttonStyles } from "@/components/ui/button";
import CircleBadge from "@/components/ui/CircleBadge";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_QUERY, BAND_MEMBERS_QUERY } from "@/sanity/lib/queries";

interface AboutData {
  title?: string;
  bio?: string;
  image: SanityImageSource;
  imageAlt: string;
}

export default async function About() {
  const [{ data }, { data: members }] = await Promise.all([
    sanityFetch({ query: ABOUT_QUERY }),
    sanityFetch({ query: BAND_MEMBERS_QUERY }),
  ]);
  const about = data as AboutData | null;
  const hasMembers = Array.isArray(members) && members.length > 0;

  if (!about) return null;

  const [lead, ...paragraphs] = about.bio?.split("\n").filter(Boolean) ?? [];

  return (
    <section
      id="sobre"
      aria-labelledby="about-title"
      className="bg-ink-950 relative overflow-hidden py-20 sm:py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="bg-patina-deep/20 pointer-events-none absolute top-1/3 -left-40 h-[500px] w-[500px] rounded-full blur-[140px]"
      />

      <div className="container-site relative grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-20">
        {/* Foto */}
        <div className="reveal relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <div
            aria-hidden="true"
            className="border-brass/30 absolute inset-0 translate-x-3 translate-y-3 rounded-sm border sm:translate-x-5 sm:translate-y-5"
          />
          <div className="bg-ink-850 relative aspect-4/5 overflow-hidden rounded-sm">
            {about.image && (
              <Image
                src={urlFor(about.image).width(900).height(1125).url()}
                alt={about.imageAlt || "Banda Rosa dos Ventos"}
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover transition-transform duration-1000 ease-(--ease-out-expo) hover:scale-105"
              />
            )}
          </div>
          <CircleBadge className="absolute -right-3 -bottom-8 h-28 w-28 sm:-right-8 sm:h-36 sm:w-36" />
        </div>

        {/* Texto */}
        <div className="reveal lg:col-span-7">
          <Eyebrow>Nossa história</Eyebrow>
          <h2
            id="about-title"
            className="font-display text-bone mt-4 text-[clamp(2.75rem,9vw,5.5rem)] leading-[0.88] font-extrabold tracking-tight text-balance uppercase"
          >
            {about.title}
          </h2>

          {lead && (
            <p className="text-bone mt-8 text-xl leading-snug font-medium text-pretty sm:text-2xl">
              {lead}
            </p>
          )}

          {paragraphs.length > 0 && (
            <div className="text-bone-muted mt-6 space-y-5 text-base leading-relaxed text-pretty sm:text-lg">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}

          {hasMembers && (
            <a
              href="#musicos"
              className={buttonStyles({
                variant: "outline",
                className: "mt-10",
              })}
            >
              Conheça os músicos
              <IconArrowDown
                size={18}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover/btn:translate-y-0.5"
              />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
