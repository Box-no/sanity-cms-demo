/**
 * Gjenbrukbare SEO-felter som kan spres inn i alle dokumenttyper.
 * Brukes med spread-operatoren: ...seoFields
 */
import { defineField } from "sanity";

export const seoFields = [
  defineField({
    name: "seoTitle",
    title: "SEO-tittel",
    type: "string",
    description: "Overstyrer standard tittel i søkemotorer (maks 60 tegn)",
    validation: (rule) =>
      rule.max(60).warning("Hold SEO-tittel under 60 tegn for best resultat"),
    group: "seo",
  }),
  defineField({
    name: "seoDescription",
    title: "SEO-beskrivelse",
    type: "text",
    rows: 3,
    description: "Vises i søkeresultater (maks 160 tegn)",
    validation: (rule) =>
      rule.max(160).warning("Hold meta-beskrivelse under 160 tegn"),
    group: "seo",
  }),
  defineField({
    name: "ogImage",
    title: "Delebilde (Open Graph)",
    type: "image",
    description: "Bildet som vises ved deling på sosiale medier (1200×630px)",
    group: "seo",
  }),
];
