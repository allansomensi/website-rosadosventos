import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";
import CompassRose from "@/components/ui/CompassRose";

export default function NotFound() {
  return (
    <main className="bg-ink-950 text-bone relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <CompassRose className="text-brass/12 animate-spin-slow absolute -z-10 w-[min(130vw,760px)]" />
      <p className="text-brass font-mono text-[11px] tracking-[0.3em] uppercase">
        Erro 404
      </p>
      <h1 className="font-display mt-4 text-[clamp(3.5rem,14vw,9rem)] leading-[0.85] font-black uppercase">
        Perdeu
        <span className="text-brass-gradient block">o rumo?</span>
      </h1>
      <p className="text-bone-muted mt-6 max-w-sm">
        Nem a rosa dos ventos encontrou esta página. Bora voltar para o palco
        principal.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className={buttonStyles({ size: "lg" })}>
          Voltar ao início
        </Link>
        <Link
          href="/#agenda"
          className={buttonStyles({ variant: "outline", size: "lg" })}
        >
          Ver a agenda
        </Link>
      </div>
    </main>
  );
}
