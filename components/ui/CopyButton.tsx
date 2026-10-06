"use client";

import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useState } from "react";

export default function CopyButton({
  value,
  label = "Copiar",
  className = "",
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard indisponível (ex.: contexto inseguro)
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copiado!" : label}
      title={copied ? "Copiado!" : label}
      className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
        copied
          ? "bg-brass text-ink-950"
          : "text-bone-muted hover:bg-ink-700 hover:text-bone"
      } ${className}`}
    >
      {copied ? (
        <IconCheck size={18} aria-hidden="true" />
      ) : (
        <IconCopy size={18} aria-hidden="true" />
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copiado para a área de transferência" : ""}
      </span>
    </button>
  );
}
