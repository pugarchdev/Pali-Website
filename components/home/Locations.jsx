"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass } from "lucide-react";
import { scotlandLocations } from "@/data/locations";
import Reveal from "@/components/motion/Reveal";

export default function Locations() {
  const [activeLocationId, setActiveLocationId] = useState(scotlandLocations[0].id);

  const activeLoc =
    scotlandLocations.find((loc) => loc.id === activeLocationId) ||
    scotlandLocations[0];

  return (
    <section className="py-24 md:py-36 bg-[#242421] text-[#FAF9F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 border-b border-[#343430] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#777B60] mb-3">
              <Compass className="w-4 h-4 text-[#777B60]" />
              <span>Geographies of Light</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#FAF9F6] font-light">
              Scotland&apos;s Wild Territories
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-[#D8D2C7] max-w-sm font-light">
            Working intimately across the volcanic geology, sea lochs, and historic wynds that shape our visual memory.
          </p>
        </div>

        {/* Location Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Location Selector Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#777B60] block mb-4">
              Select Region to Explore
            </span>

            <div className="space-y-2">
              {scotlandLocations.map((loc, index) => {
                const isActive = loc.id === activeLocationId;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setActiveLocationId(loc.id)}
                    className={`w-full text-left p-4 md:p-5 transition-all duration-300 flex items-center justify-between border ${
                      isActive
                        ? "bg-[#343430] border-[#D8D2C7] text-[#FAF9F6]"
                        : "bg-transparent border-[#343430] text-[#D8D2C7]/70 hover:text-[#FAF9F6] hover:border-[#777B60]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#777B60] tracking-widest uppercase">
                          0{index + 1}
                        </span>
                        <h3 className="font-editorial text-xl md:text-2xl font-normal">
                          {loc.name}
                        </h3>
                      </div>
                      <p className="text-xs text-[#777B60] uppercase tracking-wider mt-1 font-light">
                        {loc.region}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-mono text-[#D8D2C7]/50 block">
                        {loc.coordinates}
                      </span>
                      {isActive && (
                        <span className="text-xs text-[#D8D2C7] inline-block mt-1">
                          &rarr;
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Location Display (7 cols) */}
          <div className="lg:col-span-7">
            <Reveal key={activeLoc.id} delay={0.1}>
              <div className="space-y-6">
                {/* Visual Frame */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#343430] border border-[#343430]">
                  <Image
                    src={activeLoc.image}
                    alt={`${activeLoc.name} landscape photography`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover transition-transform duration-1000 ease-out hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#242421]/90 via-transparent to-transparent pointer-events-none" />

                  {/* Corner Coordinates */}
                  <div className="absolute bottom-4 left-4 z-10 text-[10px] uppercase tracking-[0.25em] text-[#D8D2C7]">
                    <span>Coordinates: {activeLoc.coordinates}</span>
                  </div>
                </div>

                {/* Location Details Narrative */}
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#343430] pb-3">
                    <span className="font-editorial text-2xl text-[#FAF9F6]">
                      {activeLoc.name}
                    </span>
                    <span className="text-xs text-[#777B60] uppercase tracking-wider">
                      Optimal Light: {activeLoc.bestSeasons}
                    </span>
                  </div>

                  <p className="text-sm md:text-base text-[#D8D2C7] font-light leading-relaxed">
                    {activeLoc.description}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-6">
                    {activeLoc.associatedProjects.length > 0 && (
                      <Link
                        href={`/projects/${activeLoc.associatedProjects[0]}`}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#FAF9F6] hover:text-[#D8D2C7] border-b border-[#D8D2C7] pb-1 transition-colors"
                      >
                        <span>View Project Made in this Region</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                    <Link
                      href="/portfolio"
                      className="text-xs uppercase tracking-[0.22em] text-[#777B60] hover:text-[#FAF9F6] transition-colors"
                    >
                      Filter Full Archive &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
