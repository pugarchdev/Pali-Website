import Hero from "@/components/home/Hero";
import ScrollExperience from "@/components/home/ScrollExperience";
import FeaturedWork from "@/components/home/FeaturedWork";
import AboutPreview from "@/components/home/AboutPreview";
import ServicesPreview from "@/components/home/ServicesPreview";
import Locations from "@/components/home/Locations";
import Testimonials from "@/components/home/Testimonials";
import ContactCTA from "@/components/home/ContactCTA";
import { siteConfig } from "@/data/siteConfig";

export const metadata = {
  title: siteConfig.pages.home.title,
  description: siteConfig.pages.home.description,
  alternates: {
    canonical: `${siteConfig.siteUrl}/`,
  },
  openGraph: {
    title: siteConfig.pages.home.title,
    description: siteConfig.pages.home.description,
    url: `${siteConfig.siteUrl}/`,
    images: [
      {
        url: siteConfig.defaultOgImage,
        width: 1200,
        height: 630,
        alt: siteConfig.defaultOgImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.pages.home.title,
    description: siteConfig.pages.home.description,
    images: [siteConfig.defaultOgImage],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ScrollExperience />
      <FeaturedWork />
      <AboutPreview />
      <ServicesPreview />
      <Locations />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
