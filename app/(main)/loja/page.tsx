import { IconBrandWhatsapp, IconShoppingBag } from "@tabler/icons-react";
import { sanityFetch } from "@/sanity/lib/live";
import { LOJA_QUERY, CONTACT_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url";
import ProductCard from "@/components/common/ProductCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loja",
  description:
    "Produtos oficiais da banda Rosa dos Ventos. Camisetas, bonés, canecas e muito mais. Compre via WhatsApp.",
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

interface ContatoData {
  whatsappContacts?: {
    text: string;
    url: string;
  }[];
}

export default async function Loja() {
  const [{ data: produtosData }, { data: contatoData }] = await Promise.all([
    sanityFetch({ query: LOJA_QUERY }),
    sanityFetch({ query: CONTACT_QUERY }),
  ]);

  const produtos = (produtosData as ProdutoSanity[]) || [];
  const contato = contatoData as ContatoData | null;
  const whatsappUrl = contato?.whatsappContacts?.[0]?.url ?? "";

  const whatsappBase = whatsappUrl.split("?")[0];

  const produtosFormatados = produtos.map((p) => ({
    ...p,
    imagens: (p.imagens ?? []).map((img) => ({
      url: urlFor(img.asset).width(800).height(800).url(),
      alt: img.alt ?? p.nome,
    })),
  }));

  const totalDisponiveis = produtosFormatados.filter(
    (p) => p.disponivel !== false,
  ).length;

  return (
    <main className="min-h-screen bg-zinc-950 pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="relative z-10 mb-16 text-center sm:text-left">
          <p className="font-teko mb-3 text-xl tracking-[0.3em] text-(--gold) uppercase">
            Produtos Oficiais
          </p>
          <h1 className="font-cinzel text-5xl font-bold text-white drop-shadow-lg sm:text-6xl md:text-7xl">
            Loja
          </h1>
          <div className="mx-auto mt-8 h-px w-24 bg-linear-to-r from-(--gold) to-transparent sm:mx-0" />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-(--text-muted)">
            Leve um pedaço da Rosa dos Ventos com você. Clique em{" "}
            <span className="text-white/90">&quot;Tenho Interesse&quot;</span> e
            finalize sua compra diretamente pelo WhatsApp.
          </p>

          {totalDisponiveis > 0 && (
            <p className="font-teko mt-3 text-lg tracking-wider text-zinc-500 uppercase">
              {totalDisponiveis}{" "}
              {totalDisponiveis === 1
                ? "produto disponível"
                : "produtos disponíveis"}
            </p>
          )}
        </div>

        {/* Grid de produtos */}
        {produtosFormatados.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {produtosFormatados.map((produto) => (
              <ProductCard
                key={produto._id}
                produto={produto}
                whatsappUrl={whatsappBase}
              />
            ))}
          </div>
        ) : (
          /* Estado vazio */
          <div className="py-24 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900">
                <IconShoppingBag size={36} className="text-(--gold)" />
              </div>
            </div>
            <p className="font-cinzel mb-2 text-2xl text-zinc-400">
              Em breve, novidades!
            </p>
            <p className="font-teko text-xl tracking-wide text-zinc-600">
              Nossos produtos estarão disponíveis aqui em breve.
            </p>
          </div>
        )}

        {/* Banner CTA WhatsApp */}
        {whatsappBase && produtosFormatados.length > 0 && (
          <section className="mt-20 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center backdrop-blur-sm sm:p-12">
            <h2 className="font-cinzel mb-3 text-2xl font-bold text-white sm:text-3xl">
              Não encontrou o que procura?
            </h2>
            <p className="mx-auto mb-8 max-w-md text-(--text-muted)">
              Fale direto com a gente pelo WhatsApp. Podemos tirar todas as suas
              dúvidas sobre produtos, tamanhos e formas de pagamento.
            </p>
            <a
              href={`${whatsappBase}?text=${encodeURIComponent("Olá! Gostaria de saber mais sobre os produtos da loja.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-teko inline-flex items-center gap-3 border border-(--gold) bg-(--gold) px-10 py-4 text-2xl tracking-wider text-black uppercase transition-all duration-300 hover:bg-transparent hover:text-(--gold)"
            >
              <IconBrandWhatsapp size={24} aria-hidden="true" />
              Falar pelo WhatsApp
            </a>
          </section>
        )}
      </div>
    </main>
  );
}
