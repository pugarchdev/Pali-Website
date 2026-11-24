import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/siteConfig";
import { constructMetadata } from "@/lib/seo";
import { getWebsiteSchema, getBusinessSchema } from "@/lib/schema";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = constructMetadata();

export default function RootLayout({ children }) {
  const websiteSchema = getWebsiteSchema();
  const businessSchema = getBusinessSchema();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const isProduction = process.env.VERCEL_ENV === "production";

  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-[#F5F2EB] text-[#242421] selection:bg-[#303B32] selection:text-[#FAF9F6]">
        {/* Only mount GA4 in verified production environments to prevent local/preview pollution */}
        {isProduction && gaId && <GoogleAnalytics gaId={gaId} />}
        <JsonLd data={websiteSchema} />
        <JsonLd data={businessSchema} />
        <Navbar />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
