import { defineField, defineType } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Seção Hero",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "Imagem de Fundo",
      type: "image",
      options: {
        hotspot: true,
      },
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
      name: "subheading",
      title: "Subtítulo (linha amarela)",
      type: "string",
      description: "Ex: 'Banda Cover'",
    }),
    defineField({
      name: "headingLine1",
      title: "Título (Linha 1)",
      type: "string",
      description: "Ex: 'A Energia do Pop Rock'",
    }),
    defineField({
      name: "headingLine2",
      title: "Título (Linha 2)",
      type: "string",
      description: "Ex: 'Ao Vivo'",
    }),
    defineField({
      name: "cta",
      title: "Botão (Call to Action)",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Texto do Botão",
          type: "string",
          description: "Ex: 'Confira a Agenda'",
        }),
        defineField({
          name: "link",
          title: "Link do Botão",
          type: "string",
          description:
            "Pode ser um link interno (Ex: '#agenda') ou externo (Ex: 'https://...')",
        }),
      ],
    }),
  ],
});
