"use client";

import { IconPlus, IconTicket } from "@tabler/icons-react";
import { useState } from "react";
import { buttonStyles } from "@/components/ui/button";
import type { FormattedShow } from "@/lib/shows";
import ShowModal from "./ShowModal";

export default function ShowCard({
  show,
  isNext = false,
}: {
  show: FormattedShow;
  isNext?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <li className="group border-bone/10 relative border-b">
      {/* Linha inteira clicável — abre os detalhes */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`Ver detalhes do show em ${show.local}, ${show.cidade}, ${show.diaSemana} ${show.dia} de ${show.mes}`}
        className="focus-visible:ring-brass absolute inset-0 z-0 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
      />

      <span
        aria-hidden="true"
        className="bg-brass absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 transition-transform duration-500 ease-(--ease-out-expo) group-hover:scale-y-100"
      />

      <div className="group-hover:bg-ink-850/70 pointer-events-none relative grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 transition-colors duration-300 sm:gap-8 sm:px-5 sm:py-7">
        {/* Data */}
        <div className="flex w-14 flex-col items-center sm:w-20">
          <span className="font-display text-bone group-hover:text-brass text-[2.75rem] leading-[0.85] font-black transition-colors sm:text-6xl">
            {show.dia}
          </span>
          <span className="text-brass mt-1 font-mono text-[10px] font-bold tracking-[0.2em] uppercase sm:text-xs">
            {show.mes}
          </span>
        </div>

        {/* Info */}
        <div className="min-w-0">
          <p className="text-bone-dim flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] tracking-[0.18em] uppercase sm:text-[11px]">
            {isNext && (
              <span className="bg-brass/15 text-brass rounded-full px-2 py-0.5">
                Próximo
              </span>
            )}
            <span>
              {show.diaSemana} · {show.horario}
            </span>
          </p>
          <h3 className="font-display text-bone mt-1 line-clamp-2 text-2xl leading-tight font-extrabold tracking-tight uppercase sm:text-4xl">
            {show.local}
          </h3>
          <p className="text-bone-muted truncate text-sm sm:text-base">
            {show.cidade}
          </p>
        </div>

        {/* Ações */}
        <div className="flex items-center gap-3">
          {show.link && (
            <a
              href={show.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Comprar ingresso para ${show.local}`}
              className={buttonStyles({
                size: "sm",
                className:
                  "pointer-events-auto relative z-10 max-sm:w-10 max-sm:px-0",
              })}
            >
              <IconTicket size={20} aria-hidden="true" className="shrink-0" />
              <span className="hidden sm:inline">Ingressos</span>
            </a>
          )}
          <span
            aria-hidden="true"
            className="border-bone/15 text-bone-muted group-hover:border-brass group-hover:text-brass hidden h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 group-hover:rotate-90 sm:flex"
          >
            <IconPlus size={18} />
          </span>
        </div>
      </div>

      {open && (
        <ShowModal show={show} isNext={isNext} onClose={() => setOpen(false)} />
      )}
    </li>
  );
}
