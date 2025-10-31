import {
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandFacebook,
} from "@tabler/icons-react";
import Image from "next/image";

export default function TheFooter() {
  const navLinkClasses = [
    "relative",
    "text-gray-300",
    "transition-colors duration-300",
    "hover:text-white",
    "after:absolute after:bottom-[-2px] after:left-0",
    "after:h-[2px] after:w-0 after:bg-amber-400",
    "after:transition-all after:duration-300",
    "hover:after:w-full",
    "after:content-['']",
  ].join(" ");

  const socialIconClasses =
    "text-gray-400 transition-colors duration-300 hover:text-amber-400";

  return (
    <footer className="w-full border-t-2 border-t-amber-800 bg-zinc-950 text-gray-300">
      <div className="container mx-auto flex flex-col items-center gap-8 px-6 py-12">
        <div className="h-30 w-30">
          <Image
            src={"/logo.png"}
            width={256}
            height={256}
            alt="Logo Rosa dos Ventos"
            className="h-full w-full object-contain"
          />
        </div>

        <ul className="font-teko flex flex-wrap justify-center gap-x-6 gap-y-2 text-2xl tracking-wide sm:gap-x-10 sm:text-3xl">
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

        <div className="flex gap-x-6">
          <a
            href="https://instagram.com/bandarosadosventosbg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={socialIconClasses}
          >
            <IconBrandInstagram size={30} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className={socialIconClasses}
          >
            <IconBrandYoutube size={30} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className={socialIconClasses}
          >
            <IconBrandFacebook size={30} />
          </a>
        </div>

        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Banda Rosa dos Ventos. Todos os
          direitos reservados.
        </p>
      </div>
    </footer>
  );
}
