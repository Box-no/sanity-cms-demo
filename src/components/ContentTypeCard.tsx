/**
 * Kort-komponent for oversiktssiden.
 * Viser et innholdskort med bilde, tittel og metadata.
 */
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface ContentTypeCardProps {
  title: string;
  subtitle?: string;
  href: string;
  image?: any;
  badge?: string;
  metadata?: string[];
}

export function ContentTypeCard({
  title,
  subtitle,
  href,
  image,
  badge,
  metadata,
}: ContentTypeCardProps) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      {image?.asset && (
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
          <Image
            src={urlFor(image).width(600).height(375).auto("format").url()}
            alt={image.alt || title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {badge && (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 backdrop-blur-sm">
              {badge}
            </span>
          )}
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{subtitle}</p>
        )}
        {metadata && metadata.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {metadata.map((item, i) => (
              <span
                key={i}
                className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
