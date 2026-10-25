import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { siteConfig } from "@/data/siteConfig";

export default function ContactCTA() {
  return (
    <section className="relative py-28 md:py-36 bg-[#242421] text-[#FAF9F6] overflow-hidden">
      {/* Background photographic texture with heavy contrast and tone */}
      <div className="absolute inset-0 z-0 opacity-25">
        <Image
          src="/media/2024/05/17-scaled.jpg"
          alt="Atmospheric wedding celebration by Pali Photography"
          fill
          sizes="100vw"
          className="object-cover object-center grayscale"
        />
        <div className="absolute inset-0 bg-[#242421]/80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center space-y-8">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.28em] text-[#777B60] block mb-3">
            Inquiries &amp; Bookings
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#FAF9F6] font-light leading-tight">
            Every Moment Deserves to Be Timeless — Let’s Create Yours.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-sm md:text-base text-[#D8D2C7] font-light leading-relaxed max-w-xl mx-auto">
            Whether you are planning your wedding day, a creative pre-wedding session, or a scenic destination celebration, I would love to connect and hear your story.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#FAF9F6] text-[#242421] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#F5F2EB] transition-colors"
            >
              <span>Begin Your Enquiry</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-center gap-2 px-6 py-4 text-xs uppercase tracking-[0.22em] text-[#D8D2C7] hover:text-[#FAF9F6] border border-[#343430] hover:border-[#D8D2C7] transition-colors"
            >
              <span>{siteConfig.contact.email}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
