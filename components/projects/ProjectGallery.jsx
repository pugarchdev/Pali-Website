"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import PortfolioLightbox from "@/components/portfolio/PortfolioLightbox";
import Reveal from "@/components/motion/Reveal";

export default function ProjectGallery({ images, projectTitle, category, location, year }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Map gallery images into format expected by PortfolioLightbox
  const lightboxItems = images.map((img, idx) => ({
    id: `gal-${idx}`,
    title: img.title || `${projectTitle} — Plate ${idx + 1}`,
    caption: img.caption,
    imageUrl: img.url,
    category,
    location,
    year,
  }));

  const activeLightboxItem =
    lightboxIndex !== null ? lightboxItems[lightboxIndex] : null;

  return (
    <div className="space-y-12">
      <div className="border-b border-[#D8D2C7] pb-4">
        <span className="text-xs uppercase tracking-[0.25em] text-[#777B60]">
          Visual Folio &amp; Plates
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {images.map((img, index) => {
          let colSpan = "md:col-span-6";
          let aspectClass = "aspect-[16/10]";

          if (img.aspect === "tall") {
            colSpan = "md:col-span-5";
            aspectClass = "aspect-[3/4]";
          } else if (img.aspect === "wide") {
            colSpan = index % 2 === 0 ? "md:col-span-7" : "md:col-span-12";
            aspectClass = "aspect-[16/9]";
          } else if (img.aspect === "square") {
            colSpan = "md:col-span-6";
            aspectClass = "aspect-square";
          }

          return (
            <div
              key={index}
              className={`${colSpan} flex flex-col justify-end group`}
            >
              <Reveal delay={index * 0.1}>
                <div
                  onClick={() => setLightboxIndex(index)}
                  className={`relative w-full ${aspectClass} overflow-hidden bg-[#D8D2C7] cursor-pointer`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setLightboxIndex(index);
                    }
                  }}
                  aria-label={`Enlarge ${img.title || "photograph"}`}
                >
                  <Image
                    src={img.url}
                    alt={img.title || projectTitle}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-[#242421]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="p-3 bg-[#FAF9F6]/90 text-[#242421] text-xs uppercase tracking-widest font-medium flex items-center gap-2">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>View Plate</span>
                    </span>
                  </div>
                </div>

                <div className="pt-3">
                  <h4 className="font-editorial text-lg text-[#242421]">
                    {img.title}
                  </h4>
                  {img.caption && (
                    <p className="text-xs text-[#5E5D57] font-light mt-0.5">
                      {img.caption}
                    </p>
                  )}
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>

      {/* Lightbox for gallery inspection */}
      <PortfolioLightbox
        item={activeLightboxItem}
        onClose={() => setLightboxIndex(null)}
        onPrev={() =>
          setLightboxIndex((prev) => (prev > 0 ? prev - 1 : lightboxItems.length - 1))
        }
        onNext={() =>
          setLightboxIndex((prev) => (prev < lightboxItems.length - 1 ? prev + 1 : 0))
        }
        hasPrev={lightboxItems.length > 1}
        hasNext={lightboxItems.length > 1}
      />
    </div>
  );
}
