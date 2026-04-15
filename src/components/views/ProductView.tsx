/**
 * Detaljvisning for Produkt (e-commerce demo).
 *
 * Viser:
 * - Produktbilder
 * - Varianter (størrelse, farge, pris)
 * - Lagerstatus
 * - Anmeldelser med rating
 * - Relaterte produkter (selv-referanser)
 */
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";

interface ProductViewProps {
  data: any;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-amber-400">
      {"★".repeat(Math.round(rating))}
      {"☆".repeat(5 - Math.round(rating))}
    </span>
  );
}

export function ProductView({ data }: ProductViewProps) {
  return (
    <article className="mx-auto max-w-5xl">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Bildeseksjon */}
        <div>
          {data.mainImage?.asset && (
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
              <Image
                src={urlFor(data.mainImage).width(600).height(600).auto("format").url()}
                alt={data.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>

        {/* Produktinfo */}
        <div>
          <div className="mb-2 text-sm text-gray-400">SKU: {data.sku}</div>
          <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>

          {/* Variantoversikt */}
          {data.variants?.length > 0 && (
            <div className="mt-8">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Varianter
              </h2>
              <div className="space-y-3">
                {data.variants.map((v: any) => (
                  <div
                    key={v._key}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{v.name}</p>
                      <div className="mt-1 flex gap-3 text-sm text-gray-500">
                        {v.size && <span>Str: {v.size}</span>}
                        {v.color && <span>Farge: {v.color}</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        {v.compareAtPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            {v.compareAtPrice.toLocaleString("nb-NO")} NOK
                          </span>
                        )}
                        <span className="text-lg font-bold text-gray-900">
                          {v.price?.toLocaleString("nb-NO")} NOK
                        </span>
                      </div>
                      <span
                        className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                          v.inStock
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {v.inStock
                          ? `På lager${v.stockCount ? ` (${v.stockCount})` : ""}`
                          : "Utsolgt"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Beskrivelse */}
      {data.description && (
        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Beskrivelse</h2>
          <PortableTextRenderer value={data.description} />
        </section>
      )}

      {/* Anmeldelser */}
      {data.reviews?.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Anmeldelser ({data.reviews.length})
          </h2>
          <div className="space-y-4">
            {data.reviews.map((review: any) => (
              <div
                key={review._key}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900">{review.author}</p>
                  <StarRating rating={review.rating} />
                </div>
                {review.comment && (
                  <p className="mt-2 text-gray-600">{review.comment}</p>
                )}
                {review.date && (
                  <p className="mt-2 text-xs text-gray-400">
                    {new Date(review.date).toLocaleDateString("nb-NO")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Relaterte produkter – demonstrerer selv-referanser */}
      {data.relatedProducts?.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Relaterte produkter
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.relatedProducts.map((product: any) => (
              <Link
                key={product._id}
                href={`/produkt/${product.slug}`}
                className="group block overflow-hidden rounded-xl border border-gray-200 transition-shadow hover:shadow-md"
              >
                {product.mainImage?.asset && (
                  <div className="relative aspect-square bg-gray-100">
                    <Image
                      src={urlFor(product.mainImage).width(300).height(300).auto("format").url()}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-3">
                  <p className="font-medium text-gray-900 group-hover:text-red-600">
                    {product.name}
                  </p>
                  {product.price && (
                    <p className="mt-1 text-sm text-gray-500">
                      Fra {product.price.toLocaleString("nb-NO")} NOK
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
