import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { EVENT_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { EventView } from "@/components/views/EventView";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await client.fetch(EVENT_BY_SLUG_QUERY, { slug });
  return { title: data?.name || "Event" };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const data = await client.fetch(EVENT_BY_SLUG_QUERY, { slug });

  if (!data) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <EventView data={data} />
    </div>
  );
}
