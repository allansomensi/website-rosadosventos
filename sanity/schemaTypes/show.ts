import { defineField, defineType } from "sanity";

export const show = defineType({
  name: "show",
  title: "Show",
  type: "document",
  fields: [
    defineField({
      name: "local",
      title: "Local do Evento",
      type: "string",
      description: "Ex: Pub do Zé, Festival de Inverno",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "data",
      title: "Data e Hora",
      type: "datetime",
      options: {
        dateFormat: "DD/MM/YYYY",
        timeFormat: "HH:mm",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cidade",
      title: "Cidade / Estado",
      type: "string",
      description: "Ex: Bento Gonçalves/RS",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "linkLocalizacao",
      title: "Link da Localização (Google Maps / Waze)",
      type: "url",
      description: "Opcional. Link do mapa para o local do evento.",
    }),
    defineField({
      name: "link",
      title: "Link para Ingressos",
      type: "url",
      description: "Opcional. Ex: link do Sympla, evento do Facebook",
    }),
  ],
  orderings: [
    {
      title: "Data do Show (Mais Recente)",
      name: "showDateDesc",
      by: [{ field: "data", direction: "desc" }],
    },
    {
      title: "Data do Show (Mais Antiga)",
      name: "showDateAsc",
      by: [{ field: "data", direction: "asc" }],
    },
  ],
});
