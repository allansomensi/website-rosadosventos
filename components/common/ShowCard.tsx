"use client";

import { IconChevronRight, IconMapPin, IconTicket } from "@tabler/icons-react";
import { useState } from "react";
import ShowModal from "./ShowModal";

interface ShowCardProps {
  show: {
    _id: string;
    local: string;
    cidade: string;
    link?: string;
    linkLocalizacao?: string;
    data: string;
    dia: string;
    mes: string;
    ano: string;
    horario: string;
    diaSemana: string;
  };
}

export default function ShowCard({ show }: ShowCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article>
        <button
          onClick={() => setOpen(true)}
          className="group w-full border-b border-(--border) py-5 text-left transition-all duration-200 hover:border-(--border-gold) hover:bg-(--surface-2) sm:py-6"
          aria-label={`Ver detalhes: ${show.local}, ${show.dia} de ${show.mes}`}
        >
          <div className="flex items-center gap-3 px-1 sm:gap-6 sm:px-0">
            {/* Date block */}
            <div className="w-12 shrink-0 text-center sm:w-14">
              <span className="font-teko block text-3xl leading-none font-bold text-(--gold) sm:text-5xl">
                {show.dia}
              </span>
              <span className="font-teko block text-sm text-white uppercase sm:text-lg">
                {show.mes}
              </span>
            </div>

            {/* Divider */}
            <div
              className="hidden h-12 w-px shrink-0 bg-(--border) sm:block"
              aria-hidden="true"
            />

            {/* Info */}
            <div className="min-w-0 flex-1">
              <p className="font-teko mb-0.5 text-xs tracking-[0.15em] text-(--gold) uppercase sm:text-sm sm:tracking-[0.2em]">
                {show.diaSemana} &bull; {show.horario}
              </p>
              <h3 className="font-cinzel line-clamp-1 text-base font-bold text-white sm:text-xl md:text-2xl">
                {show.local}
              </h3>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-(--text-muted) sm:mt-1 sm:gap-1.5 sm:text-sm">
                <IconMapPin
                  size={13}
                  className="shrink-0 text-(--gold) sm:hidden"
                  aria-hidden="true"
                />
                <IconMapPin
                  size={15}
                  className="hidden shrink-0 text-(--gold) sm:block"
                  aria-hidden="true"
                />
                {show.linkLocalizacao ? (
                  <a
                    href={show.linkLocalizacao}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="line-clamp-1 transition-colors hover:text-(--gold) hover:underline"
                  >
                    {show.cidade}
                    <span className="ml-1 text-xs text-(--gold) opacity-70">
                      (Mapa)
                    </span>
                  </a>
                ) : (
                  <span className="line-clamp-1">{show.cidade}</span>
                )}
              </p>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-4">
              {show.link && (
                <a
                  href={show.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="font-teko flex items-center gap-1.5 border border-(--gold) bg-(--gold)/5 px-3 py-2 text-sm tracking-wider text-(--gold) uppercase transition-all duration-300 hover:bg-(--gold) hover:text-black hover:shadow-[0_0_20px_rgba(201,162,39,0.3)] sm:hidden"
                  aria-label="Comprar ingressos"
                >
                  <IconTicket size={15} aria-hidden="true" />
                </a>
              )}

              {show.link && (
                <a
                  href={show.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="font-teko hidden items-center gap-2 border border-(--gold) bg-(--gold)/5 px-5 py-2.5 text-base tracking-widest text-(--gold) uppercase transition-all duration-300 hover:bg-(--gold) hover:text-black hover:shadow-[0_0_20px_rgba(201,162,39,0.3)] sm:flex md:text-lg"
                >
                  <IconTicket size={18} aria-hidden="true" />
                  Ingressos
                </a>
              )}

              <IconChevronRight
                size={20}
                className="text-(--text-muted) transition-all group-hover:translate-x-0.5 group-hover:text-(--gold)"
                aria-hidden="true"
              />
            </div>
          </div>
        </button>
      </article>

      {open && <ShowModal show={show} onClose={() => setOpen(false)} />}
    </>
  );
}
