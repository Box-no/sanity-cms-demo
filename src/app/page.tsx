/**
 * Oversiktsside – Viser alle 5 innholdstyper fra Sanity.
 *
 * Henter de siste 3 oppføringene fra hver type med én samlet GROQ-spørring.
 * Dette demonstrerer hvordan Sanity kan drive ulike typer innhold fra ett og samme CMS.
 */
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { OVERVIEW_QUERY } from "@/sanity/lib/queries";
import { ContentTypeCard } from "@/components/ContentTypeCard";
import { SectionHeader } from "@/components/SectionHeader";
import { NorwayMap } from "@/components/NorwayMapWrapper";

export default async function HomePage() {
  const data = await sanityFetch(OVERVIEW_QUERY);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="mb-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Sanity CMS
          <span className="text-red-500">.</span> Demo
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
          6 ulike innholdstyper som viser kraften i strukturert innhold.
          Alt innhold administreres i Sanity Studio og rendres i Next.js.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/studio"
            className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Åpne Sanity Studio
          </Link>
          <a
            href="https://sanity.io/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Dokumentasjon
          </a>
        </div>
      </section>

      {/* Innholdstype-oversikt */}
      <section className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {[
          { href: "/produktlansering", icon: "🚀", title: "Produktlansering", desc: "Flerspråklig, varianter, priser" },
          { href: "/reiseguide", icon: "🌍", title: "Reiseguide", desc: "Modulære seksjoner, referanser" },
          { href: "/artikkel", icon: "📝", title: "Artikkel", desc: "Rich text, forfattere, SEO" },
          { href: "/produkt", icon: "🛒", title: "Produkt", desc: "E-commerce, varianter, anmeldelser" },
          { href: "/event", icon: "📅", title: "Event", desc: "Agenda, speakers, billetter" },
          { href: "/kontorer", icon: "📍", title: "Kontorer", desc: "Interaktivt kart, geopoint" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="mb-2 text-3xl">{item.icon}</div>
            <h3 className="font-semibold text-gray-900 group-hover:text-red-600">
              {item.title}
            </h3>
            <p className="mt-1 text-xs text-gray-500">{item.desc}</p>
          </Link>
        ))}
      </section>

      {/* Produktlanseringer */}
      <section className="mb-16">
        <SectionHeader
          title="Produktlanseringer"
          description="Flerspråklig tittel, funksjoner, bilder og priser per region"
          href="/produktlansering"
          icon="🚀"
        />
        {data.productLaunches?.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.productLaunches.map((item: any) => (
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
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic">
            Ingen produktlanseringer ennå.{" "}
            <Link href="/studio" className="text-red-500 hover:underline">
              Opprett i Studio
            </Link>
          </p>
        )}
      </section>

      {/* Reiseguider */}
      <section className="mb-16">
        <SectionHeader
          title="Reiseguider"
          description="Modulære seksjoner, referanser til steder og kartkoordinater"
          href="/reiseguide"
          icon="🌍"
        />
        {data.travelGuides?.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.travelGuides.map((item: any) => (
              <ContentTypeCard
                key={item._id}
                title={item.title}
                subtitle={item.excerpt}
                href={`/reiseguide/${item.slug}`}
                image={item.mainImage}
                badge="Reiseguide"
                metadata={item.author ? [`Av ${item.author.name}`] : undefined}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic">
            Ingen reiseguider ennå.{" "}
            <Link href="/studio" className="text-red-500 hover:underline">
              Opprett i Studio
            </Link>
          </p>
        )}
      </section>

      {/* Artikler */}
      <section className="mb-16">
        <SectionHeader
          title="Artikler"
          description="Rik tekst, flere forfattere, SEO-metadata og beregnet lesetid"
          href="/artikkel"
          icon="📝"
        />
        {data.articles?.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.articles.map((item: any) => (
              <ContentTypeCard
                key={item._id}
                title={item.title}
                subtitle={item.authors?.map((a: any) => a.name).join(", ")}
                href={`/artikkel/${item.slug}`}
                image={item.mainImage}
                badge={item.category}
                metadata={[
                  item.estimatedReadTime
                    ? `${item.estimatedReadTime} min`
                    : "Kort lesning",
                ]}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic">
            Ingen artikler ennå.{" "}
            <Link href="/studio" className="text-red-500 hover:underline">
              Opprett i Studio
            </Link>
          </p>
        )}
      </section>

      {/* Produkter */}
      <section className="mb-16">
        <SectionHeader
          title="Produkter"
          description="E-commerce: varianter, bilder, anmeldelser og relaterte produkter"
          href="/produkt"
          icon="🛒"
        />
        {data.products?.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.products.map((item: any) => (
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
                    ? `${"★".repeat(Math.round(item.avgRating))} ${item.avgRating.toFixed(1)}`
                    : "Ingen anmeldelser",
                ]}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic">
            Ingen produkter ennå.{" "}
            <Link href="/studio" className="text-red-500 hover:underline">
              Opprett i Studio
            </Link>
          </p>
        )}
      </section>

      {/* Eventer */}
      <section className="mb-16">
        <SectionHeader
          title="Eventer"
          description="Agenda, speakers, billettyper og sponsorer"
          href="/event"
          icon="📅"
        />
        {data.events?.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.events.map((item: any) => (
              <ContentTypeCard
                key={item._id}
                title={item.name}
                subtitle={item.location?.name}
                href={`/event/${item.slug}`}
                image={item.eventImage}
                badge={item.isOnline ? "Online" : "Fysisk"}
                metadata={[
                  item.startDateTime
                    ? new Date(item.startDateTime).toLocaleDateString("nb-NO")
                    : "",
                  `${item.speakerCount || 0} speakers`,
                ].filter(Boolean)}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic">
            Ingen eventer ennå.{" "}
            <Link href="/studio" className="text-red-500 hover:underline">
              Opprett i Studio
            </Link>
          </p>
        )}
      </section>

      {/* Kontorer */}
      <section className="mb-16">
        <SectionHeader
          title="Kontorer"
          description="Interaktivt Norgeskart med kontorlokasjoner og geopoint-data"
          href="/kontorer"
          icon="📍"
        />
        {data.offices?.length > 0 ? (
          <>
            <NorwayMap offices={data.offices} />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {data.offices.map((office: any) => (
                <div
                  key={office._id}
                  className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm"
                >
                  <h4 className="font-semibold text-gray-900">
                    {office.name}
                    {office.isHeadquarters && (
                      <span className="ml-1 text-xs text-amber-600">★</span>
                    )}
                  </h4>
                  <p className="text-sm text-gray-500">{office.city}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-400 italic">
            Ingen kontorer ennå.{" "}
            <Link href="/studio" className="text-red-500 hover:underline">
              Opprett i Studio
            </Link>
          </p>
        )}
      </section>
    </div>
  );
}
