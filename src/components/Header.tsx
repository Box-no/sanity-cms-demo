/**
 * Header-komponent med navigasjon til alle innholdstyper.
 * Viser tydelig hvilke seksjoner som finnes i demoen.
 */
import Link from "next/link";

const navItems = [
  { href: "/produktlansering", label: "Produktlansering" },
  { href: "/reiseguide", label: "Reiseguide" },
  { href: "/artikkel", label: "Artikkel" },
  { href: "/produkt", label: "Produkt" },
  { href: "/event", label: "Event" },
  { href: "/kontorer", label: "Kontorer" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
          Sanity<span className="text-red-500">.</span>Demo
        </Link>

        <nav className="hidden gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/studio"
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          Åpne Studio
        </Link>
      </div>
    </header>
  );
}
