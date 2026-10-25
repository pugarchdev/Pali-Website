"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import Reveal from "@/components/motion/Reveal";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) =>
      prevIdx === 0 ? testimonials.length - 1 : prevIdx - 1
    );
  };

  const next = () => {
    setCurrentIndex((prevIdx) =>
      prevIdx === testimonials.length - 1 ? 0 : prevIdx + 1
    );
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 md:py-36 bg-[#FAF9F6] text-[#242421] border-t border-[#D8D2C7]/70">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <Reveal>
          <div className="text-center mb-16 md:mb-20">
            <span className="text-xs uppercase tracking-[0.25em] text-[#777B60] block mb-2">
              Client Reflections &amp; Editorial Notes
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#242421] font-light">
              Words From Past Commissions
            </h2>
          </div>
        </Reveal>

        {/* Minimal Testimonial Crossfade Box */}
        <div className="relative min-h-[280px] sm:min-h-[240px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="space-y-8"
            >
              <div className="flex justify-center text-[#777B60]/40">
                <Quote className="w-8 h-8 rotate-180" />
              </div>

              <blockquote className="font-editorial text-xl sm:text-2xl md:text-3xl text-center text-[#242421] font-light leading-relaxed max-w-3xl mx-auto">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              <div className="text-center space-y-1 pt-2">
                <p className="font-editorial text-lg text-[#242421] font-medium tracking-wide">
                  {current.author}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-[#777B60]">
                  {current.project} • {current.location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Understated Controls */}
          <div className="flex items-center justify-center gap-6 mt-12 pt-8 border-t border-[#D8D2C7]/50">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="p-2 text-[#5E5D57] hover:text-[#242421] transition-colors focus:outline-none focus:ring-1 focus:ring-[#777B60]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono tracking-widest text-[#777B60]">
              0{currentIndex + 1} / 0{testimonials.length}
            </span>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="p-2 text-[#5E5D57] hover:text-[#242421] transition-colors focus:outline-none focus:ring-1 focus:ring-[#777B60]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
