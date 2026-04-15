import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { TRAVEL_GUIDE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { TravelGuideView } from "@/components/views/TravelGuideView";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await client.fetch(TRAVEL_GUIDE_BY_SLUG_QUERY, { slug });
  return { title: data?.title || "Reiseguide" };
}

export default async function TravelGuidePage({ params }: Props) {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: TRAVEL_GUIDE_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!data) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <TravelGuideView data={data} />
    </div>
  );
}
