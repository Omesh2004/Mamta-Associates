"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Leaf, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductCatalog } from "./ProductCatalog";

export function CatalogPage() {
  const [catalogText, setCatalogText] = useState({
    eyebrow: "Eco-Certified Cleaning Chemistry",
    title: "Product Catalog",
    description:
      "Browse our full range of green cleaning products. Filter by category, application, and certifications to find the right solution for your facility.",
    footer: "Mamta Associates. All rights reserved. Powered by Haylide Green Cleaning Technology."
  });

  useEffect(() => {
    fetch("/api/content", { cache: "no-store" })
      .then((response) => response.json())
      .then((content) => {
        if (content?.siteText?.catalog) {
          setCatalogText((current) => ({ ...current, ...content.siteText.catalog }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-slatewash">


      {/* ── PAGE HEADER ── */}
      <div className="bg-forest px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-300">
              {catalogText.eyebrow}
            </p>
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              {catalogText.title}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-emerald-50/80">
              {catalogText.description}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3 border-t border-white/20 pt-8">
              <a
                href="/resources/Haylide - Laundry Brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-md bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20 border border-white/10"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-mint text-forest">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                Laundry Division Catalog
              </a>
              <a
                href="/resources/Haylide Food Hygiene Brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-md bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20 border border-white/10"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-mint text-forest">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                Food Hygiene Catalog
              </a>
              <a
                href="/resources/Haylide Hospital Brochure 2024.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-md bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20 border border-white/10"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-mint text-forest">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                Hospital Division Catalog
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── CATALOG ── */}
      <ProductCatalog />

    </main>
  );
}
