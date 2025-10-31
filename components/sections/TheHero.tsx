import Image from "next/image";
import Link from "next/link";

export default function TheHero() {
  return (
    <section className="relative h-[50vh] w-full sm:h-[55vh] md:h-[65vh] lg:h-[calc(100vh-90px)]">
      <Image
        src="/banda.jpg"
        alt="Foto da banda Rosa dos Ventos no palco"
        fill
        className="object-cover object-center lg:object-contain"
        priority
      />

      <div className="absolute inset-0 z-10 bg-black/40" />

      <div className="relative z-20 container mx-auto flex h-full flex-col items-center justify-center px-4 text-center sm:px-6">
        <h2 className="font-teko text-xl tracking-wider text-amber-400 uppercase sm:text-2xl md:text-3xl">
          Banda Cover
        </h2>

        <h1 className="font-cinzel my-2 text-3xl leading-snug font-bold tracking-wider text-white uppercase [text-shadow:0_4px_8px_rgba(0,0,0,0.8)] sm:my-3 sm:text-4xl md:my-4 md:text-5xl lg:text-6xl lg:leading-tight">
          A Energia do Pop Rock <br /> Ao Vivo
        </h1>

        <Link
          href="#agenda"
          className="font-teko mt-3 border-2 border-amber-400 px-6 py-1 text-xl tracking-wider text-amber-400 uppercase transition-all duration-300 hover:bg-amber-400 hover:text-black hover:shadow-lg hover:shadow-amber-400/30 sm:mt-4 sm:px-8 sm:py-2 sm:text-2xl"
        >
          Confira a Agenda
        </Link>
      </div>
    </section>
  );
}
