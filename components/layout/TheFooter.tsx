import { IconArrowUp, IconBrandWhatsapp, IconMail } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import SocialLinks from "@/components/ui/SocialLinks";
import {
  CONTRATANTE_LINK,
  NAV_LINKS,
  SITE_NAME,
  type ContactData,
} from "@/lib/site";
import pkg from "../../package.json";

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-bone-dim mb-5 font-mono text-[11px] tracking-[0.25em] uppercase">
      {children}
    </p>
  );
}

export default function TheFooter({
  logoUrl,
  contact,
}: {
  logoUrl: string;
  contact: ContactData | null;
}) {
  const whatsapp = contact?.whatsappContacts?.[0];
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 border-bone/8 relative overflow-hidden border-t">
      <div className="container-site pt-16 pb-8 sm:pt-24">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Marca */}
          <div className="sm:col-span-2 lg:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-4 transition-opacity hover:opacity-80"
              aria-label={`${SITE_NAME}, página inicial`}
            >
              {logoUrl && (
                <Image
                  src={logoUrl}
                  width={128}
                  height={128}
                  alt=""
                  className="h-16 w-16 object-contain"
                />
              )}
              <span className="font-display text-bone text-3xl leading-[0.9] font-extrabold tracking-wide uppercase">
                Rosa dos
                <br />
                Ventos
              </span>
            </Link>
            <p className="text-bone-muted mt-6 max-w-sm text-base leading-relaxed">
              Banda de pop rock para shows e eventos.
            </p>
            <SocialLinks links={contact?.socialLinks} className="mt-6" />
          </div>

          {/* Navegação */}
          <nav aria-label="Rodapé" className="lg:col-span-3 lg:col-start-6">
            <FooterHeading>Navegação</FooterHeading>
            <ul className="flex flex-col gap-3">
              {[...NAV_LINKS, CONTRATANTE_LINK].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-display text-bone/80 hover:text-brass text-xl font-bold tracking-wide uppercase transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div className="lg:col-span-4 lg:col-start-9">
            <FooterHeading>Contato</FooterHeading>
            <ul className="flex flex-col gap-4">
              {whatsapp && (
                <li>
                  <a
                    href={whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-bone/80 hover:text-bone flex items-center gap-3 transition-colors"
                  >
                    <IconBrandWhatsapp
                      size={20}
                      stroke={1.75}
                      className="text-brass shrink-0"
                      aria-hidden="true"
                    />
                    <span className="decoration-brass underline-offset-4 group-hover:underline">
                      {whatsapp.text}
                    </span>
                  </a>
                </li>
              )}
              {contact?.emailAddress && (
                <li>
                  <a
                    href={`mailto:${contact.emailAddress}`}
                    className="group text-bone/80 hover:text-bone flex items-center gap-3 transition-colors"
                  >
                    <IconMail
                      size={20}
                      stroke={1.75}
                      className="text-brass shrink-0"
                      aria-hidden="true"
                    />
                    <span className="decoration-brass break-all underline-offset-4 group-hover:underline">
                      {contact.emailAddress}
                    </span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Assinatura gigante */}
        <p
          aria-hidden="true"
          className="font-display text-outline text-bone/20 mt-16 text-center text-[min(13.2vw,10.5rem)] leading-[0.8] font-black tracking-tight whitespace-nowrap uppercase select-none sm:mt-24"
        >
          Rosa dos Ventos
        </p>

        <div className="border-bone/8 text-bone-dim mt-8 flex flex-col-reverse items-center justify-between gap-4 border-t pt-6 text-xs sm:flex-row">
          <p>
            &copy; {year} Banda {SITE_NAME}. Todos os direitos reservados.
            <span className="ml-3 font-mono">v{pkg.version}</span>
          </p>
          <a
            href="#"
            className="group hover:text-brass flex items-center gap-2 font-mono tracking-[0.2em] uppercase transition-colors"
          >
            Voltar ao topo
            <IconArrowUp
              size={14}
              aria-hidden="true"
              className="transition-transform group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
