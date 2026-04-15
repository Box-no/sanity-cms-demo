/**
 * Listeside for produkter (e-commerce demo).
 */
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { PRODUCTS_QUERY } from "@/sanity/lib/queries";
import { ContentTypeCard } from "@/components/ContentTypeCard";
import { EmptyState } from "@/components/EmptyState";

export const metadata: Metadata = { title: "Produkter" };

export default async function ProductsPage() {
  const products = await sanityFetch(PRODUCTS_QUERY);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <span className="text-3xl">🛒</span>
        <h1 className="mt-2 text-4xl font-bold text-gray-900">Produkter</h1>
        <p className="mt-2 text-gray-500">
          E-commerce demo med varianter, anmeldelser og relaterte produkter.
        </p>
      </header>

      {products?.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((item: any) => (
            <ContentTypeCard
              key={item._id}
              title={item.name}
              subtitle={
                item.price
                  ? `Fra ${item.price.toLocaleString("nb-NO")} NOK`
                  : undefined
              }
              href={`/produkt/${item.slug}`}
              image={item.mainImage}
              badge={`${item.variantCount || 0} varianter`}
              metadata={[
                item.avgRating
                  ? `${item.avgRating.toFixed(1)} / 5 (${item.reviewCount} anmeldelser)`
                  : "Ingen anmeldelser",
                `SKU: ${item.sku || "-"}`,
              ]}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Ingen produkter ennå"
          description="Opprett ditt første produkt i Sanity Studio."
          docType="product"
        />
      )}
    </div>
  );
}
