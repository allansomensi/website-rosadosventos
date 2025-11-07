import { defineField, defineType } from "sanity";

export const sobre = defineType({
  name: "sobre",
  title: "Seção Sobre",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Título da Seção",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "bio",
      title: "Biografia / Descrição",
      type: "text",
      description:
        "O texto principal da seção. Pressione 'Enter' para criar um novo parágrafo.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "image",
      title: "Imagem da Banda",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Texto Alternativo (Alt Text)",
          type: "string",
          validation: (Rule) =>
            Rule.required().error("O texto alternativo é obrigatório."),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
