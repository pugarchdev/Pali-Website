import { siteConfig } from "@/data/siteConfig";

/**
 * Global WebSite structured data
 */
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.siteUrl}/#website`,
    url: siteConfig.siteUrl,
    name: siteConfig.name,
    description: siteConfig.defaultDescription,
    publisher: {
      "@id": `${siteConfig.siteUrl}/#business`,
    },
    inLanguage: siteConfig.language,
  };
}

/**
 * Root Photography Business / LocalBusiness / Photographer structured data
 * Anchored to https://www.paliphoto.co.uk
 */
export function getBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Photographer"],
    "@id": `${siteConfig.siteUrl}/#business`,
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/media/2024/05/PNG-golden-1.png`,
    image: `${siteConfig.siteUrl}/media/2024/05/17-scaled.jpg`,
    telephone: siteConfig.contact.telephone,
    email: siteConfig.contact.email, // bookings@paliphoto.co.uk
    priceRange: "£££",
    founder: {
      "@type": "Person",
      name: siteConfig.founder,
      jobTitle: "Principal Photographer & Visual Storyteller",
      sameAs: [
        siteConfig.social.instagram,
        siteConfig.social.facebook,
        siteConfig.social.youtube,
      ].filter(Boolean),
    },
    areaServed: [
      {
        "@type": "City",
        name: "Edinburgh",
        containedInPlace: { "@type": "Country", name: "Scotland" },
      },
      {
        "@type": "City",
        name: "Glasgow",
        containedInPlace: { "@type": "Country", name: "Scotland" },
      },
      {
        "@type": "AdministrativeArea",
        name: "Scottish Highlands",
        description: "Glencoe, Isle of Skye, Cairngorms, and Loch Lomond",
      },
      {
        "@type": "Country",
        name: "United Kingdom",
      },
      {
        "@type": "Place",
        name: "Worldwide Destination Commissions",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Photography Collections & Commissions",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Photography",
            description: "Full-day wedding ceremony, sacred vows, and documentary candid couple portraits.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Pre-Wedding & Engagement Sessions",
            description: "Scenic outdoor couple shoots across Scotland's mountain vistas, coastlines, and historic estates.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Birthday & Family Milestones",
            description: "Joyful milestone documentation for children's birthdays, cake smashes, and family gatherings.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Events & Cultural Celebrations",
            description: "Atmospheric, discrete documentation for cultural festivals, galas, and corporate occasions.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Landscape & Fine-Art Prints",
            description: "High-resolution fine-art prints capturing atmospheric Scottish wilderness and dawn light.",
          },
        },
      ],
    },
  };
}

/**
 * Service Page Specific Schema
 * @param {Object} service
 * @param {string} service.title
 * @param {string} service.slug
 * @param {string} service.description
 * @param {string} [service.image]
 */
export function getServiceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.siteUrl}/services/${service.slug}#service`,
    name: service.title,
    description: service.description,
    provider: {
      "@id": `${siteConfig.siteUrl}/#business`,
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Scotland",
      },
      {
        "@type": "Country",
        name: "United Kingdom",
      },
    ],
    serviceType: service.title,
    image: service.image
      ? (service.image.startsWith("http") ? service.image : `${siteConfig.siteUrl}${service.image}`)
      : `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`,
  };
}

/**
 * BreadcrumbList schema generator
 * @param {Array<{ name: string, path: string }>} items
 */
export function getBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.siteUrl}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  };
}

/**
 * Project CreativeWork / ImageGallery schema generator
 * @param {Object} project
 */
export function getProjectSchema(project) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${siteConfig.siteUrl}/projects/${project.slug}#gallery`,
    url: `${siteConfig.siteUrl}/projects/${project.slug}`,
    name: project.title,
    headline: project.subtitle || project.title,
    description: project.description,
    image: project.heroImage.startsWith("http")
      ? project.heroImage
      : `${siteConfig.siteUrl}${project.heroImage}`,
    dateCreated: project.year,
    creator: {
      "@type": "Person",
      name: siteConfig.founder,
      jobTitle: siteConfig.profession,
    },
    contentLocation: {
      "@type": "Place",
      name: project.location,
    },
    hasPart: (project.gallery || []).map((item, idx) => ({
      "@type": "ImageObject",
      position: idx + 1,
      name: item.title,
      description: item.caption,
      contentUrl: item.url.startsWith("http")
        ? item.url
        : `${siteConfig.siteUrl}${item.url}`,
    })),
  };
}
