/**
 * CTA (Call to Action) – gjenbrukbart objekt for knapper og lenker.
 * Brukes i produktlanseringer, eventer og andre steder som trenger handlingsknapper.
 */
import { defineType, defineField } from "sanity";
import { LinkIcon } from "@sanity/icons";

export const cta = defineType({
  name: "cta",
  title: "Handlingsknapp (CTA)",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "label",
      title: "Knappetekst",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "Lenke",
      type: "url",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
    }),
    defineField({
      name: "style",
      title: "Stil",
      type: "string",
      options: {
        list: [
          { title: "Primær", value: "primary" },
          { title: "Sekundær", value: "secondary" },
          { title: "Ghost", value: "ghost" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "url" },
  },
});
