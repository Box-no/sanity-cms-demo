/**
 * Sanity Studio-konfigurasjon
 *
 * Denne filen konfigurerer Sanity Studio som er innebygd i Next.js-appen.
 * Studio er tilgjengelig på /studio-ruten.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "@/sanity/schemaTypes";
import { structure } from "@/sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: "sanity-demo",
  title: "Sanity CMS Demo",

  projectId,
  dataset,
  basePath: "/studio",

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: "2026-02-01" }),
  ],

  schema: {
    types: schemaTypes,
  },
});
