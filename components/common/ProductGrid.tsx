"use client";

import { useMemo, useState } from "react";
import { CATEGORIA_LABELS } from "@/lib/loja";
import ProductCard, { type Produto } from "./ProductCard";

const ALL = "todos";

export default function ProductGrid({
  produtos,
  whatsappUrl,
}: {
  produtos: Produto[];
  whatsappUrl: string;
}) {
  const [categoria, setCategoria] = useState(ALL);

  const categorias = useMemo(() => {
    const counts = new Map<string, number>();
    produtos.forEach((p) =>
      counts.set(p.categoria, (counts.get(p.categoria) ?? 0) + 1),
    );
    return Array.from(counts.entries());
  }, [produtos]);

  const filtrados =
    categoria === ALL
      ? produtos
      : produtos.filter((p) => p.categoria === categoria);

  const chip = (value: string, label: string, count: number) => {
    const active = categoria === value;
    return (
      <button
        key={value}
        type="button"
        onClick={() => setCategoria(value)}
        aria-pressed={active}
        className={`font-display flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-base font-bold tracking-wider uppercase transition-colors ${
          active
            ? "border-brass bg-brass text-ink-950"
            : "border-bone/15 text-bone-muted hover:border-bone/40 hover:text-bone"
        }`}
      >
        {label}
        <span
          className={`font-mono text-[10px] ${active ? "text-ink-950/60" : "text-bone-dim"}`}
        >
          {count}
        </span>
      </button>
    );
  };

  return (
    <>
      {categorias.length > 1 && (
        <div
          role="toolbar"
          aria-label="Filtrar por categoria"
          className="no-scrollbar -mx-5 mb-8 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {chip(ALL, "Todos", produtos.length)}
          {categorias.map(([value, count]) =>
            chip(value, CATEGORIA_LABELS[value] ?? value, count),
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtrados.map((produto) => (
          <ProductCard
            key={produto._id}
            produto={produto}
            whatsappUrl={whatsappUrl}
          />
        ))}
      </div>
    </>
  );
}
