import type { Metadata } from "next";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { Header } from "@/components/Header";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Sanity CMS Demo",
    default: "Sanity CMS Demo",
  },
  description:
    "Demo som viser 6 ulike innholdstyper i Sanity Studio med Next.js frontend",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nb">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <Header />
        <main>{children}</main>
        <footer className="mt-20 border-t border-gray-200 bg-white py-10 text-center text-sm text-gray-400">
          <p>
            Bygget med{" "}
            <a href="https://sanity.io" className="font-medium text-gray-600 hover:text-gray-900" target="_blank" rel="noopener noreferrer">
              Sanity
            </a>{" "}
            +{" "}
            <a href="https://nextjs.org" className="font-medium text-gray-600 hover:text-gray-900" target="_blank" rel="noopener noreferrer">
              Next.js
            </a>{" "}
            — Kundedemo
          </p>
        </footer>
        <SanityLive />
        {(await draftMode()).isEnabled && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}
      </body>
    </html>
  );
}
