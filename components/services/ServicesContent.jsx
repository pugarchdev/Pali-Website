"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ServicesContent({ services, steps }) {
  const containerRef = useRef(null);
  const rowsRef = useRef([]);
  rowsRef.current = [];
  const addToRows = (el) => {
    if (el && !rowsRef.current.includes(el)) {
      rowsRef.current.push(el);
    }
  };

  const stepsHeaderRef = useRef(null);
  const stepsContainerRef = useRef(null);
  const bannerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // 1. Bi-directional Animations for Detailed Service Rows
      rowsRef.current.forEach((row, index) => {
        if (!row) return;

        const isReversed = index % 2 !== 0;
        const imgMain = row.querySelector(".gsap-service-img-main");
        const imgSecondary = row.querySelector(".gsap-service-img-sec");
        const textItems = row.querySelectorAll(".gsap-service-text-item");

        const xOffset = isReversed ? 80 : -80;

        // Master bi-directional timeline for each service row
        const rowTl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
            end: "bottom 18%",
            toggleActions: "play reverse play reverse",
          },
        });

        // Main Image entrance
        if (imgMain) {
          rowTl.fromTo(
            imgMain,
            {
              opacity: 0,
              x: xOffset,
              scale: 0.94,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 1.1,
              ease: "power3.out",
            },
            0
          );
        }

        // Secondary Layered Image entrance
        if (imgSecondary) {
          rowTl.fromTo(
            imgSecondary,
            {
              opacity: 0,
              scale: 0.85,
              y: 25,
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
            },
            0.15
          );
        }

        // Text Items Staggered entrance from opposite side
        if (textItems.length > 0) {
          rowTl.fromTo(
            textItems,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.06,
              ease: "power3.out",
            },
            0.1
          );
        }
      });

      // 2. Bi-directional Animation for The Journey / Process Section Header
      if (stepsHeaderRef.current) {
        gsap.fromTo(
          stepsHeaderRef.current.querySelectorAll(".gsap-process-header"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stepsHeaderRef.current,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // 3. Bi-directional Staggered Cards for The 4 Process Steps
      if (stepsContainerRef.current) {
        gsap.fromTo(
          stepsContainerRef.current.querySelectorAll(".gsap-step-card"),
          { opacity: 0, y: 35, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stepsContainerRef.current,
              start: "top 80%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // 4. Bi-directional Animation for Bottom Consultation Banner
      if (bannerRef.current) {
        gsap.fromTo(
          bannerRef.current.querySelectorAll(".gsap-banner-item"),
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bannerRef.current,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pb-24 md:pb-36 bg-[#F5F2EB] text-[#242421]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-28 md:space-y-36">
        {/* Detailed Services Breakdown */}
        <div className="space-y-24">
          {services.map((service, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={service.id}
                ref={addToRows}
                id={service.slug}
                className="border-t border-[#D8D2C7] pt-16"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                    isReversed ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  {/* Image Column (5 cols) */}
                  <div
                    className={`lg:col-span-5 ${
                      isReversed ? "lg:col-start-8" : "lg:col-start-1"
                    }`}
                  >
                    <div className="relative">
                      <div className="gsap-service-img-main relative aspect-[4/5] bg-[#D8D2C7] overflow-hidden shadow-lg">
                        <Image
                          src={service.images?.primary || service.image}
                          alt={service.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover object-center hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      {service.images?.secondary && (
                        <div className="gsap-service-img-sec absolute -bottom-6 -right-4 w-[55%] aspect-[4/3] bg-[#242421] border-2 border-[#FAF9F6] shadow-2xl overflow-hidden hidden sm:block">
                          <Image
                            src={service.images.secondary}
                            alt={`${service.title} secondary angle`}
                            fill
                            sizes="20vw"
                            className="object-cover object-center"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content Column (7 cols) */}
                  <div
                    className={`lg:col-span-7 space-y-6 ${
                      isReversed ? "lg:col-start-1" : "lg:col-start-6"
                    }`}
                  >
                    <div className="gsap-service-text-item space-y-2">
                      <span className="text-xs uppercase tracking-[0.25em] text-[#777B60] block">
                        0{index + 1} • {service.pricingGuide}
                      </span>
                      <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#242421] font-light">
                        {service.title}
                      </h2>
                      <p className="font-editorial text-xl text-[#777B60] italic font-light pt-1">
                        {service.subtitle}
                      </p>
                    </div>

                    <div className="gsap-service-text-item">
                      <p className="text-sm md:text-base text-[#5E5D57] font-light leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Specializations & Subservices Grid */}
                    {service.subservices && (
                      <div className="gsap-service-text-item pt-2">
                        <span className="text-[11px] uppercase tracking-widest text-[#777B60] block font-medium mb-2">
                          Included Specializations
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {service.subservices.map((sub, sIdx) => (
                            <span
                              key={sIdx}
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF9F6] border border-[#D8D2C7] text-xs text-[#242421] font-light"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#777B60]" />
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Deliverables Checklist */}
                    <div className="gsap-service-text-item pt-2 border-t border-[#D8D2C7]/60 space-y-3">
                      <span className="text-[11px] uppercase tracking-widest text-[#777B60] block font-medium">
                        What&apos;s Included in Your Experience
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#242421]">
                        {service.deliverables.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[#303B32] mt-0.5 shrink-0" />
                            <span className="font-light">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Ideal For and Inquire CTA */}
                    <div className="gsap-service-text-item pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#D8D2C7]/60">
                      <div className="text-xs text-[#5E5D57] font-light">
                        <span className="text-[#777B60] uppercase tracking-wider block text-[10px]">
                          Ideal For:
                        </span>
                        <span>{service.idealFor}</span>
                      </div>

                      <Link
                        href={`/contact?service=${encodeURIComponent(service.title)}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#242421] text-[#FAF9F6] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#343430] transition-colors shadow-md"
                      >
                        <span>Book This Session</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Working Process / Methodology */}
        <section className="border-t border-[#D8D2C7] pt-20">
          <div ref={stepsHeaderRef} className="max-w-2xl mb-16 space-y-2">
            <span className="gsap-process-header text-xs uppercase tracking-[0.28em] text-[#777B60] block">
              The Journey
            </span>
            <h2 className="gsap-process-header font-editorial text-3xl sm:text-4xl md:text-5xl text-[#242421] font-light">
              How Every Story is Handled
            </h2>
          </div>

          <div ref={stepsContainerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <div
                key={index}
                className="gsap-step-card space-y-3 p-6 bg-[#FAF9F6] border border-[#D8D2C7] shadow-xs"
              >
                <span className="font-mono text-xs text-[#777B60] uppercase tracking-widest block">
                  {item.step}
                </span>
                <h3 className="font-editorial text-xl text-[#242421] font-normal">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5E5D57] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Consultation Banner */}
        <section
          ref={bannerRef}
          className="bg-[#FAF9F6] border border-[#D8D2C7] p-10 md:p-16 text-center space-y-6 shadow-xs"
        >
          <span className="gsap-banner-item text-xs uppercase tracking-[0.25em] text-[#777B60] block">
            Let&apos;s Connect
          </span>
          <h2 className="gsap-banner-item font-editorial text-3xl sm:text-4xl md:text-5xl font-light max-w-xl mx-auto text-[#242421]">
            Unveiling love through the lens of eternity.
          </h2>
          <p className="gsap-banner-item text-sm text-[#5E5D57] max-w-md mx-auto font-light leading-relaxed">
            Contact us to check availability for your date and discuss creative possibilities.
          </p>
          <div className="gsap-banner-item pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#242421] text-[#FAF9F6] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#343430] transition-colors shadow-md"
            >
              <span>Check Availability</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

