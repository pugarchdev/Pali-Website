"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Sparkles, Check, ChevronRight, Aperture, Layers } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/services";

export default function ServicesPreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const isExpandedRef = useRef(false);
  const activeService = services[activeIndex] || services[0];

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const cardsStageRef = useRef(null);
  const primaryCardRef = useRef(null);
  const secondaryCardRef = useRef(null);
  const tertiaryCardRef = useRef(null);
  const bgImageRef = useRef(null);

  // Register ScrollTrigger safely
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  // GSAP Entrance & Scroll Parallax
  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Fallback simple reveal for reduced motion
        gsap.fromTo(
          [headerRef.current, contentRef.current, cardsStageRef.current],
          { opacity: 0 },
          { opacity: 1, duration: 0.6, stagger: 0.15 }
        );
        return;
      }

      // Header entrance animation with ScrollTrigger
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll(".gsap-header-elem"),
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
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

      // Parallax scroll on ambient background
      if (bgImageRef.current) {
        gsap.to(bgImageRef.current, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Subtle parallax movement on the 3D card stage
      if (cardsStageRef.current) {
        gsap.to(cardsStageRef.current, {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // Initialize default 3D perspective depth for card layers
      if (secondaryCardRef.current && primaryCardRef.current && tertiaryCardRef.current) {
        gsap.set(secondaryCardRef.current, {
          x: 0,
          y: 0,
          z: -40,
          rotationX: 0,
          rotationY: 0,
          rotationZ: -6,
          scale: 1,
          transformPerspective: 1400,
        });
        gsap.set(primaryCardRef.current, {
          x: 0,
          y: 0,
          z: 0,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          scale: 1,
          transformPerspective: 1400,
        });
        gsap.set(tertiaryCardRef.current, {
          x: 0,
          y: 0,
          z: 40,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 3,
          scale: 1,
          transformPerspective: 1400,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Responsive offsets for the 3D card opening fan-out
  const getResponsiveOffsets = useCallback(() => {
    if (typeof window === "undefined") {
      return { leftX: -96, rightX: 88, leftY: -14, rightY: 18 };
    }
    const width = window.innerWidth;
    if (width < 640) {
      return { leftX: -40, rightX: 38, leftY: -6, rightY: 8 };
    }
    if (width < 1024) {
      return { leftX: -65, rightX: 60, leftY: -10, rightY: 14 };
    }
    return { leftX: -96, rightX: 88, leftY: -14, rightY: 18 };
  }, []);

  // 3D Card Opening Expansion (Fan-out deck interaction)
  const expandDeck = useCallback(() => {
    if (!primaryCardRef.current || !secondaryCardRef.current || !tertiaryCardRef.current) return;
    isExpandedRef.current = true;
    setIsExpanded(true);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const { leftX, rightX, leftY, rightY } = getResponsiveOffsets();

    gsap.killTweensOf([primaryCardRef.current, secondaryCardRef.current, tertiaryCardRef.current]);

    if (prefersReducedMotion) {
      gsap.to(secondaryCardRef.current, { x: leftX, duration: 0.45, ease: "power2.out" });
      gsap.to(primaryCardRef.current, { scale: 1.02, duration: 0.45, ease: "power2.out" });
      gsap.to(tertiaryCardRef.current, { x: rightX, duration: 0.45, ease: "power2.out" });
      return;
    }

    // Secondary (Left) Card: slides smoothly to the left, revealing full image with 3D rotation
    gsap.to(secondaryCardRef.current, {
      x: leftX,
      y: leftY,
      z: 35,
      rotationX: 4,
      rotationY: 16,
      rotationZ: -12,
      scale: 1.04,
      filter: "brightness(0.96) contrast(1.05)",
      duration: 0.65,
      ease: "power3.out",
      overwrite: "auto",
    });

    // Primary (Center) Card: remains primary focus, elevates forward in Z and scales subtly
    gsap.to(primaryCardRef.current, {
      x: 0,
      y: -8,
      z: 85,
      rotationX: 2,
      rotationY: 0,
      rotationZ: 0,
      scale: 1.035,
      boxShadow: "0 35px 80px -15px rgba(0,0,0,0.88)",
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });

    // Tertiary (Right) Card: slides smoothly to the right, fully visible with complementary 3D rotation
    gsap.to(tertiaryCardRef.current, {
      x: rightX,
      y: rightY,
      z: 110,
      rotationX: -4,
      rotationY: -16,
      rotationZ: 9,
      scale: 1.06,
      filter: "brightness(1) contrast(1.05)",
      duration: 0.7,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, [getResponsiveOffsets]);

  // 3D Card Collapse (Reverses smoothly to default overlapping arrangement)
  const collapseDeck = useCallback(() => {
    if (!primaryCardRef.current || !secondaryCardRef.current || !tertiaryCardRef.current) return;
    isExpandedRef.current = false;
    setIsExpanded(false);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.killTweensOf([primaryCardRef.current, secondaryCardRef.current, tertiaryCardRef.current]);

    if (prefersReducedMotion) {
      gsap.to([secondaryCardRef.current, primaryCardRef.current, tertiaryCardRef.current], {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.45,
        ease: "power2.out",
      });
      return;
    }

    // Return Left Card to elegant overlapping background position
    gsap.to(secondaryCardRef.current, {
      x: 0,
      y: 0,
      z: -40,
      rotationX: 0,
      rotationY: 0,
      rotationZ: -6,
      scale: 1,
      filter: "brightness(0.75) contrast(1.08)",
      duration: 0.65,
      ease: "power3.out",
      overwrite: "auto",
    });

    // Return Center Card to default position
    gsap.to(primaryCardRef.current, {
      x: 0,
      y: 0,
      z: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      scale: 1,
      boxShadow: "0 25px 60px -15px rgba(0,0,0,0.7)",
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });

    // Return Right Card to elegant overlapping accent position
    gsap.to(tertiaryCardRef.current, {
      x: 0,
      y: 0,
      z: 40,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 3,
      scale: 1,
      filter: "brightness(0.85) contrast(1.06)",
      duration: 0.65,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, []);

  // Category change transition
  const handleCategoryChange = useCallback(
    (newIndex) => {
      if (newIndex === activeIndex) return;

      if (isExpandedRef.current) {
        collapseDeck();
      }

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion || !contentRef.current) {
        setActiveIndex(newIndex);
        return;
      }

      // Smoothly animate out current text items and card
      const items = contentRef.current.querySelectorAll(".gsap-anim-item");
      const tl = gsap.timeline({
        onComplete: () => {
          setActiveIndex(newIndex);
        },
      });

      tl.to(items, {
        opacity: 0,
        y: -12,
        duration: 0.22,
        stagger: 0.02,
        ease: "power2.in",
      });

      if (primaryCardRef.current) {
        tl.to(
          primaryCardRef.current,
          {
            opacity: 0,
            scale: 0.95,
            duration: 0.2,
            ease: "power2.in",
          },
          0
        );
      }
    },
    [activeIndex, collapseDeck]
  );

  // Animate in newly activated content
  useEffect(() => {
    if (typeof window === "undefined" || !contentRef.current) return;

    // Guarantee that parent container is ALWAYS fully visible
    gsap.set(contentRef.current, { opacity: 1, y: 0, scale: 1, clearProps: "all" });

    const items = contentRef.current.querySelectorAll(".gsap-anim-item");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(items, { opacity: 1, y: 0, clearProps: "all" });
      return;
    }

    // Animate in the text items with clearProps to avoid stuck inline opacity
    gsap.fromTo(
      items,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.05,
        ease: "power3.out",
        clearProps: "all",
      }
    );

    if (primaryCardRef.current) {
      gsap.fromTo(
        primaryCardRef.current,
        {
          opacity: 0,
          scale: 0.94,
          rotateY: -8,
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.75,
          ease: "power3.out",
          clearProps: "clipPath",
        }
      );
    }

    if (secondaryCardRef.current) {
      gsap.fromTo(
        secondaryCardRef.current,
        { opacity: 0, x: -30, scale: 0.88 },
        { opacity: 1, x: 0, scale: 1, duration: 0.8, delay: 0.1, ease: "power3.out" }
      );
    }

    if (tertiaryCardRef.current) {
      gsap.fromTo(
        tertiaryCardRef.current,
        { opacity: 0, y: 30, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: 0.18, ease: "power3.out" }
      );
    }
  }, [activeIndex]);

  // Interactive 3D tilt & fan-out hover handlers
  const handleStageMouseEnter = () => {
    expandDeck();
  };

  const handleStageMouseMove = (e) => {
    if (
      !cardsStageRef.current ||
      !primaryCardRef.current ||
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    if (!isExpandedRef.current) {
      expandDeck();
    }

    const rect = cardsStageRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    const tiltX = -py * 7;
    const tiltY = px * 9;

    const { leftX, rightX, leftY, rightY } = getResponsiveOffsets();

    gsap.to(secondaryCardRef.current, {
      x: leftX + px * 14,
      y: leftY + py * 10,
      rotationX: 4 + tiltX * 0.7,
      rotationY: 16 + tiltY * 0.7,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });

    gsap.to(primaryCardRef.current, {
      x: px * 10,
      y: -8 + py * 10,
      rotationX: 2 + tiltX,
      rotationY: tiltY,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });

    gsap.to(tertiaryCardRef.current, {
      x: rightX + px * 14,
      y: rightY + py * 12,
      rotationX: -4 + tiltX * 1.1,
      rotationY: -16 + tiltY * 1.1,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleStageMouseLeave = () => {
    collapseDeck();
  };

  const handleStageClick = () => {
    if (isExpandedRef.current) {
      collapseDeck();
    } else {
      expandDeck();
    }
  };

  const handleStageKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (isExpandedRef.current) {
        collapseDeck();
      } else {
        expandDeck();
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-28 md:py-40 bg-[#1c1c1a] text-[#FAF9F6] overflow-hidden border-t border-[#343430]"
      aria-label="Photography Services & Commissions"
    >
      {/* Ambient Cinematic Photographic Background with Subtle Parallax */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15">
        <div ref={bgImageRef} className="relative w-full h-[120%] -top-[10%]">
          <Image
            src={activeService.images?.primary || activeService.image}
            alt="Atmospheric backdrop texture"
            fill
            sizes="100vw"
            className="object-cover object-center filter blur-xl scale-110 grayscale"
          />
        </div>
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1a] via-[#1c1c1a]/80 to-[#1c1c1a]" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#1c1c1a]/50 to-[#1c1c1a]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-20 pb-8 border-b border-[#FAF9F6]/10"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="gsap-header-elem inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.28em] text-[#777B60]">
              <Sparkles className="w-3.5 h-3.5 text-[#777B60]" />
              <span>03 • Master Disciplines &amp; Offerings</span>
            </div>
            <h2 className="gsap-header-elem font-editorial text-4xl sm:text-5xl md:text-6xl text-[#FAF9F6] font-light leading-[1.08]">
              Photography Services
            </h2>
          </div>
          <p className="gsap-header-elem mt-4 lg:mt-0 text-sm md:text-base text-[#D8D2C7]/80 max-w-md font-light leading-relaxed">
            Documentary grace, raw emotion, and refined visual craft. Tailored photographic
            commissions for life&apos;s most defining milestones.
          </p>
        </div>

        {/* 3D Category Selector Bar */}
        <div className="mb-14 md:mb-20">
          <div
            role="tablist"
            aria-label="Service categories"
            className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 p-1.5 bg-[#242421]/90 backdrop-blur-md border border-[#FAF9F6]/10 rounded-none shadow-2xl"
          >
            {services.map((service, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={service.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`service-panel-${service.id}`}
                  onClick={() => handleCategoryChange(idx)}
                  className={`group relative text-left p-4 md:p-6 transition-all duration-500 focus:outline-none focus:ring-0 ${
                    isActive
                      ? "bg-[#FAF9F6] text-[#242421] shadow-xl"
                      : "bg-transparent text-[#D8D2C7] hover:text-[#FAF9F6] hover:bg-[#FAF9F6]/5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[11px] font-mono uppercase tracking-widest ${
                        isActive ? "text-[#777B60]" : "text-[#777B60]/80 group-hover:text-[#FAF9F6]"
                      }`}
                    >
                      {service.number}
                    </span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        isActive
                          ? "rotate-90 text-[#242421]"
                          : "text-[#777B60] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                      }`}
                    />
                  </div>
                  <h3
                    className={`font-editorial text-lg sm:text-xl md:text-2xl transition-colors ${
                      isActive ? "text-[#242421]" : "text-[#FAF9F6]"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`text-xs mt-1 font-light tracking-wide truncate ${
                      isActive ? "text-[#5E5D57]" : "text-[#D8D2C7]/60"
                    }`}
                  >
                    {service.subservices?.length || 0} Specializations Included
                  </p>

                  {/* Active bottom border accent */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#777B60]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Showcase Stage (Editorial Narrative + 3D Multi-Layer Photography) */}
        <div
          id={`service-panel-${activeService.id}`}
          role="tabpanel"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[620px]"
        >
          {/* Left Column: Editorial Content, Subservices Pill Grid & Deliverables (6 cols) */}
          <div ref={contentRef} className="lg:col-span-6 space-y-8">
            <div className="gsap-anim-item space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#777B60] block">
                {activeService.number} • {activeService.pricingGuide}
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#FAF9F6] font-light leading-[1.1]">
                {activeService.title}
              </h3>
              <p className="font-editorial text-xl text-[#D8D2C7] italic font-light pt-1">
                {activeService.subtitle}
              </p>
            </div>

            <div className="gsap-anim-item">
              <p className="text-sm md:text-base text-[#D8D2C7] font-light leading-relaxed max-w-xl">
                {activeService.description}
              </p>
            </div>

            {/* Specialization Subservices Pill Grid */}
            <div className="gsap-anim-item space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#777B60]">
                <Layers className="w-3.5 h-3.5 text-[#777B60]" />
                <span>Core Service Coverage</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {activeService.subservices?.map((sub, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#242421] border border-[#FAF9F6]/15 text-xs text-[#FAF9F6] font-light tracking-wide hover:border-[#FAF9F6]/40 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#777B60]" />
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div className="gsap-anim-item space-y-3 pt-2 border-t border-[#FAF9F6]/10">
              <span className="text-xs uppercase tracking-[0.22em] text-[#777B60] block">
                Signature Deliverables
              </span>
              <ul className="space-y-2">
                {activeService.deliverables?.slice(0, 3).map((item, dIdx) => (
                  <li
                    key={dIdx}
                    className="flex items-start gap-2.5 text-xs md:text-sm text-[#D8D2C7] font-light"
                  >
                    <Check className="w-4 h-4 text-[#777B60] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Links */}
            <div className="gsap-anim-item pt-4 flex flex-wrap items-center gap-5">
              <Link
                href={`/contact?service=${encodeURIComponent(activeService.title)}`}
                className="group inline-flex items-center gap-3 px-6 py-3.5 bg-[#FAF9F6] text-[#242421] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#F5F2EB] transition-all duration-300 shadow-lg"
              >
                <span>Discuss {activeService.title}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href={`/services#${activeService.slug}`}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#D8D2C7] hover:text-[#FAF9F6] border-b border-[#FAF9F6]/30 hover:border-[#FAF9F6] pb-1 transition-colors"
              >
                <span>Full Investment Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Layered 3D Multi-Image Showcase with Interactive Fan-Out Deck (6 cols) */}
          <div
            ref={cardsStageRef}
            tabIndex={0}
            role="region"
            aria-label="Interactive 3D photography composition - hover or tap to open gallery cards"
            aria-expanded={isExpanded}
            onMouseEnter={handleStageMouseEnter}
            onMouseMove={handleStageMouseMove}
            onMouseLeave={handleStageMouseLeave}
            onClick={handleStageClick}
            onKeyDown={handleStageKeyDown}
            onFocus={expandDeck}
            onBlur={collapseDeck}
            className="lg:col-span-6 relative w-full h-[460px] sm:h-[540px] md:h-[600px] flex items-center justify-center [perspective:1400px] [transform-style:preserve-3d] select-none cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#777B60]"
          >
            {/* Ambient Back Glow */}
            <div className="absolute inset-0 bg-radial from-[#FAF9F6]/5 to-transparent rounded-full filter blur-3xl pointer-events-none" />

            {/* Secondary Layer (Offset 3D Floating Background Card - Slides Left on Hover) */}
            <div
              ref={secondaryCardRef}
              className="absolute top-4 sm:top-8 left-2 sm:left-6 w-[58%] sm:w-[62%] aspect-[3/4] bg-[#242421] border border-[#FAF9F6]/15 shadow-2xl overflow-hidden [transform-style:preserve-3d] z-10 pointer-events-none block"
            >
              <div className="relative w-full h-full">
                <Image
                  src={activeService.images?.secondary || activeService.image}
                  alt={`${activeService.title} atmospheric moment`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="object-cover object-center filter hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1a]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 text-[10px] uppercase font-mono tracking-wider text-[#D8D2C7]/80">
                  Plate B • Secondary Angle
                </div>
              </div>
            </div>

            {/* Primary Hero 3D Card (Front & Center) */}
            <div
              ref={primaryCardRef}
              className="relative w-[85%] sm:w-[72%] aspect-[4/5] bg-[#242421] border border-[#FAF9F6]/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden [transform-style:preserve-3d] z-20 pointer-events-none"
            >
              <div className="relative w-full h-full group">
                <Image
                  src={activeService.images?.primary || activeService.image}
                  alt={activeService.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover object-center filter brightness-[0.92] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle vignette & editorial lighting */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1a] via-transparent to-[#1c1c1a]/30 pointer-events-none" />

                {/* Glassmorphic Metadata Overlay at Bottom */}
                <div className="absolute bottom-0 inset-x-0 p-5 md:p-6 bg-[#1c1c1a]/85 backdrop-blur-md border-t border-[#FAF9F6]/10 flex items-center justify-between pointer-events-none">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#777B60]">
                      <Aperture className="w-3.5 h-3.5" />
                      <span>{activeService.title}</span>
                    </div>
                    <p className="font-editorial text-sm md:text-base text-[#FAF9F6] mt-0.5 font-light">
                      {activeService.tagline}
                    </p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] font-mono text-[#777B60] block">SERIES</span>
                    <span className="text-xs font-mono text-[#D8D2C7]">{activeService.number} / 03</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tertiary Detail Floating Plate (Bottom Right Accent - Slides Right on Hover) */}
            <div
              ref={tertiaryCardRef}
              className="absolute bottom-4 sm:bottom-8 right-2 sm:right-6 w-[45%] sm:w-[38%] aspect-square bg-[#242421] border border-[#FAF9F6]/20 shadow-2xl overflow-hidden [transform-style:preserve-3d] z-30 pointer-events-none"
            >
              <div className="relative w-full h-full group">
                <Image
                  src={activeService.images?.tertiary || activeService.image}
                  alt={`${activeService.title} detail perspective`}
                  fill
                  sizes="(max-width: 1024px) 35vw, 20vw"
                  className="object-cover object-center filter group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1a]/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-2.5 right-2.5 px-2 py-1 bg-[#1c1c1a]/80 backdrop-blur-xs text-[9px] font-mono uppercase tracking-widest text-[#D8D2C7] border border-[#FAF9F6]/10">
                  Candid Detail
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Comprehensive Service Route Link */}
        <div className="mt-20 pt-8 border-t border-[#FAF9F6]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs uppercase tracking-[0.25em] text-[#777B60]">
            Looking for bespoke destination coverage or multi-day commissions?
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#D8D2C7] hover:text-[#FAF9F6] border-b border-[#FAF9F6]/30 hover:border-[#FAF9F6] pb-1 transition-colors"
          >
            <span>Review Full Services &amp; Investment Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
