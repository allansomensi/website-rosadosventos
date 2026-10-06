"use client";

import { IconRefresh } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect } from "react";
import { buttonStyles } from "@/components/ui/button";
import CompassRose from "@/components/ui/CompassRose";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-ink-950 text-bone relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <CompassRose className="text-brass/10 absolute -z-10 w-[min(120vw,720px)]" />
      <p className="text-brass font-mono text-[11px] tracking-[0.3em] uppercase">
        Microfonia no sistema
      </p>
      <h1 className="font-display mt-4 text-[clamp(3rem,10vw,6rem)] leading-[0.9] font-black uppercase">
        Algo deu errado
      </h1>
      <p className="text-bone-muted mt-4 max-w-md">
        Ocorreu um problema ao carregar a página. Tente de novo em instantes.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => reset()}
          className={buttonStyles()}
        >
          <IconRefresh size={18} aria-hidden="true" />
          Tentar novamente
        </button>
        <Link href="/" className={buttonStyles({ variant: "outline" })}>
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
