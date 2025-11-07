import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconBrandYoutube,
  IconMail,
} from "@tabler/icons-react";
import { sanityFetch } from "@/sanity/lib/live";
import { CONTACT_QUERY } from "@/sanity/lib/queries";

type WhatsappContact = {
  text: string;
  url: string;
};

type SocialLink = {
  platform: "instagram" | "youtube" | "facebook";
  url: string;
};

type ContactPayload = {
  title: string;
  subtitle: string;
  emailTitle: string;
  emailAddress: string;
  whatsappTitle: string;
  whatsappContacts: WhatsappContact[];
  socialTitle: string;
  socialLinks: SocialLink[];
};

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-gray-400 transition-all duration-300 hover:scale-110 hover:text-amber-400"
    >
      {icon}
    </a>
  );
}

const socialIcons = {
  instagram: {
    icon: <IconBrandInstagram size={36} />,
    label: "Instagram",
  },
  youtube: {
    icon: <IconBrandYoutube size={36} />,
    label: "YouTube",
  },
  facebook: {
    icon: <IconBrandFacebook size={36} />,
    label: "Facebook",
  },
};

export default async function Contact() {
  const { data } = await sanityFetch({
    query: CONTACT_QUERY,
  });
  const contact: ContactPayload = data;

  if (!contact) {
    return null;
  }

  return (
    <section id="contato" className="bg-zinc-900 py-20">
      <div className="container mx-auto max-w-6xl px-6 text-center">
        <h2 className="font-cinzel mb-4 text-4xl font-bold text-white">
          {contact.title}
        </h2>
        <p className="font-teko mb-12 text-2xl text-gray-400">
          {contact.subtitle}
        </p>

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex h-full flex-col justify-center rounded-lg bg-zinc-800 p-8 shadow-lg">
            <h3 className="font-teko mb-4 text-xl tracking-wider text-amber-400 uppercase">
              <IconMail className="mr-2 mb-1 inline-block text-2xl" />
              {contact.emailTitle}
            </h3>
            <a
              href={`mailto:${contact.emailAddress}`}
              className="font-cinzel text-lg wrap-break-word text-white transition-colors hover:text-amber-500"
            >
              {contact.emailAddress}
            </a>
          </div>

          <div className="flex h-full flex-col items-center justify-center rounded-lg bg-zinc-800 p-8 shadow-lg">
            <h3 className="font-teko mb-4 text-xl tracking-wider text-amber-400 uppercase">
              <IconBrandWhatsapp className="mr-2 mb-1 inline-block text-2xl" />
              {contact.whatsappTitle}
            </h3>
            <div className="flex flex-col space-y-3">
              {contact.whatsappContacts?.map((wa) => (
                <a
                  key={wa.url}
                  href={wa.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-cinzel text-xl whitespace-nowrap text-white transition-colors hover:text-amber-500"
                >
                  {wa.text}
                </a>
              ))}
            </div>
          </div>

          <div className="flex h-full flex-col justify-center rounded-lg bg-zinc-800 p-8 shadow-lg">
            <h3 className="font-teko mb-6 text-xl tracking-wider text-amber-400 uppercase">
              {contact.socialTitle}
            </h3>
            <div className="flex justify-center space-x-8">
              {contact.socialLinks?.map((link) => {
                const social = socialIcons[link.platform];
                if (!social) return null;

                return (
                  <SocialLink
                    key={link.platform}
                    href={link.url}
                    icon={social.icon}
                    label={social.label}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
