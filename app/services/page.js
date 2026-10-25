import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "@/data/services";
import Reveal from "@/components/motion/Reveal";

import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/siteConfig";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata = {
  title: siteConfig.pages.services.title,
  description: siteConfig.pages.services.description,
  alternates: {
    canonical: `${siteConfig.siteUrl}/services`,
  },
  openGraph: {
    title: `${siteConfig.pages.services.title} | ${siteConfig.name}`,
    description: siteConfig.pages.services.description,
    url: `${siteConfig.siteUrl}/services`,
    type: "website",
    images: [
      {
        url: siteConfig.defaultOgImage,
        width: 1200,
        height: 630,
        alt: "Pali Photography services and offerings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.pages.services.title} | ${siteConfig.name}`,
    description: siteConfig.pages.services.description,
    images: [siteConfig.defaultOgImage],
  },
};

export default function ServicesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ]);

  const steps = [
    {
      step: "01",
      title: "Initial Dialogue & Vision",
      description:
        "We begin with a conversation to understand the essence of your love story, celebration timeline, and aesthetic preferences so you feel completely at ease.",
    },
    {
      step: "02",
      title: "Creative Planning & Locations",
      description:
        "We explore scenic outdoor backdrops, golden hour light timings, and personal details to create an effortless, relaxed experience.",
    },
    {
      step: "03",
      title: "The Celebration & Shoot",
      description:
        "A warm, enjoyable, and unobtrusive experience. You relax, laugh, and celebrate together, while we document authentic emotions as they unfold.",
    },
    {
      step: "04",
      title: "Online Gallery & Master Editing",
      description:
        "Every photograph goes through meticulous editing and color grading, presented in an elegant private online gallery for your loved ones to relive.",
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="pt-32 pb-24 md:pt-40 md:pb-36 bg-[#F5F2EB] text-[#242421]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-28 md:space-y-36">
          {/* Header */}
          <div className="max-w-3xl">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.28em] text-[#777B60] block mb-3">
                Services &amp; Offerings
              </span>
              <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-[#242421] font-light leading-[1.05]">
                Commissions &amp; Collections
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-base md:text-lg text-[#5E5D57] font-light leading-relaxed">
                Every love story deserves a beautiful frame. Whether documenting an emotional wedding day,
                a playful pre-wedding session, or fine art landscapes, we bring warm, timeless storytelling
                to every frame.
              </p>
            </Reveal>
          </div>

          {/* Detailed Services Breakdown */}
          <div className="space-y-24">
            {services.map((service, index) => {
              const isReversed = index % 2 !== 0;

              return (
                <div
                  key={service.id}
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
                      <Reveal delay={0.1}>
                        <div className="relative aspect-[4/5] bg-[#D8D2C7] overflow-hidden">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            className="object-cover object-center hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      </Reveal>
                    </div>

                    {/* Content Column (7 cols) */}
                    <div
                      className={`lg:col-span-7 space-y-6 ${
                        isReversed ? "lg:col-start-1" : "lg:col-start-6"
                      }`}
                    >
                      <Reveal delay={0.2}>
                        <span className="text-xs uppercase tracking-[0.25em] text-[#777B60] block">
                          0{index + 1} • {service.pricingGuide}
                        </span>
                        <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#242421] font-light mt-2">
                          {service.title}
                        </h2>
                        <p className="font-editorial text-xl text-[#777B60] italic mt-1 font-light">
                          {service.subtitle}
                        </p>
                      </Reveal>

                      <Reveal delay={0.3}>
                        <p className="text-sm md:text-base text-[#5E5D57] font-light leading-relaxed">
                          {service.description}
                        </p>
                      </Reveal>

                      {/* Deliverables Checklist */}
                      <Reveal delay={0.4}>
                        <div className="pt-2 border-t border-[#D8D2C7]/60 space-y-3">
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
                      </Reveal>

                      {/* Ideal For and Inquire CTA */}
                      <Reveal delay={0.5}>
                        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#D8D2C7]/60">
                          <div className="text-xs text-[#5E5D57] font-light">
                            <span className="text-[#777B60] uppercase tracking-wider block text-[10px]">
                              Ideal For:
                            </span>
                            <span>{service.idealFor}</span>
                          </div>

                          <Link
                            href={`/contact?service=${encodeURIComponent(service.title)}`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#242421] text-[#FAF9F6] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#343430] transition-colors"
                          >
                            <span>Book This Session</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </Reveal>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Working Process / Methodology */}
          <section className="border-t border-[#D8D2C7] pt-20">
            <Reveal>
              <div className="max-w-2xl mb-16">
                <span className="text-xs uppercase tracking-[0.28em] text-[#777B60] block mb-2">
                  The Journey
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#242421] font-light">
                  How Every Story is Handled
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((item, index) => (
                <div
                  key={index}
                  className="space-y-3 p-6 bg-[#FAF9F6] border border-[#D8D2C7]"
                >
                  <Reveal delay={index * 0.1}>
                    <span className="font-mono text-xs text-[#777B60] uppercase tracking-widest block">
                      {item.step}
                    </span>
                    <h3 className="font-editorial text-xl text-[#242421] font-normal">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#5E5D57] font-light leading-relaxed">
                      {item.description}
                    </p>
                  </Reveal>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Consultation Banner */}
          <section className="bg-[#FAF9F6] border border-[#D8D2C7] p-10 md:p-16 text-center space-y-6">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.25em] text-[#777B60] block">
                Let&apos;s Connect
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-light max-w-xl mx-auto text-[#242421]">
                Unveiling love through the lens of eternity.
              </h2>
              <p className="text-sm text-[#5E5D57] max-w-md mx-auto font-light leading-relaxed">
                Contact us to check availability for your date and discuss creative possibilities.
              </p>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#242421] text-[#FAF9F6] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#343430] transition-colors"
                >
                  <span>Check Availability</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </section>
        </div>
      </div>
    </>
  );
}
