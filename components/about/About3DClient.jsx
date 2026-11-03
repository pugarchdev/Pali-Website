"use client";

import dynamic from "next/dynamic";

const About3DPhotographyScene = dynamic(
  () => import("@/components/about/About3DPhotographyScene"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen bg-[#111311] flex flex-col items-center justify-center p-8 text-[#FAF9F6]">
        <div className="w-12 h-12 rounded-full border-2 border-[#d4af37] border-t-transparent animate-spin mb-4" />
        <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-mono">
          Initializing 3D Optical Studio...
        </span>
      </div>
    ),
  }
);

export default function About3DClient() {
  return <About3DPhotographyScene />;
}

