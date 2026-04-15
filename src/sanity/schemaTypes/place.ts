/**
 * Sted/Restaurant-schema – brukes som referanse i Reiseguider.
 *
 * Demonstrerer: Geolokasjon (kartkoordinater) og referanser.
 * Et sted kan refereres fra flere reiseguider.
 */
import { defineType, defineField, defineArrayMember } from "sanity";
import { PinIcon } from "@sanity/icons";

export const place = defineType({
  name: "place",
  title: "Sted / Restaurant",
  type: "document",
  icon: PinIcon,
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
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Restaurant", value: "restaurant" },
          { title: "Hotell", value: "hotel" },
          { title: "Attraksjon", value: "attraction" },
          { title: "Kafé", value: "cafe" },
          { title: "Bar", value: "bar" },
          { title: "Butikk", value: "shop" },
        ],
      },
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
      title: "Kartkoordinater",
      type: "geopoint",
      description: "Plasser stedet på kartet",
    }),
    defineField({
      name: "address",
      title: "Adresse",
      type: "string",
    }),
    defineField({
      name: "website",
      title: "Nettside",
      type: "url",
    }),
    defineField({
      name: "priceRange",
      title: "Prisklasse",
      type: "string",
      options: {
        list: [
          { title: "💰 Rimelig", value: "budget" },
          { title: "💰💰 Moderat", value: "moderate" },
          { title: "💰💰💰 Dyrt", value: "expensive" },
        ],
      },
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
      title: "name",
      subtitle: "category",
      media: "image",
    },
  },
});
