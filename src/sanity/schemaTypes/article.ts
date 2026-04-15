/**
 * Artikkel-schema
 *
 * Demonstrerer:
 * - Portable Text med bilder og sitater
 * - Flere forfattere (array av referanser)
 * - SEO-metadata (gjenbrukbare felter)
 * - Beregnet lesetid (computed i GROQ)
 * - Feltgrupper for organisert redigering
 */
import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";
import { seoFields } from "./shared/seoFields";

export const article = defineType({
  name: "article",
  title: "Artikkel",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Innhold", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      validation: (rule) => rule.required(),
      group: "content",
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
      group: "content",
    }),

    defineField({
      name: "mainImage",
      title: "Hovedbilde",
      type: "image",
      options: { hotspot: true },
      group: "content",
      fields: [
        {
          name: "alt",
          title: "Alternativ tekst",
          type: "string",
          validation: (rule: any) => rule.required(),
        },
      ],
    }),

    // --- Flere forfattere (array av referanser) ---
    defineField({
      name: "authors",
      title: "Forfatter(e)",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "author" }],
        }),
      ],
      validation: (rule) => rule.min(1).error("Minst én forfatter kreves"),
    }),

    defineField({
      name: "publishedAt",
      title: "Publiseringsdato",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Teknologi", value: "tech" },
          { title: "Design", value: "design" },
          { title: "Forretning", value: "business" },
          { title: "Kultur", value: "culture" },
        ],
      },
    }),

    defineField({
      name: "body",
      title: "Innhold",
      type: "portableText",
      group: "content",
    }),

    // --- SEO-felter spredd inn fra gjenbrukbar modul ---
    ...seoFields,
  ],

  preview: {
    select: {
      title: "title",
      author: "authors.0.name",
      date: "publishedAt",
      media: "mainImage",
    },
    prepare({ title, author, date, media }) {
      return {
        title,
        subtitle: [
          author && `Av ${author}`,
          date && new Date(date).toLocaleDateString("nb-NO"),
        ]
          .filter(Boolean)
          .join(" · "),
        media,
      };
    },
  },
});
