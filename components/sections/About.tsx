import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_QUERY } from "@/sanity/lib/queries";

export default async function About() {
  const { data: about } = await sanityFetch({ query: ABOUT_QUERY });

  if (!about) {
    return null;
  }

  const bioParagraphs = about.bio?.split("\n").filter(Boolean) || [];

  return (
    <section id="sobre" className="bg-zinc-950 py-20">
      <div className="container mx-auto px-6">
        <h2 className="font-cinzel mb-12 text-center text-4xl font-bold text-white">
          {about.title}
        </h2>

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="space-y-4">
            {bioParagraphs.map((paragraph: string, index: number) => (
              <p
                key={index}
                className="font-teko text-xl leading-relaxed text-gray-300"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-xl md:h-96">
            <Image
              src={about.imageUrl}
              alt={about.imageAlt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
