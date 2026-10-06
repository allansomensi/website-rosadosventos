const r2 = (n: number) => Math.round(n * 100) / 100;

const polar = (radius: number, deg: number) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [r2(radius * Math.cos(rad)), r2(radius * Math.sin(rad))] as const;
};

/** Estrela de 8 pontas: cardeais longas, colaterais curtas */
const STAR_POINTS = Array.from({ length: 16 }, (_, i) => {
  const deg = i * 22.5;
  const radius = i % 2 === 1 ? 5.5 : i % 4 === 0 ? 41 : 27;
  return polar(radius, deg).join(",");
}).join(" ");

/** Metade "sombreada" de cada ponta cardeal, como nas rosas-dos-ventos clássicas */
const SHADED_HALVES = [0, 90, 180, 270].map((deg) => {
  const tip = polar(41, deg);
  const side = polar(5.5, deg + 22.5);
  return `M0,0 L${tip.join(",")} L${side.join(",")} Z`;
});

const TICKS = Array.from({ length: 72 }, (_, i) => {
  const deg = i * 5;
  const major = deg % 45 === 0;
  const [x1, y1] = polar(major ? 41.5 : 43, deg);
  const [x2, y2] = polar(45, deg);
  return { x1, y1, x2, y2, major, key: deg };
});

export default function CompassRose({
  className = "",
  strokeWidth = 0.35,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="-50 -50 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle r="48" />
      <circle r="45" />
      <circle r="33" strokeDasharray="0.6 1.4" />
      <circle r="18" />
      {TICKS.map((t) => (
        <line
          key={t.key}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          strokeWidth={t.major ? strokeWidth * 2 : strokeWidth}
        />
      ))}
      <polygon points={STAR_POINTS} strokeLinejoin="round" />
      {SHADED_HALVES.map((d) => (
        <path key={d} d={d} fill="currentColor" fillOpacity="0.18" />
      ))}
      <circle r="2.2" fill="currentColor" />
    </svg>
  );
}
