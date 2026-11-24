import Portfolio3DCarousel from "@/components/portfolio/Portfolio3DCarousel";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/siteConfig";
import { constructMetadata } from "@/lib/seo";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata = constructMetadata({
  title: "Portfolio Archive — Weddings, Pre-Weddings & Landscapes",
  description:
    "Explore curated collections: Bonds for Forever, Creative Pre-Weddings, Innocence in Focus, and Majestic Landscapes by Pali Photography.",
  path: "/portfolio",
  keywords: [
    "Scottish Wedding Portfolio",
    "Edinburgh Wedding Gallery",
    "Glasgow Pre-Wedding Photos",
    "Scottish Highlands Landscape Archive",
  ],
});

export default function PortfolioPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <main className="pt-24 pb-20 md:pt-32 md:pb-28 bg-[#1c1c1a] text-[#FAF9F6] min-h-screen">
        {/* Immersive 3D 360-Degree Circular Photography Carousel Exhibition */}
        <Portfolio3DCarousel />
      </main>
    </>
  );
}
