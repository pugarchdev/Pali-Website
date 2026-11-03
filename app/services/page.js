import { services } from "@/data/services";
import ServicesHero3D from "@/components/services/ServicesHero3D";
import ServicesContent from "@/components/services/ServicesContent";

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
      {/* Interactive 3D Cinematic Hero Exhibition */}
      <ServicesHero3D />

      {/* Bidirectional Scroll-Triggered Services & Process Content */}
      <ServicesContent services={services} steps={steps} />
    </>
  );
}
