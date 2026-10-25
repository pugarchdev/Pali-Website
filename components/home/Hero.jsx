"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowDownRight, Compass, Camera, Sparkles } from "lucide-react";

export default function Hero() {
  const [activeMoodIndex, setActiveMoodIndex] = useState(0);

  const heroPlates = [
    {
      id: "ceremony",
      title: "Sacred Vows",
      region: "Weddings & Ceremonies",
      coordinates: "Candid & Sacred Moments",
      elevation: "Heirloom Emotion",
      lens: "85mm ƒ/1.4 Portrait Prime",
      light: "Warm Natural Sunlight",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
      subhead: "The most beautiful wedding photos aren't posed—they're felt."
    },
    {
      id: "embrace",
      title: "Luminous Embrace",
      region: "Romantic Pre-Wedding",
      coordinates: "Scenic Outdoor Vistas",
      elevation: "Gentle Sunlight",
      lens: "50mm ƒ/1.2 Editorial Optics",
      light: "Warm Ambient Daylight",
      imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop",
      subhead: "Creating timeless magic in a relaxed, effortless atmosphere."
    },
    {
      id: "devotion",
      title: "Timeless Devotion",
      region: "Celebrations & Union",
      coordinates: "Open Natural Horizons",
      elevation: "Golden Hour Glow",
      lens: "35mm ƒ/1.4 Documentary",
      light: "Luminous Evening Light",
      imageUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2070&auto=format&fit=crop",
      subhead: "Unveiling love and genuine connection through the lens of eternity."
    }
  ];

  const currentPlate = heroPlates[activeMoodIndex];
  const headlineWords = ["Stories", "Told", "Through", "Light", "&", "Mist."];

  return (
    <section className="relative min-h-screen flex items-end pb-14 md:pb-20 overflow-hidden bg-[#242421] text-[#FAF9F6]">
      {/* Dynamic Background Image with Smooth Crossfade and Scale Reveal */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPlate.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={currentPlate.imageUrl}
            alt={`${currentPlate.title} — ${currentPlate.region}`}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center brightness-[0.70] contrast-[1.06]"
          />
          {/* Subtle photographic vignette and editorial darkening for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#242421] via-transparent to-[#242421]/50 pointer-events-none" />
          <div className="absolute inset-0 bg-[#242421]/25 pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Reel 2: Layered Technical Aperture HUD (Top Right) */}
      <div className="absolute top-28 md:top-32 right-6 md:right-12 z-20 hidden md:block">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-[#242421]/80 backdrop-blur-md border border-[#FAF9F6]/15 p-4 text-right space-y-2 max-w-xs shadow-lg"
        >
          <div className="flex items-center justify-end gap-2 text-[10px] uppercase tracking-[0.25em] text-[#777B60]">
            <Camera className="w-3.5 h-3.5" />
            <span>Field Plate Telemetry</span>
          </div>

          <div className="text-xs text-[#FAF9F6] font-editorial tracking-wide">
            <p className="text-base font-normal">{currentPlate.title}</p>
            <p className="text-xs text-[#D8D2C7]/80">{currentPlate.region}</p>
          </div>

          <div className="pt-2 border-t border-[#343430] grid grid-cols-2 gap-2 text-[10px] font-mono text-[#D8D2C7]/70 text-left">
            <div>
              <span className="text-[#777B60] block">GPS</span>
              <span>{currentPlate.coordinates}</span>
            </div>
            <div>
              <span className="text-[#777B60] block">OPTICS</span>
              <span>{currentPlate.lens}</span>
            </div>
            <div>
              <span className="text-[#777B60] block">ALTITUDE</span>
              <span>{currentPlate.elevation}</span>
            </div>
            <div>
              <span className="text-[#777B60] block">AMBIENCE</span>
              <span>{currentPlate.light}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-4xl space-y-8">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-[#D8D2C7]"
          >
            <span className="w-8 h-[1px] bg-[#777B60]" />
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#777B60]" />
              Alasdair Vance — Highlands &amp; Islands
            </span>
          </motion.div>

          {/* Staggered Word Reveal Headline */}
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-[#FAF9F6]">
            {headlineWords.map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + idx * 0.08,
                  ease: [0.2, 0.9, 0.3, 1],
                }}
                className={`inline-block mr-3 md:mr-4 ${word === "&" || word === "Mist."
                    ? "italic font-light text-[#D8D2C7]"
                    : ""
                  }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtext and Photographer Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end pt-1"
          >
            <p className="md:col-span-8 text-base md:text-lg text-[#D8D2C7] font-light leading-relaxed max-w-xl">
              An intimate, documentary-led approach to Scotland&apos;s ancient geology,
              fleeting Atlantic weather, and genuine human milestones. Working between
              Inverness and the Isle of Skye.
            </p>

            <div className="md:col-span-4 flex items-center md:justify-end gap-4">
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-3 px-6 py-3.5 bg-[#FAF9F6] text-[#242421] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#F5F2EB] transition-all duration-300 shadow-md"
              >
                <span>Explore The Work</span>
                <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* Reel 2 Style: Interactive Territory Mood Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="pt-4 border-t border-[#FAF9F6]/15 flex flex-wrap items-center gap-3"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#777B60] flex items-center gap-1.5 mr-2">
              <Sparkles className="w-3 h-3 text-[#777B60]" />
              Select Backdrop:
            </span>
            {heroPlates.map((plate, index) => {
              const isActive = index === activeMoodIndex;
              return (
                <button
                  key={plate.id}
                  onClick={() => setActiveMoodIndex(index)}
                  className={`px-3 py-1.5 text-xs transition-all duration-300 flex items-center gap-2 border font-medium focus:outline-none focus:ring-0 focus-visible:outline-none ${isActive
                      ? "bg-[#FAF9F6] text-[#242421] border-[#FAF9F6] shadow-sm"
                      : "bg-[#242421]/60 text-[#D8D2C7] border-[#343430] hover:border-[#D8D2C7] hover:text-[#FAF9F6]"
                    }`}
                >
                  <span className="text-[9px] font-mono opacity-60">0{index + 1}</span>
                  <span className="font-editorial">{plate.title}</span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-4 right-6 md:right-12 hidden lg:flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-[#D8D2C7]/70"
        >
          <span>Scroll To Journey</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-[#FAF9F6]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
