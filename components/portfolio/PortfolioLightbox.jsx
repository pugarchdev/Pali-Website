"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

export default function PortfolioLightbox({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) {
  // Handle keyboard events (Escape, Left, Right)
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && hasPrev) {
        onPrev();
      } else if (e.key === "ArrowRight" && hasNext) {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [item, onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-[#242421]/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
        >
          {/* Top Bar with metadata and Close Button */}
          <div className="flex items-center justify-between text-[#FAF9F6] border-b border-[#343430] pb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.25em] text-[#777B60]">
                {item.category}
              </span>
              <span className="text-[#343430]">•</span>
              <span className="text-xs tracking-widest text-[#D8D2C7]">
                {item.location} ({item.year})
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close lightbox"
              className="p-2 text-[#FAF9F6] hover:text-[#D8D2C7] transition-colors focus:outline-none focus:ring-1 focus:ring-[#D8D2C7]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Central Image Container with Navigation Arrows */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            {/* Prev Button */}
            {hasPrev && (
              <button
                onClick={onPrev}
                aria-label="Previous photograph"
                className="absolute left-2 md:left-6 z-20 p-3 bg-[#242421]/60 hover:bg-[#242421] text-[#FAF9F6] border border-[#343430] rounded-none transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Main Lightbox Image */}
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="relative max-w-5xl max-h-[75vh] w-full h-full flex items-center justify-center"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="90vw"
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Next Button */}
            {hasNext && (
              <button
                onClick={onNext}
                aria-label="Next photograph"
                className="absolute right-2 md:right-6 z-20 p-3 bg-[#242421]/60 hover:bg-[#242421] text-[#FAF9F6] border border-[#343430] rounded-none transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Bar: Title, Caption and Link */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-t border-[#343430] pt-4 text-[#FAF9F6] gap-4">
            <div>
              <h3 className="font-editorial text-2xl md:text-3xl font-light">
                {item.title}
              </h3>
              {item.caption && (
                <p className="text-xs md:text-sm text-[#D8D2C7] mt-1 font-light max-w-xl">
                  {item.caption}
                </p>
              )}
            </div>

            {item.projectSlug && (
              <Link
                href={`/projects/${item.projectSlug}`}
                onClick={onClose}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#FAF9F6] hover:text-[#777B60] border-b border-[#FAF9F6] hover:border-[#777B60] pb-1 transition-colors"
              >
                <span>View Full Project Series</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
