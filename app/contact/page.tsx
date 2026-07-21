"use client";

import { useLenis } from "lenis/react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Mail, Phone, Factory, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";


export default function ContactPage() {
  const scrollY = useMotionValue(0);
  useLenis((e) => {
    scrollY.set(e.scroll);
  });
  const backgroundY = useTransform(scrollY, [0, 1500], [0, 300]);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let errorMsg = "Failed to send message";
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        } catch {
          // If it fails to parse JSON, use the default error message
        }
        throw new Error(errorMsg);
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(error.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-emerald-500/30 transition-colors duration-500">
      {/* ── HAZIFIED PARALLAX BACKGROUND ── */}
      <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">

        <div className="absolute inset-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-[12px] transition-colors duration-500"></div>
        {/* Subtle glowing orbs */}
        <div className="absolute top-0 right-1/4 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/2 rounded-full bg-emerald-600/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[600px] w-[600px] -translate-x-1/3 translate-y-1/3 rounded-full bg-teal-600/10 blur-[150px]" />
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
              Get in Touch
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-7xl">
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400 dark:from-emerald-400 dark:to-teal-200">Mamta Associates</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300 sm:text-xl">
              Partner with us for a sustainable operational ecosystem. Reach out for product inquiries, bulk orders, or custom chemistry solutions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <section className="relative px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-16 lg:grid-cols-2">
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Contact Information</h2>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">Our team is ready to assist you with technical specifications and supply chain integration.</p>
              </div>

              <div className="space-y-8">
                <div className="group flex items-start gap-6 transition-all hover:-translate-y-1">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-gradient-to-br dark:from-emerald-400/20 dark:to-teal-500/20 text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20 transition-transform group-hover:scale-110">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Phone</p>
                    <p className="mt-1 text-xl font-medium text-slate-900 dark:text-white transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-300">+91 98311 92035</p>
                  </div>
                </div>

                <div className="group flex items-start gap-6 transition-all hover:-translate-y-1">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-gradient-to-br dark:from-emerald-400/20 dark:to-teal-500/20 text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20 transition-transform group-hover:scale-110">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Email</p>
                    <a href="mailto:anubhavmisra74@gmail.com" className="mt-1 block text-xl font-medium text-slate-900 dark:text-white transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-300">
                      anubhavmisra74@gmail.com
                    </a>
                  </div>
                </div>

                <div className="group flex items-start gap-6 transition-all hover:-translate-y-1">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-gradient-to-br dark:from-emerald-400/20 dark:to-teal-500/20 text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20 transition-transform group-hover:scale-110">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Registered Office</p>
                    <p className="mt-1 text-lg font-medium text-slate-900 dark:text-white transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-300">Shop no 4, 7 Khudiram Bose Sarani</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Opposite Royal Government of Bhutan Consulate<br />Kolkata 700080</p>
                  </div>
                </div>

                <div className="group flex items-start gap-6 transition-all hover:-translate-y-1">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-gradient-to-br dark:from-emerald-400/20 dark:to-teal-500/20 text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20 transition-transform group-hover:scale-110">
                    <Factory className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Manufacturing & Registration</p>
                    <p className="mt-1 text-xl font-medium text-slate-900 dark:text-white transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-300">WHO-GMP Compliant Facility</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">GST: 19AFVPM5018E1Z5</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 opacity-50 blur-2xl" />
              <div className="relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-8 shadow-2xl backdrop-blur-md sm:p-10">
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/10 dark:ring-white/5 pointer-events-none" />
                <h3 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">Send us a message</h3>
                
                {submitStatus === "success" ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-8 text-center"
                  >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">Message Sent!</h4>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">Thank you for reaching out. We will get back to you shortly.</p>
                    <button 
                      onClick={() => setSubmitStatus("idle")}
                      className="mt-6 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {submitStatus === "error" && (
                      <div className="rounded-xl border border-rose-200 dark:border-rose-500/20 bg-rose-50 dark:bg-rose-500/10 p-4 text-sm font-medium text-rose-600 dark:text-rose-400">
                        {errorMessage}
                      </div>
                    )}
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 shadow-inner backdrop-blur-sm transition-all focus:border-emerald-500 focus:bg-white dark:focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-emerald-500" 
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Company Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 shadow-inner backdrop-blur-sm transition-all focus:border-emerald-500 focus:bg-white dark:focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-emerald-500" 
                        placeholder="john@company.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                      <textarea 
                        id="message" 
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={5}
                        className="w-full resize-none rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 shadow-inner backdrop-blur-sm transition-all focus:border-emerald-500 focus:bg-white dark:focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-emerald-500" 
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-4 text-sm font-bold tracking-wide text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-emerald-500/25 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                    >
                      {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </main>
  );
}
