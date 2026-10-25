"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";

export default function MobileMenu({ isOpen, onClose }) {
  const pathname = usePathname();

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const links = [
    { label: "Home", href: "/" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col bg-[#242421] text-[#FAF9F6] px-8 py-10 justify-between md:hidden"
        >
          {/* Top Bar inside Menu */}
          <div className="flex items-center justify-between border-b border-[#343430] pb-6">
            <Link href="/" onClick={onClose} className="relative h-14 w-40 block">
              <Image
                src="/media/2024/05/PNG-golden-1.png"
                alt="Pali Photography"
                fill
                sizes="160px"
                className="object-contain object-left"
              />
            </Link>
            <button
              onClick={onClose}
              aria-label="Close navigation menu"
              className="p-2 text-[#FAF9F6] hover:text-[#D8D2C7] transition-colors focus:outline-none focus:ring-1 focus:ring-[#D8D2C7]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col space-y-6 my-auto">
            {links.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`font-editorial text-3xl sm:text-4xl tracking-wide flex items-center justify-between transition-colors ${
                      isActive ? "text-[#FAF9F6] italic font-semibold" : "text-[#D8D2C7] hover:text-[#FAF9F6]"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-xs font-sans tracking-widest uppercase text-[#777B60]">
                      0{index + 1}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Bottom Info & CTA */}
          <div className="border-t border-[#343430] pt-6 space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#777B60]">Studio</p>
                <p className="text-sm text-[#D8D2C7] mt-1">Destination &amp; Studio Commissions Worldwide</p>
              </div>
              <Link
                href="/contact"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest bg-[#F5F2EB] text-[#242421] hover:bg-[#FAF9F6] transition-colors"
              >
                <span>Book Session</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
