/**
 * Detaljside for en enkelt produktlansering.
 * Henter data basert på slug fra URL-parameteren.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client, sanityFetch } from "@/sanity/lib/client";
import { PRODUCT_LAUNCH_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { ProductLaunchView } from "@/components/views/ProductLaunchView";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await client.fetch(PRODUCT_LAUNCH_BY_SLUG_QUERY, { slug });
  return { title: data?.title?.no || "Produktlansering" };
}

export default async function ProductLaunchPage({ params }: Props) {
  const { slug } = await params;
  const data = await sanityFetch(PRODUCT_LAUNCH_BY_SLUG_QUERY, { slug });

  if (!data) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <ProductLaunchView data={data} />
    </div>
  );
}
