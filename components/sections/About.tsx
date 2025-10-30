import Image from "next/image";

export default function About() {
  return (
    <section id="sobre" className="bg-zinc-950 py-20">
      <div className="container mx-auto px-6">
        <h2 className="font-cinzel mb-12 text-center text-4xl font-bold text-white">
          Sobre a Banda
        </h2>

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="font-teko space-y-4 text-xl leading-relaxed text-gray-300">
            <p>
              Fundada na Serra Gaúcha e com mais de 25 anos de história, a Rosa
              dos Ventos é uma banda dedicada a trazer a energia e os clássicos
              do Pop Rock para o palco.
            </p>
            <p>
              Com um repertório que homenageia gigantes do gênero, de Queen a
              Bon Jovi, nossa missão é simples: entregar um show de alta
              qualidade, com performance fiel e paixão contagiante.
            </p>
            <p>
              Estamos prontos para fazer o seu evento inesquecível. Confira
              nossa agenda e entre em contato!
            </p>
          </div>

          <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-xl md:h-96">
            <Image
              src="/banda.jpg"
              alt="Integrantes da banda Rosa dos Ventos"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
