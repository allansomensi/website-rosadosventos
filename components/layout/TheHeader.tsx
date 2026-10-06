"use client";

import { IconArrowUpRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { buttonStyles } from "@/components/ui/button";
import CompassRose from "@/components/ui/CompassRose";
import SocialLinks from "@/components/ui/SocialLinks";
import {
  CONTRATANTE_LINK,
  NAV_LINKS,
  SITE_NAME,
  type SocialLink,
} from "@/lib/site";

/** Seções da home que acendem cada link do menu durante o scroll */
const SECTION_TO_LINK: Record<string, string> = {
  agenda: "agenda",
  sobre: "sobre",
  musicos: "sobre",
  contato: "contato",
};

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.45;
      const current = Object.keys(SECTION_TO_LINK).find((id) => {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        return rect && rect.top <= line && rect.bottom > line;
      });
      setActive(current ? SECTION_TO_LINK[current] : null);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return enabled ? active : null;
}

export default function TheHeader({
  logoUrl,
  socialLinks,
}: {
  logoUrl: string;
  socialLinks?: SocialLink[];
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isOpen, setIsOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const activeSection = useActiveSection(isHome);

  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const lastY = useRef(0);

  const close = useCallback(() => setIsOpen(false), []);

  // Fecha o menu ao trocar de rota (inclusive pelo botão voltar)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Fundo ao rolar + esconde ao descer / mostra ao subir
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      setScrolled(y > 24);
      if (y <= 480 || delta < -6) setHidden(false);
      else if (delta > 6) setHidden(true);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava o scroll, ESC fecha, foco preso dentro do menu
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    const toggle = toggleRef.current;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (e.key !== "Tab" || !rootRef.current) return;

      const focusables = rootRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const visible = Array.from(focusables).filter(
        (el) => el.offsetParent !== null,
      );
      const first = visible[0];
      const last = visible[visible.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      toggle?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  const isLinkActive = (href: string, section?: string) =>
    section ? activeSection === section : pathname.startsWith(href);

  const solid = scrolled || isOpen || !isHome;

  return (
    <div ref={rootRef}>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-(--ease-out-expo) ${
          hidden && !isOpen ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <a
          href="#conteudo"
          className="bg-brass text-ink-950 sr-only z-60 px-4 py-2 font-semibold focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
        >
          Pular para o conteúdo
        </a>

        {/* Barra */}
        <div
          className={`relative z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
            solid
              ? "border-bone/8 bg-ink-950/80 border-b backdrop-blur-xl backdrop-saturate-150"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <nav
            aria-label="Principal"
            className="container-site flex h-16 items-center justify-between gap-6 lg:h-20"
          >
            <Link
              href="/"
              onClick={close}
              className="group flex items-center gap-3"
              aria-label={`${SITE_NAME} — página inicial`}
            >
              {logoUrl && (
                <Image
                  src={logoUrl}
                  width={96}
                  height={96}
                  alt=""
                  preload
                  className="h-10 w-10 object-contain transition-transform duration-700 ease-(--ease-out-expo) group-hover:rotate-45 lg:h-12 lg:w-12"
                />
              )}
              <span className="font-display text-bone text-xl leading-none font-extrabold tracking-[0.06em] uppercase lg:text-2xl">
                Rosa <span className="text-brass">dos</span> Ventos
              </span>
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) => {
                const active = isLinkActive(link.href, link.section);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`font-display relative flex h-10 items-center px-4 text-lg font-bold tracking-[0.08em] uppercase transition-colors duration-300 ${
                        active ? "text-brass" : "text-bone/75 hover:text-bone"
                      }`}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={`bg-brass absolute inset-x-4 bottom-1 h-0.5 origin-left transition-transform duration-500 ease-(--ease-out-expo) ${
                          active ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
              <li className="ml-4">
                <Link
                  href={CONTRATANTE_LINK.href}
                  className={buttonStyles({ size: "sm" })}
                >
                  Contrate a banda
                  <IconArrowUpRight
                    size={18}
                    stroke={2.25}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                  />
                </Link>
              </li>
            </ul>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-expanded={isOpen}
              aria-controls="menu-mobile"
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
              className="text-bone -mr-2 flex h-11 items-center gap-3 px-2 lg:hidden"
            >
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase">
                {isOpen ? "Fechar" : "Menu"}
              </span>
              <span className="relative block h-3 w-6" aria-hidden="true">
                <span
                  className={`bg-bone absolute left-0 h-0.5 w-6 transition-all duration-300 ${
                    isOpen ? "top-1.25 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`bg-bone absolute left-0 h-0.5 transition-all duration-300 ${
                    isOpen ? "top-1.25 w-6 -rotate-45" : "top-2.5 w-4"
                  }`}
                />
              </span>
            </button>
          </nav>
        </div>
      </header>

      {/* Menu mobile — fora do <header> para que o transform dele não
          vire o bloco de contenção deste overlay fixo */}
      <div
        id="menu-mobile"
        inert={!isOpen}
        className={`bg-ink-950 fixed inset-0 z-40 flex flex-col overflow-y-auto pt-16 transition-[opacity,visibility] duration-500 lg:hidden ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <CompassRose
          className={`text-brass/10 pointer-events-none absolute -right-32 -bottom-32 w-[130vw] max-w-180 transition-transform duration-[1.5s] ease-(--ease-out-expo) ${
            isOpen ? "rotate-0" : "-rotate-45"
          }`}
        />

        <nav
          aria-label="Menu"
          className="container-site relative flex flex-1 flex-col justify-between gap-10 py-10"
        >
          <ul className="flex flex-col">
            {[...NAV_LINKS, CONTRATANTE_LINK].map((link, i) => {
              const active = isLinkActive(link.href, link.section);
              return (
                <li
                  key={link.href}
                  className={`border-bone/8 border-b transition-[opacity,transform] duration-700 ease-(--ease-out-expo) ${
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${100 + i * 60}ms` : "0ms",
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className="group flex items-baseline gap-4 py-4"
                  >
                    <span className="text-bone-dim font-mono text-xs">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-[clamp(2.25rem,11vw,3.5rem)] leading-none font-extrabold tracking-tight uppercase transition-colors ${
                        active || link === CONTRATANTE_LINK
                          ? "text-brass"
                          : "text-bone group-active:text-brass"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            className={`flex flex-col gap-5 transition-opacity delay-300 duration-700 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-bone-dim font-mono text-[11px] tracking-[0.25em] uppercase">
              Siga a banda
            </p>
            <SocialLinks links={socialLinks} />
          </div>
        </nav>
      </div>
    </div>
  );
}
