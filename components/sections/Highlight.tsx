import type { SanityImageSource } from "@sanity/image-url";
import CardItem from "@/components/common/CardItem";
import SectionHeading from "@/components/ui/SectionHeading";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { HIGHLIGHTS_QUERY } from "@/sanity/lib/queries";

type HighlightCard = {
  _key: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  image: SanityImageSource;
  imageAlt: string;
};

interface HighlightData {
  title: string;
  cards: HighlightCard[];
}

const GRID_COLS: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
};

export default async function Highlight() {
  const { data } = await sanityFetch({ query: HIGHLIGHTS_QUERY });
  const highlight = data as HighlightData | null;

  if (!highlight?.cards?.length) return null;

  const count = highlight.cards.length;

  return (
    <section
      id="destaques"
      aria-labelledby="highlight-title"
      className="bg-ink-950 py-20 sm:py-28"
    >
      <div className="container-site">
        <SectionHeading
          id="highlight-title"
          eyebrow="Em destaque"
          title={highlight.title}
          className="reveal mb-10 sm:mb-14"
        />

        <div
          className={`reveal rail md:mx-0 md:grid md:overflow-visible md:px-0 ${GRID_COLS[count] ?? "md:grid-cols-3"} md:gap-6`}
        >
          {highlight.cards.map((card, i) => (
            <CardItem
              key={card._key}
              index={i}
              imageSrc={
                card.image
                  ? urlFor(card.image).width(900).height(1125).url()
                  : ""
              }
              altText={card.imageAlt || card.title}
              title={card.title}
              description={card.description}
              linkHref={card.linkHref}
              linkText={card.linkText}
              className={`w-[82%] sm:w-[46%] md:w-auto ${
                count === 1 ? "md:aspect-21/9" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
