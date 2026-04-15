/**
 * Innebygd Sanity Studio
 *
 * Sanity Studio kjører som en del av Next.js-appen.
 * Tilgjengelig på /studio – her administrerer redaktører alt innhold.
 */
import { Studio } from "./Studio";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <Studio />;
}
