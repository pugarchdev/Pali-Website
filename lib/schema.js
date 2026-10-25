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
 * Photography Business / ProfessionalService structured data
 */
export function getBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.siteUrl}/#business`,
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    image: siteConfig.defaultOgImage,
    telephone: siteConfig.contact.telephone,
    email: siteConfig.contact.email,
    areaServed: siteConfig.serviceAreas.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
    founder: {
      "@type": "Person",
      name: siteConfig.founder,
      jobTitle: siteConfig.profession,
    },
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.youtube,
    ].filter(Boolean),
  };

  // Only include physical address if specifically supplied by the client
  if (siteConfig.contact.address) {
    schema.address = {
      "@type": "PostalAddress",
      ...siteConfig.contact.address,
    };
  }

  return schema;
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
      item: `${siteConfig.siteUrl}${item.path}`,
    })),
  };
}

/**
 * Project CreativeWork / ImageGallery schema generator
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
    image: project.heroImage,
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
    hasPart: project.gallery.map((item, idx) => ({
      "@type": "ImageObject",
      position: idx + 1,
      name: item.title,
      description: item.caption,
      contentUrl: item.url,
    })),
  };
}
