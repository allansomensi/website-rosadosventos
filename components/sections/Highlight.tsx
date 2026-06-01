import CardItem from "../common/CardItem";
import { sanityFetch } from "@/sanity/lib/live";
import { HIGHLIGHTS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url";

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

export default async function Highlight() {
  const { data } = await sanityFetch({
    query: HIGHLIGHTS_QUERY,
  });

  const highlight = data as HighlightData | null;

  if (!highlight || !highlight.cards) {
    return null;
  }

  return (
    <section id="highlights" className="bg-zinc-950 py-16">
      <div className="container mx-auto px-6">
        <h2
          id="highlight-title"
          className="font-cinzel mb-12 text-center text-4xl font-bold text-white"
        >
          {highlight.title}
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {highlight.cards.map((card) => (
            <CardItem
              key={card._key}
              imageSrc={
                card.image
                  ? urlFor(card.image).width(800).height(600).url()
                  : ""
              }
              altText={card.imageAlt || card.title}
              title={card.title}
              description={card.description}
              linkHref={card.linkHref}
              linkText={card.linkText}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
