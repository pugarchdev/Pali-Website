"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import {
  RotateCcw,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Compass,
  Layers,
  Sparkles,
  Aperture,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioCategories, allPortfolioItems } from "@/data/portfolio";
import PortfolioLightbox from "./PortfolioLightbox";

export default function Portfolio3DCarousel() {
  const [activeCategory, setActiveCategory] = useState("All Collections");
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const cylinderRef = useRef(null);
  const cardRefs = useRef([]);
  cardRefs.current = [];
  const addToCardRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  // Rotation physics & drag tracking refs
  const rotationRef = useRef(0);
  const targetRotationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const autoRotateTimerRef = useRef(null);
  const rafIdRef = useRef(null);

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    let items = allPortfolioItems;
    if (activeCategory !== "All Collections") {
      items = allPortfolioItems.filter(
        (item) => item.portfolioCategory === activeCategory
      );
    }
    // Cap at 10 items for a clean, spacious 360-degree circle
    return items.slice(0, 10);
  }, [activeCategory]);

  const totalItems = filteredItems.length;
  const angleStep = totalItems > 0 ? 360 / totalItems : 36;

  // Responsive radius calculation
  const getRadius = useCallback(() => {
    if (typeof window === "undefined") return 480;
    const width = window.innerWidth;
    if (width < 640) return 270;
    if (width < 1024) return 380;
    return 480;
  }, []);

  const [radius, setRadius] = useState(480);

  useEffect(() => {
    const updateRadius = () => {
      setRadius(getRadius());
    };
    updateRadius();
    window.addEventListener("resize", updateRadius, { passive: true });
    return () => window.removeEventListener("resize", updateRadius);
  }, [getRadius]);

  // Normalize angle between -180 and 180 degrees
  const normalizeAngle = (angle) => {
    return ((((angle + 180) % 360) + 360) % 360) - 180;
  };

  // Apply real-time 3D rotation and atmospheric lighting
  const updateCarouselTransform = useCallback(() => {
    if (!cylinderRef.current) return;

    const currentRot = rotationRef.current;
    cylinderRef.current.style.transform = `rotateY(${currentRot}deg)`;

    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const cardBaseAngle = idx * angleStep;
      const relAngle = normalizeAngle(cardBaseAngle + currentRot);
      const absDist = Math.abs(relAngle);

      // Atmospheric museum-lighting modulation based on depth angle
      const depthFactor = Math.cos((relAngle * Math.PI) / 180);
      const isFront = absDist < angleStep * 0.75;

      if (!card.dataset.hovered) {
        if (isFront) {
          card.style.opacity = "1";
          card.style.filter = "brightness(1) contrast(1.05)";
          card.style.zIndex = "30";
        } else if (absDist < 90) {
          card.style.opacity = `${0.65 + depthFactor * 0.35}`;
          card.style.filter = `brightness(${0.6 + depthFactor * 0.4}) contrast(1.02)`;
          card.style.zIndex = "20";
        } else {
          card.style.opacity = `${Math.max(0.25, 0.5 + depthFactor * 0.3)}`;
          card.style.filter = "brightness(0.45) contrast(0.98)";
          card.style.zIndex = "10";
        }
      }
    });
  }, [angleStep]);

  // Main 60fps Animation Loop (GSAP Momentum + Continuous Auto Orbit)
  useEffect(() => {
    const animate = () => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!isDraggingRef.current && isAutoRotating && !prefersReducedMotion) {
        // Continuous gentle auto-orbit
        rotationRef.current -= 0.12;
      }

      updateCarouselTransform();
      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isAutoRotating, updateCarouselTransform]);

  // --- MOUSE & TOUCH INTERACTION (DRAG TO ROTATE 360°) ---
  const handlePointerDown = (e) => {
    if (e.target.closest("button") && !e.target.closest(".gsap-card-trigger")) {
      return;
    }

    isDraggingRef.current = true;
    dragDistanceRef.current = 0;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;

    // Pause auto-orbit during user physical contact
    if (autoRotateTimerRef.current) clearTimeout(autoRotateTimerRef.current);
    gsap.killTweensOf(rotationRef);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;

    const currentX = e.clientX;
    const deltaX = currentX - lastXRef.current;
    dragDistanceRef.current += Math.abs(deltaX);

    const currentTime = performance.now();
    const timeDelta = currentTime - lastTimeRef.current;

    if (timeDelta > 0) {
      velocityRef.current = deltaX / timeDelta;
    }

    const sensitivity = window.innerWidth < 640 ? 0.45 : 0.35;
    rotationRef.current += deltaX * sensitivity;

    lastXRef.current = currentX;
    lastTimeRef.current = currentTime;
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    // Momentum physics release
    const momentumVelocity = velocityRef.current;
    if (Math.abs(momentumVelocity) > 0.08) {
      const throwDistance = momentumVelocity * 220;
      gsap.to(rotationRef, {
        current: rotationRef.current + throwDistance,
        duration: 1.2,
        ease: "power3.out",
        onUpdate: updateCarouselTransform,
      });
    }

    // Resume auto-rotation after 3.5s idle ONLY if user had enabled it
    if (isAutoRotating) {
      if (autoRotateTimerRef.current) clearTimeout(autoRotateTimerRef.current);
      autoRotateTimerRef.current = setTimeout(() => {
        setIsAutoRotating(true);
      }, 3500);
    }
  };

  // Previous & Next Stepper Controls
  const handleStep = (direction) => {
    if (autoRotateTimerRef.current) clearTimeout(autoRotateTimerRef.current);

    gsap.killTweensOf(rotationRef);
    const targetAngle =
      direction === "next"
        ? rotationRef.current - angleStep
        : rotationRef.current + angleStep;

    gsap.to(rotationRef, {
      current: targetAngle,
      duration: 0.85,
      ease: "power3.out",
      onUpdate: updateCarouselTransform,
    });
  };

  // Card Hover: 3D scale and forward depth lift
  const handleCardMouseEnter = (index, cardEl) => {
    if (isDraggingRef.current || !cardEl) return;
    cardEl.dataset.hovered = "true";

    gsap.to(cardEl, {
      scale: 1.08,
      y: -10,
      duration: 0.4,
      ease: "power3.out",
      boxShadow: "0 35px 80px -15px rgba(0,0,0,0.9)",
      overwrite: "auto",
    });

    // Dim neighboring cards slightly to spotlight focused image
    cardRefs.current.forEach((c, idx) => {
      if (c && idx !== index) {
        gsap.to(c, {
          opacity: 0.3,
          duration: 0.35,
          overwrite: "auto",
        });
      }
    });
  };

  const handleCardMouseLeave = (cardEl) => {
    if (!cardEl) return;
    delete cardEl.dataset.hovered;

    gsap.to(cardEl, {
      scale: 1,
      y: 0,
      duration: 0.45,
      ease: "power2.out",
      boxShadow: "0 25px 60px -15px rgba(0,0,0,0.75)",
      overwrite: "auto",
      onComplete: updateCarouselTransform,
    });

    cardRefs.current.forEach((c) => {
      if (c && c !== cardEl) {
        c.style.opacity = "";
      }
    });
    updateCarouselTransform();
  };

  // Card Click: Open Lightbox (guarded against drag swipes)
  const handleCardClick = (index) => {
    if (dragDistanceRef.current > 6) return;
    setLightboxIndex(index);
  };

  // Category change with 3D transition
  const handleCategorySwitch = (newCat) => {
    if (newCat === activeCategory) return;

    if (autoRotateTimerRef.current) clearTimeout(autoRotateTimerRef.current);
    setIsAutoRotating(false);

    // Animate outgoing cards outwards and fade
    gsap.to(cardRefs.current, {
      opacity: 0,
      scale: 0.7,
      duration: 0.35,
      stagger: 0.02,
      ease: "power2.in",
      onComplete: () => {
        setActiveCategory(newCat);
        rotationRef.current = 0;
        cardRefs.current = [];
      },
    });
  };

  // Re-animate incoming cards on category change
  useEffect(() => {
    if (!cardRefs.current.length) return;

    gsap.fromTo(
      cardRefs.current,
      {
        opacity: 0,
        scale: 0.6,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.75,
        stagger: 0.04,
        ease: "power3.out",
        onComplete: () => {
          updateCarouselTransform();
          setIsAutoRotating(true);
        },
      }
    );
  }, [filteredItems, updateCarouselTransform]);

  // GSAP Bi-directional Section Reveal with ScrollTrigger
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Text Header Split Reveal
      masterTl.fromTo(
        containerRef.current.querySelectorAll(".gsap-portfolio-header"),
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.1, ease: "power3.out" },
        0
      );

      // Category Tabs Entrance
      masterTl.fromTo(
        containerRef.current.querySelectorAll(".gsap-portfolio-tab"),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power2.out" },
        0.2
      );

      // 3D Carousel Cylinder Staggered Entrance
      if (cylinderRef.current) {
        masterTl.fromTo(
          cylinderRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.1, ease: "power3.out" },
          0.3
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const activeLightboxItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div
      ref={containerRef}
      className="relative w-full py-16 md:py-24 text-[#FAF9F6] overflow-hidden select-none"
    >
      {/* Editorial Header & Category Filters */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 md:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#FAF9F6]/10 pb-8 gap-6">
          <div className="space-y-3">
            <div className="gsap-portfolio-header flex items-center gap-2.5 text-xs uppercase tracking-[0.28em] text-[#777B60]">
              <Compass className="w-3.5 h-3.5 text-[#777B60]" />
              <span>360° Circular Photography Exhibition</span>
            </div>
            <h2 className="gsap-portfolio-header font-editorial text-4xl sm:text-5xl md:text-6xl font-light text-[#FAF9F6] leading-[1.08]">
              Selected Photographic Plates
            </h2>
          </div>

          <p className="gsap-portfolio-header text-sm text-[#D8D2C7]/80 max-w-md font-light leading-relaxed">
            Drag or swipe across the 3D gallery to explore Vivek Pali&apos;s photographic archive.
            Click any plate for an intimate full-frame view.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {portfolioCategories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySwitch(cat)}
                className={`gsap-portfolio-tab px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 focus:outline-none ${
                  isActive
                    ? "bg-[#FAF9F6] text-[#242421] shadow-lg"
                    : "bg-[#242421]/80 text-[#D8D2C7] border border-[#FAF9F6]/15 hover:text-[#FAF9F6] hover:bg-[#FAF9F6]/10"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D 360-DEGREE CIRCULAR GALLERY STAGE */}
      <div
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full h-[520px] sm:h-[580px] md:h-[660px] flex items-center justify-center cursor-grab active:cursor-grabbing [perspective:1600px] sm:[perspective:1800px] overflow-hidden"
        style={{ perspectiveOrigin: "50% 46%" }}
        aria-label="3D 360-degree photography carousel"
      >
        {/* Ambient Gallery Floor Glow */}
        <div className="absolute inset-0 bg-radial from-[#FAF9F6]/5 via-transparent to-transparent pointer-events-none" />

        {/* Central Rotating 3D Cylinder Ring */}
        <div
          ref={cylinderRef}
          className="relative w-0 h-0 [transform-style:preserve-3d] will-change-transform"
        >
          {filteredItems.map((item, idx) => {
            const itemAngle = idx * angleStep;

            return (
              <div
                key={item.id}
                ref={addToCardRefs}
                onClick={() => handleCardClick(idx)}
                onMouseEnter={(e) => handleCardMouseEnter(idx, e.currentTarget)}
                onMouseLeave={(e) => handleCardMouseLeave(e.currentTarget)}
                className="gsap-card-trigger absolute top-1/2 left-1/2 w-[200px] sm:w-[240px] md:w-[270px] aspect-[3/4] -ml-[100px] sm:-ml-[120px] md:-ml-[135px] -mt-[135px] sm:-mt-[160px] md:-mt-[180px] bg-[#1c1c1a] border border-[#FAF9F6]/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] overflow-hidden [transform-style:preserve-3d] transition-[box-shadow] duration-500 cursor-pointer group"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                }}
              >
                {/* Image Surface with Subtle Grain Vignette */}
                <div className="relative w-full h-full">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 200px, 270px"
                    className="object-cover object-center filter brightness-[0.92] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                    priority={idx < 4}
                  />

                  {/* Soft Editorial Ambient Lighting Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1a] via-transparent to-[#1c1c1a]/20 pointer-events-none" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#1c1c1a]/85 backdrop-blur-xs text-[9px] font-mono uppercase tracking-widest text-[#777B60] border border-[#FAF9F6]/10">
                    Plate 0{idx + 1}
                  </div>

                  {/* Bottom Metadata Plate */}
                  <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 bg-[#1c1c1a]/90 backdrop-blur-md border-t border-[#FAF9F6]/10 flex items-center justify-between pointer-events-none">
                    <div className="overflow-hidden pr-2">
                      <span className="text-[9px] uppercase tracking-wider text-[#777B60] block truncate">
                        {item.category}
                      </span>
                      <h4 className="font-editorial text-xs sm:text-sm text-[#FAF9F6] font-light truncate">
                        {item.title}
                      </h4>
                    </div>

                    <span className="shrink-0 p-1.5 bg-[#FAF9F6]/10 text-[#FAF9F6] rounded-none group-hover:bg-[#FAF9F6] group-hover:text-[#242421] transition-colors">
                      <Maximize2 className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Orbit Floor Marker Ring */}
        <div
          className="absolute bottom-6 w-[340px] sm:w-[500px] md:w-[680px] h-[340px] sm:h-[500px] md:h-[680px] rounded-full border border-[#FAF9F6]/10 pointer-events-none -z-10 [transform:rotateX(75deg)]"
          style={{
            background:
              "radial-gradient(circle, rgba(119,123,96,0.06) 0%, rgba(28,28,26,0) 70%)",
          }}
        />
      </div>

      {/* INTERACTIVE CONTROLS BAR */}
      <div className="max-w-4xl mx-auto px-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#FAF9F6]/10 pt-6">
        {/* Left: Steady Editorial Instructions */}
        <div className="text-center sm:text-left space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] uppercase font-mono tracking-[0.25em] text-[#777B60]">
            <Aperture className="w-3.5 h-3.5 text-[#777B60]" />
            <span>Interactive 3D Exhibition</span>
          </div>
          <p className="text-xs text-[#D8D2C7]/80 font-light">
            Drag or swipe to rotate 360° • Click any plate to view full screen
          </p>
        </div>

        {/* Center/Right: Stepper Navigation & Auto-Orbit Toggle */}
        <div className="flex items-center gap-3">
          {/* Previous Stepper Button */}
          <button
            onClick={() => handleStep("prev")}
            aria-label="Previous photograph in carousel"
            className="p-3 bg-[#242421] border border-[#FAF9F6]/15 hover:border-[#FAF9F6]/40 text-[#FAF9F6] transition-all hover:bg-[#FAF9F6]/10 focus:outline-none"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Auto Orbit Toggle */}
          <button
            onClick={() => setIsAutoRotating((prev) => !prev)}
            aria-label={isAutoRotating ? "Pause 360 auto orbit" : "Start 360 auto orbit"}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#242421] border border-[#FAF9F6]/15 hover:border-[#FAF9F6]/40 text-xs font-mono uppercase tracking-wider text-[#D8D2C7] transition-all hover:bg-[#FAF9F6]/10 focus:outline-none"
          >
            {isAutoRotating ? (
              <>
                <Pause className="w-3 h-3 text-[#777B60]" />
                <span className="hidden sm:inline">Pause Orbit</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-[#FAF9F6]" />
                <span className="hidden sm:inline">Start Orbit</span>
              </>
            )}
          </button>

          {/* Next Stepper Button */}
          <button
            onClick={() => handleStep("next")}
            aria-label="Next photograph in carousel"
            className="p-3 bg-[#242421] border border-[#FAF9F6]/15 hover:border-[#FAF9F6]/40 text-[#FAF9F6] transition-all hover:bg-[#FAF9F6]/10 focus:outline-none"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {activeLightboxItem && (
        <PortfolioLightbox
          item={activeLightboxItem}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((prev) =>
              prev > 0 ? prev - 1 : filteredItems.length - 1
            )
          }
          onNext={() =>
            setLightboxIndex((prev) =>
              prev < filteredItems.length - 1 ? prev + 1 : 0
            )
          }
          hasPrev={filteredItems.length > 1}
          hasNext={filteredItems.length > 1}
        />
      )}
    </div>
  );
}

