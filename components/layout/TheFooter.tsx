import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
  IconLink,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { CONTACT_QUERY } from "@/sanity/lib/queries";

interface FooterContactData {
  socialLinks?: { platform: string; url: string }[];
}

const NAV_LINKS = [
  { href: "#agenda", label: "Agenda" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
  { href: "/contratante", label: "Área do Contratante" },
];

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "instagram":
      return <IconBrandInstagram size={28} />;
    case "youtube":
      return <IconBrandYoutube size={28} />;
    case "facebook":
      return <IconBrandFacebook size={28} />;
    default:
      return <IconLink size={28} />;
  }
};

export default async function TheFooter({ logoUrl }: { logoUrl: string }) {
  const { data } = await sanityFetch({ query: CONTACT_QUERY });
  const contact = data as FooterContactData | null;

  return (
    <footer className="border-t border-(--border-gold)/30 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-20">
        <div className="flex flex-col items-center gap-10 md:grid md:grid-cols-3 md:items-center md:gap-12 md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Link
              href="/"
              className="flex flex-col items-center gap-4 text-center transition-transform hover:scale-105 md:flex-row md:text-left"
            >
              <Image
                src={logoUrl}
                width={112}
                height={112}
                alt="Rosa dos Ventos"
                className="h-24 w-24 shrink-0 object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.2)] md:h-20 md:w-20"
              />
              <span className="font-cinzel bg-linear-to-b from-(--gold-light) to-(--gold-dark) bg-clip-text text-2xl font-bold tracking-[0.15em] text-transparent uppercase">
                Rosa dos Ventos
              </span>
            </Link>
          </div>

          <nav className="flex w-full justify-center">
            <ul className="font-teko flex flex-wrap justify-center gap-x-6 gap-y-2 text-2xl tracking-widest uppercase sm:gap-x-10 md:flex-row">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 transition-colors duration-300 hover:text-(--gold)"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-center gap-4 md:items-end">
            <p className="font-teko hidden text-xl tracking-widest text-(--gold) uppercase md:block">
              Siga nas Redes
            </p>
            <div className="flex items-center justify-center gap-6">
              {contact?.socialLinks?.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="rounded-full bg-zinc-900 p-3 text-zinc-400 transition-all duration-300 hover:-translate-y-1 hover:bg-(--gold) hover:text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t border-zinc-800/60 pt-8 text-center md:mt-20 md:flex-row">
          <p className="text-sm tracking-wide text-zinc-500">
            &copy; {new Date().getFullYear()} Banda Rosa dos Ventos. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
