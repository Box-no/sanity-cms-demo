/**
 * Detaljvisning for Artikkel.
 *
 * Viser:
 * - Hovedbilde
 * - Forfatter(e) med bilde
 * - Beregnet lesetid
 * - Portable Text-innhold
 * - Kategori-badge
 */
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";

interface ArticleViewProps {
  data: any;
}

export function ArticleView({ data }: ArticleViewProps) {
  return (
    <article className="mx-auto max-w-3xl">
      {/* Header */}
      <header className="mb-10">
        {data.category && (
          <span className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            {data.category === "tech"
              ? "Teknologi"
              : data.category === "design"
                ? "Design"
                : data.category === "business"
                  ? "Forretning"
                  : "Kultur"}
          </span>
        )}
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {data.title}
        </h1>

        {/* Metadata-linje */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          {data.publishedAt && (
            <time>
              {new Date(data.publishedAt).toLocaleDateString("nb-NO", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          )}
          {data.estimatedReadTime > 0 && (
            <>
              <span className="text-gray-300">|</span>
              <span>{data.estimatedReadTime} min lesetid</span>
            </>
          )}
        </div>

        {/* Forfattere – viser relasjoner i praksis */}
        {data.authors?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-4">
            {data.authors.map((author: any) => (
              <div key={author._id} className="flex items-center gap-3">
                {author.image?.asset && (
                  <Image
                    src={urlFor(author.image).width(40).height(40).auto("format").url()}
                    alt={author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {author.name}
                  </p>
                  {author.social?.twitter && (
                    <a
                      href={author.social.twitter}
                      className="text-xs text-gray-400 hover:text-gray-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </header>

      {/* Hovedbilde */}
      {data.mainImage?.asset && (
        <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-xl bg-gray-100">
          <Image
            src={urlFor(data.mainImage).width(1000).height(563).auto("format").url()}
            alt={data.mainImage.alt || data.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Artikkelinnhold */}
      <PortableTextRenderer value={data.body} />

      {/* SEO-info (synlig for demo-formål) */}
      {(data.seoTitle || data.seoDescription) && (
        <aside className="mt-16 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
            SEO-metadata (demo)
          </h3>
          {data.seoTitle && (
            <p className="text-sm">
              <strong>Tittel:</strong> {data.seoTitle}
            </p>
          )}
          {data.seoDescription && (
            <p className="mt-1 text-sm">
              <strong>Beskrivelse:</strong> {data.seoDescription}
            </p>
          )}
        </aside>
      )}
    </article>
  );
}
