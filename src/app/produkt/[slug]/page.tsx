import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client, sanityFetch } from "@/sanity/lib/client";
import { PRODUCT_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { ProductView } from "@/components/views/ProductView";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug });
  return { title: data?.name || "Produkt" };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const data = await sanityFetch(PRODUCT_BY_SLUG_QUERY, { slug });

  if (!data) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <ProductView data={data} />
    </div>
  );
}
