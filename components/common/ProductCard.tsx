"use client";

import {
  IconBell,
  IconBrandWhatsapp,
  IconChevronLeft,
  IconChevronRight,
  IconStarFilled,
} from "@tabler/icons-react";
import Image from "next/image";
import { useId, useRef, useState } from "react";
import { buttonStyles } from "@/components/ui/button";
import { CATEGORIA_LABELS, formatPrice, whatsappLink } from "@/lib/loja";

export interface Produto {
  _id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  tamanhos?: string[];
  destaque?: boolean;
  disponivel?: boolean;
  imagens: { url: string; alt: string }[];
}

interface ProductCardProps {
  produto: Produto;
  whatsappUrl: string;
}

export default function ProductCard({
  produto,
  whatsappUrl,
}: ProductCardProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [tamanho, setTamanho] = useState<string | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sizesLabelId = useId();

  const disponivel = produto.disponivel !== false;
  const preco = formatPrice(produto.preco);
  const total = produto.imagens.length;

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = (index + total) % total;
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
  };

  const onTrackScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setActiveImage(Math.round(track.scrollLeft / track.clientWidth));
  };

  const mensagem = disponivel
    ? `Olá! Vi o produto *${produto.nome}* (${preco}) na loja de vocês${
        tamanho ? `, tamanho *${tamanho}*,` : ""
      } e tenho interesse. Podemos conversar?`
    : `Olá! O produto *${produto.nome}* está esgotado na loja. Podem me avisar quando voltar?`;

  return (
    <article
      className={`group bg-ink-900 relative flex flex-col overflow-hidden rounded-sm border transition-colors duration-500 ${
        produto.destaque
          ? "border-brass/35 hover:border-brass/70"
          : "border-bone/10 hover:border-bone/25"
      }`}
    >
      {/* Galeria — arraste no mobile, setas no desktop */}
      <div className="bg-ink-850 relative">
        <div
          ref={trackRef}
          onScroll={onTrackScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
          aria-label={`Fotos de ${produto.nome}`}
          role="region"
        >
          {produto.imagens.map((img, i) => (
            <div
              key={i}
              className="relative aspect-square w-full shrink-0 snap-center"
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className={`object-cover transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-[1.03] ${
                  disponivel ? "" : "grayscale"
                }`}
                loading={i === 0 ? undefined : "lazy"}
              />
            </div>
          ))}
        </div>

        {/* Selos */}
        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          {produto.destaque ? (
            <span className="bg-brass text-ink-950 flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.15em] uppercase">
              <IconStarFilled size={10} aria-hidden="true" />
              Destaque
            </span>
          ) : (
            <span />
          )}
          {!disponivel && (
            <span className="bg-ink-950/80 text-bone rounded-full px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.15em] uppercase backdrop-blur-sm">
              Esgotado
            </span>
          )}
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(activeImage - 1)}
              aria-label="Foto anterior"
              className="bg-ink-950/70 text-bone hover:bg-brass hover:text-ink-950 absolute top-1/2 left-3 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 focus-visible:opacity-100 md:flex"
            >
              <IconChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeImage + 1)}
              aria-label="Próxima foto"
              className="bg-ink-950/70 text-bone hover:bg-brass hover:text-ink-950 absolute top-1/2 right-3 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 focus-visible:opacity-100 md:flex"
            >
              <IconChevronRight size={18} />
            </button>

            <div className="bg-ink-950/60 absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full px-1.5 py-1 backdrop-blur-sm">
              {produto.imagens.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Ver foto ${i + 1} de ${total}`}
                  aria-current={i === activeImage}
                  className="flex h-4 items-center px-0.5"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      i === activeImage ? "bg-brass w-5" : "bg-bone/50 w-1.5"
                    }`}
                  />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-brass font-mono text-[10px] tracking-[0.25em] uppercase">
          {CATEGORIA_LABELS[produto.categoria] ?? produto.categoria}
        </p>
        <h3 className="font-display text-bone mt-1.5 text-2xl leading-tight font-extrabold tracking-tight uppercase">
          {produto.nome}
        </h3>
        {produto.descricao && (
          <p className="text-bone-muted mt-2 line-clamp-2 text-sm leading-relaxed">
            {produto.descricao}
          </p>
        )}

        {disponivel && !!produto.tamanhos?.length && (
          <div className="mt-4">
            <p
              id={sizesLabelId}
              className="text-bone-dim mb-2 font-mono text-[10px] tracking-[0.2em] uppercase"
            >
              Tamanho{" "}
              {tamanho && <span className="text-bone">· {tamanho}</span>}
            </p>
            <div
              role="radiogroup"
              aria-labelledby={sizesLabelId}
              className="flex flex-wrap gap-1.5"
            >
              {produto.tamanhos.map((tam) => {
                const selected = tamanho === tam;
                return (
                  <button
                    key={tam}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setTamanho(selected ? null : tam)}
                    className={`h-9 min-w-10 rounded-sm border px-2.5 font-mono text-xs font-bold transition-colors ${
                      selected
                        ? "border-brass bg-brass text-ink-950"
                        : "border-bone/15 text-bone-muted hover:border-bone/40 hover:text-bone"
                    }`}
                  >
                    {tam}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-auto pt-5">
          <p
            className={`font-display text-3xl font-black tracking-tight ${
              disponivel ? "text-brass" : "text-bone-dim line-through"
            }`}
          >
            {preco}
          </p>

          {whatsappUrl && (
            <a
              href={whatsappLink(whatsappUrl, mensagem)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({
                variant: disponivel ? "primary" : "outline",
                className: "mt-4 w-full",
              })}
            >
              {disponivel ? (
                <>
                  <IconBrandWhatsapp size={20} aria-hidden="true" />
                  Quero este
                </>
              ) : (
                <>
                  <IconBell size={18} aria-hidden="true" />
                  Avise quando voltar
                </>
              )}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
