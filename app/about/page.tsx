"use client";

import { useLenis } from "lenis/react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ShieldCheck, Users, Globe, Leaf } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const scrollY = useMotionValue(0);
  useLenis((e) => {
    scrollY.set(e.scroll);
  });
  const backgroundY = useTransform(scrollY, [0, 1500], [0, 300]);

  return (
    <main className="relative min-h-screen">
      {/* ── HAZIFIED PARALLAX BACKGROUND ── */}
      <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
        <motion.div style={{ y: backgroundY }} className="absolute -inset-[20%] h-[140%] w-[140%]">
          <Image
            src="/images/OIP.webp"
            alt="Background"
            fill
            className="object-cover opacity-60"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-[8px]"></div>
      </div>

      {/* ── PAGE HEADER ── */}
      <div className="bg-forest px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-300">
              Corporate Profile
            </p>
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              About Mamta Associates
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-50/80">
              Pioneering Green Cleaning Technology in India for over 45 years. We engineer uncompromising performance with globally certified safety.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                A Legacy of Excellence
              </h2>
              <div className="mt-6 space-y-5 text-lg text-slate-300 leading-relaxed">
                <p>
                  Since 1979, Mamta Associates has been built on a singular vision: providing industrial and commercial facilities with cleaning technology that performs without compromise.
                </p>
                <p>
                  We recognized early on that true efficiency doesn't come from taking shortcuts. It comes from advanced green chemistry, rigorous testing, and a deep understanding of real-world operational challenges.
                </p>
                <p>
                  Today, as a leading provider of GreenPro certified cleaning chemicals, our commitment remains unchanged. We deliver hospital-grade disinfection, food-safe hygiene, and industrial-strength cleaning while protecting our people, our water bodies, and our planet.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-xl border border-white/10"
            >
              <Image 
                src="/images/founder.jpeg"
                alt="Founder & Proprietor"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, title: "FDA Licensed", desc: "Formulations meeting the strictest regulatory healthcare standards." },
              { icon: Globe, title: "Aquatic Safe", desc: "Passing 96-hour BioAssay metrics for complete environmental safety." },
              { icon: Users, title: "People First", desc: "US FDA GRAS compliant formulas keeping your staff and customers safe." },
              { icon: Leaf, title: "GreenPro", desc: "India's first independently verified green cleaning chemicals." }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-sm text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-emerald-400">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-emerald-100 bg-white py-10 px-5 sm:px-8 mt-auto">
        <div className="mx-auto max-w-6xl text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Mamta Associates. All rights reserved. Powered by Haylide Green Cleaning Technology.
        </div>
      </footer>
    </main>
  );
}
