import { Suspense } from "react";
import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/motion/Reveal";
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";

import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/siteConfig";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata = {
  title: siteConfig.pages.contact.title,
  description: siteConfig.pages.contact.description,
  alternates: {
    canonical: `${siteConfig.siteUrl}/contact`,
  },
  openGraph: {
    title: `${siteConfig.pages.contact.title} | ${siteConfig.name}`,
    description: siteConfig.pages.contact.description,
    url: `${siteConfig.siteUrl}/contact`,
    type: "website",
    images: [
      {
        url: siteConfig.defaultOgImage,
        width: 1200,
        height: 630,
        alt: "Contact Pali Photography studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.pages.contact.title} | ${siteConfig.name}`,
    description: siteConfig.pages.contact.description,
    images: [siteConfig.defaultOgImage],
  },
};

export default function ContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="pt-32 pb-24 md:pt-40 md:pb-36 bg-[#F5F2EB] text-[#242421]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20 md:space-y-24">
          {/* Page Header */}
          <div className="max-w-3xl">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.28em] text-[#777B60] block mb-3">
                Dialogue &amp; Bookings
              </span>
              <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-[#242421] font-light leading-[1.05]">
                Let&apos;s Begin the Conversation
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-base md:text-lg text-[#5E5D57] font-light leading-relaxed">
                Every love story deserves a beautiful frame. Tell me about your celebration,
                your dream wedding destination, or the relaxed engagement session you envision.
              </p>
            </Reveal>
          </div>

          {/* Main Content Grid: Form (7 cols) + Studio Coordinates (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Contact Form Column */}
            <div className="lg:col-span-7">
              <Reveal delay={0.2}>
                <Suspense
                  fallback={
                    <div className="p-12 text-center text-xs uppercase tracking-widest text-[#777B60]">
                      Loading enquiry interface...
                    </div>
                  }
                >
                  <ContactForm />
                </Suspense>
              </Reveal>
            </div>

            {/* Studio & Representation Column */}
            <div className="lg:col-span-5 space-y-10">
              <Reveal delay={0.3}>
                <div className="bg-[#FAF9F6] border border-[#D8D2C7] p-8 space-y-8">
                  <div>
                    <span className="text-xs uppercase tracking-[0.25em] text-[#777B60] block mb-1">
                      Direct Coordinates
                    </span>
                    <h3 className="font-editorial text-2xl text-[#242421]">
                      Pali Photography Studio
                    </h3>
                  </div>

                  <div className="space-y-6 text-sm text-[#5E5D57]">
                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-[#777B60] mt-1 shrink-0" />
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#777B60] block">Email</span>
                        <a
                          href={`mailto:${siteConfig.contact.email}`}
                          className="text-[#242421] hover:text-[#777B60] transition-colors border-b border-[#D8D2C7] pb-0.5"
                        >
                          {siteConfig.contact.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-[#777B60] mt-1 shrink-0" />
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#777B60] block">Telephone</span>
                        <a
                          href={`tel:${siteConfig.contact.telephone.replace(/\s+/g, '')}`}
                          className="text-[#242421] hover:text-[#777B60] transition-colors"
                        >
                          {siteConfig.contact.telephone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#777B60] mt-1 shrink-0" />
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#777B60] block">Territory</span>
                        <p className="text-[#242421]">{siteConfig.contact.locationGeneral}</p>
                        <p className="text-xs text-[#777B60] mt-0.5">Local, Regional &amp; Worldwide Travel</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-[#777B60] mt-1 shrink-0" />
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#777B60] block">Consultations</span>
                        <p className="text-[#242421]">Monday – Saturday: 10:00 – 19:00</p>
                        <p className="text-xs text-[#777B60] mt-0.5">Weekends dedicated to weddings &amp; field sessions</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#D8D2C7] text-xs text-[#777B60] space-y-2">
                    <p className="uppercase tracking-widest text-[10px]">Online Deliverables &amp; Albums</p>
                    <p className="font-light">
                      All clients receive an exclusive private online gallery to share moments effortlessly with friends and family.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Note on Booking Seasons */}
              <Reveal delay={0.4}>
                <div className="p-6 border border-[#D8D2C7] bg-[#F5F2EB] text-xs text-[#5E5D57] space-y-2">
                  <span className="uppercase tracking-widest text-[#777B60] block font-medium">
                    Note on Wedding Booking Dates
                  </span>
                  <p className="font-light leading-relaxed">
                    Peak wedding dates and popular weekend slots book up months in advance.
                    We recommend reaching out early to secure your date and ensure ample time to plan your creative timeline.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
