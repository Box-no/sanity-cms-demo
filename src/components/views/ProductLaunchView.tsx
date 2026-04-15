/**
 * Detaljvisning for Produktlansering.
 *
 * Viser:
 * - Flerspråklig tittel (NO/EN)
 * - Lanseringsdato
 * - Funksjoner som featurekort
 * - Bildegalleri
 * - Pris per region
 * - CTA-knapp
 */
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";

interface ProductLaunchViewProps {
  data: any;
}

export function ProductLaunchView({ data }: ProductLaunchViewProps) {
  return (
    <article className="mx-auto max-w-4xl">
      {/* Header */}
      <header className="mb-12">
        <div className="mb-4 inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
          Produktlansering
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {data.title?.no}
        </h1>
        {data.title?.en && (
          <p className="mt-2 text-lg text-gray-400 italic">
            EN: {data.title.en}
          </p>
        )}
        {data.launchDate && (
          <p className="mt-4 text-gray-500">
            Lanseres{" "}
            <time className="font-medium text-gray-700">
              {new Date(data.launchDate).toLocaleDateString("nb-NO", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </p>
        )}
      </header>

      {/* Bildegalleri */}
      {data.images?.length > 0 && (
        <section className="mb-12">
          <div className="grid gap-4 sm:grid-cols-2">
            {data.images.map((img: any) => (
              <div key={img._key} className="relative aspect-video overflow-hidden rounded-xl bg-gray-100">
                <Image
                  src={urlFor(img).width(700).height(400).auto("format").url()}
                  alt={img.alt || "Produktbilde"}
                  fill
                  className="object-cover"
                />
                {img.caption && (
                  <span className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-xs text-white">
                    {img.caption}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Beskrivelse */}
      {data.description && (
        <section className="mb-12">
          <PortableTextRenderer value={data.description} />
        </section>
      )}

      {/* Funksjoner */}
      {data.features?.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Funksjoner</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.features.map((feature: any) => (
              <div
                key={feature._key}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                {feature.icon && (
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-lg">
                    {feature.icon === "zap" ? "⚡" : feature.icon === "shield" ? "🛡" : feature.icon === "globe" ? "🌍" : "✨"}
                  </div>
                )}
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                {feature.description && (
                  <p className="mt-1 text-sm text-gray-500">{feature.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Pris per region */}
      {data.pricing?.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Pris per region</h2>
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Region</th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Pris</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.pricing.map((p: any) => (
                  <tr key={p._key}>
                    <td className="px-6 py-4 font-medium text-gray-900">{p.region}</td>
                    <td className="px-6 py-4 text-right text-gray-700">
                      {p.price?.toLocaleString("nb-NO")} {p.currency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Video */}
      {data.videoUrl && (
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Video</h2>
          <div className="overflow-hidden rounded-xl bg-gray-900">
            <a
              href={data.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center py-16 text-white transition-colors hover:text-red-400"
            >
              <span className="mr-2 text-4xl">▶</span>
              <span className="text-lg font-medium">Se video</span>
            </a>
          </div>
        </section>
      )}

      {/* CTA */}
      {data.cta && (
        <section className="rounded-2xl bg-gray-900 px-8 py-12 text-center">
          <a
            href={data.cta.url}
            className="inline-block rounded-lg bg-red-500 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-red-600"
          >
            {data.cta.label}
          </a>
        </section>
      )}
    </article>
  );
}
