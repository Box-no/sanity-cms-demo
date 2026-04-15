/**
 * Sanity-klient
 *
 * Oppretter en konfigurert klient som brukes for å hente data fra Sanity.
 * Bruker CDN for raskere responstider i produksjon.
 */
import { createClient, type QueryParams } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2026-02-01",
  useCdn: true,
});

/**
 * Wrapper som legger til revalidering på alle fetch-kall.
 * Sider oppdateres automatisk hvert 60. sekund.
 */
export async function sanityFetch<T = any>(
  query: string,
  params: QueryParams = {}
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate: 60 },
  });
}
