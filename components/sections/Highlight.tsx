import CardItem from "../common/CardItem";

export default function Highlight() {
  return (
    <section id="highlights" className="bg-zinc-950 py-16">
      <div className="container mx-auto px-6">
        <h2 className="font-cinzel mb-12 text-center text-4xl font-bold text-white">
          Destaques
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Card: Próximos Shows */}
          <CardItem
            imageSrc="/next-show.png"
            altText="Próximos shows"
            title="Próximos Shows"
            description="Fique por dentro das nossas próximas apresentações. Marque na agenda e venha curtir o melhor do Pop Rock com a gente!"
            linkHref="#agenda"
            linkText="Ver Agenda"
          />

          {/* Card: Ouça Nossa Playlist */}
          <CardItem
            imageSrc="/playlist.png"
            altText="Nossa playlist"
            title="Ouça Nossa Playlist"
            description="Reviva os maiores clássicos do rock que tocamos. Acesse nossa playlist e curta essa seleção especial."
            linkHref="https://spotify.link/dAE8UOpzTXb"
            linkText="Ouvir Agora"
          />

          {/* Card: Últimas Notícias */}
          <CardItem
            imageSrc="/latest-news.png"
            altText="Últimas notícias"
            title="Últimas Notícias"
            description="Confira as novidades da banda, eventos passados, bastidores e muito mais. Fique conectado com a Rosa dos Ventos!"
            linkHref="https://instagram.com/bandarosadosventosbg"
            linkText="Veja Mais"
          />
        </div>
      </div>
    </section>
  );
}
