import CompassRose from "./CompassRose";

/** Selo circular com texto girando ao redor de uma rosa-dos-ventos */
export default function CircleBadge({
  text = "Rosa dos Ventos ✦ Pop Rock ao vivo ✦ ",
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={className}>
      <div className="bg-ink-950 border-brass/40 relative flex h-full w-full items-center justify-center rounded-full border">
        <svg
          viewBox="0 0 100 100"
          className="animate-spin-slow absolute inset-0 h-full w-full [animation-duration:24s]"
        >
          <defs>
            <path
              id="circle-badge-path"
              d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
            />
          </defs>
          <text className="fill-brass font-mono text-[8.6px] tracking-[0.18em] uppercase">
            <textPath
              href="#circle-badge-path"
              textLength="238"
              lengthAdjust="spacing"
            >
              {text}
            </textPath>
          </text>
        </svg>
        <CompassRose className="text-brass h-[42%] w-[42%]" strokeWidth={1} />
      </div>
    </div>
  );
}
