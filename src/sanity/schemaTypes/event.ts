/**
 * Event-schema
 *
 * Demonstrerer:
 * - Dato og tidspunkt med validering
 * - Lokasjon med kartkoordinater
 * - Speaker-referanser (array)
 * - Strukturert agenda
 * - Video embed
 * - Billettyper med pris
 * - Sponsorer med logoer
 */
import { defineType, defineField, defineArrayMember } from "sanity";
import { CalendarIcon } from "@sanity/icons";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  icon: CalendarIcon,
  groups: [
    { name: "content", title: "Innhold", default: true },
    { name: "agenda", title: "Agenda" },
    { name: "tickets", title: "Billetter" },
    { name: "sponsors", title: "Sponsorer" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Eventnavn",
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
      name: "eventImage",
      title: "Eventbilde",
      type: "image",
      options: { hotspot: true },
      group: "content",
    }),

    defineField({
      name: "description",
      title: "Beskrivelse",
      type: "portableText",
      group: "content",
    }),

    // --- Dato og tidspunkt ---
    defineField({
      name: "startDateTime",
      title: "Startdato og -tid",
      type: "datetime",
      validation: (rule) => rule.required(),
      group: "content",
    }),

    defineField({
      name: "endDateTime",
      title: "Sluttdato og -tid",
      type: "datetime",
      group: "content",
      validation: (rule) =>
        rule.custom((endDate, context) => {
          const startDate = (context.document as any)?.startDateTime;
          if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
            return "Sluttdato må være etter startdato";
          }
          return true;
        }),
    }),

    // --- Lokasjon ---
    defineField({
      name: "location",
      title: "Lokasjon",
      type: "object",
      group: "content",
      fields: [
        defineField({
          name: "name",
          title: "Stedsnavn",
          type: "string",
        }),
        defineField({
          name: "address",
          title: "Adresse",
          type: "string",
        }),
        defineField({
          name: "coordinates",
          title: "Kartkoordinater",
          type: "geopoint",
        }),
      ],
    }),

    defineField({
      name: "isOnline",
      title: "Online event",
      type: "boolean",
      initialValue: false,
      group: "content",
    }),

    defineField({
      name: "streamUrl",
      title: "Streaming-URL",
      type: "url",
      hidden: ({ document }) => !document?.isOnline,
      group: "content",
    }),

    // --- Speakers (referanser) ---
    defineField({
      name: "speakers",
      title: "Speakers",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "speaker" }],
        }),
      ],
    }),

    // --- Strukturert agenda ---
    defineField({
      name: "agenda",
      title: "Agenda",
      type: "array",
      group: "agenda",
      of: [
        defineArrayMember({
          type: "object",
          name: "agendaItem",
          title: "Punkt",
          fields: [
            defineField({
              name: "time",
              title: "Tidspunkt",
              type: "string",
              description: "F.eks. '09:00 – 09:30'",
              validation: (rule) => rule.required(),
            }),
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
              name: "speaker",
              title: "Speaker",
              type: "reference",
              to: [{ type: "speaker" }],
            }),
            defineField({
              name: "type",
              title: "Type",
              type: "string",
              options: {
                list: [
                  { title: "Foredrag", value: "talk" },
                  { title: "Workshop", value: "workshop" },
                  { title: "Pause", value: "break" },
                  { title: "Panel", value: "panel" },
                  { title: "Networking", value: "networking" },
                ],
              },
            }),
          ],
          preview: {
            select: {
              time: "time",
              title: "title",
              speaker: "speaker.name",
            },
            prepare({ time, title, speaker }) {
              return {
                title: `${time} – ${title}`,
                subtitle: speaker || "",
              };
            },
          },
        }),
      ],
    }),

    // --- Video embed ---
    defineField({
      name: "videoEmbed",
      title: "Video (opptak)",
      type: "url",
      description: "YouTube/Vimeo-lenke til opptak av eventet",
      group: "content",
    }),

    // --- Billettyper ---
    defineField({
      name: "ticketTypes",
      title: "Billettyper",
      type: "array",
      group: "tickets",
      of: [
        defineArrayMember({
          type: "object",
          name: "ticketType",
          fields: [
            defineField({
              name: "name",
              title: "Navn",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "price",
              title: "Pris (NOK)",
              type: "number",
              validation: (rule) => rule.required().min(0),
            }),
            defineField({
              name: "description",
              title: "Beskrivelse",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "available",
              title: "Tilgjengelig",
              type: "boolean",
              initialValue: true,
            }),
          ],
          preview: {
            select: { name: "name", price: "price", available: "available" },
            prepare({ name, price, available }) {
              return {
                title: name,
                subtitle: `${price === 0 ? "Gratis" : `${price} NOK`}${available ? "" : " (Utsolgt)"}`,
              };
            },
          },
        }),
      ],
    }),

    // --- Sponsorer ---
    defineField({
      name: "sponsors",
      title: "Sponsorer",
      type: "array",
      group: "sponsors",
      of: [
        defineArrayMember({
          type: "object",
          name: "sponsor",
          fields: [
            defineField({
              name: "name",
              title: "Navn",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "logo",
              title: "Logo",
              type: "image",
            }),
            defineField({
              name: "url",
              title: "Nettside",
              type: "url",
            }),
            defineField({
              name: "tier",
              title: "Nivå",
              type: "string",
              options: {
                list: [
                  { title: "Gull", value: "gold" },
                  { title: "Sølv", value: "silver" },
                  { title: "Bronse", value: "bronze" },
                ],
              },
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "tier", media: "logo" },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "name",
      date: "startDateTime",
      location: "location.name",
      media: "eventImage",
    },
    prepare({ title, date, location, media }) {
      return {
        title,
        subtitle: [
          date && new Date(date).toLocaleDateString("nb-NO"),
          location,
        ]
          .filter(Boolean)
          .join(" · "),
        media,
      };
    },
  },
});
