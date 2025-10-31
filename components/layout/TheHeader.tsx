"use client";

import { IconMenu2, IconX } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

export default function TheHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClasses = [
    "relative",
    "text-gray-300",
    "transition-colors duration-300",
    "hover:text-white",
    "after:absolute after:bottom-[-5px] after:left-0",
    "after:h-[2px] after:w-0 after:bg-amber-400",
    "after:transition-all after:duration-300",
    "hover:after:w-full",
    "after:content-['']",
  ].join(" ");

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`sticky top-0 left-0 z-50 w-full border-b-2 border-b-amber-800 bg-linear-to-br from-zinc-950 to-zinc-900 shadow-lg`}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="h-15 w-15 shrink-0">
            <Image
              src={"/logo.png"}
              width={256}
              height={256}
              alt="Logo Rosa dos Ventos"
              className="h-12 w-12 object-contain sm:h-14 sm:w-14"
            />
          </div>
          <span className="font-cinzel bg-linear-to-b from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-2xl font-bold tracking-wider text-transparent uppercase select-none [text-shadow:0_2px_4px_rgba(0,0,0,0.5)] sm:text-3xl">
            Rosa dos Ventos
          </span>
        </div>

        <ul className="font-teko hidden items-center space-x-10 text-3xl tracking-wide lg:flex">
          <li>
            <a href="#agenda" className={navLinkClasses}>
              Agenda
            </a>
          </li>
          <li>
            <a href="#sobre" className={navLinkClasses}>
              Sobre
            </a>
          </li>
          <li>
            <a href="#contato" className={navLinkClasses}>
              Contato
            </a>
          </li>
        </ul>

        <button
          className="text-gray-300 hover:text-white lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menu"
        >
          {isOpen ? <IconX /> : <IconMenu2 />}
        </button>
      </nav>

      <div
        className={`transition-all duration-300 ease-in-out lg:hidden ${
          isOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <ul className="font-teko flex flex-col items-center space-y-6 py-6 text-3xl tracking-wide">
          <li>
            <a
              href="#agenda"
              className={navLinkClasses}
              onClick={handleLinkClick}
            >
              Agenda
            </a>
          </li>
          <li>
            <a
              href="#sobre"
              className={navLinkClasses}
              onClick={handleLinkClick}
            >
              Sobre
            </a>
          </li>
          <li>
            <a
              href="#contato"
              className={navLinkClasses}
              onClick={handleLinkClick}
            >
              Contato
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
