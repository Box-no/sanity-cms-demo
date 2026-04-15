/**
 * Reiseguide-schema
 *
 * Demonstrerer:
 * - Modulære seksjoner (page builder-mønster)
 * - Referanser til steder/restauranter
 * - Kartkoordinater (geopoint)
 * - Forfatter-referanse
 * - Tags for klassifisering
 */
import { defineType, defineField, defineArrayMember } from "sanity";
import { EarthGlobeIcon } from "@sanity/icons";

export const travelGuide = defineType({
  name: "travelGuide",
  title: "Reiseguide",
  type: "document",
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "mainImage",
      title: "Hovedbilde",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alternativ tekst",
          type: "string",
        },
      ],
    }),

    defineField({
      name: "excerpt",
      title: "Kort introduksjon",
      type: "text",
      rows: 3,
      validation: (rule) =>
        rule.max(200).warning("Hold det kort og engasjerende"),
    }),

    // --- Modulære seksjoner (Page Builder-mønster) ---
    defineField({
      name: "sections",
      title: "Seksjoner",
      description: "Bygg guiden med modulære innholdsblokker",
      type: "array",
      of: [
        // Tekstseksjon
        defineArrayMember({
          type: "object",
          name: "textSection",
          title: "Tekstseksjon",
          fields: [
            defineField({
              name: "heading",
              title: "Overskrift",
              type: "string",
            }),
            defineField({
              name: "content",
              title: "Innhold",
              type: "portableText",
            }),
          ],
          preview: {
            select: { title: "heading" },
            prepare({ title }) {
              return { title: title || "Tekstseksjon", subtitle: "Tekst" };
            },
          },
        }),
        // Bildegalleri
        defineArrayMember({
          type: "object",
          name: "imageGallery",
          title: "Bildegalleri",
          fields: [
            defineField({
              name: "heading",
              title: "Overskrift",
              type: "string",
            }),
            defineField({
              name: "images",
              title: "Bilder",
              type: "array",
              of: [
                defineArrayMember({
                  type: "image",
                  options: { hotspot: true },
                  fields: [
                    {
                      name: "alt",
                      title: "Alt-tekst",
                      type: "string",
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
          ],
          preview: {
            select: { title: "heading", images: "images" },
            prepare({ title, images }) {
              return {
                title: title || "Bildegalleri",
                subtitle: `${images?.length || 0} bilder`,
              };
            },
          },
        }),
        // Tips-boks
        defineArrayMember({
          type: "object",
          name: "tipBox",
          title: "Tips-boks",
          fields: [
            defineField({
              name: "tipType",
              title: "Type",
              type: "string",
              options: {
                list: [
                  { title: "Tips", value: "tip" },
                  { title: "Advarsel", value: "warning" },
                  { title: "Info", value: "info" },
                ],
                layout: "radio",
              },
              initialValue: "tip",
            }),
            defineField({
              name: "content",
              title: "Innhold",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: { type: "tipType", content: "content" },
            prepare({ type, content }) {
              const icons: Record<string, string> = {
                tip: "💡",
                warning: "⚠️",
                info: "ℹ️",
              };
              return {
                title: `${icons[type] || "💡"} ${type?.toUpperCase() || "TIPS"}`,
                subtitle: content,
              };
            },
          },
        }),
      ],
    }),

    // --- Referanser til steder ---
    defineField({
      name: "places",
      title: "Steder og restauranter",
      description: "Referanser til steder som er omtalt i guiden",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "place" }],
        }),
      ],
    }),

    // --- Kartkoordinater for guidens hovedområde ---
    defineField({
      name: "mapCenter",
      title: "Kartsentrum",
      type: "geopoint",
      description: "Hovedpunkt for kartet i guiden",
    }),

    defineField({
      name: "author",
      title: "Forfatter",
      type: "reference",
      to: [{ type: "author" }],
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare({ title, author, media }) {
      return {
        title,
        subtitle: author ? `Av ${author}` : "",
        media,
      };
    },
  },
});
