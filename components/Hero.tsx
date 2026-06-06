"use client";

import { motion } from "framer-motion";
import { Factory, Leaf, Mail, Phone, ShieldCheck } from "lucide-react";
import { HeroScene } from "./HeroScene";

const badges = [
  "India's First GreenPro Certified Cleaning Chemicals",
  "FDA Licensed",
  "WHO-GMP Following"
];

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-forest text-white">
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(0,77,64,1)_0%,rgba(11,102,70,0.92)_43%,rgba(4,120,87,0.76)_100%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative z-10 grid min-h-screen grid-cols-1 items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-12 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white text-forest">
              <Leaf className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-100">MAMTA ASSOCIATES</p>
              <p className="text-sm text-emerald-50/80">Powered by Haylide Green Cleaning Technology</p>
            </div>
          </div>

          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-normal sm:text-6xl lg:text-7xl">
            World Class High Performance Green Cleaning
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-50/88">
            Advanced green biocides, disinfectants, laundry chemistry, degreasers, and washroom hygiene products for hospital, food-service, and industrial procurement teams.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {badges.map((badge) => (
              <span key={badge} className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/12 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                <ShieldCheck className="h-4 w-4 text-mint" />
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-12 grid gap-3 text-sm text-emerald-50 sm:grid-cols-3">
            <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-mint" /> +91 98200 00000</span>
            <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-mint" /> support@mamtaassociates.in</span>
            <span className="flex items-center gap-2"><Factory className="h-4 w-4 text-mint" /> India manufacturing, global supply</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="relative min-h-[520px] overflow-hidden rounded-md border border-white/14 bg-white/8 shadow-2xl backdrop-blur-sm"
        >
          <HeroScene />
          <div className="absolute inset-x-6 bottom-6 rounded-md border border-white/24 bg-white/18 p-5 shadow-lift backdrop-blur-md sm:left-auto sm:right-8 sm:w-[360px]">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-emerald-100 to-white text-2xl font-bold text-forest shadow-lg">
                JD
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-emerald-100">Proprietor Profile</p>
                <h2 className="mt-1 text-xl font-semibold text-white">John Doe</h2>
                <p className="mt-2 text-sm leading-6 text-emerald-50/88">
                  Managing Director, driving innovation in green chemical engineering since 1979.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
