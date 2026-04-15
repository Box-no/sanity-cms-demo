"use client";

import dynamic from "next/dynamic";

const NorwayMap = dynamic(
  () => import("@/components/NorwayMap").then((mod) => mod.NorwayMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] w-full rounded-xl bg-gray-100 animate-pulse flex items-center justify-center">
        <p className="text-gray-400">Laster kart…</p>
      </div>
    ),
  }
);

export { NorwayMap };
