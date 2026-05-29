"use client";

import {
  IconCalendar,
  IconClock,
  IconMapPin,
  IconTicket,
  IconX,
} from "@tabler/icons-react";
import { useCallback, useEffect, useId, useRef } from "react";

interface ShowModalProps {
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
  onClose: () => void;
}

export default function ShowModal({ show, onClose }: ShowModalProps) {
  const titleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [handleClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-10 w-full rounded-t-2xl border border-(--border-gold) bg-(--surface) p-6 shadow-2xl sm:max-w-xl sm:rounded-2xl sm:p-8 md:p-10">
        {/* Drag handle — mobile only */}
        <div
          className="mx-auto mb-4 h-1 w-10 rounded-full bg-(--border) sm:hidden"
          aria-hidden="true"
        />

        {/* Close Button */}
        <button
          ref={closeBtnRef}
          onClick={handleClose}
          className="absolute top-5 right-5 rounded-full p-1 text-(--text-muted) transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-(--gold)"
          aria-label="Fechar modal"
        >
          <IconX size={22} />
        </button>

        {/* Title */}
        <div className="mb-6 pr-8">
          <p className="font-teko mb-1 text-sm tracking-[0.2em] text-(--gold) uppercase sm:text-base">
            Detalhes do Evento
          </p>
          <h2
            id={titleId}
            className="font-cinzel text-xl leading-snug font-bold text-white sm:text-3xl md:text-4xl"
          >
            {show.local}
          </h2>
        </div>

        {/* Info Grid */}
        <div className="mb-7 flex flex-col gap-4 border-y border-(--border) py-5 sm:mb-8 sm:gap-5 sm:py-6">
          <div className="flex items-start gap-4 text-(--text-secondary)">
            <IconMapPin
              size={20}
              className="mt-0.5 shrink-0 text-(--gold)"
              aria-hidden="true"
            />
            <div className="flex min-w-0 flex-col">
              <span className="font-teko text-xs tracking-wider text-(--text-muted) uppercase sm:text-sm">
                Localidade
              </span>
              {show.linkLocalizacao ? (
                <a
                  href={show.linkLocalizacao}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-roboto text-sm text-white transition-colors hover:text-(--gold) hover:underline sm:text-base"
                >
                  {show.cidade}{" "}
                  <span className="text-xs font-normal text-(--gold) opacity-80">
                    (Toque para abrir o mapa)
                  </span>
                </a>
              ) : (
                <span className="font-roboto text-sm text-white sm:text-base">
                  {show.cidade}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-start gap-4 text-(--text-secondary)">
            <IconCalendar
              size={20}
              className="mt-0.5 shrink-0 text-(--gold)"
              aria-hidden="true"
            />
            <div className="flex flex-col">
              <span className="font-teko text-xs tracking-wider text-(--text-muted) uppercase sm:text-sm">
                Data
              </span>
              <span className="font-roboto text-sm text-white sm:text-base">
                {show.diaSemana}, {show.dia} de {show.mes} de {show.ano}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-4 text-(--text-secondary)">
            <IconClock
              size={20}
              className="mt-0.5 shrink-0 text-(--gold)"
              aria-hidden="true"
            />
            <div className="flex flex-col">
              <span className="font-teko text-xs tracking-wider text-(--text-muted) uppercase sm:text-sm">
                Horário
              </span>
              <span className="font-roboto text-sm text-white sm:text-base">
                {show.horario}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          {show.link && (
            <a
              href={show.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-teko flex flex-1 items-center justify-center gap-2 border border-(--gold) bg-(--gold) px-6 py-3 text-lg tracking-wider text-black uppercase transition-all hover:bg-(--gold-light) hover:shadow-[0_0_20px_rgba(201,162,39,0.25)] sm:text-xl"
            >
              <IconTicket size={20} aria-hidden="true" />
              Garantir Ingressos
            </a>
          )}

          {show.linkLocalizacao && (
            <a
              href={show.linkLocalizacao}
              target="_blank"
              rel="noopener noreferrer"
              className="font-teko flex flex-1 items-center justify-center gap-2 border border-(--border) bg-(--surface-2) px-6 py-3 text-lg tracking-wider text-(--text-secondary) uppercase transition-all hover:border-(--border-gold) hover:text-white sm:text-xl"
            >
              <IconMapPin
                size={20}
                className="text-(--gold)"
                aria-hidden="true"
              />
              Como Chegar
            </a>
          )}

          <button
            onClick={handleClose}
            className="font-teko flex flex-1 items-center justify-center border border-(--border) px-6 py-3 text-lg tracking-wider text-(--text-muted) uppercase transition-colors hover:border-(--border-gold) hover:text-white sm:text-xl"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
