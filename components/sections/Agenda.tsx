import ShowItem from "../common/ShowItem";

const proximosShows = [
  {
    dia: "22",
    mes: "NOV",
    local: "Ginásio Barracão",
    cidade: "Bento Gonçalves, RS",
    linkHref: "https://maps.app.goo.gl/sH4a7pbCW5e7b94s6",
  },
];

export default function Agenda() {
  return (
    <section id="agenda" className="bg-zinc-900 py-20">
      <div className="container mx-auto max-w-4xl px-6">
        <h2 className="font-cinzel mb-12 text-center text-4xl font-bold text-white">
          Próximos Shows
        </h2>
        {/* Lista de Shows */}
        <div className="flex flex-col space-y-4">
          {proximosShows.map((show, index) => (
            <ShowItem
              key={index}
              dia={show.dia}
              mes={show.mes}
              local={show.local}
              cidade={show.cidade}
              linkHref={show.linkHref}
            />
          ))}

          {/* Mensagem para caso não hajam shows */}
          {proximosShows.length === 0 && (
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
