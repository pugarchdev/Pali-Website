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
  return "https://www.paliphoto.co.uk";
};

export const siteConfig = {
  name: "Pali Photography",
  shortName: "Pali",
  siteUrl: getSiteUrl(),
  locale: "en_GB",
  language: "en",

  // Core Brand & Identity
  founder: "Vivek Pali",
  profession: "Documentary Wedding, Pre-Wedding & Landscape Photographer",
  tagline: "Every Love Story Deserves a Beautiful Frame",
  foundingYear: "2019",
  logoUrl: "/media/2024/05/PNG-golden-1.png",

  // Default SEO Fallbacks
  defaultTitle:
    "Pali Photography | Wedding, Pre-Wedding & Landscape Photographer Scotland",
  titleTemplate: "%s | Pali Photography",
  defaultDescription:
    "Documentary-led wedding, pre-wedding, and landscape photography by Vivek Pali. Capturing heartfelt emotions across Edinburgh, Glasgow, the Scottish Highlands, and destinations worldwide.",

  // Primary Social / OpenGraph Asset
  defaultOgImage: "/media/2024/05/17-scaled.jpg",
  defaultOgImageAlt: "Pali Photography — Capturing Your Forever in Every Frame",

  // Business Coordinates & Contacts
  contact: {
    email: "bookings@paliphoto.co.uk",
    telephone: "+44 7915 069154",
    representationEmail: "bookings@paliphoto.co.uk",
    country: "United Kingdom",
    locationGeneral: "Edinburgh, Glasgow, Scottish Highlands & Worldwide Destination Commissions",
    address: null,
  },

  // Service Territories
  serviceAreas: [
    "Edinburgh",
    "Glasgow",
    "Scottish Highlands (Glencoe, Isle of Skye, Cairngorms, Loch Lomond)",
    "United Kingdom",
    "International Destination Weddings",
  ],

  // Services offered
  servicesList: [
    "Wedding Photography",
    "Pre-Wedding & Engagement Sessions",
    "Birthday & Family Milestones",
    "Events & Cultural Celebrations",
    "Landscape & Fine-Art Prints",
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
      title:
        "Photography Services & Collections — Wedding, Birthday & Events | Vivek Pali",
      description:
        "Cinematic wedding documentation, joyful birthday milestones, and dynamic event photography with private online galleries and master retouching by Vivek Pali.",
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
