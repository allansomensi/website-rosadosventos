import { sanityFetch } from "@/sanity/lib/live";
import { SHOWS_QUERY } from "@/sanity/lib/queries";
import ShowCard from "../common/ShowCard";

interface SanityShow {
  _id: string;
  data: string;
  local: string;
  cidade: string;
  link?: string;
  linkLocalizacao?: string;
}

interface FormattedShow extends SanityShow {
  dia: string;
  mes: string;
  ano: string;
  horario: string;
  diaSemana: string;
}

function formatShow(show: SanityShow): FormattedShow {
  const date = new Date(show.data);
  const hasTime =
    show.data.includes("T") &&
    !show.data.endsWith("T00:00:00Z") &&
    !show.data.endsWith("T00:00:00.000Z");

  const timeZone = "America/Sao_Paulo";

  const formatter = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("pt-BR", { timeZone, ...options }).format(date);

  const rawMonth = formatter({ month: "short" }).replace(".", "");
  const rawWeekday = formatter({ weekday: "long" }).replace("-feira", "");

  return {
    ...show,
    dia: formatter({ day: "2-digit" }),
    mes: rawMonth.charAt(0).toUpperCase() + rawMonth.slice(1),
    ano: formatter({ year: "numeric" }),
    horario: hasTime
      ? formatter({ hour: "2-digit", minute: "2-digit" })
      : "A confirmar",
    diaSemana: rawWeekday.charAt(0).toUpperCase() + rawWeekday.slice(1),
  };
}

export default async function Agenda() {
  const { data } = await sanityFetch({ query: SHOWS_QUERY });
  const shows = (data as SanityShow[]) || [];

  const timeZone = "America/Sao_Paulo";

  const getZonedDateString = (d: Date) =>
    new Intl.DateTimeFormat("sv-SE", { timeZone }).format(d);

  const todayZoned = getZonedDateString(new Date());

  const upcomingShows: FormattedShow[] = shows
    .filter((show) => {
      const showZoned = getZonedDateString(new Date(show.data));
      return showZoned >= todayZoned;
    })
    .map(formatShow)
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

  const currentYear = new Date().getFullYear();

  return (
    <section
      id="agenda"
      className="bg-background py-20 sm:py-28"
      aria-label="Próximos shows"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-14 text-center">
          <p className="font-teko mb-2 text-xl tracking-[0.25em] text-(--gold) uppercase sm:text-2xl">
            Temporada {currentYear}
          </p>
          <h2 className="font-cinzel text-4xl font-bold tracking-wide text-white sm:text-5xl md:text-6xl">
            Próximos Shows
          </h2>
          <div
            className="mx-auto mt-5 h-px w-20 bg-linear-to-r from-transparent via-(--gold) to-transparent"
            aria-hidden="true"
          />
        </div>

        {upcomingShows.length > 0 ? (
          <>
            <div className="flex flex-col border-t border-(--border)">
              {upcomingShows.map((show) => (
                <ShowCard key={show._id} show={show} />
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-(--text-muted) italic sm:text-base">
              Toque em um show para ver detalhes e horários.
            </p>
          </>
        ) : (
          <div className="py-16 text-center sm:py-20">
            <div className="mb-6 text-5xl sm:text-6xl" aria-hidden="true">
              🎸
            </div>
            <p className="font-cinzel mb-3 text-xl text-(--text-secondary) sm:text-2xl">
              Nenhum show agendado no momento
            </p>
            <p className="font-teko text-lg tracking-wide text-(--text-muted) sm:text-xl">
              Fique de olho nas nossas redes sociais para novidades em breve!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
