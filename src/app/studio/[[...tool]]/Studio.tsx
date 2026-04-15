"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { Config } from "sanity";

const NextStudio = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  { ssr: false }
);

export function Studio() {
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    import("../../../../sanity.config").then((mod) => setConfig(mod.default));
  }, []);

  if (!config) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-500">Laster Sanity Studio...</p>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
