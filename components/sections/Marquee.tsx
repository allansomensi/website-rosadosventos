const ITEMS = [
  "Rock ao vivo",
  "Pop rock",
  "Rosa dos Ventos",
  "Bora cantar junto",
  "Som na caixa",
  "Rosa dos Ventos",
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {ITEMS.map((item, i) => (
        <li key={i} className="flex items-center">
          <span className="px-6 sm:px-8">{item}</span>
          <span className="text-ink-950/40 text-[0.6em]" aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Faixa de pôster rolando — pura CSS, pausa ao passar o mouse */
export default function Marquee() {
  return (
    <div className="bg-ink-950 relative z-10 overflow-hidden py-6 sm:py-8">
      <div className="bg-brass text-ink-950 font-display group -mx-8 flex -rotate-[1.5deg] overflow-hidden py-3 text-2xl font-black tracking-wide uppercase shadow-[0_20px_60px_-20px_rgb(0_0_0/0.8)] sm:py-4 sm:text-4xl">
        <div className="animate-marquee flex w-max group-hover:[animation-play-state:paused]">
          <Row />
          <Row hidden />
        </div>
      </div>
    </div>
  );
}
