import { defineField, defineType } from "sanity";

export const bandMember = defineType({
  name: "bandMember",
  title: "Músico da Banda",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Função / Instrumento",
      type: "string",
      description: "Ex: Vocal, Guitarra, Baixo",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Foto",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texto Alternativo",
          description: "Importante para acessibilidade e SEO.",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Ordem de Exibição",
      type: "number",
      description:
        "Define a ordem em que os músicos aparecem na tela (ex: 1, 2, 3...)",
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Ordem de Exibição (Crescente)",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
