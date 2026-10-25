"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, ArrowUpRight } from "lucide-react";
import PortfolioFilters from "./PortfolioFilters";
import PortfolioLightbox from "./PortfolioLightbox";
import { categories, allPortfolioItems } from "@/data/portfolio";

export default function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return allPortfolioItems;
    return allPortfolioItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const activeLightboxItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div>
      {/* Category Filter Controls */}
      <div className="mb-12">
        <PortfolioFilters
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setLightboxIndex(null);
          }}
        />
      </div>

      {/* Asymmetric Editorial Portfolio Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12"
      >
        <AnimatePresence>
          {filteredItems.map((item, index) => {
            // Asymmetric col-span rhythm based on aspect ratio and index
            let colSpan = "lg:col-span-6";
            let aspectClass = "aspect-[4/5]";

            if (item.aspect === "wide") {
              colSpan = index % 3 === 0 ? "lg:col-span-8" : "lg:col-span-7";
              aspectClass = "aspect-[16/10]";
            } else if (item.aspect === "tall") {
              colSpan = "lg:col-span-5";
              aspectClass = "aspect-[3/4]";
            } else if (item.aspect === "square") {
              colSpan = "lg:col-span-4";
              aspectClass = "aspect-square";
            }

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.6,
                  delay: (index % 6) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`${colSpan} flex flex-col justify-end group`}
              >
                {/* Image Container with Hover Scaling & Lightbox Trigger */}
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
                  aria-label={`View ${item.title} in lightbox`}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Dark subtle overlay on hover */}
                  <div className="absolute inset-0 bg-[#242421]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="p-3 bg-[#FAF9F6]/90 text-[#242421] rounded-none shadow-sm flex items-center gap-2 text-xs uppercase tracking-widest font-medium">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>View Plate</span>
                    </span>
                  </div>

                  {/* Corner Category Tag */}
                  <div className="absolute top-3 left-3 bg-[#FAF9F6]/90 backdrop-blur-xs px-2.5 py-1 text-[9px] uppercase tracking-widest text-[#242421]">
                    {item.location}
                  </div>
                </div>

                {/* Editorial Caption and Metadata */}
                <div className="pt-4 flex items-start justify-between">
                  <div className="space-y-1">
                    <h3
                      onClick={() => setLightboxIndex(index)}
                      className="font-editorial text-xl sm:text-2xl text-[#242421] font-normal cursor-pointer hover:text-[#777B60] transition-colors"
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#5E5D57] font-light max-w-sm">
                      {item.caption}
                    </p>
                  </div>

                  {item.projectSlug && (
                    <Link
                      href={`/projects/${item.projectSlug}`}
                      className="text-xs uppercase tracking-widest text-[#777B60] hover:text-[#242421] p-1 inline-flex items-center gap-1 transition-colors group/link"
                      title="View Project Series"
                    >
                      <span className="hidden sm:inline text-[10px]">Series</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Accessible Lightbox Modal */}
      <PortfolioLightbox
        item={activeLightboxItem}
        onClose={() => setLightboxIndex(null)}
        onPrev={() =>
          setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1))
        }
        onNext={() =>
          setLightboxIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0))
        }
        hasPrev={filteredItems.length > 1}
        hasNext={filteredItems.length > 1}
      />
    </div>
  );
}
