/**
 * Seksjon-header for oversiktssiden.
 * Viser tittel, beskrivelse og en lenke til full liste.
 */
import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  description: string;
  href: string;
  icon: string;
}

export function SectionHeader({ title, description, href, icon }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        <p className="mt-1 text-gray-500">{description}</p>
      </div>
      <Link
        href={href}
        className="shrink-0 text-sm font-medium text-red-600 hover:text-red-700"
      >
        Se alle &rarr;
      </Link>
    </div>
  );
}
