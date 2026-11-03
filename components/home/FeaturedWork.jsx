"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { featuredProjects } from "@/data/portfolio";

export default function FeaturedWork() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const rowsRef = useRef([]);
  rowsRef.current = [];

  const addToRows = (el) => {
    if (el && !rowsRef.current.includes(el)) {
      rowsRef.current.push(el);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // Section Header Entrance (Bi-directional: scroll down & scroll up)
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll(".gsap-feat-header"),
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // Staggered Cinematic Left/Right Entrance per Project Row (Bi-directional: scroll down & scroll up)
      rowsRef.current.forEach((row, index) => {
        if (!row) return;

        const isReversed = index % 2 !== 0;
        const imgContainer = row.querySelector(".gsap-img-container");
        const imgInner = row.querySelector(".gsap-img-inner");
        const textItems = row.querySelectorAll(".gsap-text-item");

        // The image comes from the left or right side in a cinematic way
        // Left side when isReversed is false; Right side when isReversed is true
        const xOffset = isReversed ? 120 : -120;
        const rotY = isReversed ? -8 : 8;

        // Master bi-directional animation timeline for this row
        const rowTl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
            end: "bottom 18%",
            toggleActions: "play reverse play reverse",
          },
        });

        if (imgContainer) {
          rowTl.fromTo(
            imgContainer,
            {
              opacity: 0,
              x: xOffset,
              scale: 0.93,
              rotateY: rotY,
              transformPerspective: 1400,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              rotateY: 0,
              duration: 1.15,
              ease: "power3.out",
            },
            0
          );
        }

        // Cinematic lens focus unzoom
        if (imgInner) {
          rowTl.fromTo(
            imgInner,
            { scale: 1.15 },
            {
              scale: 1,
              duration: 1.2,
              ease: "power2.out",
            },
            0
          );

          // Continuous subtle vertical parallax depth on scroll
          gsap.to(imgInner, {
            yPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }

        // Text Content reveal arriving smoothly from the opposite side
        if (textItems.length > 0) {
          const textXOffset = isReversed ? -40 : 40;
          rowTl.fromTo(
            textItems,
            {
              opacity: 0,
              x: textXOffset,
              y: 20,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.85,
              stagger: 0.08,
              ease: "power3.out",
            },
            0.12
          );
        }
      });

      // Bottom Archive Link Entrance (Bi-directional: scroll down & scroll up)
      if (footerRef.current) {
        gsap.fromTo(
          footerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-36 bg-[#F5F2EB] text-[#242421] overflow-hidden"
      aria-label="Featured Photography Projects"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-28 border-b border-[#D8D2C7] pb-8"
        >
          <div className="space-y-3">
            <span className="gsap-feat-header text-xs uppercase tracking-[0.25em] text-[#777B60] block">
              Selected Collections
            </span>
            <h2 className="gsap-feat-header font-editorial text-4xl sm:text-5xl md:text-6xl text-[#242421] font-light">
              Featured Love Stories &amp; Series
            </h2>
          </div>
          <p className="gsap-feat-header mt-4 md:mt-0 text-sm text-[#5E5D57] max-w-sm font-light leading-relaxed">
            Timeless wedding tales, creative engagements, and majestic landscapes captured in their
            purest form.
          </p>
        </div>

        {/* Featured Projects with alternating rhythm */}
        <div className="space-y-28 md:space-y-40">
          {featuredProjects.slice(0, 4).map((project, index) => {
            const isReversed = index % 2 !== 0;
            const isTall = project.heroAspect === "tall";

            const imageColSpan = isTall
              ? isReversed
                ? "lg:col-span-5 lg:col-start-8"
                : "lg:col-span-5 lg:col-start-1"
              : isReversed
              ? "lg:col-span-7 lg:col-start-6"
              : "lg:col-span-7 lg:col-start-1";

            const textColSpan = isTall
              ? isReversed
                ? "lg:col-span-7 lg:col-start-1"
                : "lg:col-span-7 lg:col-start-6"
              : isReversed
              ? "lg:col-span-5 lg:col-start-1"
              : "lg:col-span-5 lg:col-start-8";

            return (
              <div
                key={project.id}
                ref={addToRows}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                  isReversed ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Image Column - Animates from Left or Right */}
                <div className={imageColSpan}>
                  <div className="gsap-img-container">
                    <Link
                      href={`/projects/${project.slug}`}
                      className={`group block relative overflow-hidden bg-[#D8D2C7] shadow-xl ${
                        isTall ? "max-w-md mx-auto" : "w-full"
                      }`}
                    >
                      <div
                        className={`relative w-full overflow-hidden ${
                          isTall ? "aspect-[3/4] max-h-[500px]" : "aspect-[16/10]"
                        }`}
                      >
                        <div className="gsap-img-inner relative w-full h-full">
                          <Image
                            src={project.heroImage}
                            alt={`${project.title} - ${project.location}`}
                            fill
                            sizes={
                              isTall
                                ? "(max-width: 1024px) 100vw, 40vw"
                                : "(max-width: 1024px) 100vw, 60vw"
                            }
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                        </div>
                        <div className="absolute inset-0 bg-[#242421]/10 group-hover:bg-transparent transition-colors duration-500" />
                      </div>

                      {/* Floating Project Tag */}
                      <div className="absolute top-4 left-4 z-10 bg-[#FAF9F6]/90 backdrop-blur-xs px-3 py-1 text-[10px] uppercase tracking-widest text-[#242421] border border-[#FAF9F6]/40 shadow-xs">
                        {project.location}
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Text Content Column */}
                <div className={textColSpan}>
                  <div className="space-y-6">
                    <div className="gsap-text-item flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-[#777B60]">
                      <span>0{index + 1}</span>
                      <span className="w-6 h-[1px] bg-[#D8D2C7]" />
                      <span>{project.category}</span>
                    </div>

                    <h3 className="gsap-text-item font-editorial text-3xl sm:text-4xl md:text-5xl text-[#242421] leading-tight font-normal">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="hover:text-[#777B60] transition-colors"
                      >
                        {project.title}
                      </Link>
                    </h3>

                    <p className="gsap-text-item text-sm md:text-base text-[#5E5D57] font-light leading-relaxed">
                      {project.description}
                    </p>

                    <div className="gsap-text-item pt-2">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-medium text-[#242421] hover:text-[#777B60] transition-colors border-b border-[#242421] hover:border-[#777B60] pb-1"
                      >
                        <span>View Project Series</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Projects link */}
        <div ref={footerRef} className="mt-24 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#242421] text-[#FAF9F6] text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#343430] transition-colors shadow-lg"
          >
            <span>Explore Full Portfolio Archive</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
