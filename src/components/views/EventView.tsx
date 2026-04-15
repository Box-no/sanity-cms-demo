/**
 * Detaljvisning for Event.
 *
 * Viser:
 * - Eventbilde og dato
 * - Lokasjon med kart-info
 * - Speakers (referanser)
 * - Strukturert agenda
 * - Billettyper
 * - Sponsorer med logoer
 */
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";

interface EventViewProps {
  data: any;
}

const agendaTypeColors: Record<string, string> = {
  talk: "bg-blue-100 text-blue-700",
  workshop: "bg-purple-100 text-purple-700",
  break: "bg-gray-100 text-gray-600",
  panel: "bg-amber-100 text-amber-700",
  networking: "bg-green-100 text-green-700",
};

const agendaTypeLabels: Record<string, string> = {
  talk: "Foredrag",
  workshop: "Workshop",
  break: "Pause",
  panel: "Panel",
  networking: "Networking",
};

export function EventView({ data }: EventViewProps) {
  return (
    <article className="mx-auto max-w-4xl">
      {/* Hero */}
      <header className="mb-12">
        {data.eventImage?.asset && (
          <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-2xl bg-gray-100">
            <Image
              src={urlFor(data.eventImage).width(1200).height(514).auto("format").url()}
              alt={data.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="flex flex-wrap items-start gap-3">
          {data.isOnline && (
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
              Online
            </span>
          )}
        </div>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {data.name}
        </h1>

        {/* Dato og lokasjon */}
        <div className="mt-6 flex flex-wrap gap-6 text-gray-600">
          {data.startDateTime && (
            <div className="flex items-center gap-2">
              <span className="text-xl">📅</span>
              <div>
                <p className="font-medium text-gray-900">
                  {new Date(data.startDateTime).toLocaleDateString("nb-NO", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-sm">
                  {new Date(data.startDateTime).toLocaleTimeString("nb-NO", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {data.endDateTime &&
                    ` – ${new Date(data.endDateTime).toLocaleTimeString("nb-NO", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`}
                </p>
              </div>
            </div>
          )}
          {data.location?.name && (
            <div className="flex items-center gap-2">
              <span className="text-xl">📍</span>
              <div>
                <p className="font-medium text-gray-900">{data.location.name}</p>
                {data.location.address && (
                  <p className="text-sm">{data.location.address}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Beskrivelse */}
      {data.description && (
        <section className="mb-12">
          <PortableTextRenderer value={data.description} />
        </section>
      )}

      {/* Speakers – demonstrerer referanser */}
      {data.speakers?.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Speakers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.speakers.map((speaker: any) => (
              <div
                key={speaker._id}
                className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4"
              >
                {speaker.image?.asset && (
                  <Image
                    src={urlFor(speaker.image).width(80).height(80).auto("format").url()}
                    alt={speaker.name}
                    width={80}
                    height={80}
                    className="shrink-0 rounded-full object-cover"
                  />
                )}
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900">{speaker.name}</p>
                  {speaker.title && (
                    <p className="text-sm text-gray-500">{speaker.title}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Agenda */}
      {data.agenda?.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Agenda</h2>
          <div className="space-y-3">
            {data.agenda.map((item: any) => (
              <div
                key={item._key}
                className="flex gap-4 rounded-xl border border-gray-200 bg-white p-5"
              >
                <div className="w-28 shrink-0">
                  <p className="font-mono text-sm font-medium text-gray-900">
                    {item.time}
                  </p>
                  {item.type && (
                    <span
                      className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${agendaTypeColors[item.type] || "bg-gray-100 text-gray-600"}`}
                    >
                      {agendaTypeLabels[item.type] || item.type}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  {item.description && (
                    <p className="mt-1 text-sm text-gray-500">
                      {item.description}
                    </p>
                  )}
                  {item.speaker?.name && (
                    <div className="mt-2 flex items-center gap-2">
                      {item.speaker.image?.asset && (
                        <Image
                          src={urlFor(item.speaker.image).width(24).height(24).auto("format").url()}
                          alt={item.speaker.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      )}
                      <span className="text-sm text-gray-600">
                        {item.speaker.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Billettyper */}
      {data.ticketTypes?.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Billetter</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.ticketTypes.map((ticket: any) => (
              <div
                key={ticket._key}
                className={`rounded-xl border-2 p-6 text-center ${
                  ticket.available
                    ? "border-gray-200 bg-white"
                    : "border-gray-100 bg-gray-50 opacity-60"
                }`}
              >
                <p className="text-lg font-semibold text-gray-900">
                  {ticket.name}
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {ticket.price === 0
                    ? "Gratis"
                    : `${ticket.price?.toLocaleString("nb-NO")} NOK`}
                </p>
                {ticket.description && (
                  <p className="mt-3 text-sm text-gray-500">
                    {ticket.description}
                  </p>
                )}
                {!ticket.available && (
                  <p className="mt-3 text-sm font-medium text-red-500">
                    Utsolgt
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Video */}
      {data.videoEmbed && (
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Opptak</h2>
          <div className="overflow-hidden rounded-xl bg-gray-900">
            <a
              href={data.videoEmbed}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center py-16 text-white hover:text-red-400"
            >
              <span className="mr-2 text-4xl">▶</span>
              <span className="text-lg font-medium">Se opptak</span>
            </a>
          </div>
        </section>
      )}

      {/* Sponsorer */}
      {data.sponsors?.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Sponsorer</h2>
          {["gold", "silver", "bronze"].map((tier) => {
            const tierSponsors = data.sponsors.filter(
              (s: any) => s.tier === tier
            );
            if (tierSponsors.length === 0) return null;
            return (
              <div key={tier} className="mb-6">
                <p className="mb-3 text-sm font-medium uppercase tracking-wider text-gray-400">
                  {tier === "gold" ? "Gull" : tier === "silver" ? "Sølv" : "Bronse"}
                </p>
                <div className="flex flex-wrap items-center gap-6">
                  {tierSponsors.map((sponsor: any) => (
                    <a
                      key={sponsor._key}
                      href={sponsor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 transition-shadow hover:shadow-md"
                    >
                      {sponsor.logo?.asset && (
                        <Image
                          src={urlFor(sponsor.logo).width(40).height(40).auto("format").url()}
                          alt={sponsor.name}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      )}
                      <span className="font-medium text-gray-700">
                        {sponsor.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      )}
    </article>
  );
}
