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
    <main className="relative min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-emerald-500/30 transition-colors duration-500">
      {/* ── HAZIFIED PARALLAX BACKGROUND ── */}
      <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">

        <div className="absolute inset-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-[12px] transition-colors duration-500"></div>
        {/* Subtle glowing orbs */}
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600/20 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[600px] w-[600px] translate-x-1/3 translate-y-1/3 rounded-full bg-teal-600/10 blur-[150px]" />
      </div>

      {/* ── PAGE HEADER ── */}
      <div className="relative border-b border-slate-200 dark:border-white/5 bg-white/50 dark:bg-slate-900/50 px-5 py-24 sm:px-8 sm:py-32 backdrop-blur-md transition-colors duration-500">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 1] }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
              Corporate Profile
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-7xl">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400 dark:from-emerald-400 dark:to-teal-200">Mamta Associates</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300 sm:text-xl">
              Pioneering Green Cleaning Technology in India for over 22 years. We engineer uncompromising performance with globally certified safety standards.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── QUOTE SECTION ── */}
      <section className="relative px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute left-1/2 top-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />
            <div className="mb-8 text-emerald-500/50">
              <svg className="mx-auto h-16 w-16" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
            </div>
            <p className="text-2xl font-medium leading-relaxed tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Our vision was never just about cleaning better. It was about creating a sustainable future where industrial efficiency and environmental responsibility go hand in hand.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-emerald-500" />
              <div className="text-left">
                <div className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Mr. Anubhav Mishra</div>
                <div className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">Founder, Mamta Associates</div>
              </div>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-emerald-500" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="relative px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                A Legacy of Excellence
              </h2>
              <div className="mt-8 space-y-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                <p>
                  Since 2002, Mamta Associates has been built on a singular vision: providing industrial and commercial facilities with cleaning technology that performs without compromise.
                </p>
                <p>
                  We recognized early on that true efficiency does not come from taking shortcuts. It comes from advanced green chemistry, rigorous testing, and a deep understanding of real-world operational challenges.
                </p>
                <p className="border-l-2 border-emerald-500/50 pl-4 font-medium text-slate-800 dark:text-slate-200">
                  Today, as a leading provider of GreenPro certified cleaning chemicals, our commitment remains unchanged. We deliver hospital-grade disinfection, food-safe hygiene, and industrial-strength cleaning while protecting our people, our water bodies, and our planet.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full"
            >
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 opacity-50 blur-2xl" />
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-2xl">
                <Image 
                  src="/images/founder.jpeg"
                  alt="Founder & Proprietor"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105 brightness-110 contrast-125 saturate-110"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/10 dark:ring-white/10 pointer-events-none" />
              </div>
            </motion.div>
          </div>

          <div className="mt-32 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-8 text-center backdrop-blur-md transition-all hover:border-emerald-500/30 dark:hover:border-emerald-500/30 hover:bg-slate-50 dark:hover:bg-white/10 shadow-sm dark:shadow-none"
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 dark:bg-gradient-to-br dark:from-emerald-400/20 dark:to-teal-500/20 text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20 transition-transform group-hover:scale-110">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 transition-colors group-hover:text-slate-700 dark:group-hover:text-slate-300 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative border-t border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-slate-950/80 py-12 px-5 sm:px-8 mt-auto backdrop-blur-lg transition-colors duration-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Mamta Associates. All rights reserved.</p>
          <p className="flex items-center gap-1">Powered by <span className="text-emerald-600 dark:text-emerald-500/80 font-medium">Haylide Green Cleaning Technology</span></p>
        </div>
      </footer>
    </main>
  );
}
