import { defineField, defineType } from "sanity";

export const highlight = defineType({
  name: "highlight",
  title: "Seção Destaques",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Título da Seção",
      type: "string",
      description: "Ex: 'Destaques'",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "cards",
      title: "Cards de Destaque",
      type: "array",
      description: "Os cards que aparecem na seção de destaques.",
      validation: (Rule) => Rule.max(3).error("Máximo de 3 cards permitidos."),

      of: [
        {
          type: "object",
          name: "highlightCard",
          title: "Card de Destaque",
          fields: [
            defineField({
              name: "image",
              title: "Imagem do Card",
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
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Título do Card",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Descrição do Card",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "linkText",
              title: "Texto do Link/Botão",
              type: "string",
              description: "Ex: 'Ver Agenda'",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "linkHref",
              title: "Link do Botão (URL)",
              type: "string",
              description:
                "Pode ser um link interno (Ex: '#agenda') ou externo (Ex: 'https://spotify.com/...')",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
});
