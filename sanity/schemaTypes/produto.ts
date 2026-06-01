import { defineField, defineType } from "sanity";

export const produto = defineType({
  name: "produto",
  title: "Produto da Loja",
  type: "document",
  fields: [
    defineField({
      name: "nome",
      title: "Nome do Produto",
      type: "string",
      description: "Ex: Camiseta Rosa dos Ventos, Boné da Banda",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "nome",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categoria",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Vestuário", value: "vestuario" },
          { title: "Acessórios", value: "acessorios" },
          { title: "Decoração", value: "decoracao" },
          { title: "Outros", value: "outros" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descricao",
      title: "Descrição",
      type: "text",
      description: "Descreva o produto: material, características, etc.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "preco",
      title: "Preço (R$)",
      type: "number",
      description: "Preço sugerido. Ex: 79.90",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "imagens",
      title: "Imagens do Produto",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texto Alternativo",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).error("Adicione ao menos uma imagem."),
    }),
    defineField({
      name: "tamanhos",
      title: "Tamanhos Disponíveis",
      type: "array",
      description: "Deixe vazio se o produto não tem variação de tamanho.",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "PP", value: "PP" },
          { title: "P", value: "P" },
          { title: "M", value: "M" },
          { title: "G", value: "G" },
          { title: "GG", value: "GG" },
          { title: "XGG", value: "XGG" },
          { title: "Único", value: "Único" },
        ],
        layout: "grid",
      },
    }),
    defineField({
      name: "destaque",
      title: "Produto em Destaque?",
      type: "boolean",
      description: "Marque para exibir este produto em posição de destaque.",
      initialValue: false,
    }),
    defineField({
      name: "disponivel",
      title: "Disponível para Venda?",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "ordem",
      title: "Ordem de Exibição",
      type: "number",
      description:
        "Controla a ordem de aparecimento na loja (menor = primeiro).",
    }),
  ],
  orderings: [
    {
      title: "Ordem de Exibição",
      name: "ordemAsc",
      by: [{ field: "ordem", direction: "asc" }],
    },
    {
      title: "Nome (A-Z)",
      name: "nomeAsc",
      by: [{ field: "nome", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "nome",
      subtitle: "categoria",
      media: "imagens.0",
    },
  },
});
