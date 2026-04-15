/**
 * Kontor-schema – viser selskapets kontorer på et interaktivt Norgeskart.
 *
 * Demonstrerer: Geopoint for kartmarkører, boolsk felt for hovedkontor.
 */
import { defineType, defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const office = defineType({
  name: "office",
  title: "Kontor",
  type: "document",
  icon: HomeIcon,
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
      name: "city",
      title: "By",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      title: "Adresse",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "E-post",
      type: "string",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "description",
      title: "Beskrivelse",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Bilde",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "location",
      title: "Kartposisjon",
      type: "geopoint",
      description: "Plasser kontoret på kartet",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isHeadquarters",
      title: "Hovedkontor",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "city",
      media: "image",
      isHQ: "isHeadquarters",
    },
    prepare({ title, subtitle, media, isHQ }) {
      return {
        title: isHQ ? `${title} (HQ)` : title,
        subtitle,
        media,
      };
    },
  },
});
