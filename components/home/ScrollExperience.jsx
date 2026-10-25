"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Compass, ArrowUpRight } from "lucide-react";

export default function ScrollExperience() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scroll transforms for the cinematic expanding frame
  const scale = useTransform(scrollYProgress, [0, 0.35], [0.85, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.35], [32, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.35, 0.8], [0.3, 0.45, 0.65]);

  // Stage 1 text: fades out as user scrolls
  const text1Opacity = useTransform(scrollYProgress, [0, 0.18, 0.28], [1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.28], [0, -40]);

  // Stage 2 text: fades in then out
  const text2Opacity = useTransform(scrollYProgress, [0.32, 0.45, 0.6], [0, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.32, 0.45, 0.6], [40, 0, -40]);

  // Stage 3 text: fades in towards end
  const text3Opacity = useTransform(scrollYProgress, [0.65, 0.8, 1], [0, 1, 1]);
  const text3Y = useTransform(scrollYProgress, [0.65, 0.8], [40, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-[#242421] text-[#FAF9F6]"
    >
      {/* Sticky Fullscreen Viewport Window */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Dynamic Expanding Photographic Canvas */}
        <motion.div
          style={{
            scale,
            borderRadius,
          }}
          className="relative w-full h-full overflow-hidden shadow-2xl origin-center"
        >
          {/* Main Cinematic Photographic Plate */}
          <Image
            src="/media/2024/05/17-scaled.jpg"
            alt="Cinematic scroll-driven photography of wedding celebration by Pali"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />

          {/* Dynamic Darkening Filter */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-[#242421]"
          />

          {/* Top Telemetry Header */}
          <div className="absolute top-8 left-8 right-8 z-20 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-[#D8D2C7]">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#777B60]" />
              <span>Scroll-Driven Visual Journey</span>
            </div>
            <div className="hidden sm:block font-mono text-[10px] text-[#777B60]">
              PALI PHOTOGRAPHY • CINEMATIC STORYTELLING
            </div>
          </div>

          {/* Centered Staged Narratives */}
          <div className="absolute inset-0 z-20 flex items-center justify-center p-6 text-center">
            {/* Stage 1: The Unspoken Bond */}
            <motion.div
              style={{ opacity: text1Opacity, y: text1Y }}
              className="max-w-3xl space-y-4 pointer-events-none"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-[#777B60] block">
                Chapter 01 • The Unspoken Bond
              </span>
              <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light text-[#FAF9F6] leading-tight">
                Every Love Story Deserves a Frame.
              </h2>
              <p className="text-sm md:text-base text-[#D8D2C7] font-light max-w-xl mx-auto">
                Scroll down to enter a world where raw emotions, joyful laughter, and unconditional connections take center stage.
              </p>
            </motion.div>

            {/* Stage 2: Felt, Not Posed */}
            <motion.div
              style={{ opacity: text2Opacity, y: text2Y }}
              className="absolute max-w-3xl space-y-4 pointer-events-none"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-[#777B60] block">
                Chapter 02 • Felt, Not Posed
              </span>
              <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light text-[#FAF9F6] leading-tight">
                Unveiling Love Through the Lens.
              </h2>
              <p className="text-sm md:text-base text-[#D8D2C7] font-light max-w-xl mx-auto">
                From spontaneous giggles to gentle embraces, we ensure every moment radiates warmth, comfort, and effortless happiness.
              </p>
            </motion.div>

            {/* Stage 3: The Permanent Memory */}
            <motion.div
              style={{ opacity: text3Opacity, y: text3Y }}
              className="absolute max-w-3xl space-y-6"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-[#777B60] block">
                Chapter 03 • The Permanent Memory
              </span>
              <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light text-[#FAF9F6] leading-tight">
                Each Frame Holds A Dream.
              </h2>
              <p className="text-sm md:text-base text-[#D8D2C7] font-light max-w-xl mx-auto">
                Together, we capture heirloom imagery that will transport you back to the feeling of this day for a lifetime.
              </p>

              <div className="pt-4 flex items-center justify-center gap-4">
                <Link
                  href="/projects/bonds-for-forever"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FAF9F6] text-[#242421] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#F5F2EB] transition-colors"
                >
                  <span>Explore Wedding Series</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#D8D2C7] text-xs uppercase tracking-[0.2em] text-[#FAF9F6] hover:bg-[#343430] transition-colors"
                >
                  <span>View All Collections</span>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Bottom HUD: Live Coordinate & Scroll Telemetry */}
          <div className="absolute bottom-8 left-8 right-8 z-20 flex items-end justify-between text-xs text-[#D8D2C7]/80">
            <div>
              <span className="text-[10px] text-[#777B60] uppercase tracking-wider block">MEDIUM</span>
              <span className="font-editorial text-sm">Natural Light &amp; Candid Realism</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#777B60] uppercase tracking-wider block">SPECIALITY</span>
              <span className="font-editorial text-sm">Weddings, Couples &amp; Landscapes</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
