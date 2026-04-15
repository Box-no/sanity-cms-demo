/**
 * GROQ-spørringer
 *
 * Alle datahenting-spørringer samlet på ett sted.
 * GROQ er Sanitys spørrespråk – tenk på det som GraphQL for JSON-dokumenter.
 *
 * Viktige konsepter:
 * - -> dereference (henter referert dokument)
 * - [] filtrering
 * - {} projeksjon (velg felter)
 * - | order() sortering
 */

// ==========================================
// OVERSIKTSSIDE – Henter siste fra alle typer
// ==========================================

export const OVERVIEW_QUERY = /* groq */ `{
  "productLaunches": *[_type == "productLaunch"] | order(launchDate desc)[0...3] {
    _id,
    "title": title.no,
    "slug": slug.current,
    launchDate,
    "image": images[0],
    cta
  },
  "travelGuides": *[_type == "travelGuide"] | order(_createdAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    excerpt,
    author->{ name, image }
  },
  "articles": *[_type == "article"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    publishedAt,
    category,
    authors[]->{ name, image },
    "estimatedReadTime": round(length(pt::text(body)) / 5 / 200)
  },
  "products": *[_type == "product"] | order(_createdAt desc)[0...3] {
    _id,
    name,
    "slug": slug.current,
    mainImage,
    sku,
    "price": variants[0].price,
    "variantCount": count(variants),
    "avgRating": math::avg(reviews[].rating)
  },
  "events": *[_type == "event"] | order(startDateTime asc)[0...3] {
    _id,
    name,
    "slug": slug.current,
    eventImage,
    startDateTime,
    endDateTime,
    location,
    "speakerCount": count(speakers),
    isOnline
  }
}`;

// ==========================================
// PRODUKTLANSERING
// ==========================================

export const PRODUCT_LAUNCHES_QUERY = /* groq */ `
  *[_type == "productLaunch"] | order(launchDate desc) {
    _id,
    "title": title.no,
    "titleEn": title.en,
    "slug": slug.current,
    launchDate,
    "image": images[0],
    cta,
    "featureCount": count(features)
  }
`;

export const PRODUCT_LAUNCH_BY_SLUG_QUERY = /* groq */ `
  *[_type == "productLaunch" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    launchDate,
    description,
    features[]{ _key, title, description, icon },
    images[]{ _key, asset, alt, caption },
    videoUrl,
    cta,
    pricing[]{ _key, region, price, currency }
  }
`;

// ==========================================
// REISEGUIDE
// ==========================================

export const TRAVEL_GUIDES_QUERY = /* groq */ `
  *[_type == "travelGuide"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    excerpt,
    author->{ name, image },
    tags
  }
`;

export const TRAVEL_GUIDE_BY_SLUG_QUERY = /* groq */ `
  *[_type == "travelGuide" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    excerpt,
    sections[]{
      _key,
      _type,
      heading,
      content,
      images[]{ _key, asset, alt, caption },
      tipType
    },
    places[]->{ _id, name, category, description, image, location, address, website, priceRange, tags },
    mapCenter,
    author->{ name, slug, image, bio },
    tags
  }
`;

// ==========================================
// ARTIKKEL
// ==========================================

export const ARTICLES_QUERY = /* groq */ `
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    publishedAt,
    category,
    authors[]->{ name, image },
    "estimatedReadTime": round(length(pt::text(body)) / 5 / 200)
  }
`;

export const ARTICLE_BY_SLUG_QUERY = /* groq */ `
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    publishedAt,
    category,
    authors[]->{ _id, name, slug, image, bio, social },
    body,
    "estimatedReadTime": round(length(pt::text(body)) / 5 / 200),
    seoTitle,
    seoDescription,
    ogImage
  }
`;

// ==========================================
// PRODUKT
// ==========================================

export const PRODUCTS_QUERY = /* groq */ `
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    mainImage,
    sku,
    "price": variants[0].price,
    "variantCount": count(variants),
    "avgRating": math::avg(reviews[].rating),
    "reviewCount": count(reviews)
  }
`;

export const PRODUCT_BY_SLUG_QUERY = /* groq */ `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    sku,
    mainImage,
    variants[]{
      _key,
      name,
      size,
      color,
      price,
      compareAtPrice,
      inStock,
      stockCount,
      images[]{ _key, asset }
    },
    relatedProducts[]->{ _id, name, "slug": slug.current, mainImage, "price": variants[0].price },
    reviews[]{ _key, author, rating, comment, date }
  }
`;

// ==========================================
// EVENT
// ==========================================

export const EVENTS_QUERY = /* groq */ `
  *[_type == "event"] | order(startDateTime asc) {
    _id,
    name,
    "slug": slug.current,
    eventImage,
    startDateTime,
    endDateTime,
    location,
    "speakerCount": count(speakers),
    isOnline,
    "ticketTypes": ticketTypes[]{ name, price, available }
  }
`;

export const EVENT_BY_SLUG_QUERY = /* groq */ `
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    eventImage,
    description,
    startDateTime,
    endDateTime,
    location,
    isOnline,
    streamUrl,
    speakers[]->{ _id, name, slug, image, title, bio, social },
    agenda[]{
      _key,
      time,
      title,
      description,
      speaker->{ name, image },
      type
    },
    videoEmbed,
    ticketTypes[]{ _key, name, price, description, available },
    sponsors[]{ _key, name, logo, url, tier }
  }
`;
