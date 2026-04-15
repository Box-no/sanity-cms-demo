/**
 * Samlepunkt for alle Sanity-skjemaer.
 *
 * Alle dokumenttyper og gjenbrukbare objekttyper registreres her.
 * Denne eksporteres til sanity.config.ts.
 */
import { portableText } from "./shared/portableText";
import { cta } from "./shared/cta";
import { author } from "./author";
import { speaker } from "./speaker";
import { place } from "./place";
import { productLaunch } from "./productLaunch";
import { travelGuide } from "./travelGuide";
import { article } from "./article";
import { product } from "./product";
import { event } from "./event";

export const schemaTypes = [
  // Gjenbrukbare objekttyper
  portableText,
  cta,

  // Støtte-dokumenter (referanser)
  author,
  speaker,
  place,

  // Hoved-innholdstyper
  productLaunch,
  travelGuide,
  article,
  product,
  event,
];
