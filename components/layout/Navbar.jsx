"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowRight } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine if current page has an inverted (dark) hero at top
  const isDarkHero = pathname === "/" || pathname.startsWith("/projects/");
  const isLightNav = isScrolled || !isDarkHero;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-[#F5F2EB]/95 backdrop-blur-md shadow-xs py-3 md:py-4 border-b border-[#D8D2C7]/60 text-[#242421]"
            : isDarkHero
            ? "bg-transparent py-5 md:py-6 text-[#FAF9F6]"
            : "bg-transparent py-5 md:py-6 text-[#242421]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center focus:outline-none focus:ring-0 focus-visible:outline-none"
            aria-label="Pali Photography"
          >
            <div
              className={`relative transition-all duration-300 group-hover:scale-105 ${
                isScrolled
                  ? "h-12 w-36 sm:h-14 sm:w-44 md:h-16 md:w-48"
                  : "h-14 w-40 sm:h-16 sm:w-48 md:h-20 md:w-60"
              }`}
            >
              <Image
                src="/media/2024/05/PNG-golden-1.png"
                alt="Pali Photography — Images for life"
                fill
                priority
                sizes="(max-width: 768px) 180px, 240px"
                className={`object-contain object-left transition-all duration-300 ${
                  isLightNav
                    ? "brightness-0 opacity-85 contrast-125"
                    : "brightness-100 opacity-100 drop-shadow-sm"
                }`}
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-[0.2em] font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-colors hover:text-[#777B60] focus:outline-none focus:ring-0 focus-visible:outline-none select-none ${
                    isActive ? "font-semibold" : "opacity-90"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[1.5px] ${
                        isScrolled || !isDarkHero ? "bg-[#303B32]" : "bg-[#FAF9F6]"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/contact"
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 font-medium border focus:outline-none focus:ring-0 ${
                isScrolled
                  ? "border-[#242421] text-[#242421] hover:bg-[#242421] hover:text-[#FAF9F6]"
                  : isDarkHero
                  ? "border-[#FAF9F6]/80 text-[#FAF9F6] hover:bg-[#FAF9F6] hover:text-[#242421]"
                  : "border-[#242421] text-[#242421] hover:bg-[#242421] hover:text-[#FAF9F6]"
              }`}
            >
              <span>Let&apos;s Talk</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile navigation menu"
            className={`p-2 md:hidden transition-colors focus:outline-none focus:ring-0 focus-visible:outline-none ${
              isScrolled
                ? "text-[#242421]"
                : isDarkHero
                ? "text-[#FAF9F6]"
                : "text-[#242421]"
            }`}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
