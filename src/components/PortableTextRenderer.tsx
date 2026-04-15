/**
 * Portable Text-renderer
 *
 * Konverterer Sanitys Portable Text-format til React-komponenter.
 * Portable Text lagrer rik tekst som strukturert JSON, noe som gjør det
 * mulig å rendre det helt annerledes på ulike plattformer (web, app, e-post).
 */
import { PortableText, type PortableTextReactComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const components: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(800).auto("format").url()}
            alt={value.alt || "Bilde"}
            width={800}
            height={450}
            className="rounded-lg"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const target = value?.openInNewTab ? "_blank" : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-red-600 underline decoration-red-300 underline-offset-2 transition-colors hover:text-red-800"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-red-400 bg-red-50 py-2 pl-6 pr-4 italic text-gray-700">
        {children}
      </blockquote>
    ),
  },
};

export function PortableTextRenderer({ value }: { value: any }) {
  if (!value) return null;
  return (
    <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-a:text-red-600">
      <PortableText value={value} components={components} />
    </div>
  );
}
