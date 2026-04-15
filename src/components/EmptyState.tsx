/**
 * Plassholder som vises når det ikke finnes innhold ennå.
 * Guider brukeren til å opprette innhold i Sanity Studio.
 */
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  docType: string;
}

export function EmptyState({ title, description, docType }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-20 text-center">
      <div className="mb-4 text-5xl opacity-50">📝</div>
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-gray-500">{description}</p>
      <Link
        href={`/studio/structure/${docType}`}
        className="mt-6 inline-flex items-center rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
      >
        Opprett i Studio &rarr;
      </Link>
    </div>
  );
}
