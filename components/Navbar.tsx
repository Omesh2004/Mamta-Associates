"use client";

import { Leaf, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-white/10 bg-forest/90 px-5 py-3 backdrop-blur-md sm:px-8">
      <Link href="/" className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-forest">
          <Leaf className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-100">MAMTA ASSOCIATES</p>
          <p className="hidden text-[10px] text-emerald-50/70 sm:block">Green Cleaning Technology</p>
        </div>
      </Link>
      
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-5 mr-2">
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
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-bold text-forest shadow-sm transition hover:bg-slate-100"
        >
          View Catalog
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </nav>
  );
}
