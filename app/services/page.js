import { services } from "@/data/services";
import ServicesHero3D from "@/components/services/ServicesHero3D";
import ServicesContent from "@/components/services/ServicesContent";

import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/siteConfig";
import { constructMetadata } from "@/lib/seo";
import { getBreadcrumbSchema, getServiceSchema } from "@/lib/schema";

export const metadata = constructMetadata({
  title: "Photography Services & Collections — Wedding, Birthday & Events",
  description:
    "Cinematic wedding documentation, joyful birthday milestones, and dynamic event photography with private online galleries and master retouching by Vivek Pali.",
  path: "/services",
  keywords: [
    "Wedding Photography Scotland",
    "Edinburgh Birthday Photographer",
    "Glasgow Event Photography",
    "Scottish Highlands Elopement Packages",
    "Portrait Commissions UK",
  ],
});

export default function ServicesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ]);

  const serviceSchemas = services.map(getServiceSchema);

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
      <JsonLd data={[breadcrumbSchema, ...serviceSchemas]} />
      {/* Interactive 3D Cinematic Hero Exhibition */}
      <ServicesHero3D />

      {/* Bidirectional Scroll-Triggered Services & Process Content */}
      <ServicesContent services={services} steps={steps} />
    </>
  );
}
