import { sanityFetch } from "@/sanity/lib/live";
import ShowItem from "../common/ShowItem";
import { Key } from "react";
import { SHOWS_QUERY } from "@/sanity/lib/queries";

export default async function Agenda() {
  const { data: shows } = await sanityFetch({ query: SHOWS_QUERY });

  return (
    <section id="agenda" className="bg-zinc-900 py-20">
      <div className="container mx-auto max-w-4xl px-6">
        <h2 className="font-cinzel mb-12 text-center text-4xl font-bold text-white">
          Próximos Shows
        </h2>

        <div className="flex flex-col space-y-4">
          {shows.map(
            (show: {
              data: string | number | Date;
              _id: Key | null | undefined;
              local: string;
              cidade: string;
              link: string;
            }) => {
              const data = new Date(show.data);
              const dia = data.toLocaleDateString("pt-BR", {
                day: "2-digit",
                timeZone: "UTC",
              });
              const mes = data
                .toLocaleString("pt-BR", { month: "short", timeZone: "UTC" })
                .toUpperCase()
                .replace(".", "");

              return (
                <ShowItem
                  key={show._id}
                  dia={dia}
                  mes={mes}
                  local={show.local}
                  cidade={show.cidade}
                  linkHref={show.link}
                />
              );
            },
          )}

          {shows.length === 0 && (
            <div className="py-10 text-center">
              <p className="font-teko text-2xl text-gray-400">
                Nenhum show agendado no momento.
              </p>
              <p className="font-teko text-xl text-gray-500">
                Fique de olho em nossas redes para novidades!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
