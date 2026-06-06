"use client";

import { Leaf, ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky left-0 right-0 top-0 z-50 border-b border-white/10 bg-forest/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-3 z-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-forest">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-100">MAMTA ASSOCIATES</p>
            <p className="hidden text-[10px] text-emerald-50/70 sm:block">Green Cleaning Technology</p>
          </div>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          <Link href="/" className={`text-sm font-semibold transition ${pathname === '/' ? 'text-white' : 'text-emerald-100 hover:text-white'}`}>
            Home
          </Link>
          <Link href="/about" className={`text-sm font-semibold transition ${pathname === '/about' ? 'text-white' : 'text-emerald-100 hover:text-white'}`}>
            About Us
          </Link>
          <Link href="/contact" className={`text-sm font-semibold transition ${pathname === '/contact' ? 'text-white' : 'text-emerald-100 hover:text-white'}`}>
            Contact Us
          </Link>
        </div>

        {/* Desktop Action & Mobile Toggle */}
        <div className="flex items-center gap-3 z-50">
          <Link
            href="/catalog"
            className="hidden sm:inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-bold text-forest shadow-sm transition hover:bg-slate-100"
          >
            View Catalog
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden flex items-center justify-center h-10 w-10 rounded-md border border-white/20 text-white bg-white/5 transition hover:bg-white/10"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="sm:hidden overflow-hidden border-t border-white/10 bg-forest/95 backdrop-blur-md"
          >
            <div className="flex flex-col px-5 py-5 gap-5">
              <Link 
                href="/" 
                onClick={() => setIsOpen(false)}
                className={`text-base font-semibold transition ${pathname === '/' ? 'text-white' : 'text-emerald-100 hover:text-white'}`}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                onClick={() => setIsOpen(false)}
                className={`text-base font-semibold transition ${pathname === '/about' ? 'text-white' : 'text-emerald-100 hover:text-white'}`}
              >
                About Us
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setIsOpen(false)}
                className={`text-base font-semibold transition ${pathname === '/contact' ? 'text-white' : 'text-emerald-100 hover:text-white'}`}
              >
                Contact Us
              </Link>
              <div className="pt-3 border-t border-white/10">
                <Link
                  href="/catalog"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex w-full justify-center items-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-bold text-forest shadow-sm transition hover:bg-slate-100"
                >
                  View Catalog
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
