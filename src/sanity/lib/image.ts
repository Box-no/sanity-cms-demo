/**
 * Sanity bildebehandling
 *
 * Hjelpefunksjon for å generere optimaliserte bilde-URLer fra Sanity.
 * Bruker @sanity/image-url for automatisk resizing, cropping og format-konvertering.
 */
import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
