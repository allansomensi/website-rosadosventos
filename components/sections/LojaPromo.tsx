import Link from "next/link";
import {
  IconArrowRight,
  IconShirt,
  IconBrandRedhat,
  IconMug,
} from "@tabler/icons-react";

export default function LojaPromo() {
  return (
    <section
      aria-labelledby="loja-promo-title"
      className="relative overflow-hidden bg-zinc-950 py-24 md:py-32"
    >
      {/* Fundo decorativo */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-125 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--gold) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Linha superior */}
      <div
        className="absolute top-0 right-0 left-0 h-px bg-linear-to-r from-transparent via-(--gold)/40 to-transparent"
        aria-hidden="true"
      />

      {/* Linha inferior */}
      <div
        className="absolute right-0 bottom-0 left-0 h-px bg-linear-to-r from-transparent via-(--gold)/40 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-24">
          {/* Lado esquerdo — texto */}
          <div className="flex-1 text-center lg:text-left">
            <p className="font-teko mb-4 text-xl tracking-[0.35em] text-(--gold) uppercase">
              Produtos Oficiais
            </p>

            <h2
              id="loja-promo-title"
              className="font-cinzel text-4xl leading-tight font-bold text-white sm:text-5xl md:text-6xl"
            >
              Vista as cores
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, var(--gold-light), var(--gold), var(--gold-dark))",
                }}
              >
                da banda.
              </span>
            </h2>

            <div className="mx-auto mt-6 h-px w-16 bg-(--gold)/40 lg:mx-0" />

            <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-400 lg:mx-0 lg:max-w-sm">
              Camisetas, bonés, canecas e muito mais. Compre direto pelo
              WhatsApp, sem complicação.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/loja"
                className="font-teko group flex items-center gap-3 border border-(--gold) bg-(--gold) px-10 py-4 text-2xl tracking-wider text-black uppercase transition-all duration-300 hover:bg-transparent hover:text-(--gold) hover:shadow-[0_0_40px_rgba(201,162,39,0.2)]"
              >
                Ver a Loja
                <IconArrowRight
                  size={22}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          {/* Lado direito — cards de produto decorativos */}
          <div className="relative flex w-full max-w-sm shrink-0 items-center justify-center lg:max-w-xs">
            {/* Card central em destaque */}
            <div className="relative z-10 flex h-48 w-40 flex-col items-center justify-center gap-4 rounded-2xl border border-(--gold)/50 bg-zinc-900 shadow-[0_0_60px_rgba(201,162,39,0.12)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-(--gold)/10">
                <IconShirt
                  size={32}
                  className="text-(--gold)"
                  aria-hidden="true"
                />
              </div>
              <span className="font-teko text-xl tracking-[0.2em] text-white uppercase">
                Camisetas
              </span>
            </div>

            {/* Card esquerdo — recuado */}
            <div className="absolute -left-2 z-0 flex h-40 w-36 -translate-y-4 flex-col items-center justify-center gap-3 rounded-2xl border border-zinc-700/60 bg-zinc-900/70 opacity-70 sm:-left-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800">
                <IconBrandRedhat
                  size={26}
                  className="text-zinc-500"
                  aria-hidden="true"
                />
              </div>
              <span className="font-teko text-lg tracking-[0.2em] text-zinc-400 uppercase">
                Bonés
              </span>
            </div>

            {/* Card direito — recuado */}
            <div className="absolute -right-2 z-0 flex h-40 w-36 translate-y-4 flex-col items-center justify-center gap-3 rounded-2xl border border-zinc-700/60 bg-zinc-900/70 opacity-70 sm:-right-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800">
                <IconMug
                  size={26}
                  className="text-zinc-500"
                  aria-hidden="true"
                />
              </div>
              <span className="font-teko text-lg tracking-[0.2em] text-zinc-400 uppercase">
                Canecas
              </span>
            </div>

            {/* Halo dourado atrás do card central */}
            <div
              className="pointer-events-none absolute z-0 h-48 w-48 rounded-full opacity-20 blur-2xl"
              style={{ background: "var(--gold)" }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
