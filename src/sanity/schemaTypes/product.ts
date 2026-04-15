/**
 * Produkt-schema (e-commerce demo)
 *
 * Demonstrerer:
 * - Varianter (størrelse, farge, pris, lagerstatus)
 * - Bilder per variant
 * - SKU (varenummer)
 * - Relaterte produkter (selv-referanser)
 * - Anmeldelser (inline array av objekter)
 */
import { defineType, defineField, defineArrayMember } from "sanity";
import { BasketIcon } from "@sanity/icons";

export const product = defineType({
  name: "product",
  title: "Produkt",
  type: "document",
  icon: BasketIcon,
  groups: [
    { name: "content", title: "Innhold", default: true },
    { name: "variants", title: "Varianter" },
    { name: "relations", title: "Relasjoner" },
    { name: "reviews", title: "Anmeldelser" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Produktnavn",
      type: "string",
      validation: (rule) => rule.required(),
      group: "content",
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
      group: "content",
    }),

    defineField({
      name: "description",
      title: "Beskrivelse",
      type: "portableText",
      group: "content",
    }),

    defineField({
      name: "sku",
      title: "SKU (varenummer)",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "mainImage",
      title: "Hovedbilde",
      type: "image",
      options: { hotspot: true },
      group: "content",
    }),

    // --- Varianter ---
    defineField({
      name: "variants",
      title: "Varianter",
      type: "array",
      group: "variants",
      of: [
        defineArrayMember({
          type: "object",
          name: "variant",
          title: "Variant",
          fields: [
            defineField({
              name: "name",
              title: "Variantnavn",
              type: "string",
              description: "F.eks. 'Blå / Large'",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "size",
              title: "Størrelse",
              type: "string",
              options: {
                list: ["XS", "S", "M", "L", "XL", "XXL"],
              },
            }),
            defineField({
              name: "color",
              title: "Farge",
              type: "string",
            }),
            defineField({
              name: "price",
              title: "Pris (NOK)",
              type: "number",
              validation: (rule) => rule.required().positive(),
            }),
            defineField({
              name: "compareAtPrice",
              title: "Før-pris",
              type: "number",
              description: "Vises som gjennomstreket pris ved salg",
            }),
            defineField({
              name: "inStock",
              title: "Lagerstatus",
              type: "boolean",
              initialValue: true,
            }),
            defineField({
              name: "stockCount",
              title: "Antall på lager",
              type: "number",
            }),
            defineField({
              name: "images",
              title: "Bilder for denne varianten",
              type: "array",
              of: [
                defineArrayMember({
                  type: "image",
                  options: { hotspot: true },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "name",
              price: "price",
              inStock: "inStock",
              media: "images.0",
            },
            prepare({ title, price, inStock, media }) {
              return {
                title: title || "Variant",
                subtitle: `${price} NOK${inStock ? "" : " (Utsolgt)"}`,
                media,
              };
            },
          },
        }),
      ],
    }),

    // --- Relaterte produkter (selv-referanser) ---
    defineField({
      name: "relatedProducts",
      title: "Relaterte produkter",
      description: "Produkter som vises som 'Du vil kanskje også like'",
      type: "array",
      group: "relations",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "product" }],
        }),
      ],
      validation: (rule) =>
        rule.max(4).warning("Anbefaler maks 4 relaterte produkter"),
    }),

    // --- Anmeldelser ---
    defineField({
      name: "reviews",
      title: "Anmeldelser",
      type: "array",
      group: "reviews",
      of: [
        defineArrayMember({
          type: "object",
          name: "review",
          title: "Anmeldelse",
          fields: [
            defineField({
              name: "author",
              title: "Navn",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "rating",
              title: "Vurdering",
              type: "number",
              validation: (rule) =>
                rule.required().min(1).max(5).integer(),
              options: {
                list: [1, 2, 3, 4, 5],
              },
            }),
            defineField({
              name: "comment",
              title: "Kommentar",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "date",
              title: "Dato",
              type: "date",
            }),
          ],
          preview: {
            select: { author: "author", rating: "rating", comment: "comment" },
            prepare({ author, rating, comment }) {
              return {
                title: `${"★".repeat(rating || 0)}${"☆".repeat(5 - (rating || 0))} – ${author}`,
                subtitle: comment,
              };
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "name",
      sku: "sku",
      media: "mainImage",
      variantCount: "variants.length",
    },
    prepare({ title, sku, media }) {
      return {
        title,
        subtitle: sku ? `SKU: ${sku}` : "",
        media,
      };
    },
  },
});
