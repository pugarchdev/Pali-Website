import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import ImageReveal from "@/components/motion/ImageReveal";
import { siteConfig } from "@/data/siteConfig";

export default function AboutPreview() {
  return (
    <section className="py-24 md:py-36 bg-[#FAF9F6] text-[#242421] border-t border-[#D8D2C7]/70">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Portrait Column (5 cols) */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="relative">
                <ImageReveal>
                  <div className="relative aspect-[3/4] w-full bg-[#D8D2C7] overflow-hidden">
                    <Image
                      src="/media/2024/05/17-scaled.jpg"
                      alt="Pali Photography, Wedding and Lifestyle Visual Storyteller"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-center contrast-105 hover:scale-105 transition-all duration-700"
                    />
                  </div>
                </ImageReveal>

                {/* Subtitle tag below portrait */}
                <div className="mt-4 flex justify-between items-center text-[10px] uppercase tracking-[0.22em] text-[#777B60]">
                  <span>Pali</span>
                  <span>Storyteller with a Lens</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Philosophy and Bio Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal delay={0.2}>
              <span className="text-xs uppercase tracking-[0.25em] text-[#777B60] block mb-2">
                Philosophy &amp; Ethos
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#242421] font-light leading-[1.1]">
                &ldquo;Every love story deserves a beautiful frame.&rdquo;
              </h2>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="space-y-5 text-sm md:text-base text-[#5E5D57] font-light leading-relaxed max-w-xl">
                <p>
                  Hello! I’m Pali, a storyteller with a lens, capturing the beauty, connection, and raw emotions that define your wedding day.
                </p>
                <p>
                  Your celebration is a tapestry of love, joy, and deep human bond. My goal is to ensure that your photography experience is as effortless, relaxed, and enjoyable as the day itself. With a warm and easygoing approach, I create an atmosphere where you can relax and be your truest selves, allowing your unique story to unfold naturally.
                </p>
              </div>
            </Reveal>

            {/* Core Pillars */}
            <Reveal delay={0.4}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-[#D8D2C7]">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#777B60] block">Ethos</span>
                  <p className="font-editorial text-lg text-[#242421] mt-1">Felt, Not Posed</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#777B60] block">Speciality</span>
                  <p className="font-editorial text-lg text-[#242421] mt-1">Weddings &amp; Couples</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#777B60] block">Atmosphere</span>
                  <p className="font-editorial text-lg text-[#242421] mt-1">Candid &amp; Timeless</p>
                </div>
              </div>
            </Reveal>

            {/* Links */}
            <Reveal delay={0.5}>
              <div className="pt-4 flex flex-wrap items-center gap-6">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-medium text-[#242421] hover:text-[#777B60] transition-colors border-b border-[#242421] hover:border-[#777B60] pb-1"
                >
                  <span>Read Full Story</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.2em] bg-[#242421] text-[#FAF9F6] hover:bg-[#343430] transition-colors"
                >
                  <span>Connect with Pali</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
