import ShowList from "@/components/common/ShowList";
import CompassRose from "@/components/ui/CompassRose";
import SectionHeading from "@/components/ui/SectionHeading";
import SocialLinks from "@/components/ui/SocialLinks";
import { getUpcomingShows, type SanityShow } from "@/lib/shows";
import type { ContactData } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/live";
import { CONTACT_QUERY, SHOWS_QUERY } from "@/sanity/lib/queries";

export default async function Agenda() {
  const [{ data: showsData }, { data: contactData }] = await Promise.all([
    sanityFetch({ query: SHOWS_QUERY }),
    sanityFetch({ query: CONTACT_QUERY }),
  ]);

  const upcomingShows = getUpcomingShows(showsData as SanityShow[]);
  const contact = contactData as ContactData | null;
  const total = upcomingShows.length;

  return (
    <section
      id="agenda"
      aria-labelledby="agenda-title"
      className="bg-ink-900 relative overflow-hidden py-20 sm:py-28"
    >
      <CompassRose className="text-bone/3 pointer-events-none absolute -top-40 -left-40 w-[640px]" />

      <div className="container-site relative">
        <SectionHeading
          id="agenda-title"
          eyebrow={`Temporada ${new Date().getFullYear()}`}
          title="Próximos shows"
          className="reveal mb-10 sm:mb-14"
          action={
            total > 0 && (
              <p className="text-bone-muted font-mono text-xs tracking-[0.2em] uppercase">
                <span className="text-bone font-display mr-2 text-4xl font-black tracking-normal">
                  {String(total).padStart(2, "0")}
                </span>
                {total === 1 ? "data confirmada" : "datas confirmadas"}
              </p>
            )
          }
        />

        {total > 0 ? (
          <div className="reveal">
            <ShowList shows={upcomingShows} />
            <p className="text-bone-dim mt-6 text-center font-mono text-[11px] tracking-[0.2em] uppercase">
              Toque em um show para ver detalhes
            </p>
          </div>
        ) : (
          <div className="reveal border-bone/12 flex flex-col items-center rounded-sm border border-dashed px-6 py-16 text-center sm:py-20">
            <CompassRose className="text-brass/70 animate-spin-slow h-16 w-16" />
            <p className="font-display text-bone mt-6 text-3xl font-extrabold uppercase sm:text-4xl">
              Nenhum show agendado
            </p>
            <p className="text-bone-muted mt-3 max-w-md">
              As próximas datas serão divulgadas aqui e nas redes sociais da
              banda.
            </p>
            <SocialLinks
              links={contact?.socialLinks}
              className="mt-8 justify-center"
            />
          </div>
        )}
      </div>
    </section>
  );
}
