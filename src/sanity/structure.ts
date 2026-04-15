/**
 * Sanity Studio-struktur
 *
 * Organiserer innholdstypene i logiske grupper i Studio-navigasjonen.
 * Dette gjør det enkelt for redaktører å finne frem.
 */
import type { StructureResolver } from "sanity/structure";
import {
  RocketIcon,
  EarthGlobeIcon,
  DocumentTextIcon,
  BasketIcon,
  CalendarIcon,
  UserIcon,
  UsersIcon,
  PinIcon,
} from "@sanity/icons";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Innhold")
    .items([
      S.listItem()
        .title("Produktlanseringer")
        .icon(RocketIcon)
        .child(S.documentTypeList("productLaunch").title("Produktlanseringer")),

      S.listItem()
        .title("Reiseguider")
        .icon(EarthGlobeIcon)
        .child(S.documentTypeList("travelGuide").title("Reiseguider")),

      S.listItem()
        .title("Artikler")
        .icon(DocumentTextIcon)
        .child(S.documentTypeList("article").title("Artikler")),

      S.listItem()
        .title("Produkter")
        .icon(BasketIcon)
        .child(S.documentTypeList("product").title("Produkter")),

      S.listItem()
        .title("Eventer")
        .icon(CalendarIcon)
        .child(S.documentTypeList("event").title("Eventer")),

      S.divider(),

      S.listItem()
        .title("Forfattere")
        .icon(UserIcon)
        .child(S.documentTypeList("author").title("Forfattere")),

      S.listItem()
        .title("Speakers")
        .icon(UsersIcon)
        .child(S.documentTypeList("speaker").title("Speakers")),

      S.listItem()
        .title("Steder / Restauranter")
        .icon(PinIcon)
        .child(S.documentTypeList("place").title("Steder")),
    ]);
