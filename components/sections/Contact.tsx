import {
  IconArrowRight,
  IconBrandWhatsapp,
  IconMail,
} from "@tabler/icons-react";
import Link from "next/link";
import ContactCard from "@/components/common/ContactCard";
import CompassRose from "@/components/ui/CompassRose";
import { Eyebrow } from "@/components/ui/SectionHeading";
import SocialLinks from "@/components/ui/SocialLinks";
import { CONTRATANTE_LINK, type ContactData } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/live";
import { CONTACT_QUERY } from "@/sanity/lib/queries";

export default async function Contact() {
  const { data } = await sanityFetch({ query: CONTACT_QUERY });
  const contact = data as ContactData | null;

  if (!contact) return null;

  return (
    <section
      id="contato"
      aria-labelledby="contact-title"
      className="bg-ink-900 border-bone/8 relative overflow-hidden border-t py-20 sm:py-28 lg:py-36"
    >
      <CompassRose className="text-brass/6 pointer-events-none absolute -right-72 -bottom-72 w-[760px]" />

      <div className="container-site relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="reveal lg:col-span-6">
          <Eyebrow>{contact.title || "Contato"}</Eyebrow>
          <h2
            id="contact-title"
            className="font-display text-bone mt-4 text-[clamp(2.75rem,9vw,5.5rem)] leading-[0.88] font-extrabold tracking-tight text-balance uppercase"
          >
            {contact.subtitle || "Fale com a banda"}
          </h2>
          <p className="text-bone-muted mt-6 max-w-md text-base leading-relaxed sm:text-lg">
            Para shows, eventos e parcerias, entre em contato pelo WhatsApp ou
            por e-mail.
          </p>

          <Link
            href={CONTRATANTE_LINK.href}
            className="group border-brass/30 hover:border-brass hover:bg-brass/5 mt-10 flex max-w-md items-center justify-between gap-4 rounded-sm border border-dashed p-5 transition-colors"
          >
            <span>
              <span className="text-brass block font-mono text-[10px] tracking-[0.25em] uppercase">
                É contratante ou produtor?
              </span>
              <span className="font-display text-bone mt-1 block text-2xl font-bold uppercase">
                Acesse o material oficial
              </span>
            </span>
            <IconArrowRight
              size={22}
              aria-hidden="true"
              className="text-brass shrink-0 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="reveal flex flex-col gap-3 lg:col-span-6 lg:pt-10">
          {contact.whatsappContacts?.map((whats) => (
            <ContactCard
              key={whats.url}
              icon={
                <IconBrandWhatsapp size={26} stroke={1.75} aria-hidden="true" />
              }
              label={contact.whatsappTitle ?? "WhatsApp"}
              value={whats.text}
              href={whats.url}
              tone="whatsapp"
              external
            />
          ))}

          {contact.emailAddress && (
            <ContactCard
              icon={<IconMail size={26} stroke={1.75} aria-hidden="true" />}
              label={contact.emailTitle ?? "E-mail"}
              value={contact.emailAddress}
              href={`mailto:${contact.emailAddress}`}
              copyValue={contact.emailAddress}
              valueStyle="text"
            />
          )}

          {!!contact.socialLinks?.length && (
            <div className="border-bone/10 mt-6 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-bone-dim font-mono text-[11px] tracking-[0.25em] uppercase">
                {contact.socialTitle || "Siga a banda"}
              </p>
              <SocialLinks links={contact.socialLinks} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
