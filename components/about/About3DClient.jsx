"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const About3DPhotographyScene = dynamic(
  () => import("@/components/about/About3DPhotographyScene"),
  {
    ssr: false,
    loading: () => <StudioSkeleton />,
  }
);

function StudioSkeleton() {
  return (
    <div className="w-full h-[calc(100svh-5rem)] min-h-[540px] sm:min-h-[620px] bg-[#111311] flex flex-col items-center justify-center p-6 text-[#FAF9F6]">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#d4af37] border-t-transparent animate-spin mb-4" />
      <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#d4af37] font-mono text-center">
        Initializing 3D Optical Studio...
      </span>
    </div>
  );
}

export default function About3DClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defers Three.js WebGL context initialization past the critical FCP/LCP render window
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return <StudioSkeleton />;
  }

  return <About3DPhotographyScene />;
}
