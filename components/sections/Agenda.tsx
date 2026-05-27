import { sanityFetch } from "@/sanity/lib/live";
import { SHOWS_QUERY } from "@/sanity/lib/queries";
import ShowCard from "../common/ShowCard";

const DIAS_SEMANA = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

const MESES = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

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

function parseShowDate(isoString: string): Date {
  return new Date(isoString);
}

function formatShow(show: SanityShow): FormattedShow {
  const date = parseShowDate(show.data);
  const hasTime =
    show.data.includes("T") &&
    !show.data.endsWith("T00:00:00Z") &&
    !show.data.endsWith("T00:00:00.000Z");

  const timeZone = "America/Sao_Paulo";

  const dateInTz = new Date(date.toLocaleString("en-US", { timeZone }));

  return {
    ...show,
    dia: String(dateInTz.getDate()).padStart(2, "0"),
    mes: MESES[dateInTz.getMonth()],
    ano: String(dateInTz.getFullYear()),
    horario: hasTime
      ? date.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone,
        })
      : "A confirmar",
    diaSemana: DIAS_SEMANA[dateInTz.getDay()],
  };
}

export default async function Agenda() {
  const { data } = await sanityFetch({ query: SHOWS_QUERY });
  const shows = (data as SanityShow[]) || [];

  const timeZone = "America/Sao_Paulo";

  const todayUTC = new Date();
  const todayInTz = new Date(todayUTC.toLocaleString("en-US", { timeZone }));
  const todayMidnight = new Date(
    todayInTz.getFullYear(),
    todayInTz.getMonth(),
    todayInTz.getDate(),
  ).getTime();

  const upcomingShows: FormattedShow[] = shows
    .filter((show) => {
      const d = new Date(show.data);
      const dateInTz = new Date(d.toLocaleString("en-US", { timeZone }));
      const showMidnight = new Date(
        dateInTz.getFullYear(),
        dateInTz.getMonth(),
        dateInTz.getDate(),
      ).getTime();

      return showMidnight >= todayMidnight;
    })
    .map(formatShow);

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
