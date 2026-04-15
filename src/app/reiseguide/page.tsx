/**
 * Listeside for reiseguider.
 */
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { TRAVEL_GUIDES_QUERY } from "@/sanity/lib/queries";
import { ContentTypeCard } from "@/components/ContentTypeCard";
import { EmptyState } from "@/components/EmptyState";

export const metadata: Metadata = { title: "Reiseguider" };

export default async function TravelGuidesPage() {
  const { data: guides } = await sanityFetch({ query: TRAVEL_GUIDES_QUERY });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <span className="text-3xl">🌍</span>
        <h1 className="mt-2 text-4xl font-bold text-gray-900">Reiseguider</h1>
        <p className="mt-2 text-gray-500">
          Modulære seksjoner, referanser til steder og kartkoordinater.
        </p>
      </header>

      {guides?.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((item: any) => (
            <ContentTypeCard
              key={item._id}
              title={item.title}
              subtitle={item.excerpt}
              href={`/reiseguide/${item.slug}`}
              image={item.mainImage}
              badge="Reiseguide"
              metadata={[
                item.author?.name ? `Av ${item.author.name}` : "",
                ...(item.tags?.slice(0, 2) || []),
              ].filter(Boolean)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Ingen reiseguider ennå"
          description="Opprett din første reiseguide i Sanity Studio."
          docType="travelGuide"
        />
      )}
    </div>
  );
}
