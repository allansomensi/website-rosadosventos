import {
  IconArrowUpRight,
  IconBrandWhatsapp,
  IconFileTypePdf,
  IconMail,
  IconPhoto,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import ContactCard from "@/components/common/ContactCard";
import VideoGallery, { type Video } from "@/components/common/VideoGallery";
import { buttonStyles } from "@/components/ui/button";
import CompassRose from "@/components/ui/CompassRose";
import PageHero from "@/components/ui/PageHero";
import SectionHeading, { Eyebrow } from "@/components/ui/SectionHeading";
import { whatsappLink } from "@/lib/loja";
import type { ContactData } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/live";
import { AREA_CONTRATANTE_QUERY, CONTACT_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Área do Contratante",
  description:
    "Material oficial da banda Rosa dos Ventos exclusivo para contratantes, produtores e donos de casas de show.",
  alternates: { canonical: "/contratante" },
  openGraph: {
    title: "Área do Contratante | Rosa dos Ventos",
    description:
      "Portfólio, fotos, logos e vídeos da Rosa dos Ventos para contratantes e produtores.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

interface AreaContratanteData {
  heading?: string;
  subheading?: string;
  description?: string;
  portfolioUrl?: string;
  driveUrl?: string;
  videos?: Video[];
}

function KitCard({
  href,
  icon,
  label,
  title,
  text,
  cta,
  primary,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  title: string;
  text: string;
  cta: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col overflow-hidden rounded-sm border p-6 transition-colors duration-300 sm:p-8 ${
        primary
          ? "border-brass/40 from-brass/15 hover:border-brass bg-linear-to-br to-transparent"
          : "border-bone/10 bg-ink-900/70 hover:border-bone/30"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`flex h-14 w-14 items-center justify-center rounded-full ${
            primary ? "bg-brass text-ink-950" : "bg-ink-800 text-brass"
          }`}
        >
          {icon}
        </span>
        <IconArrowUpRight
          size={24}
          aria-hidden="true"
          className="text-bone-dim group-hover:text-brass transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
      <p className="text-brass mt-8 font-mono text-[10px] tracking-[0.25em] uppercase">
        {label}
      </p>
      <h2 className="font-display text-bone mt-1 text-3xl leading-none font-extrabold uppercase sm:text-4xl">
        {title}
      </h2>
      <p className="text-bone-muted mt-3 text-sm leading-relaxed sm:text-base">
        {text}
      </p>
      <span className="font-display text-bone group-hover:text-brass mt-6 text-lg font-bold tracking-wider uppercase transition-colors">
        {cta} →
      </span>
    </a>
  );
}

export default async function Contratante() {
  const [{ data: contratanteData }, { data: contatoData }] = await Promise.all([
    sanityFetch({ query: AREA_CONTRATANTE_QUERY }),
    sanityFetch({ query: CONTACT_QUERY }),
  ]);

  const contratante = contratanteData as AreaContratanteData | null;
  const contato = contatoData as ContactData | null;
  const whatsapp = contato?.whatsappContacts?.[0];
  const videos = contratante?.videos?.filter((v) => v.youtubeUrl) ?? [];

  return (
    <>
      <PageHero
        breadcrumb="Contratante"
        eyebrow={contratante?.subheading || "Material oficial"}
        title={contratante?.heading || "Área do Contratante"}
        description={
          contratante?.description ||
          "Aqui você encontra todo o material necessário para a contratação e divulgação da Rosa dos Ventos."
        }
      >
        {(contratante?.portfolioUrl || contratante?.driveUrl) && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {contratante?.portfolioUrl && (
              <KitCard
                primary
                href={contratante.portfolioUrl}
                icon={
                  <IconFileTypePdf size={28} stroke={1.5} aria-hidden="true" />
                }
                label="PDF"
                title="Portfólio"
                text="Apresentação completa da banda."
                cta="Baixar portfólio"
              />
            )}
            {contratante?.driveUrl && (
              <KitCard
                href={contratante.driveUrl}
                icon={<IconPhoto size={28} stroke={1.5} aria-hidden="true" />}
                label="Google Drive"
                title="Fotos e logos"
                text="Fotos em alta resolução e logotipos para divulgação."
                cta="Abrir pasta"
              />
            )}
          </div>
        )}
      </PageHero>

      {videos.length > 0 && (
        <section
          aria-labelledby="videos-title"
          className="container-site py-16 sm:py-24"
        >
          <SectionHeading
            id="videos-title"
            eyebrow="Ao vivo"
            title="Material em vídeo"
            description="Registros de apresentações da banda."
            className="reveal mb-10 sm:mb-14"
          />
          <div className="reveal">
            <VideoGallery videos={videos} />
          </div>
        </section>
      )}

      {(whatsapp || contato?.emailAddress) && (
        <section
          aria-labelledby="fechar-title"
          className="container-site pb-20 sm:pb-28"
        >
          <div className="reveal border-bone/10 bg-ink-900 relative isolate grid grid-cols-1 gap-10 overflow-hidden rounded-sm border p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:p-14">
            <CompassRose className="text-brass/8 absolute -right-32 -bottom-32 -z-10 w-[480px]" />
            <div>
              <Eyebrow>Orçamentos</Eyebrow>
              <h2
                id="fechar-title"
                className="font-display text-bone mt-4 text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] font-extrabold uppercase"
              >
                Pronto para fechar negócio?
              </h2>
              <p className="text-bone-muted mt-4 max-w-md">
                Envie a data, a cidade e o tipo de evento para receber um
                orçamento.
              </p>
              {whatsapp && (
                <a
                  href={whatsappLink(
                    whatsapp.url,
                    "Olá! Gostaria de solicitar um orçamento para um show da Rosa dos Ventos.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonStyles({
                    variant: "whatsapp",
                    size: "lg",
                    className: "mt-8 w-full sm:w-auto",
                  })}
                >
                  <IconBrandWhatsapp size={22} aria-hidden="true" />
                  Pedir orçamento
                </a>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {contato?.whatsappContacts?.map((whats) => (
                <ContactCard
                  key={whats.url}
                  icon={
                    <IconBrandWhatsapp
                      size={26}
                      stroke={1.75}
                      aria-hidden="true"
                    />
                  }
                  label={contato.whatsappTitle ?? "WhatsApp"}
                  value={whats.text}
                  href={whats.url}
                  tone="whatsapp"
                  external
                />
              ))}
              {contato?.emailAddress && (
                <ContactCard
                  icon={<IconMail size={26} stroke={1.75} aria-hidden="true" />}
                  label={contato.emailTitle ?? "E-mail"}
                  value={contato.emailAddress}
                  href={`mailto:${contato.emailAddress}`}
                  copyValue={contato.emailAddress}
                  valueStyle="text"
                />
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
