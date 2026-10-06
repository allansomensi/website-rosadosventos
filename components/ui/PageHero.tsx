import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import CompassRose from "./CompassRose";
import { Eyebrow } from "./SectionHeading";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumb: string;
  children?: React.ReactNode;
}

/** Cabeçalho padrão das páginas internas */
export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  children,
}: PageHeroProps) {
  return (
    <section className="border-bone/8 relative isolate overflow-hidden border-b pt-28 pb-14 sm:pt-36 sm:pb-20">
      <div
        aria-hidden="true"
        className="bg-brass/10 absolute -top-40 left-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full blur-[140px]"
      />
      <CompassRose className="text-brass/10 animate-spin-slow pointer-events-none absolute top-10 -right-40 -z-10 w-[520px] sm:-right-24 lg:right-0" />

      <div className="container-site">
        <nav aria-label="Trilha de navegação" className="animate-fade-up mb-8">
          <ol className="text-bone-dim flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase">
            <li>
              <Link href="/" className="hover:text-bone transition-colors">
                Início
              </Link>
            </li>
            <li aria-hidden="true">
              <IconChevronRight size={12} />
            </li>
            <li aria-current="page" className="text-bone-muted">
              {breadcrumb}
            </li>
          </ol>
        </nav>

        <div className="animate-fade-up [animation-delay:100ms]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="font-display text-bone mt-6 text-[clamp(3.25rem,12vw,8rem)] leading-[0.9] font-black tracking-tight text-balance uppercase">
            {title}
          </h1>
        </div>

        {description && (
          <div className="animate-fade-up text-bone-muted mt-6 max-w-2xl text-base leading-relaxed text-pretty [animation-delay:200ms] sm:text-lg">
            {description}
          </div>
        )}

        {children && (
          <div className="animate-fade-up mt-10 [animation-delay:300ms]">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
