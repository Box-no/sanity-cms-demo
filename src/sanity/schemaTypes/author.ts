/**
 * Forfatter-schema – brukes som referanse fra artikler, reiseguider osv.
 *
 * Demonstrerer: Referanser (relasjoner) mellom dokumenttyper.
 * En forfatter kan gjenbrukes på tvers av mange innholdstyper.
 */
import { defineType, defineField } from "sanity";
import { UserIcon } from "@sanity/icons";

export const author = defineType({
  name: "author",
  title: "Forfatter",
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
      title: "Profilbilde",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Biografi",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "email",
      title: "E-post",
      type: "string",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "social",
      title: "Sosiale medier",
      type: "object",
      fields: [
        defineField({ name: "twitter", title: "Twitter/X", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
        defineField({ name: "website", title: "Nettside", type: "url" }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});
