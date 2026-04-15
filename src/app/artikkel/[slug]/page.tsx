import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client, sanityFetch } from "@/sanity/lib/client";
import { ARTICLE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { ArticleView } from "@/components/views/ArticleView";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await client.fetch(ARTICLE_BY_SLUG_QUERY, { slug });
  return {
    title: data?.seoTitle || data?.title || "Artikkel",
    description: data?.seoDescription,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const data = await sanityFetch(ARTICLE_BY_SLUG_QUERY, { slug });

  if (!data) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <ArticleView data={data} />
    </div>
  );
}
