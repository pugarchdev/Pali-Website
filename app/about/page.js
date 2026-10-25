import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart, Sparkles, Mountain, ShieldCheck } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import ImageReveal from "@/components/motion/ImageReveal";

import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/siteConfig";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata = {
  title: siteConfig.pages.about.title,
  description: siteConfig.pages.about.description,
  alternates: {
    canonical: `${siteConfig.siteUrl}/about`,
  },
  openGraph: {
    title: `${siteConfig.pages.about.title} | ${siteConfig.name}`,
    description: siteConfig.pages.about.description,
    url: `${siteConfig.siteUrl}/about`,
    type: "profile",
    images: [
      {
        url: siteConfig.defaultOgImage,
        width: 1200,
        height: 630,
        alt: "Pali, Wedding & Lifestyle Photographer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.pages.about.title} | ${siteConfig.name}`,
    description: siteConfig.pages.about.description,
    images: [siteConfig.defaultOgImage],
  },
};

export default function AboutPage() {
  const principles = [
    {
      icon: Heart,
      title: "Felt, Not Posed",
      description:
        "The most beautiful wedding photos aren’t posed—they’re felt. Our photography focuses on capturing raw emotions, laughter, and love in its purest form.",
    },
    {
      icon: Sparkles,
      title: "Giggles, Poses & Pure Love",
      description:
        "From playful poses to spontaneous laughter, we ensure every frame radiates love, warmth, and effortless happiness so you can feel completely like yourselves.",
    },
    {
      icon: Mountain,
      title: "Majestic Landscapes in Focus",
      description:
        "In every walk with nature, one receives far more than he seeks. We connect human love stories with breathtaking natural scenery and panoramic horizons.",
    },
    {
      icon: ShieldCheck,
      title: "Online Galleries & Meticulous Retouching",
      description:
        "Every photograph goes through thoughtful editing and master color correction to ensure timeless elegance, delivered through an intuitive online gallery.",
    },
  ];

  const faqs = [
    {
      q: "How would you describe your photography style and approach?",
      a: "Warm, easygoing, and documentary-led. I believe the best images happen when you feel relaxed and present. Rather than directing every micro-movement, I create a calm environment where your true love story unfolds naturally.",
    },
    {
      q: "Do you travel for destination weddings and elopements?",
      a: "Yes! While based locally, I regularly travel for destination weddings, scenic mountain ceremonies, and pre-wedding sessions worldwide.",
    },
    {
      q: "How do we receive our completed photographs?",
      a: "You’ll receive a private, high-resolution online gallery that you can easily share with friends and family. From there, you can download full-resolution files, order fine art prints, and view your highlights seamlessly on any device.",
    },
    {
      q: "Can we book a creative engagement session before the wedding?",
      a: "Absolutely! Our pre-wedding and engagement sessions are a relaxed and fun way to get comfortable in front of the camera and capture your love story in a casual setting before the wedding day.",
    },
  ];

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="pt-32 pb-24 md:pt-40 md:pb-36 bg-[#F5F2EB] text-[#242421]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-28 md:space-y-36">
          {/* Top Hero / Intro Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Portrait Column (5 cols) */}
            <div className="lg:col-span-5">
              <Reveal>
                <div className="relative">
                  <ImageReveal>
                    <div className="relative aspect-[3/4] w-full bg-[#D8D2C7] overflow-hidden">
                      <Image
                        src="/media/2024/05/17-scaled.jpg"
                        alt="Pali Photography, Wedding & Lifestyle Photographer"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover object-center contrast-105"
                      />
                    </div>
                  </ImageReveal>

                  <div className="mt-4 flex justify-between items-center text-[10px] uppercase tracking-[0.22em] text-[#777B60]">
                    <span>Pali</span>
                    <span>Storyteller with a Lens</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Bio Content (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <Reveal delay={0.1}>
                <span className="text-xs uppercase tracking-[0.28em] text-[#777B60] block mb-3">
                  About the Storyteller
                </span>
                <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#242421] font-light leading-[1.05]">
                  Hello! I’m Pali.
                </h1>
                <p className="font-editorial text-2xl text-[#777B60] font-light mt-2 italic">
                  Capturing your forever in every frame.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="space-y-5 text-base text-[#5E5D57] font-light leading-relaxed">
                  <p>
                    I am a storyteller with a lens, dedicated to capturing the beauty, connection, and raw emotions that define your wedding day and celebrations.
                  </p>
                  <p>
                    Your wedding is a vibrant tapestry of love, joy, and deep human bond. My goal is to ensure that your photography experience is as effortless, relaxed, and enjoyable as the day itself. With a warm and easygoing approach, I create an atmosphere where you can relax and be your truest selves, allowing your unique story to unfold naturally.
                  </p>
                  <p>
                    Every click whispers a story, and each frame holds a dream. Together, we’ll create timeless images that you and your families will treasure forever.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="pt-2 flex items-center gap-6">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-xs uppercase tracking-[0.22em] font-medium bg-[#242421] text-[#FAF9F6] hover:bg-[#343430] transition-colors"
                  >
                    <span>Check Availability</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/portfolio"
                    className="text-xs uppercase tracking-[0.22em] text-[#777B60] hover:text-[#242421] border-b border-[#777B60] hover:border-[#242421] pb-1 transition-colors"
                  >
                    Explore Portfolio Archive
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Guiding Principles */}
          <section className="border-t border-[#D8D2C7] pt-20">
            <Reveal>
              <div className="max-w-2xl mb-16">
                <span className="text-xs uppercase tracking-[0.28em] text-[#777B60] block mb-2">
                  Our Approach
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#242421] font-light">
                  How We Create Timeless Frames
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
              {principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <div key={index} className="space-y-3">
                    <Reveal delay={index * 0.1}>
                      <div className="inline-flex p-3 bg-[#FAF9F6] border border-[#D8D2C7] text-[#303B32] mb-2">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-editorial text-2xl text-[#242421]">
                        {principle.title}
                      </h3>
                      <p className="text-sm text-[#5E5D57] font-light leading-relaxed">
                        {principle.description}
                      </p>
                    </Reveal>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section className="border-t border-[#D8D2C7] pt-20">
            <Reveal>
              <div className="max-w-2xl mb-16">
                <span className="text-xs uppercase tracking-[0.28em] text-[#777B60] block mb-2">
                  Logistics &amp; Questions
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#242421] font-light">
                  Frequently Addressed Inquiries
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-8 bg-[#FAF9F6] border border-[#D8D2C7] space-y-4"
                >
                  <Reveal delay={index * 0.1}>
                    <h3 className="font-editorial text-xl md:text-2xl text-[#242421]">
                      {faq.q}
                    </h3>
                    <p className="text-sm text-[#5E5D57] font-light leading-relaxed">
                      {faq.a}
                    </p>
                  </Reveal>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Booking Invitation */}
          <section className="bg-[#242421] text-[#FAF9F6] p-10 md:p-16 text-center space-y-6">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.25em] text-[#777B60] block">
                Let&apos;s Connect
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-light max-w-2xl mx-auto">
                Every Moment Deserves to Be Timeless — Let’s Create Yours.
              </h2>
              <p className="text-sm text-[#D8D2C7] max-w-lg mx-auto font-light">
                We welcome enquiries for upcoming wedding seasons, pre-weddings, and destination commissions.
              </p>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#FAF9F6] text-[#242421] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#F5F2EB] transition-colors"
                >
                  <span>Start a Conversation</span>
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
