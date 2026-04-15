/**
 * Konfigurasjon for Portable Text (rik tekst).
 *
 * Portable Text er Sanitys tilnærming til rik tekst-innhold.
 * I motsetning til HTML lagres alt som strukturert JSON,
 * noe som gjør det mulig å rendre innholdet på tvers av plattformer.
 */
import { defineArrayMember, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const portableText = defineType({
  name: "portableText",
  title: "Innhold",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Overskrift 2", value: "h2" },
        { title: "Overskrift 3", value: "h3" },
        { title: "Overskrift 4", value: "h4" },
        { title: "Sitat", value: "blockquote" },
      ],
      marks: {
        decorators: [
          { title: "Fet", value: "strong" },
          { title: "Kursiv", value: "em" },
          { title: "Understreket", value: "underline" },
          { title: "Kode", value: "code" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Lenke",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (rule) =>
                  rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
              },
              {
                name: "openInNewTab",
                type: "boolean",
                title: "Åpne i ny fane",
                initialValue: false,
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternativ tekst",
          description: "Viktig for tilgjengelighet og SEO",
          validation: (rule) => rule.required(),
        },
        {
          name: "caption",
          type: "string",
          title: "Bildetekst",
        },
      ],
    }),
  ],
});
