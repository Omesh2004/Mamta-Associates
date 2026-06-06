"use client";

import { useLenis } from "lenis/react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Mail, Phone, Factory, MapPin } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
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
              Get in Touch
            </p>
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Contact Mamta Associates
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-50/80">
              Partner with us for a sustainable operational ecosystem. Reach out for product inquiries, bulk orders, or custom chemistry solutions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-2">
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-white">Contact Information</h2>
                <p className="mt-2 text-slate-300">Our team is ready to assist you with technical specifications and supply chain integration.</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10 text-emerald-400">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">Phone</p>
                    <p className="mt-1 text-lg font-medium text-white">+91 98200 00000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10 text-emerald-400">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">Email</p>
                    <a href="mailto:support@mamtaassociates.in" className="mt-1 text-lg font-medium text-emerald-400 hover:text-emerald-300 transition">
                      support@mamtaassociates.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10 text-emerald-400">
                    <Factory className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">Manufacturing</p>
                    <p className="mt-1 text-lg font-medium text-white">WHO-GMP Compliant Facility</p>
                    <p className="text-slate-300">India</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 shadow-sm"
            >
              <h3 className="text-xl font-bold text-white mb-6">Send us a message</h3>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white placeholder-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400" 
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Company Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white placeholder-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400" 
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white placeholder-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 resize-none" 
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full rounded-md bg-white px-4 py-3 text-sm font-bold text-black shadow-sm transition hover:bg-canopy"
                >
                  Send Message
                </button>
              </form>
            </motion.div>

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
