import { CANONICAL_SITE_URL } from "@/lib/seo";
import { featuredProjects } from "@/data/portfolio";
import { services } from "@/data/services";

/**
 * Dynamic XML Sitemap Generator
 * @returns {import('next').MetadataRoute.Sitemap}
 */
export default function sitemap() {
  const currentDate = new Date();

  // 1. Core Primary Static Pages
  const staticRoutes = [
    {
      url: `${CANONICAL_SITE_URL}/`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${CANONICAL_SITE_URL}/portfolio`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${CANONICAL_SITE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${CANONICAL_SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL_SITE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // 2. Service Category Landing Routes
  const serviceRoutes = services.map((service) => ({
    url: `${CANONICAL_SITE_URL}/services#${service.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // 3. Dynamic Case Studies & Portfolio Projects
  const projectRoutes = featuredProjects.map((project) => ({
    url: `${CANONICAL_SITE_URL}/projects/${project.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
