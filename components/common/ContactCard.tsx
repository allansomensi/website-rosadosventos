import { IconArrowUpRight } from "@tabler/icons-react";
import CopyButton from "@/components/ui/CopyButton";

interface ContactCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  copyValue?: string;
  tone?: "brass" | "whatsapp";
  /** "text" para valores longos, como e-mails */
  valueStyle?: "display" | "text";
}

export default function ContactCard({
  icon,
  label,
  value,
  href,
  external,
  copyValue,
  tone = "brass",
  valueStyle = "display",
}: ContactCardProps) {
  const toneClasses =
    tone === "whatsapp"
      ? "group-hover:bg-whatsapp group-hover:text-ink-950"
      : "group-hover:bg-brass group-hover:text-ink-950";

  return (
    <div className="group border-bone/10 bg-ink-950/60 hover:border-bone/25 hover:bg-ink-850 relative flex items-center gap-4 rounded-sm border p-4 transition-colors duration-300 sm:gap-5 sm:p-5">
      <span
        className={`bg-ink-800 text-brass flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors duration-300 sm:h-14 sm:w-14 ${toneClasses}`}
      >
        {icon}
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-bone-dim font-mono text-[10px] tracking-[0.25em] uppercase">
          {label}
        </p>
        <a
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className={`text-bone mt-0.5 block after:absolute after:inset-0 ${
            valueStyle === "display"
              ? "font-display truncate text-xl font-bold tracking-wide sm:text-2xl"
              : "text-[15px] font-semibold wrap-break-word sm:text-base"
          }`}
        >
          {valueStyle === "text" && value.includes("@") ? (
            // permite quebrar o e-mail logo após o @ em telas estreitas
            <>
              {value.split("@")[0]}@<wbr />
              {value.split("@").slice(1).join("@")}
            </>
          ) : (
            value
          )}
        </a>
      </div>

      {copyValue ? (
        <CopyButton
          value={copyValue}
          label={`Copiar ${label.toLowerCase()}`}
          className="relative z-10 shrink-0"
        />
      ) : (
        <IconArrowUpRight
          size={22}
          aria-hidden="true"
          className="text-bone-dim group-hover:text-bone shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </div>
  );
}
