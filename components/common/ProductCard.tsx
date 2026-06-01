"use client";

import { IconBrandWhatsapp, IconTag } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

interface ProductCardProps {
  produto: {
    _id: string;
    nome: string;
    descricao: string;
    preco: number;
    categoria: string;
    tamanhos?: string[];
    destaque?: boolean;
    disponivel?: boolean;
    imagens: { url: string; alt: string }[];
  };
  whatsappUrl: string;
}

const CATEGORIA_LABELS: Record<string, string> = {
  vestuario: "Vestuário",
  acessorios: "Acessórios",
  decoracao: "Decoração",
  outros: "Outros",
};

export default function ProductCard({
  produto,
  whatsappUrl,
}: ProductCardProps) {
  const [activeImage, setActiveImage] = useState(0);

  const precoFormatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(produto.preco);

  const mensagem = encodeURIComponent(
    `Olá! Vi o produto *${produto.nome}* (${precoFormatado}) na loja de vocês e tenho interesse. Podemos conversar?`,
  );

  const whatsappLink = `${whatsappUrl}?text=${mensagem}`;

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-(--surface) transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] ${
        produto.destaque
          ? "border-(--border-gold) shadow-[0_0_30px_rgba(201,162,39,0.08)]"
          : "border-(--border)"
      } ${!produto.disponivel ? "opacity-60" : ""}`}
    >
      {/* Badge de destaque */}
      {produto.destaque && (
        <div className="absolute top-3 left-3 z-20">
          <span className="font-teko flex items-center gap-1.5 bg-(--gold) px-3 py-1 text-sm tracking-wider text-black uppercase">
            <IconTag size={13} aria-hidden="true" />
            Destaque
          </span>
        </div>
      )}

      {/* Badge indisponível */}
      {!produto.disponivel && (
        <div className="absolute top-3 right-3 z-20">
          <span className="font-teko bg-zinc-700 px-3 py-1 text-sm tracking-wider text-zinc-300 uppercase">
            Esgotado
          </span>
        </div>
      )}

      {/* Imagem principal */}
      <div className="relative aspect-square overflow-hidden bg-zinc-900">
        {produto.imagens[activeImage] && (
          <Image
            src={produto.imagens[activeImage].url}
            alt={produto.imagens[activeImage].alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}

        {/* Overlay gradiente */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Miniaturas — visíveis no hover se houver mais de 1 imagem */}
        {produto.imagens.length > 1 && (
          <div className="absolute right-0 bottom-0 left-0 z-10 flex justify-center gap-1.5 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {produto.imagens.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                aria-label={`Ver imagem ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeImage
                    ? "w-6 bg-(--gold)"
                    : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Categoria */}
        <span className="font-teko mb-2 text-xs tracking-[0.2em] text-(--gold) uppercase">
          {CATEGORIA_LABELS[produto.categoria] ?? produto.categoria}
        </span>

        {/* Nome */}
        <h3 className="font-cinzel mb-2 text-lg leading-snug font-bold text-white sm:text-xl">
          {produto.nome}
        </h3>

        {/* Descrição */}
        <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-(--text-muted)">
          {produto.descricao}
        </p>

        {/* Tamanhos */}
        {produto.tamanhos && produto.tamanhos.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {produto.tamanhos.map((tam) => (
              <span
                key={tam}
                className="font-teko rounded border border-(--border) px-2.5 py-0.5 text-xs tracking-wider text-zinc-400"
              >
                {tam}
              </span>
            ))}
          </div>
        )}

        {/* Preço + CTA */}
        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="font-cinzel text-xl font-bold text-(--gold) sm:text-2xl">
            {precoFormatado}
          </span>

          {produto.disponivel !== false && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-teko group/btn flex items-center gap-2 border border-(--gold) bg-(--gold)/5 px-4 py-2.5 text-base tracking-wider text-(--gold) uppercase transition-all duration-300 hover:bg-(--gold) hover:text-black hover:shadow-[0_0_20px_rgba(201,162,39,0.25)] sm:px-5"
            >
              <IconBrandWhatsapp
                size={17}
                className="shrink-0 transition-transform duration-300 group-hover/btn:scale-110"
                aria-hidden="true"
              />
              Tenho Interesse
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
