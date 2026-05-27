import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconBrandYoutube,
  IconLink,
  IconMail,
} from "@tabler/icons-react";
import { sanityFetch } from "@/sanity/lib/live";
import { CONTACT_QUERY } from "@/sanity/lib/queries";

interface ContactData {
  title?: string;
  subtitle?: string;
  emailTitle?: string;
  emailAddress?: string;
  whatsappTitle?: string;
  whatsappContacts?: { text: string; url: string }[];
  socialTitle?: string;
  socialLinks?: { platform: string; url: string }[];
}

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "instagram":
      return <IconBrandInstagram size={32} aria-hidden="true" />;
    case "youtube":
      return <IconBrandYoutube size={32} aria-hidden="true" />;
    case "facebook":
      return <IconBrandFacebook size={32} aria-hidden="true" />;
    default:
      return <IconLink size={32} aria-hidden="true" />;
  }
};

interface ContactCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

function ContactCard({ icon, label, value, href, external }: ContactCardProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group bg-background flex w-full flex-col items-center rounded-2xl border border-(--border) p-6 transition-all duration-300 hover:-translate-y-1 hover:border-(--border-gold) hover:bg-(--surface-2) hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] sm:p-8"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-(--surface-3) text-(--gold) transition-all duration-300 group-hover:scale-110 group-hover:bg-(--gold) group-hover:text-black sm:h-16 sm:w-16">
        {icon}
      </div>
      <span className="font-teko mt-5 text-xs tracking-widest text-(--text-muted) uppercase sm:mt-6 sm:text-sm">
        {label}
      </span>
      <span className="font-roboto mt-2 max-w-full text-center text-base font-semibold break-all text-white sm:text-lg">
        {value}
      </span>
    </a>
  );
}

export default async function Contact() {
  const { data } = await sanityFetch({ query: CONTACT_QUERY });
  const contact = data as ContactData | null;

  if (!contact) return null;

  const totalCards =
    (contact.whatsappContacts?.length ?? 0) +
    (contact.emailAddress ? 1 : 0) +
    (contact.socialLinks?.length ?? 0);

  const gridClass =
    totalCards <= 3
      ? "flex flex-wrap justify-center gap-6"
      : "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      id="contato"
      className="relative border-t border-(--border) bg-(--surface) py-20 sm:py-28"
      aria-label="Seção de contato"
    >
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <div className="mb-14 sm:mb-16">
          <p className="font-teko mb-2 text-xl tracking-[0.25em] text-(--gold) uppercase sm:text-2xl">
            {contact.title}
          </p>
          <h2 className="font-cinzel text-3xl font-bold tracking-wide text-white sm:text-5xl md:text-6xl">
            {contact.subtitle}
          </h2>
          <div
            className="mx-auto mt-5 h-px w-20 bg-(--gold)"
            aria-hidden="true"
          />
        </div>

        <div className={gridClass}>
          {contact.whatsappContacts?.map((whats, index) => (
            <ContactCard
              key={index}
              icon={<IconBrandWhatsapp size={32} aria-hidden="true" />}
              label={contact.whatsappTitle ?? "WhatsApp"}
              value={whats.text}
              href={whats.url}
              external
            />
          ))}

          {contact.emailAddress && (
            <ContactCard
              icon={<IconMail size={32} aria-hidden="true" />}
              label={contact.emailTitle ?? "Email"}
              value={contact.emailAddress}
              href={`mailto:${contact.emailAddress}`}
            />
          )}

          {contact.socialLinks?.map((social, index) => (
            <ContactCard
              key={index}
              icon={getSocialIcon(social.platform)}
              label={contact.socialTitle ?? "Redes Sociais"}
              value={
                social.platform.charAt(0).toUpperCase() +
                social.platform.slice(1)
              }
              href={social.url}
              external
            />
          ))}
        </div>
      </div>
    </section>
  );
}
