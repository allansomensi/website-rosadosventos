"use client";

import {
  IconCalendarPlus,
  IconCheck,
  IconClock,
  IconMapPin,
  IconShare2,
  IconTicket,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useId, useRef, useState } from "react";
import { buttonStyles } from "@/components/ui/button";
import { googleCalendarUrl, type FormattedShow } from "@/lib/shows";

interface ShowModalProps {
  show: FormattedShow;
  isNext?: boolean;
  onClose: () => void;
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 py-4">
      <span className="bg-ink-800 text-brass flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-bone-dim font-mono text-[10px] tracking-[0.25em] uppercase">
          {label}
        </p>
        <div className="text-bone mt-1 text-[15px]">{children}</div>
      </div>
    </div>
  );
}

export default function ShowModal({ show, isNext, onClose }: ShowModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      if (dialog.open) dialog.close();
    };
  }, []);

  const handleShare = async () => {
    const url = `${window.location.origin}/#agenda`;
    const text = `Rosa dos Ventos ao vivo — ${show.local}, ${show.cidade} · ${show.dia}/${show.mes}`;

    try {
      if (navigator.share) {
        await navigator.share({ title: "Rosa dos Ventos", text, url });
      } else {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        setShared(true);
        setTimeout(() => setShared(false), 2500);
      }
    } catch {
      // usuário cancelou o compartilhamento
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className="text-bone backdrop:bg-ink-950/80 m-0 mt-auto max-h-[92svh] w-full max-w-full bg-transparent p-0 backdrop:backdrop-blur-sm sm:m-auto sm:max-w-lg"
    >
      <div className="animate-sheet-up bg-ink-900 border-bone/10 relative overflow-y-auto rounded-t-2xl border pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:rounded-md">
        {/* Alça do bottom-sheet (mobile) */}
        <div
          className="bg-bone/20 mx-auto mt-3 h-1 w-10 rounded-full sm:hidden"
          aria-hidden="true"
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar detalhes do show"
          className="text-bone-muted hover:bg-ink-800 hover:text-bone absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full transition-colors sm:top-4 sm:right-4"
        >
          <IconX size={20} />
        </button>

        {/* Cabeçalho tipo ingresso */}
        <div className="border-bone/10 flex items-end gap-5 border-b border-dashed px-6 pt-5 pb-6 sm:px-8 sm:pt-8">
          <div className="bg-brass text-ink-950 flex w-20 shrink-0 flex-col items-center rounded-sm py-2">
            <span className="font-display text-5xl leading-none font-black">
              {show.dia}
            </span>
            <span className="font-mono text-[11px] font-bold tracking-widest uppercase">
              {show.mes} {show.ano}
            </span>
          </div>
          <div className="min-w-0 pr-8">
            <p className="text-brass flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase">
              {isNext ? "Próximo show" : "Detalhes do show"}
            </p>
            <h2
              id={titleId}
              className="font-display mt-1 text-3xl leading-[0.95] font-extrabold tracking-tight text-balance uppercase sm:text-4xl"
            >
              {show.local}
            </h2>
          </div>
        </div>

        <div className="divide-bone/8 divide-y px-6 sm:px-8">
          <InfoRow
            icon={<IconMapPin size={18} aria-hidden="true" />}
            label="Local"
          >
            {show.linkLocalizacao ? (
              <a
                href={show.linkLocalizacao}
                target="_blank"
                rel="noopener noreferrer"
                className="decoration-brass/60 hover:text-brass underline underline-offset-4 transition-colors"
              >
                {show.cidade}
              </a>
            ) : (
              show.cidade
            )}
          </InfoRow>
          <InfoRow
            icon={<IconClock size={18} aria-hidden="true" />}
            label="Data e horário"
          >
            {show.diaSemana}, {show.dia} de {show.mes} de {show.ano}
            <span className="text-bone-muted"> · {show.horario}</span>
          </InfoRow>
        </div>

        <div className="flex flex-col gap-3 px-6 pt-4 sm:px-8">
          {(show.link || show.linkLocalizacao) && (
            <div className="flex flex-col gap-3 sm:flex-row">
              {show.link && (
                <a
                  href={show.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonStyles({ className: "sm:flex-1" })}
                >
                  <IconTicket size={20} aria-hidden="true" />
                  Garantir ingresso
                </a>
              )}
              {show.linkLocalizacao && (
                <a
                  href={show.linkLocalizacao}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonStyles({
                    variant: "outline",
                    className: "sm:flex-1",
                  })}
                >
                  <IconMapPin size={20} aria-hidden="true" />
                  Como chegar
                </a>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <a
              href={googleCalendarUrl(show)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({
                variant: "ghost",
                size: "sm",
                className:
                  "border-bone/10 hover:border-bone/25 border px-2 max-sm:text-sm",
              })}
            >
              <IconCalendarPlus size={18} aria-hidden="true" />
              Salvar na agenda
            </a>
            <button
              type="button"
              onClick={handleShare}
              className={buttonStyles({
                variant: "ghost",
                size: "sm",
                className:
                  "border-bone/10 hover:border-bone/25 border px-2 max-sm:text-sm",
              })}
            >
              {shared ? (
                <IconCheck size={18} aria-hidden="true" />
              ) : (
                <IconShare2 size={18} aria-hidden="true" />
              )}
              <span aria-live="polite">
                {shared ? "Link copiado" : "Compartilhar"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
