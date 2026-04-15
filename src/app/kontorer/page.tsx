/**
 * Kontorer-side – Interaktivt Norgeskart med kontorlokasjoner.
 *
 * Demonstrerer: Geopoint-felt, Leaflet-kartintegrasjon, markører med popup.
 */
import { Metadata } from "next";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import { OFFICES_QUERY } from "@/sanity/lib/queries";
import { NorwayMap } from "@/components/NorwayMapWrapper";

export const metadata: Metadata = {
  title: "Våre kontorer – Sanity Demo",
  description: "Interaktivt kart over kontorene våre i Norge",
};

interface Office {
  _id: string;
  name: string;
  slug: string;
  city: string;
  address?: string;
  phone?: string;
  email?: string;
  description?: string;
  image?: any;
  location: { lat: number; lng: number };
  isHeadquarters?: boolean;
}

export default async function KontorerPage() {
  const { data: offices } = await sanityFetch({ query: OFFICES_QUERY }) as { data: Office[] };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Våre kontorer
        </h1>
        <p className="mt-3 text-lg text-gray-500">
          Vi har kontorer over hele Norge – klikk på en markør for å se mer.
        </p>
      </div>

      <NorwayMap offices={offices} />

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Alle kontorer
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offices.map((office) => (
            <div
              key={office._id}
              className="group rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {office.image && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={urlFor(office.image).width(600).height(400).url()}
                    alt={office.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {office.name}
                  </h3>
                  {office.isHeadquarters && (
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                      Hovedkontor
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-3">{office.city}</p>
                {office.description && (
                  <p className="text-sm text-gray-600 mb-4">
                    {office.description}
                  </p>
                )}
                <div className="space-y-1 text-sm text-gray-500">
                  {office.address && <p>📍 {office.address}</p>}
                  {office.phone && <p>📞 {office.phone}</p>}
                  {office.email && <p>✉️ {office.email}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
