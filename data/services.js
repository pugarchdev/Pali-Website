// Centralized photography services data for Vivek Pali Photography
// Defines the three core service categories, subservices, and visual assets

export const services = [
  {
    id: "wedding-photography",
    slug: "wedding-photography",
    number: "01",
    title: "Wedding Photography",
    subtitle: "Every love story deserves a beautiful frame",
    tagline: "Sacred Vows, Candid Laughter & Timeless Devotion",
    description:
      "An intimate, documentary-led approach to weddings and romantic milestones. We believe the most powerful wedding imagery isn't stiffly manufactured—it's felt, honoring genuine connection, heartfelt promises, and the quiet glances that make your union unique.",
    subservices: [
      "Wedding ceremonies",
      "Pre-wedding photography",
      "Engagement photography",
      "Couple portraits",
      "Wedding candid moments",
    ],
    deliverables: [
      "Comprehensive wedding day and ceremony coverage",
      "Candid, emotional storytelling without rigid posing",
      "Curated pre-wedding and engagement portrait sessions",
      "Private high-resolution online gallery with full print rights",
      "Master color grading and meticulous fine-art retouching",
    ],
    images: {
      primary: "/media/2025/01/2-scaled.jpg",
      secondary: "/media/2024/05/17-scaled.jpg",
      tertiary: "/media/2024/08/K6-scaled.jpg",
    },
    // Backwards-compatible single image prop
    image: "/media/2025/01/2-scaled.jpg",
    accentColor: "#C5A880",
    pricingGuide: "Tailored Local & Destination Collections",
    idealFor:
      "Couples seeking heartfelt wedding days, pre-wedding journeys, and timeless heirlooms",
  },
  {
    id: "birthday-photography",
    slug: "birthday-photography",
    number: "02",
    title: "Birthday Photography",
    subtitle: "Pure wonder, joyful giggles, and celebrated milestones",
    tagline: "Spontaneous Smiles, Party Energy & Childhood Magic",
    description:
      "Vibrant, unscripted documentation celebrating life's joyous milestones. From a toddler's awe-filled first cake to landmark jubilee celebrations, we preserve the unbridled happiness, playfulness, and warmth of family and friends coming together.",
    subservices: [
      "Birthday celebrations",
      "Birthday parties",
      "Kids' birthday photography",
      "Special milestone celebrations",
    ],
    deliverables: [
      "Dynamic, documentary-style coverage of party festivities",
      "Unscripted kids' play, cake cutting, and gift surprises",
      "Warm family & milestone group portraits with gentle direction",
      "High-resolution digital archive ready for keepsakes and albums",
      "Prompt sneak peeks for effortless social and family sharing",
    ],
    images: {
      primary: "/media/2024/08/K43.jpg",
      secondary: "/media/2024/08/K44.jpg",
      tertiary: "/media/2024/08/K46.jpg",
    },
    image: "/media/2024/08/K43.jpg",
    accentColor: "#8FA382",
    pricingGuide: "Hourly & Half-Day Celebration Packages",
    idealFor:
      "Children's birthdays, 1st milestone cakes, sweet sixteens, and landmark adult celebrations",
  },
  {
    id: "events-celebrations",
    slug: "events-celebrations",
    number: "03",
    title: "Events & Celebrations",
    subtitle: "Atmospheric coverage for extraordinary gatherings",
    tagline: "Grand Gatherings, Cultural Festivities & Corporate Milestones",
    description:
      "Cinematic, editorial coverage tailored for gatherings of any magnitude. Combining discrete documentary observation with sharp visual timing, we capture the ambiance, key personalities, vibrant cultural rituals, and energetic spirit of your special occasions.",
    subservices: [
      "Private parties",
      "Corporate events",
      "Cultural celebrations",
      "Large-scale parties and gatherings",
      "Community events",
      "Special occasions and social gatherings",
    ],
    deliverables: [
      "Full-spectrum event coverage from keynote moments to dance floor",
      "Atmospheric environmental framing, interior aesthetics & decor",
      "Discrete, professional photographer presence blending into the crowd",
      "High-resolution color-graded master library with licensing rights",
      "Secure private cloud gallery with multi-user download access",
    ],
    images: {
      primary: "/media/2024/05/10-scaled.jpg",
      secondary: "/media/2024/05/9-scaled.jpg",
      tertiary: "/media/2024/05/3-scaled.jpg",
    },
    image: "/media/2024/05/10-scaled.jpg",
    accentColor: "#A69076",
    pricingGuide: "Flexible Half-Day, Full-Day & Multi-Day Commissions",
    idealFor:
      "Private soirées, gala banquets, cultural festivals, corporate summits, and community unions",
  },
];
