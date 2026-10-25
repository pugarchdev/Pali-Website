import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects } from "@/data/portfolio";
import Reveal from "@/components/motion/Reveal";
import ImageReveal from "@/components/motion/ImageReveal";

export default function FeaturedWork() {
  return (
    <section className="py-24 md:py-36 bg-[#F5F2EB] text-[#242421]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-28 border-b border-[#D8D2C7] pb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#777B60] block mb-3">
              Selected Collections
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#242421] font-light">
              Featured Love Stories &amp; Series
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-[#5E5D57] max-w-sm font-light">
            Timeless wedding tales, creative engagements, and majestic landscapes captured in their purest form.
          </p>
        </div>

        {/* Featured Projects with alternating rhythm */}
        <div className="space-y-28 md:space-y-40">
          {featuredProjects.slice(0, 4).map((project, index) => {
            const isReversed = index % 2 !== 0;
            const isTall = project.heroAspect === "tall";

            const imageColSpan = isTall
              ? isReversed
                ? "lg:col-span-5 lg:col-start-8"
                : "lg:col-span-5 lg:col-start-1"
              : isReversed
              ? "lg:col-span-7 lg:col-start-6"
              : "lg:col-span-7 lg:col-start-1";

            const textColSpan = isTall
              ? isReversed
                ? "lg:col-span-7 lg:col-start-1"
                : "lg:col-span-7 lg:col-start-6"
              : isReversed
              ? "lg:col-span-5 lg:col-start-1"
              : "lg:col-span-5 lg:col-start-8";

            return (
              <div
                key={project.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                  isReversed ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Image Column */}
                <div className={imageColSpan}>
                  <Reveal delay={0.1}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className={`group block relative overflow-hidden bg-[#D8D2C7] ${
                        isTall ? "max-w-md mx-auto" : "w-full"
                      }`}
                    >
                      <ImageReveal>
                        <div
                          className={`relative w-full overflow-hidden ${
                            isTall
                              ? "aspect-[3/4] max-h-[500px]"
                              : "aspect-[16/10]"
                          }`}
                        >
                          <Image
                            src={project.heroImage}
                            alt={`${project.title} - ${project.location}`}
                            fill
                            sizes={
                              isTall
                                ? "(max-width: 1024px) 100vw, 40vw"
                                : "(max-width: 1024px) 100vw, 60vw"
                            }
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-[#242421]/10 group-hover:bg-transparent transition-colors duration-500" />
                        </div>
                      </ImageReveal>

                      {/* Floating Project Tag */}
                      <div className="absolute top-4 left-4 z-10 bg-[#FAF9F6]/90 backdrop-blur-xs px-3 py-1 text-[10px] uppercase tracking-widest text-[#242421]">
                        {project.location}
                      </div>
                    </Link>
                  </Reveal>
                </div>

                {/* Text Content Column */}
                <div className={textColSpan}>
                  <Reveal delay={0.2}>
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-[#777B60]">
                        <span>0{index + 1}</span>
                        <span className="w-6 h-[1px] bg-[#D8D2C7]" />
                        <span>{project.category}</span>
                      </div>

                      <h3 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#242421] leading-tight font-normal">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="hover:text-[#777B60] transition-colors"
                        >
                          {project.title}
                        </Link>
                      </h3>

                      <p className="text-sm md:text-base text-[#5E5D57] font-light leading-relaxed">
                        {project.description}
                      </p>

                      <div className="pt-2">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-medium text-[#242421] hover:text-[#777B60] transition-colors border-b border-[#242421] hover:border-[#777B60] pb-1"
                        >
                          <span>View Project Series</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Projects link */}
        <div className="mt-24 text-center">
          <Reveal delay={0.2}>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#242421] text-[#FAF9F6] text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#343430] transition-colors"
            >
              <span>Explore Full Portfolio Archive</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
