import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import Reveal from "@/components/motion/Reveal";

export default function ServicesPreview() {
  return (
    <section className="py-24 md:py-36 bg-[#F5F2EB] text-[#242421]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 border-b border-[#D8D2C7] pb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#777B60] block mb-2">
              Commissions &amp; Offerings
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#242421] font-light">
              Photography Services
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-[#5E5D57] max-w-sm font-light">
            Dedicated documentation for weddings, relaxed pre-weddings, and majestic landscapes.
          </p>
        </div>

        {/* Editorial Services List (not generic cards) */}
        <div className="divide-y divide-[#D8D2C7]">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group py-12 md:py-16 transition-colors duration-500 hover:bg-[#FAF9F6]/60 px-4 md:px-8 -mx-4 md:-mx-8"
            >
              <Reveal delay={index * 0.1}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Service Index & Title (5 cols) */}
                  <div className="lg:col-span-5 space-y-2">
                    <span className="text-xs uppercase tracking-widest text-[#777B60]">
                      0{index + 1} • {service.pricingGuide}
                    </span>
                    <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#242421] font-normal group-hover:text-[#303B32] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#777B60] uppercase tracking-wider font-light">
                      {service.subtitle}
                    </p>
                  </div>

                  {/* Supporting Thumbnail Image (3 cols) */}
                  <div className="lg:col-span-3">
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#D8D2C7]">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Description & Action (4 cols) */}
                  <div className="lg:col-span-4 space-y-4">
                    <p className="text-sm text-[#5E5D57] font-light leading-relaxed">
                      {service.description}
                    </p>
                    <div className="pt-2 flex items-center justify-between">
                      <Link
                        href={`/contact?service=${encodeURIComponent(service.title)}`}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#242421] group-hover:text-[#303B32] border-b border-[#242421] group-hover:border-[#303B32] pb-0.5 transition-colors"
                      >
                        <span>Discuss Commission</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>

        {/* Explore all services */}
        <div className="mt-16 text-center">
          <Link
            href="/services"
            className="text-xs uppercase tracking-[0.25em] text-[#777B60] hover:text-[#242421] border-b border-[#777B60] hover:border-[#242421] pb-1 transition-colors"
          >
            Review Detailed Deliverables &amp; Investment Guide &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
