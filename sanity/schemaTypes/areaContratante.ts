import { defineField, defineType } from "sanity";

export const areaContratante = defineType({
  name: "areaContratante",
  title: "Área do Contratante",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Título Principal",
      type: "string",
      initialValue: "Área do Contratante",
    }),
    defineField({
      name: "subheading",
      title: "Subtítulo",
      type: "string",
      initialValue: "Material Oficial",
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
    }),
    defineField({
      name: "portfolioUrl",
      title: "Link do Portfólio (PDF)",
      type: "url",
      description: "Link do Google Drive ou Dropbox para o PDF do Portfólio",
    }),
    defineField({
      name: "driveUrl",
      title: "Link do Drive (Fotos e Logos)",
      type: "url",
    }),
    defineField({
      name: "videos",
      title: "Vídeos em Destaque",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Título do Vídeo",
              type: "string",
            }),
            defineField({
              name: "youtubeUrl",
              title: "Link do YouTube",
              type: "url",
            }),
            defineField({
              name: "thumbnail",
              title: "Thumbnail do Vídeo",
              type: "image",
              options: { hotspot: true },
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.max(2),
    }),
  ],
});
