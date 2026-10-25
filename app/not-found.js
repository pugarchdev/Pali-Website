import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F5F2EB] text-[#242421] px-6 py-24">
      <div className="max-w-xl text-center space-y-6">
        <span className="text-xs uppercase tracking-[0.28em] text-[#777B60] block">
          404 • Plate Not Found
        </span>

        <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl font-light text-[#242421]">
          Frame Not Found
        </h1>

        <p className="text-sm md:text-base text-[#5E5D57] font-light leading-relaxed">
          The requested plate, project, or page does not exist or has been relocated to the permanent archive.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#242421] text-[#FAF9F6] text-xs uppercase tracking-[0.2em] hover:bg-[#343430] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#D8D2C7] hover:border-[#242421] text-xs uppercase tracking-[0.2em] text-[#242421] transition-colors"
          >
            <span>Explore Portfolio Archive</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
