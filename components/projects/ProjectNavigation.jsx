import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ProjectNavigation({ prevProject, nextProject }) {
  return (
    <div className="py-16 border-t border-[#D8D2C7] grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Previous Project */}
      {prevProject ? (
        <Link
          href={`/projects/${prevProject.slug}`}
          className="group block p-6 border border-[#D8D2C7] hover:border-[#242421] transition-all bg-[#FAF9F6]/50"
        >
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#777B60] mb-2">
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Previous Series</span>
          </div>
          <h4 className="font-editorial text-2xl text-[#242421] group-hover:text-[#777B60] transition-colors">
            {prevProject.title}
          </h4>
          <p className="text-xs text-[#5E5D57] mt-1 font-light">
            {prevProject.location} • {prevProject.category}
          </p>
        </Link>
      ) : (
        <div />
      )}

      {/* Next Project */}
      {nextProject ? (
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group block p-6 border border-[#D8D2C7] hover:border-[#242421] transition-all bg-[#FAF9F6]/50 text-right"
        >
          <div className="flex items-center justify-end gap-2 text-[10px] uppercase tracking-widest text-[#777B60] mb-2">
            <span>Next Series</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
          <h4 className="font-editorial text-2xl text-[#242421] group-hover:text-[#777B60] transition-colors">
            {nextProject.title}
          </h4>
          <p className="text-xs text-[#5E5D57] mt-1 font-light">
            {nextProject.location} • {nextProject.category}
          </p>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
