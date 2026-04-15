/**
 * Listeside for artikler.
 */
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { ARTICLES_QUERY } from "@/sanity/lib/queries";
import { ContentTypeCard } from "@/components/ContentTypeCard";
import { EmptyState } from "@/components/EmptyState";

export const metadata: Metadata = { title: "Artikler" };

export default async function ArticlesPage() {
  const { data: articles } = await sanityFetch({ query: ARTICLES_QUERY });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <span className="text-3xl">📝</span>
        <h1 className="mt-2 text-4xl font-bold text-gray-900">Artikler</h1>
        <p className="mt-2 text-gray-500">
          Rich text med bilder, flere forfattere, SEO-metadata og beregnet lesetid.
        </p>
      </header>

      {articles?.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((item: any) => (
            <ContentTypeCard
              key={item._id}
              title={item.title}
              subtitle={item.authors?.map((a: any) => a.name).join(", ")}
              href={`/artikkel/${item.slug}`}
              image={item.mainImage}
              badge={item.category}
              metadata={[
                item.estimatedReadTime
                  ? `${item.estimatedReadTime} min lesetid`
                  : "Kort lesning",
                item.publishedAt
                  ? new Date(item.publishedAt).toLocaleDateString("nb-NO")
                  : "",
              ].filter(Boolean)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Ingen artikler ennå"
          description="Opprett din første artikkel i Sanity Studio."
          docType="article"
        />
      )}
    </div>
  );
}
