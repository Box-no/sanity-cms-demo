/**
 * Listeside for eventer.
 */
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { EVENTS_QUERY } from "@/sanity/lib/queries";
import { ContentTypeCard } from "@/components/ContentTypeCard";
import { EmptyState } from "@/components/EmptyState";

export const metadata: Metadata = { title: "Eventer" };

export default async function EventsPage() {
  const events = await client.fetch(EVENTS_QUERY);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <span className="text-3xl">📅</span>
        <h1 className="mt-2 text-4xl font-bold text-gray-900">Eventer</h1>
        <p className="mt-2 text-gray-500">
          Agenda, speakers, billettyper og sponsorer.
        </p>
      </header>

      {events?.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((item: any) => (
            <ContentTypeCard
              key={item._id}
              title={item.name}
              subtitle={item.location?.name}
              href={`/event/${item.slug}`}
              image={item.eventImage}
              badge={item.isOnline ? "Online" : "Fysisk"}
              metadata={[
                item.startDateTime
                  ? new Date(item.startDateTime).toLocaleDateString("nb-NO", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "",
                `${item.speakerCount || 0} speakers`,
              ].filter(Boolean)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Ingen eventer ennå"
          description="Opprett ditt første event i Sanity Studio."
          docType="event"
        />
      )}
    </div>
  );
}
