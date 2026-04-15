/**
 * Produktlansering-schema
 *
 * Demonstrerer:
 * - Flerspråklig tittel (internasjonalisering på feltnivå)
 * - Portable Text for rik tekst
 * - Array av objekter (funksjoner)
 * - Bildearray med hotspot
 * - Video-URL
 * - CTA (gjenbrukbart objekt)
 * - Pris per region (dynamisk nøkkel/verdi)
 */
import { defineType, defineField, defineArrayMember } from "sanity";
import { RocketIcon } from "@sanity/icons";

export const productLaunch = defineType({
  name: "productLaunch",
  title: "Produktlansering",
  type: "document",
  icon: RocketIcon,
  groups: [
    { name: "content", title: "Innhold", default: true },
    { name: "media", title: "Media" },
    { name: "pricing", title: "Prising" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // --- Flerspråklig tittel ---
    defineField({
      name: "title",
      title: "Tittel",
      type: "object",
      description: "Støtter flere språk for internasjonal bruk",
      group: "content",
      fields: [
        defineField({
          name: "no",
          title: "🇳🇴 Norsk",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "en",
          title: "🇬🇧 English",
          type: "string",
        }),
      ],
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.no", maxLength: 96 },
      validation: (rule) => rule.required(),
      group: "content",
    }),

    defineField({
      name: "launchDate",
      title: "Lanseringsdato",
      type: "datetime",
      group: "content",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "description",
      title: "Beskrivelse",
      type: "portableText",
      group: "content",
    }),

    // --- Array av objekter: funksjoner / features ---
    defineField({
      name: "features",
      title: "Funksjoner",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "feature",
          title: "Funksjon",
          fields: [
            defineField({
              name: "title",
              title: "Tittel",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Beskrivelse",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "icon",
              title: "Ikon",
              type: "string",
              description: "Navn på ikon (f.eks. 'zap', 'shield', 'globe')",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        }),
      ],
    }),

    // --- Bildearray ---
    defineField({
      name: "images",
      title: "Bilder",
      type: "array",
      group: "media",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alternativ tekst",
              type: "string",
              validation: (rule: any) => rule.required(),
            },
            {
              name: "caption",
              title: "Bildetekst",
              type: "string",
            },
          ],
        }),
      ],
    }),

    defineField({
      name: "videoUrl",
      title: "Video-URL",
      type: "url",
      description: "YouTube eller Vimeo-lenke",
      group: "media",
    }),

    // --- CTA (gjenbrukbart objekt) ---
    defineField({
      name: "cta",
      title: "Handlingsknapp",
      type: "cta",
      group: "content",
    }),

    // --- Pris per region ---
    defineField({
      name: "pricing",
      title: "Pris per region",
      type: "array",
      group: "pricing",
      of: [
        defineArrayMember({
          type: "object",
          name: "regionPrice",
          fields: [
            defineField({
              name: "region",
              title: "Region",
              type: "string",
              options: {
                list: [
                  { title: "Norge", value: "NO" },
                  { title: "Sverige", value: "SE" },
                  { title: "Danmark", value: "DK" },
                  { title: "USA", value: "US" },
                  { title: "EU", value: "EU" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "price",
              title: "Pris",
              type: "number",
              validation: (rule) => rule.required().positive(),
            }),
            defineField({
              name: "currency",
              title: "Valuta",
              type: "string",
              options: {
                list: ["NOK", "SEK", "DKK", "USD", "EUR"],
              },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { region: "region", price: "price", currency: "currency" },
            prepare({ region, price, currency }) {
              return {
                title: `${region}: ${price} ${currency}`,
              };
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title.no",
      subtitle: "launchDate",
      media: "images.0",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Uten tittel",
        subtitle: subtitle
          ? new Date(subtitle).toLocaleDateString("nb-NO")
          : "",
        media,
      };
    },
  },
});
