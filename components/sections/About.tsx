import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url";

interface AboutData {
  title?: string;
  bio?: string;
  image: SanityImageSource;
  imageAlt: string;
}

export default async function About() {
  const { data } = await sanityFetch({ query: ABOUT_QUERY });
  const about = data as AboutData | null;

  if (!about) {
    return null;
  }

  const bioParagraphs = about.bio?.split("\n").filter(Boolean) || [];

  return (
    <section
      id="sobre"
      className="relative overflow-hidden bg-zinc-950 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-200 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--gold)/5 blur-[120px]" />

      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="font-teko mb-2 text-xl tracking-[0.2em] text-(--gold) uppercase">
            Nossa História
          </p>
          <h2
            id="about-title"
            className="font-cinzel text-4xl font-bold text-white md:text-5xl"
          >
            {about.title}
          </h2>
        </div>

        <div className="flex flex-col-reverse items-center gap-16 lg:flex-row lg:items-start lg:gap-20">
          <div className="w-full space-y-6 lg:w-7/12">
            {bioParagraphs.map((paragraph: string, index: number) => (
              <p
                key={index}
                className="font-teko text-2xl leading-relaxed tracking-wide text-zinc-300"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="relative w-full lg:w-5/12">
            <div className="relative mx-auto aspect-4/5 w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/50">
              {about.image && (
                <Image
                  src={urlFor(about.image).width(800).height(1000).url()}
                  alt={about.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )}
            </div>

            <div className="absolute -inset-4 z-[-1] hidden rounded-3xl border border-(--gold)/20 md:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
