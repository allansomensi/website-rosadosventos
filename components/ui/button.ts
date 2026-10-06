type ButtonVariant = "primary" | "outline" | "ghost" | "whatsapp";
type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "group/btn relative inline-flex shrink-0 items-center justify-center gap-2.5 rounded-sm font-display font-bold uppercase tracking-[0.08em] whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40 [&_svg]:shrink-0";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-brass text-ink-950 hover:bg-brass-bright hover:shadow-[0_8px_40px_-8px_var(--color-brass)]",
  outline:
    "border border-bone/25 bg-ink-950/30 text-bone backdrop-blur-sm hover:border-brass hover:text-brass-bright",
  ghost: "text-bone-muted hover:text-bone",
  whatsapp:
    "bg-whatsapp text-ink-950 hover:brightness-110 hover:shadow-[0_8px_40px_-8px_var(--color-whatsapp)]",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-base",
  md: "h-12 px-6 text-lg",
  lg: "h-14 px-8 text-xl",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className = "",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  // Permite sobrescrever altura/padding do tamanho sem conflito de classes
  const overridden = new Set(
    className
      .split(/\s+/)
      .filter((token) => !token.includes(":"))
      .map((token) => token.split("-")[0]),
  );
  const sizeClasses = SIZES[size]
    .split(" ")
    .filter(
      (token) =>
        !["h", "px"].includes(token.split("-")[0]) ||
        !overridden.has(token.split("-")[0]),
    )
    .join(" ");

  return `${BASE} ${VARIANTS[variant]} ${sizeClasses} ${className}`.trim();
}
