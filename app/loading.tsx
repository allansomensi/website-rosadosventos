import CompassRose from "@/components/ui/CompassRose";

export default function Loading() {
  return (
    <div
      role="status"
      className="bg-ink-950 flex min-h-svh w-full flex-col items-center justify-center gap-6"
    >
      <CompassRose className="text-brass h-16 w-16 animate-spin [animation-duration:3s]" />
      <span className="text-bone-dim font-mono text-[11px] tracking-[0.3em] uppercase">
        Afinando os instrumentos…
      </span>
    </div>
  );
}
