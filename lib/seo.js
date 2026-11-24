/**
 * Centralized, production-grade Dynamic Metadata Generator for Pali Photography
 * Compliant with Next.js 16 (App Router) Metadata API
 */

export const CANONICAL_SITE_URL = "https://www.paliphoto.co.uk";
export const BRAND_NAME = "Pali Photography";
export const PHOTOGRAPHER_NAME = "Vivek Pali";

export const DEFAULT_SEO_KEYWORDS = [
  "Scotland Wedding Photographer",
  "Edinburgh Wedding Photography",
  "Glasgow Wedding Photographer",
  "Scottish Highlands Elopements",
  "Glencoe Pre-Wedding Photography",
  "Isle of Skye Elopement Photographer",
  "Loch Lomond Wedding Photography",
  "UK Destination Wedding Photographer",
  "Vivek Pali Photography",
  "Candid Wedding Photography Scotland",
  "Fine Art Landscape Photography",
];

/**
 * Constructs a fully qualified Next.js Metadata object with canonical resolution,
 * OpenGraph, Twitter, Robots, and semantic authorship tags.
 *
 * @param {Object} [options]
 * @param {string} [options.title] - Page title prefix (will be appended with | Pali Photography)
 * @param {string} [options.description] - Meta description
 * @param {string} [options.image] - Hero/OG image path or full URL
 * @param {string} [options.path] - Route path for canonical link resolution
 * @param {string[]} [options.keywords] - Custom keywords
 * @param {boolean} [options.noIndex] - Whether to exclude from search engines
 * @param {"website" | "article" | "profile"} [options.type] - OpenGraph type
 * @param {string} [options.publishedTime] - Article/Project ISO publish timestamp
 * @returns {import('next').Metadata}
 */
export function constructMetadata({
  title,
  description = "Documentary-led wedding, pre-wedding, and landscape photography by Vivek Pali. Capturing heartfelt emotions across Edinburgh, Glasgow, the Scottish Highlands, and destinations worldwide.",
  image = "/media/2024/05/17-scaled.jpg",
  path = "",
  keywords = DEFAULT_SEO_KEYWORDS,
  noIndex = false,
  type = "website",
  publishedTime,
} = {}) {
  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  const canonicalUrl = `${CANONICAL_SITE_URL}${cleanPath === "/" ? "" : cleanPath}`;
  
  const resolvedTitle = title
    ? `${title} | ${BRAND_NAME}`
    : `${BRAND_NAME} | Wedding, Portrait & Landscape Photographer Scotland`;

  const ogImageUrl = image.startsWith("http")
    ? image
    : `${CANONICAL_SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;

  return {
    metadataBase: new URL(CANONICAL_SITE_URL),
    title: resolvedTitle,
    description,
    keywords,
    authors: [{ name: PHOTOGRAPHER_NAME, url: CANONICAL_SITE_URL }],
    creator: PHOTOGRAPHER_NAME,
    publisher: BRAND_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type,
      title: resolvedTitle,
      description,
      url: canonicalUrl,
      siteName: BRAND_NAME,
      locale: "en_GB",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${BRAND_NAME} — ${title || "Visual Storytelling Scotland"}`,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [ogImageUrl],
      creator: "@paliphoto",
    },
  };
}
