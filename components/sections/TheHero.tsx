import Image from "next/image";
import Link from "next/link";

export default function TheHero() {
  return (
    <section className="relative h-[80vh] w-full">
      <Image
        src="/banda.jpg"
        alt="Foto da banda Rosa dos Ventos no palco"
        fill
        className="object-contain"
        priority
      />

      <div className="absolute inset-0 z-10 bg-black/40" />

      <div className="relative z-20 container mx-auto flex h-full flex-col items-center justify-center text-center">
        <h2 className="font-teko text-3xl tracking-wider text-amber-400 uppercase">
          Banda Cover
        </h2>

        <h1 className="font-cinzel my-4 text-6xl leading-tight font-bold tracking-wider text-white uppercase [text-shadow:0_4px_8px_rgba(0,0,0,0.8)]">
          A Energia do Pop Rock <br /> Ao Vivo
        </h1>

        <Link
          href="#agenda"
          className="font-teko mt-4 border-2 border-amber-400 px-10 py-2 text-2xl tracking-wider text-amber-400 uppercase transition-all duration-300 hover:bg-amber-400 hover:text-black hover:shadow-lg hover:shadow-amber-400/30"
        >
          Confira a Agenda
        </Link>
      </div>
    </section>
  );
}
