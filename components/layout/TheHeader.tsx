"use client";

import { IconMenu2, IconX } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/#agenda", label: "Agenda" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#contato", label: "Contato" },
  { href: "/loja", label: "Loja" },
  { href: "/contratante", label: "Área do Contratante" },
];

export default function TheHeader({ logoUrl }: { logoUrl: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full transform-gpu transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0acc] shadow-[0_1px_0_var(--border-gold)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:py-5">
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
            onClick={close}
          >
            {logoUrl && logoUrl !== "" && (
              <Image
                src={logoUrl}
                width={80}
                height={80}
                alt="Rosa dos Ventos"
                className="h-10 w-10 object-contain sm:h-12 sm:w-12 md:h-16 md:w-16"
              />
            )}
            <span className="font-cinzel hidden bg-linear-to-b from-(--gold-light) to-(--gold-dark) bg-clip-text text-xl font-bold tracking-widest text-transparent uppercase sm:block md:text-2xl">
              Rosa dos Ventos
            </span>
          </Link>

          <ul className="font-teko hidden items-center gap-8 text-[1.35rem] tracking-wider lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative text-(--text-secondary) transition-colors duration-300 hover:text-white ${
                    link.href === "/contratante"
                      ? "rounded border border-(--border-gold) px-4 py-1.5 text-(--gold) hover:border-(--gold) hover:bg-(--gold) hover:text-black"
                      : "after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-(--gold) after:transition-all after:duration-300 hover:after:w-full"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            className="flex h-10 w-10 items-center justify-center text-(--text-secondary) transition-colors hover:text-white lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 transition-all duration-300 lg:hidden ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={close}
        />
        <nav
          className={`absolute top-0 right-0 h-full w-72 border-l border-(--border-gold) bg-(--surface) transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-20 items-center px-6">
            <span className="font-cinzel text-sm tracking-widest text-(--gold) uppercase opacity-80">
              Menu
            </span>
          </div>
          <ul className="font-teko flex flex-col px-6 text-2xl tracking-wider">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={close}
                  className={`block border-b border-(--border) py-5 text-(--text-secondary) transition-colors hover:text-(--gold) ${
                    i === NAV_LINKS.length - 1 ? "border-0 text-(--gold)" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
