/**
 * Speaker-schema – brukes som referanse i Event-innholdstypen.
 *
 * Demonstrerer: Selvstendig dokumenttype for gjenbruk.
 * En speaker kan delta på flere eventer uten å duplisere data.
 */
import { defineType, defineField } from "sanity";
import { UserIcon } from "@sanity/icons";

export const speaker = defineType({
  name: "speaker",
  title: "Speaker",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Navn",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Bilde",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "title",
      title: "Tittel / Rolle",
      type: "string",
      description: "F.eks. 'CTO, Selskap AS'",
    }),
    defineField({
      name: "bio",
      title: "Kort biografi",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "social",
      title: "Sosiale medier",
      type: "object",
      fields: [
        defineField({ name: "twitter", title: "Twitter/X", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "title",
      media: "image",
    },
  },
});
