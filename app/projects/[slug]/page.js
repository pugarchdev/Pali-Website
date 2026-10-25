import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { featuredProjects } from "@/data/portfolio";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectNavigation from "@/components/projects/ProjectNavigation";
import Reveal from "@/components/motion/Reveal";

import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/siteConfig";
import { getBreadcrumbSchema, getProjectSchema } from "@/lib/schema";

export function generateStaticParams() {
  return featuredProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = featuredProjects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const projectUrl = `${siteConfig.siteUrl}/projects/${project.slug}`;

  return {
    title: `${project.title} — ${project.location}`,
    description: project.description,
    alternates: {
      canonical: projectUrl,
    },
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.description,
      url: projectUrl,
      type: "article",
      images: [
        {
          url: project.heroImage,
          width: 1200,
          height: 800,
          alt: `${project.title} — ${project.location}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${siteConfig.name}`,
      description: project.description,
      images: [project.heroImage],
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const currentIndex = featuredProjects.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = featuredProjects[currentIndex];
  const prevProject =
    currentIndex > 0 ? featuredProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < featuredProjects.length - 1
      ? featuredProjects[currentIndex + 1]
      : null;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: project.title, path: `/projects/${project.slug}` },
  ]);
  const projectSchema = getProjectSchema(project);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={projectSchema} />
      <article className="min-h-screen bg-[#F5F2EB] text-[#242421]">
        {/* Full-width Hero Banner */}
        <section className="relative min-h-[75vh] md:min-h-[85vh] flex items-end pb-16 md:pb-24 overflow-hidden bg-[#242421] text-[#FAF9F6]">
          <div className="absolute inset-0 z-0">
            <Image
              src={project.heroImage}
              alt={`${project.title} — ${project.location}`}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-[0.70] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#242421] via-transparent to-[#242421]/40" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
            <Reveal>

              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D8D2C7] hover:text-[#FAF9F6] transition-colors mb-6 group"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                <span>Back to Selected Work</span>
              </Link>

            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-[#777B60] mb-3">
              <span>{project.category}</span>
              <span>•</span>
              <span className="text-[#D8D2C7]">{project.location}</span>
              <span>•</span>
              <span className="text-[#D8D2C7]">{project.year}</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FAF9F6] font-light max-w-4xl leading-[1.02]">
              {project.title}
            </h1>

            {project.subtitle && (
              <p className="mt-4 text-base md:text-xl text-[#D8D2C7] font-light max-w-2xl">
                {project.subtitle}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {/* Project Metadata & Editorial Essay */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Metadata Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-8 border-t lg:border-t-0 border-[#D8D2C7] pt-8 lg:pt-0">
            <Reveal>
              <h3 className="text-xs uppercase tracking-[0.25em] text-[#777B60] mb-4">
                Field Documentation
              </h3>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-[#777B60]">Client / Commission</dt>
                  <dd className="font-editorial text-lg text-[#242421] mt-0.5">{project.client}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-[#777B60]">Location &amp; Terrain</dt>
                  <dd className="font-editorial text-lg text-[#242421] mt-0.5">{project.location}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-[#777B60]">Year of Fieldwork</dt>
                  <dd className="font-editorial text-lg text-[#242421] mt-0.5">{project.year}</dd>
                </div>
                {project.details && (
                  <>
                    {Object.entries(project.details).map(([key, val]) => (
                      <div key={key}>
                        <dt className="text-xs uppercase tracking-wider text-[#777B60] capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </dt>
                        <dd className="font-editorial text-lg text-[#242421] mt-0.5">{val}</dd>
                      </div>
                    ))}
                  </>
                )}
              </dl>

              <div className="pt-6">
                <Link
                  href={`/contact?project=${encodeURIComponent(project.title)}`}
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs uppercase tracking-[0.2em] bg-[#242421] text-[#FAF9F6] hover:bg-[#343430] transition-colors"
                >
                  <span>Enquire About This Work</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Editorial Narrative (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <Reveal delay={0.1}>
              <span className="text-xs uppercase tracking-[0.25em] text-[#777B60] block mb-2">
                Narrative &amp; Observation
              </span>
              <p className="font-editorial text-2xl md:text-3xl text-[#242421] font-light leading-relaxed">
                {project.description}
              </p>
            </Reveal>

            {project.narrative && (
              <Reveal delay={0.2}>
                <div className="space-y-4 text-base text-[#5E5D57] font-light leading-relaxed pt-4 border-t border-[#D8D2C7]">
                  {project.narrative.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Project Gallery Plates */}
      <section className="pb-24 max-w-7xl mx-auto px-6 md:px-12">
        <ProjectGallery
          images={project.gallery}
          projectTitle={project.title}
          category={project.category}
          location={project.location}
          year={project.year}
        />
      </section>

      {/* Next / Previous Project Navigation */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <ProjectNavigation prevProject={prevProject} nextProject={nextProject} />
      </section>
      </article>
    </>
  );
}
