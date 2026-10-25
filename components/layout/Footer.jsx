import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigation = [
    { label: "Home", href: "/" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact & Booking", href: "/contact" },
  ];

  const legalNotes = [
    "All wedding and portfolio photographs protected by copyright.",
    "Commission enquiries welcomed worldwide.",
    "Capturing your forever in every frame."
  ];

  return (
    <footer className="bg-[#242421] text-[#FAF9F6] border-t border-[#343430] pt-20 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#343430]">
          {/* Brand & Statement (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <Link
              href="/"
              className="inline-block group focus:outline-none focus:ring-0"
              aria-label="Pali Photography"
            >
              <div className="relative h-14 w-44 sm:h-16 sm:w-52 md:h-18 md:w-56 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/media/2024/05/PNG-golden-1.png"
                  alt="Pali Photography — Images for life"
                  fill
                  sizes="(max-width: 768px) 180px, 240px"
                  className="object-contain object-left drop-shadow-sm"
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#777B60] block mt-2">
                {siteConfig.profession}
              </span>
            </Link>

            <p className="text-sm text-[#D8D2C7] leading-relaxed max-w-md font-light">
              Hello! I&apos;m Pali, a storyteller with a lens, capturing the beauty, raw emotions,
              and connection that define your wedding day. Every click whispers a story, each frame holds a dream.
            </p>

            <div className="pt-2 text-xs text-[#D8D2C7]/70 space-y-1">
              <p>{siteConfig.tagline}</p>
              <p>{siteConfig.contact.locationGeneral}</p>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.22em] text-[#777B60] font-medium">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#D8D2C7] hover:text-[#FAF9F6] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.22em] text-[#777B60] font-medium">
              Enquiries &amp; Studio
            </h3>
            <div className="space-y-3 text-sm text-[#D8D2C7]">
              <div>
                <span className="text-xs text-[#777B60] block uppercase tracking-wider">Direct Email</span>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-[#FAF9F6] transition-colors border-b border-[#343430] hover:border-[#D8D2C7] pb-0.5"
                >
                  {siteConfig.contact.email}
                </a>
              </div>

              <div>
                <span className="text-xs text-[#777B60] block uppercase tracking-wider">Studio Phone</span>
                <a
                  href={`tel:${siteConfig.contact.telephone.replace(/\s+/g, '')}`}
                  className="hover:text-[#FAF9F6] transition-colors"
                >
                  {siteConfig.contact.telephone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between text-xs text-[#777B60] gap-4">
          <p>
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-[11px] text-[#D8D2C7]/60">
            {legalNotes.map((note, index) => (
              <span key={index} className="hidden sm:inline">
                {index > 0 && "• "} {note}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
