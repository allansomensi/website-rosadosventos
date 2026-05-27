import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configurações Globais",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo da Banda",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
