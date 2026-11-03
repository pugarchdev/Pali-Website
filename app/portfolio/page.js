import Portfolio3DCarousel from "@/components/portfolio/Portfolio3DCarousel";
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
        alt: "Scottish photography portfolio archive 3D exhibition",
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
      <main className="pt-24 pb-20 md:pt-32 md:pb-28 bg-[#1c1c1a] text-[#FAF9F6] min-h-screen">
        {/* Immersive 3D 360-Degree Circular Photography Carousel Exhibition */}
        <Portfolio3DCarousel />
      </main>
    </>
  );
}
