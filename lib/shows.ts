const TIME_ZONE = "America/Sao_Paulo";

export interface SanityShow {
  _id: string;
  data: string;
  local: string;
  cidade: string;
  link?: string;
  linkLocalizacao?: string;
}

export interface FormattedShow extends SanityShow {
  dia: string;
  mes: string;
  ano: string;
  horario: string;
  diaSemana: string;
  hasTime: boolean;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Data no fuso de São Paulo no formato YYYY-MM-DD (comparável como string) */
const getZonedDateString = (d: Date) =>
  new Intl.DateTimeFormat("sv-SE", { timeZone: TIME_ZONE }).format(d);

function hasDefinedTime(iso: string) {
  return (
    iso.includes("T") &&
    !iso.endsWith("T00:00:00Z") &&
    !iso.endsWith("T00:00:00.000Z")
  );
}

export function formatShow(show: SanityShow): FormattedShow {
  const date = new Date(show.data);
  const hasTime = hasDefinedTime(show.data);

  const format = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("pt-BR", {
      timeZone: TIME_ZONE,
      ...options,
    }).format(date);

  return {
    ...show,
    dia: format({ day: "2-digit" }),
    mes: capitalize(format({ month: "short" }).replace(".", "")),
    ano: format({ year: "numeric" }),
    horario: hasTime
      ? format({ hour: "2-digit", minute: "2-digit" })
      : "A confirmar",
    diaSemana: capitalize(format({ weekday: "long" }).replace("-feira", "")),
    hasTime,
  };
}

/** Shows de hoje em diante, ordenados por data e já formatados */
export function getUpcomingShows(shows: SanityShow[] | null | undefined) {
  const today = getZonedDateString(new Date());

  return (shows ?? [])
    .filter((show) => getZonedDateString(new Date(show.data)) >= today)
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
    .map(formatShow);
}

const toCalendarStamp = (d: Date) =>
  d
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

/** Link "adicionar ao Google Agenda" para um show */
export function googleCalendarUrl(show: FormattedShow) {
  const start = new Date(show.data);
  let dates: string;

  if (show.hasTime) {
    const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
    dates = `${toCalendarStamp(start)}/${toCalendarStamp(end)}`;
  } else {
    const day = getZonedDateString(start).replace(/-/g, "");
    const next = new Date(start.getTime() + 24 * 60 * 60 * 1000);
    dates = `${day}/${getZonedDateString(next).replace(/-/g, "")}`;
  }

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Show Rosa dos Ventos - ${show.local}`,
    dates,
    location: show.cidade,
    details: show.link
      ? `Ingressos: ${show.link}`
      : "Show da banda Rosa dos Ventos",
    ctz: TIME_ZONE,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
