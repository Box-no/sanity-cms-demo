import {
  defineLocations,
  type PresentationPluginOptions,
} from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    productLaunch: defineLocations({
      select: { title: "title.no", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Produktlansering",
            href: `/produktlansering/${doc?.slug}`,
          },
          { title: "Alle produktlanseringer", href: "/produktlansering" },
        ],
      }),
    }),

    travelGuide: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Reiseguide",
            href: `/reiseguide/${doc?.slug}`,
          },
          { title: "Alle reiseguider", href: "/reiseguide" },
        ],
      }),
    }),

    article: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Artikkel",
            href: `/artikkel/${doc?.slug}`,
          },
          { title: "Alle artikler", href: "/artikkel" },
        ],
      }),
    }),

    product: defineLocations({
      select: { title: "name", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Produkt",
            href: `/produkt/${doc?.slug}`,
          },
          { title: "Alle produkter", href: "/produkt" },
        ],
      }),
    }),

    event: defineLocations({
      select: { title: "name", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Event",
            href: `/event/${doc?.slug}`,
          },
          { title: "Alle eventer", href: "/event" },
        ],
      }),
    }),

    office: defineLocations({
      select: { title: "name", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Kontor",
            href: "/kontorer",
          },
        ],
      }),
    }),
  },
};
