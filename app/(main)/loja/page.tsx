import {
  IconBrandWhatsapp,
  IconMessageCircle,
  IconPackage,
  IconShirt,
  IconShoppingBag,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import type { SanityImageSource } from "@sanity/image-url";
import ProductGrid from "@/components/common/ProductGrid";
import { buttonStyles } from "@/components/ui/button";
import PageHero from "@/components/ui/PageHero";
import { whatsappLink } from "@/lib/loja";
import type { ContactData } from "@/lib/site";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { CONTACT_QUERY, LOJA_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Loja",
  description:
    "Produtos oficiais da banda Rosa dos Ventos. Camisetas, bonés, canecas e muito mais. Compre via WhatsApp.",
  alternates: { canonical: "/loja" },
  openGraph: {
    title: "Loja | Rosa dos Ventos",
    description:
      "Produtos oficiais da banda. Camisetas, bonés, canecas e mais. Compre direto pelo WhatsApp.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

interface ProdutoSanity {
  _id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  tamanhos?: string[];
  destaque?: boolean;
  disponivel?: boolean;
  imagens: {
    asset: SanityImageSource;
    alt: string;
  }[];
}

const STEPS = [
  {
    Icon: IconShirt,
    title: "Escolha o produto",
    text: "Selecione também o tamanho, quando houver.",
  },
  {
    Icon: IconMessageCircle,
    title: "Envie pelo WhatsApp",
    text: "O botão “Tenho interesse” abre a conversa com a mensagem pronta.",
  },
  {
    Icon: IconPackage,
    title: "Pagamento e entrega",
    text: "Combinados diretamente com a banda.",
  },
];

export default async function Loja() {
  const [{ data: produtosData }, { data: contatoData }] = await Promise.all([
    sanityFetch({ query: LOJA_QUERY }),
    sanityFetch({ query: CONTACT_QUERY }),
  ]);

  const produtos = (produtosData as ProdutoSanity[] | null) ?? [];
  const contato = contatoData as ContactData | null;
  const whatsappUrl = contato?.whatsappContacts?.[0]?.url ?? "";

  const produtosFormatados = produtos.map((p) => ({
    ...p,
    imagens: (p.imagens ?? [])
      .filter((img) => img.asset)
      .map((img) => ({
        url: urlFor(img.asset).width(800).height(800).url(),
        alt: img.alt ?? p.nome,
      })),
  }));

  return (
    <>
      <PageHero
        breadcrumb="Loja"
        eyebrow="Produtos oficiais"
        title={
          <>
            Loja <span className="text-brass-gradient">oficial</span>
          </>
        }
        description="Produtos oficiais da Rosa dos Ventos. Os pedidos são feitos pelo WhatsApp, diretamente com a banda."
      >
        <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-sm sm:grid-cols-3">
          {STEPS.map(({ Icon, title, text }, i) => (
            <li
              key={title}
              className="bg-ink-900/80 border-bone/8 flex items-center gap-4 border px-4 py-3 backdrop-blur-sm sm:items-start sm:p-5"
            >
              <span className="bg-brass/10 text-brass flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-11 sm:w-11">
                <Icon size={22} stroke={1.75} aria-hidden="true" />
              </span>
              <span>
                <span className="text-bone-dim font-mono text-[10px] tracking-[0.25em] uppercase">
                  Passo {i + 1}
                </span>
                <span className="font-display text-bone block text-xl font-bold uppercase">
                  {title}
                </span>
                <span className="text-bone-muted mt-1 hidden text-sm leading-relaxed sm:block">
                  {text}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </PageHero>

      <section aria-label="Produtos" className="container-site py-14 sm:py-20">
        {produtosFormatados.length > 0 ? (
          <ProductGrid
            produtos={produtosFormatados}
            whatsappUrl={whatsappUrl}
          />
        ) : (
          <div className="border-bone/12 flex flex-col items-center rounded-sm border border-dashed px-6 py-20 text-center">
            <span className="bg-brass/10 text-brass flex h-16 w-16 items-center justify-center rounded-full">
              <IconShoppingBag size={30} stroke={1.5} aria-hidden="true" />
            </span>
            <p className="font-display text-bone mt-6 text-3xl font-extrabold uppercase sm:text-4xl">
              Nenhum produto disponível
            </p>
            <p className="text-bone-muted mt-3 max-w-md">
              Novos produtos serão publicados aqui.
            </p>
          </div>
        )}

        {whatsappUrl && produtosFormatados.length > 0 && (
          <div className="border-bone/10 bg-ink-900 mt-16 flex flex-col items-start gap-6 rounded-sm border p-6 sm:mt-24 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <h2 className="font-display text-bone text-3xl leading-none font-extrabold uppercase sm:text-4xl">
                Dúvidas sobre os produtos?
              </h2>
              <p className="text-bone-muted mt-3 max-w-lg">
                Fale com a banda pelo WhatsApp para saber sobre tamanhos,
                pagamento e entrega.
              </p>
            </div>
            <a
              href={whatsappLink(
                whatsappUrl,
                "Olá! Gostaria de saber mais sobre os produtos da loja.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({
                variant: "whatsapp",
                size: "lg",
                className: "w-full sm:w-auto",
              })}
            >
              <IconBrandWhatsapp size={22} aria-hidden="true" />
              Falar no WhatsApp
            </a>
          </div>
        )}
      </section>
    </>
  );
}
