import Link from "next/link";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import Reveal from "@/components/motion/Reveal";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/siteConfig";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata = {
  title: siteConfig.pages.portfolio.title,
  description: siteConfig.pages.portfolio.description,
  alternates: {
    canonical: `${siteConfig.siteUrl}/portfolio`,
  },
  openGraph: {
    title: `${siteConfig.pages.portfolio.title} | ${siteConfig.name}`,
    description: siteConfig.pages.portfolio.description,
    url: `${siteConfig.siteUrl}/portfolio`,
    type: "website",
    images: [
      {
        url: siteConfig.defaultOgImage,
        width: 1200,
        height: 630,
        alt: "Scottish photography portfolio archive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.pages.portfolio.title} | ${siteConfig.name}`,
    description: siteConfig.pages.portfolio.description,
    images: [siteConfig.defaultOgImage],
  },
};

export default function PortfolioPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="pt-32 pb-24 md:pt-40 md:pb-36 bg-[#F5F2EB] text-[#242421]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Page Header */}
          <div className="max-w-3xl mb-16 md:mb-20">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.28em] text-[#777B60] block mb-3">
                Archive &amp; Collections
              </span>
              <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-[#242421] font-light leading-[1.05]">
                Selected Photographic Plates
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-base md:text-lg text-[#5E5D57] font-light leading-relaxed">
                A curated survey of work created across Scotland&apos;s islands, glens, and mountain passes.
                Every photograph is captured in natural ambient light and produced using archival pigment
                processes or silver gelatin darkroom methods.
              </p>
            </Reveal>
          </div>

          {/* Portfolio Grid with Interactive Filters & Lightbox */}
          <PortfolioGrid />
        </div>
      </div>
    </>
  );
}
