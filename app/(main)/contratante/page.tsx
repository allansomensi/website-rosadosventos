import {
  IconDownload,
  IconMail,
  IconBrandWhatsapp,
  IconPlayerPlayFilled,
  IconExternalLink,
} from "@tabler/icons-react";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { AREA_CONTRATANTE_QUERY, CONTACT_QUERY } from "@/sanity/lib/queries";

export const metadata = {
  title: "Área do Contratante | Rosa dos Ventos",
  description:
    "Material oficial da banda Rosa dos Ventos exclusivo para contratantes, produtores e donos de casas de show.",
};

interface VideoData {
  title?: string;
  youtubeUrl?: string;
  thumbnailUrl?: string;
}

interface AreaContratanteData {
  heading?: string;
  subheading?: string;
  description?: string;
  portfolioUrl?: string;
  driveUrl?: string;
  videos?: VideoData[];
}

interface ContatoData {
  emailAddress?: string;
  whatsappContacts?: {
    text: string;
    url: string;
  }[];
}

export default async function Contratante() {
  const { data: contratanteData } = await sanityFetch({
    query: AREA_CONTRATANTE_QUERY,
  });
  const contratante = contratanteData as AreaContratanteData | null;

  const { data: contatoData } = await sanityFetch({ query: CONTACT_QUERY });
  const contato = contatoData as ContatoData | null;

  const whatsapp = contato?.whatsappContacts?.[0];

  return (
    <main className="min-h-screen bg-zinc-950 pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header Section */}
        <div className="relative z-10 mb-20 text-center sm:text-left">
          <p className="font-teko mb-3 text-xl tracking-[0.3em] text-(--gold) uppercase">
            {contratante?.subheading || "Material Oficial"}
          </p>
          <h1 className="font-cinzel text-5xl font-bold text-white drop-shadow-lg sm:text-6xl md:text-7xl">
            {contratante?.heading || "Área do Contratante"}
          </h1>
          <div className="mx-auto mt-8 h-px w-24 bg-linear-to-r from-(--gold) to-transparent sm:mx-0" />
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-zinc-400">
            {contratante?.description ||
              "Aqui você encontra todo o material necessário para a contratação e divulgação da Rosa dos Ventos."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mb-24 flex flex-col gap-6 sm:flex-row">
          {contratante?.portfolioUrl && (
            <a
              href={contratante.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-teko group flex items-center justify-center gap-3 border border-(--gold) bg-(--gold) px-10 py-4 text-2xl tracking-wider text-black uppercase transition-all duration-300 hover:bg-transparent hover:text-(--gold)"
            >
              <IconDownload
                size={24}
                className="transition-transform group-hover:-translate-y-1"
              />
              Portfólio (PDF)
            </a>
          )}

          {contratante?.driveUrl && (
            <a
              href={contratante.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-teko group flex items-center justify-center gap-3 border border-zinc-700 bg-zinc-900/50 px-10 py-4 text-2xl tracking-wider text-zinc-300 uppercase transition-all duration-300 hover:border-(--gold) hover:text-white"
            >
              <IconExternalLink
                size={24}
                className="text-(--gold) transition-transform group-hover:scale-110"
              />
              Fotos e Logos (Drive)
            </a>
          )}
        </div>

        {/* Vídeos Section */}
        {contratante?.videos && contratante.videos.length > 0 && (
          <section className="mb-24">
            <div className="mb-10 flex items-center gap-4">
              <h2 className="font-cinzel text-4xl font-bold text-white">
                Material em Vídeo
              </h2>
              <div className="h-px flex-1 bg-linear-to-r from-zinc-800 to-transparent" />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {contratante.videos.map((video, index) => (
                <a
                  key={index}
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl transition-all duration-500 hover:border-(--gold)/50 hover:shadow-(--gold)/10"
                >
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 transition-all duration-500 group-hover:bg-black/20">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-(--gold) text-black shadow-(--gold)/20 shadow-lg transition-transform duration-500 group-hover:scale-110">
                      <IconPlayerPlayFilled size={32} className="ml-2" />
                    </div>
                  </div>
                  {video.thumbnailUrl && (
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title || "Vídeo Rosa dos Ventos"}
                      fill
                      className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute right-0 bottom-0 left-0 z-20 bg-linear-to-t from-black/90 to-transparent p-6">
                    <h3 className="font-teko text-2xl tracking-wide text-white">
                      {video.title}
                    </h3>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Contato Rápido */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm sm:p-10">
          <h2 className="font-cinzel mb-8 text-center text-3xl font-bold text-white sm:text-left">
            Pronto para fechar negócio?
          </h2>
          <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:justify-start sm:gap-12">
            {whatsapp && (
              <a
                href={whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-zinc-400 transition-colors hover:text-white"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-zinc-800 transition-colors group-hover:bg-[#25D366]">
                  <IconBrandWhatsapp size={28} className="text-white" />
                </div>
                <span className="font-teko text-3xl tracking-widest">
                  {whatsapp.text}
                </span>
              </a>
            )}

            {contato?.emailAddress && (
              <a
                href={`mailto:${contato.emailAddress}`}
                className="group flex items-center gap-4 text-zinc-400 transition-colors hover:text-white"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-zinc-800 transition-colors group-hover:bg-(--gold)">
                  <IconMail
                    size={28}
                    className="text-white group-hover:text-black"
                  />
                </div>
                <span className="text-lg break-all sm:text-xl">
                  {contato.emailAddress}
                </span>
              </a>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
