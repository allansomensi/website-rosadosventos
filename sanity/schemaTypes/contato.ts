import { defineField, defineType } from "sanity";

export const contato = defineType({
  name: "contato",
  title: "Seção Contato",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título da Seção",
      type: "string",
      description: 'Ex: "Contato para Shows"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtítulo",
      type: "string",
      description: 'Ex: "Leve a energia da Rosa dos Ventos para o seu evento!"',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "emailTitle",
      title: "Título (Coluna Email)",
      type: "string",
      initialValue: "Email",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "emailAddress",
      title: "Endereço de Email",
      type: "email",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "whatsappTitle",
      title: "Título (Coluna WhatsApp)",
      type: "string",
      initialValue: "WhatsApp",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "whatsappContacts",
      title: "Contatos de WhatsApp",
      type: "array",
      description: "Adicione um ou mais contatos de WhatsApp",
      of: [
        {
          type: "object",
          name: "whatsappContact",
          title: "Contato de WhatsApp",
          fields: [
            defineField({
              name: "text",
              title: "Texto de Exibição",
              type: "string",
              description: "Ex: (54) 9999-9999 (Nome)",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "Link (wa.me)",
              type: "url",
              description: "Link completo. Ex: https://wa.me/5554999999999",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "text",
              subtitle: "url",
            },
          },
        },
      ],
    }),

    defineField({
      name: "socialTitle",
      title: "Título (Coluna Redes Sociais)",
      type: "string",
      initialValue: "Siga a Banda",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "socialLinks",
      title: "Links de Redes Sociais",
      type: "array",
      description: "Adicione os links para as redes sociais da banda",
      of: [
        {
          type: "object",
          name: "socialLink",
          title: "Link Social",
          fields: [
            defineField({
              name: "platform",
              title: "Plataforma",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "YouTube", value: "youtube" },
                  { title: "Facebook", value: "facebook" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "platform",
              subtitle: "url",
            },
          },
        },
      ],
    }),
  ],
});
