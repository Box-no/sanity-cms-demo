/**
 * Detaljvisning for Reiseguide.
 *
 * Viser:
 * - Hovedbilde med overlay-tittel
 * - Modulære seksjoner (tekst, bildegalleri, tips)
 * - Refererte steder/restauranter
 * - Forfatterinfo
 * - Tags
 */
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";

interface TravelGuideViewProps {
  data: any;
}

const categoryLabels: Record<string, string> = {
  restaurant: "Restaurant",
  hotel: "Hotell",
  attraction: "Attraksjon",
  cafe: "Kafé",
  bar: "Bar",
  shop: "Butikk",
};

export function TravelGuideView({ data }: TravelGuideViewProps) {
  return (
    <article>
      {/* Hero */}
      <header className="relative mb-12 overflow-hidden rounded-2xl">
        {data.mainImage?.asset && (
          <div className="relative aspect-[21/9]">
            <Image
              src={urlFor(data.mainImage).width(1400).height(600).auto("format").url()}
              alt={data.mainImage.alt || data.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h1 className="text-4xl font-bold text-white sm:text-5xl">
                {data.title}
              </h1>
              {data.excerpt && (
                <p className="mt-3 max-w-2xl text-lg text-gray-200">
                  {data.excerpt}
                </p>
              )}
            </div>
          </div>
        )}
      </header>

      <div className="mx-auto max-w-4xl">
        {/* Forfatter */}
        {data.author && (
          <div className="mb-10 flex items-center gap-4 rounded-xl bg-gray-50 p-4">
            {data.author.image?.asset && (
              <Image
                src={urlFor(data.author.image).width(56).height(56).auto("format").url()}
                alt={data.author.name}
                width={56}
                height={56}
                className="rounded-full"
              />
            )}
            <div>
              <p className="text-sm text-gray-500">Skrevet av</p>
              <p className="font-semibold text-gray-900">{data.author.name}</p>
              {data.author.bio && (
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  {data.author.bio}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Modulære seksjoner */}
        {data.sections?.map((section: any) => (
          <section key={section._key} className="mb-12">
            {section._type === "textSection" && (
              <>
                {section.heading && (
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    {section.heading}
                  </h2>
                )}
                <PortableTextRenderer value={section.content} />
              </>
            )}

            {section._type === "imageGallery" && (
              <>
                {section.heading && (
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    {section.heading}
                  </h2>
                )}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {section.images?.map((img: any) => (
                    <div key={img._key} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={urlFor(img).width(400).height(300).auto("format").url()}
                        alt={img.alt || "Bilde"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {section._type === "tipBox" && (
              <div
                className={`rounded-xl border-l-4 p-5 ${
                  section.tipType === "warning"
                    ? "border-amber-400 bg-amber-50"
                    : section.tipType === "info"
                      ? "border-blue-400 bg-blue-50"
                      : "border-green-400 bg-green-50"
                }`}
              >
                <p className="font-medium">
                  {section.tipType === "warning" ? "⚠️ Advarsel" : section.tipType === "info" ? "ℹ️ Info" : "💡 Tips"}
                </p>
                <p className="mt-1 text-gray-700">{section.content}</p>
              </div>
            )}
          </section>
        ))}

        {/* Refererte steder */}
        {data.places?.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Steder og restauranter
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.places.map((place: any) => (
                <div
                  key={place._id}
                  className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4"
                >
                  {place.image?.asset && (
                    <Image
                      src={urlFor(place.image).width(100).height(100).auto("format").url()}
                      alt={place.name}
                      width={100}
                      height={100}
                      className="shrink-0 rounded-lg object-cover"
                    />
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {place.name}
                      </h3>
                      {place.category && (
                        <span className="shrink-0 rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                          {categoryLabels[place.category] || place.category}
                        </span>
                      )}
                    </div>
                    {place.description && (
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {place.description}
                      </p>
                    )}
                    {place.address && (
                      <p className="mt-2 text-xs text-gray-400">{place.address}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tags */}
        {data.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag: string, i: number) => (
              <span
                key={i}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
