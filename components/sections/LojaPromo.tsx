import {
  IconArrowRight,
  IconBrandRedhat,
  IconBrandWhatsapp,
  IconMug,
  IconShirt,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";
import { buttonStyles } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { formatPrice } from "@/lib/loja";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { LOJA_QUERY } from "@/sanity/lib/queries";

interface ProdutoPreview {
  _id: string;
  nome: string;
  preco: number;
  disponivel?: boolean;
  imagens?: { asset: SanityImageSource; alt?: string }[];
}

const FAN_POSITIONS = [
  "z-20 rotate-0 group-hover:-translate-y-2",
  "z-10 -translate-x-[38%] -rotate-[9deg] translate-y-4 group-hover:-translate-x-[48%] group-hover:-rotate-12",
  "z-10 translate-x-[38%] rotate-[9deg] translate-y-4 group-hover:translate-x-[48%] group-hover:rotate-12",
];

const FALLBACK_ITEMS = [
  { label: "Camisetas", Icon: IconShirt },
  { label: "Bonés", Icon: IconBrandRedhat },
  { label: "Canecas", Icon: IconMug },
];

export default async function LojaPromo() {
  const { data } = await sanityFetch({ query: LOJA_QUERY });
  const produtos = ((data as ProdutoPreview[] | null) ?? [])
    .filter((p) => p.disponivel !== false && p.imagens?.[0]?.asset)
    .slice(0, 3);

  return (
    <section
      aria-labelledby="loja-promo-title"
      className="bg-ink-950 py-20 sm:py-28"
    >
      <div className="container-site">
        <div className="reveal border-brass/20 from-ink-850 to-ink-950 relative isolate overflow-hidden rounded-sm border bg-linear-to-br px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
          <div
            aria-hidden="true"
            className="bg-brass/15 absolute -right-20 -bottom-40 -z-10 h-[480px] w-[480px] rounded-full blur-[120px]"
          />
          <p
            aria-hidden="true"
            className="font-display text-outline text-bone/10 absolute -top-6 -left-2 -z-10 text-[11rem] leading-none font-black tracking-tight uppercase select-none sm:text-[16rem]"
          >
            Merch
          </p>

          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-10">
            <div>
              <Eyebrow>Produtos oficiais</Eyebrow>
              <h2
                id="loja-promo-title"
                className="font-display text-bone mt-4 text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.88] font-extrabold tracking-tight uppercase"
              >
                Vista as cores{" "}
                <span className="text-brass-gradient block">da banda.</span>
              </h2>
              <p className="text-bone-muted mt-6 max-w-md text-base leading-relaxed sm:text-lg">
                Camisetas, bonés, canecas e outros produtos oficiais da banda.
                Os pedidos são feitos pelo WhatsApp.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <Link href="/loja" className={buttonStyles({ size: "lg" })}>
                  Ver a loja
                  <IconArrowRight
                    size={20}
                    stroke={2.25}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </Link>
                <p className="text-bone-dim flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase">
                  <IconBrandWhatsapp
                    size={16}
                    className="text-whatsapp"
                    aria-hidden="true"
                  />
                  Pedido via WhatsApp
                </p>
              </div>
            </div>

            {/* Leque de produtos */}
            <Link
              href="/loja"
              tabIndex={-1}
              aria-hidden="true"
              className="group relative mx-auto flex h-80 w-full max-w-md items-center justify-center sm:h-96"
            >
              {produtos.length > 0
                ? produtos.map((produto, i) => {
                    const img = produto.imagens![0];
                    return (
                      <div
                        key={produto._id}
                        className={`bg-ink-800 border-bone/10 absolute w-[52%] overflow-hidden rounded-sm border p-2 pb-3 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.9)] transition-transform duration-700 ease-(--ease-out-expo) ${FAN_POSITIONS[i]}`}
                      >
                        <div className="bg-ink-900 relative aspect-4/5 overflow-hidden rounded-xs">
                          <Image
                            src={urlFor(img.asset).width(500).height(625).url()}
                            alt=""
                            fill
                            sizes="240px"
                            className="object-cover"
                          />
                        </div>
                        <p className="font-display text-bone mt-2 truncate px-1 text-base font-bold uppercase">
                          {produto.nome}
                        </p>
                        <p className="text-brass px-1 font-mono text-xs">
                          {formatPrice(produto.preco)}
                        </p>
                      </div>
                    );
                  })
                : FALLBACK_ITEMS.map(({ label, Icon }, i) => (
                    <div
                      key={label}
                      className={`bg-ink-800 border-bone/10 absolute flex aspect-4/5 w-[46%] flex-col items-center justify-center gap-4 rounded-sm border shadow-[0_30px_60px_-20px_rgb(0_0_0/0.9)] transition-transform duration-700 ease-(--ease-out-expo) ${FAN_POSITIONS[i]}`}
                    >
                      <span className="bg-brass/10 text-brass flex h-16 w-16 items-center justify-center rounded-full">
                        <Icon size={32} stroke={1.5} />
                      </span>
                      <span className="font-display text-bone text-2xl font-bold tracking-wide uppercase">
                        {label}
                      </span>
                    </div>
                  ))}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
