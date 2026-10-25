// Centralized SEO and Site Configuration for Pali Photography
// All production metadata, URLs, contact coordinates, and schema foundations are managed here.

/**
 * PRODUCTION URL CONFIGURATION:
 * When deploying to Vercel, Netlify, or custom hosting, set the NEXT_PUBLIC_SITE_URL
 * environment variable (e.g. https://www.paliphotography.com).
 * In development, it defaults to the verified production domain placeholder without trailing slash.
 */
const getSiteUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }
  // Production canonical domain fallback
  return "https://www.paliphotography.com";
};

export const siteConfig = {
  name: "Pali Photography",
  shortName: "Pali",
  siteUrl: getSiteUrl(),
  locale: "en_GB",
  language: "en",

  // Core Brand & Identity
  founder: "Pali",
  profession: "Wedding, Pre-Wedding & Landscape Photographer",
  tagline: "Every Love Story Deserves a Beautiful Frame",
  foundingYear: "2019",
  logoUrl: "/media/2024/05/PNG-golden-1.png",

  // Default SEO Fallbacks
  defaultTitle: "Pali Photography | Wedding, Pre-Wedding & Landscape Photographer",
  titleTemplate: "%s | Pali Photography",
  defaultDescription:
    "Hello! I’m Pali, a storyteller with a lens, capturing the beauty, raw emotions, and timeless connections that define your wedding day and celebrations.",

  // Primary Social / OpenGraph Asset
  defaultOgImage:
    "/media/2024/05/17-scaled.jpg",
  defaultOgImageAlt:
    "Pali Photography — Capturing Your Forever in Every Frame",

  // Business Coordinates & Contacts
  contact: {
    email: "contact@paliphotography.com",
    telephone: "+91 98765 43210",
    representationEmail: "bookings@paliphotography.com",
    country: "India",
    locationGeneral: "Destination & Studio Commissions Available Worldwide",
    // Physical studio / office address:
    address: null,
  },

  // Service Territories
  serviceAreas: [
    "Destination Weddings",
    "Pre-Wedding & Engagements",
    "Landscape & Travel",
    "Family & Children",
  ],

  // Services offered
  servicesList: [
    "Weddings & Pre-Weddings",
    "Creative Engagement Sessions",
    "Majestic Landscapes",
    "Childhood Magic & Family Portfolios",
    "Private Online Gallery & Professional Editing",
  ],

  // Social Channels
  social: {
    instagram: "https://www.instagram.com",
    facebook: "https://www.facebook.com",
    youtube: "https://www.youtube.com",
  },

  // Per-Page SEO Definitions
  pages: {
    home: {
      title: "Pali Photography | Every Love Story Deserves a Beautiful Frame",
      description:
        "Wedding and pre-wedding photographer capturing your forever in every frame. Raw emotions, joyful giggles, creative engagements, and majestic landscapes.",
      path: "/",
    },
    portfolio: {
      title: "Portfolio Archive — Weddings, Pre-Weddings & Landscapes",
      description:
        "Explore curated collections: Bonds for Forever, Creative Pre-Weddings, Innocence in Focus, and Majestic Landscapes by Pali Photography.",
      path: "/portfolio",
    },
    about: {
      title: "About Pali — Storyteller with a Lens & Creative Philosophy",
      description:
        "Meet Pali, wedding photographer and visual storyteller. Learn about our easygoing approach, natural candids, and passion for timeless frames.",
      path: "/about",
    },
    services: {
      title: "Photography Services & Collections — Weddings, Couples & Landscapes",
      description:
        "Full-day wedding documentation, relaxed engagement sessions, landscape prints, online galleries, and master retouching.",
      path: "/services",
    },
    contact: {
      title: "Contact & Booking Enquiries — Let’s Create Your Timeless Moments",
      description:
        "Get in touch with Pali Photography to discuss your upcoming wedding, engagement session, or destination shoot.",
      path: "/contact",
    },
  },
};
