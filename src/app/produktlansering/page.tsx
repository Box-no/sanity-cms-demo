/**
 * Listeside for produktlanseringer.
 * Henter alle produktlanseringer fra Sanity og viser dem som kort.
 */
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { PRODUCT_LAUNCHES_QUERY } from "@/sanity/lib/queries";
import { ContentTypeCard } from "@/components/ContentTypeCard";
import { EmptyState } from "@/components/EmptyState";

export const metadata: Metadata = { title: "Produktlanseringer" };

export default async function ProductLaunchesPage() {
  const launches = await client.fetch(PRODUCT_LAUNCHES_QUERY);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <span className="text-3xl">🚀</span>
        <h1 className="mt-2 text-4xl font-bold text-gray-900">
          Produktlanseringer
        </h1>
        <p className="mt-2 text-gray-500">
          Innholdstype med flerspråklig tittel, funksjoner, bilder og pris per region.
        </p>
      </header>

      {launches?.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {launches.map((item: any) => (
            <ContentTypeCard
              key={item._id}
              title={item.title || "Uten tittel"}
              subtitle={
                item.launchDate
                  ? `Lanseres ${new Date(item.launchDate).toLocaleDateString("nb-NO")}`
                  : undefined
              }
              href={`/produktlansering/${item.slug}`}
              image={item.image}
              badge="Lansering"
              metadata={[`${item.featureCount || 0} funksjoner`]}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Ingen produktlanseringer ennå"
          description="Opprett din første produktlansering i Sanity Studio for å se den her."
          docType="productLaunch"
        />
      )}
    </div>
  );
}
