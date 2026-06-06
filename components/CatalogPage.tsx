"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Leaf, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { ProductCatalog } from "./ProductCatalog";

export function CatalogPage() {
  return (
    <main className="min-h-screen bg-slatewash">
      {/* ── NAV ── */}
      <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-forest/95 px-5 py-3 backdrop-blur-md sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-forest">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-100">MAMTA ASSOCIATES</p>
            <p className="hidden text-[10px] text-emerald-50/70 sm:block">Green Cleaning Technology</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-3 sm:flex">
            {["GreenPro Certified", "FDA Licensed"].map((badge) => (
              <span key={badge} className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
                <ShieldCheck className="h-3.5 w-3.5 text-mint" />
                {badge}
              </span>
            ))}
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </Link>
        </div>
      </nav>

      {/* ── PAGE HEADER ── */}
      <div className="bg-forest px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-300">
              Eco-Certified Cleaning Chemistry
            </p>
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Product Catalog
            </h1>
            <p className="mt-3 max-w-2xl text-base text-emerald-50/80">
              Browse our full range of green cleaning products. Filter by category, application, and certifications to find the right solution for your facility.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── CATALOG ── */}
      <ProductCatalog />

      {/* ── FOOTER ── */}
      <footer className="border-t border-emerald-100 bg-white py-8 px-5 sm:px-8">
        <div className="mx-auto max-w-7xl text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Mamta Associates. All rights reserved. Powered by Haylide Green Cleaning Technology.
        </div>
      </footer>
    </main>
  );
}
