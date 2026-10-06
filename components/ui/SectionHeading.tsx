interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  index?: string;
  description?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
  action?: React.ReactNode;
  className?: string;
}

export function Eyebrow({
  index,
  children,
  className = "",
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-brass flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] uppercase sm:text-xs ${className}`}
    >
      {index && <span className="text-bone-dim">{index}</span>}
      <span className="bg-brass/60 h-px w-8 sm:w-10" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

export default function SectionHeading({
  eyebrow,
  title,
  index,
  description,
  align = "left",
  as: Tag = "h2",
  id,
  action,
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${
        centered ? "items-center text-center md:flex-col md:items-center" : ""
      } ${className}`}
    >
      <div className={centered ? "flex flex-col items-center" : ""}>
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
        <Tag
          id={id}
          className="font-display text-bone mt-4 text-[clamp(2.75rem,9vw,5.5rem)] leading-[0.88] font-extrabold tracking-tight text-balance uppercase"
        >
          {title}
        </Tag>
        {description && (
          <p
            className={`text-bone-muted mt-5 max-w-xl text-base leading-relaxed text-pretty sm:text-lg ${
              centered ? "mx-auto" : ""
            }`}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
