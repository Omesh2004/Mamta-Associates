"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Leaf, ShieldCheck, Factory, Phone, Mail, ArrowRight,
  Star, Droplets, Recycle, Award, ChevronLeft, ChevronRight,
  FlaskConical, Globe, Zap, Building2, Users, Hospital, Utensils, Lightbulb, Quote
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { products } from "@/lib/products";
import { FAQChatbot } from "./FAQChatbot";

const CORE_VALUES = [
  {
    quote: "Protecting against Bacterial & Viral Infections with Human Safe Disinfectants with FDA approved efficacy.",
    author: "Infection Protection",
    icon: ShieldCheck
  },
  {
    quote: "Readily Biodegradable Ingredients, Free from Phosphates, Inorganic Acids, APE, and EDTA. Ensuring world leading safety of water bodies.",
    author: "Environmental Safety",
    icon: Globe
  },
  {
    quote: "Improving Air Quality and ensuring Food safety as per US FDA GRAS. All touch surfaces remain free from toxic chemicals.",
    author: "People Safety Above All",
    icon: Users
  },
  {
    quote: "Soda Free Laundry, Silicate Free Machine wash, and pH Neutral Non Strip Cleaners ensure extended life of your valuable assets.",
    author: "Long Life of Assets",
    icon: Building2
  },
  {
    quote: "Resource, Manpower, Water, time & Electricity saving in Laundry, F&B, Dairy and allied Industries.",
    author: "Resource & Cost Efficiency",
    icon: Lightbulb
  }
];

const STATS = [
  { value: "45+", label: "Years of Innovation", icon: Award },
  { value: "100%", label: "Biodegradable Formulas", icon: Recycle },
  { value: "6", label: "Product Categories", icon: FlaskConical },
  { value: "Zero", label: "VOC Emissions", icon: Droplets }
];

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "GreenPro Certified",
    description:
      "India's first GreenPro certified cleaning chemicals — independently verified for environmental safety and performance."
  },
  {
    icon: FlaskConical,
    title: "Advanced Bio-Chemistry",
    description:
      "Alkyl polyglucosides, enzyme systems, and GRAS-compliant surfactants replace petrochemical solvents without sacrificing efficacy."
  },
  {
    icon: Globe,
    title: "Aquatic-Safe Formulas",
    description:
      "Every product passes 96-hour BioAssay metrics. Free from APE/NPE, phosphates, EDTA, NTA, and parabens."
  },
  {
    icon: Zap,
    title: "High-Performance Results",
    description:
      "Hospital-grade disinfection, industrial degreasing, and food-safe kitchen chemistry — all from a single green supplier."
  },
  {
    icon: Factory,
    title: "India Manufacturing",
    description:
      "WHO-GMP following manufacturing facility in India with global supply capability and consistent quality control."
  },
  {
    icon: Leaf,
    title: "FDA Licensed",
    description:
      "FDA licensed formulations for hospital and food-service environments, meeting the strictest regulatory standards."
  }
];

const BADGES = [
  "India's First GreenPro Certified",
  "FDA Licensed",
  "WHO-GMP Following"
];

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function QuoteCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % CORE_VALUES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  function goTo(next: number, dir: number) {
    setDirection(dir);
    setIndex((next + CORE_VALUES.length) % CORE_VALUES.length);
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 })
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-slate-900/50 px-8 py-10 backdrop-blur-md">
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <button
          onClick={() => goTo(index - 1, -1)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 dark:bg-white/5 text-white transition hover:bg-white/30 dark:hover:bg-white/10"
          aria-label="Previous quote"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <button
          onClick={() => goTo(index + 1, 1)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 dark:bg-white/5 text-white transition hover:bg-white/30 dark:hover:bg-white/10"
          aria-label="Next quote"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="min-h-[120px] px-8">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="text-center"
          >
            <div className="mb-4 flex justify-center text-emerald-400">
              {(() => {
                const Icon = CORE_VALUES[index].icon;
                return <Icon className="h-10 w-10" />;
              })()}
            </div>
            <p className="text-lg font-medium leading-8 text-white sm:text-xl">
              {CORE_VALUES[index].quote}
            </p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-emerald-200 dark:text-emerald-400">
              — {CORE_VALUES[index].author}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {CORE_VALUES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > index ? 1 : -1)}
            className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-mint" : "w-2 bg-white/30 dark:bg-white/10"}`}
            aria-label={`Go to quote ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function StatCard({ value, label, icon: Icon, index }: { value: string; label: string; icon: React.ElementType; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      className="flex flex-col items-center rounded-2xl border border-emerald-100 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-lift dark:shadow-none backdrop-blur-sm text-center"
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/20 text-canopy dark:text-emerald-400">
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-3xl font-bold text-forest dark:text-white">{value}</p>
      <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
    </motion.div>
  );
}

function FeatureCard({ icon: Icon, title, description, index }: { icon: React.ElementType; title: string; description: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      className="group rounded-2xl border border-emerald-100 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-sm dark:shadow-none backdrop-blur-sm transition hover:shadow-lift dark:hover:bg-white/10 hover:-translate-y-1"
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/20 text-canopy dark:text-emerald-400 transition group-hover:bg-forest group-hover:text-white dark:group-hover:bg-emerald-400 dark:group-hover:text-emerald-950">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>
    </motion.div>
  );
}

function ProductCard({
  title,
  category,
  active,
  impact,
  badges,
  index
}: {
  title: string;
  category: string;
  active: string;
  impact: string;
  badges: string[];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      className={`group rounded-2xl border border-emerald-100 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-sm dark:shadow-none backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-lift dark:hover:bg-white/10 ${
        index === 0 ? "lg:col-span-2" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-canopy dark:text-emerald-400">{category}</p>
          <h3 className="mt-2 text-xl font-semibold leading-tight text-slate-900 dark:text-white">{title}</h3>
        </div>
        <div className="rounded-full bg-emerald-50 dark:bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-forest dark:text-emerald-300">
          {active}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {badges.slice(0, 3).map((badge) => (
          <span key={badge} className="rounded-full bg-slate-100 dark:bg-white/10 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300">
            {badge}
          </span>
        ))}
      </div>

      <p className="mt-5 text-sm leading-6 text-slate-500 dark:text-slate-400">{impact}</p>

      <div className="mt-6 h-px bg-gradient-to-r from-emerald-100 dark:from-white/10 via-slate-200 dark:via-white/5 to-transparent" />
      <p className="mt-4 text-sm font-medium text-slate-700 dark:text-slate-400 transition group-hover:text-forest dark:group-hover:text-emerald-300">
        Rigorously tested to meet and exceed global compliance standards.
      </p>
    </motion.article>
  );
}

export function LandingPage() {
  const [content, setContent] = useState({
    siteText: {
      home: {
        heroBadge: "Quality assured by specialists",
        heroTitleLine1: "World-Class",
        heroTitleLine2: "High Performance",
        heroTitleAccent: "Green Cleaning.",
        heroDescription:
          "Manufacturing over 90 specialty products for Housekeeping, Infection Control, Medical, Food-Pharma, and Laundry. Delivering FDA-licensed efficacy with uncompromising environmental safety.",
        primaryCta: "View Product Catalog",
        secondaryCta: "Corporate Profile",
        phone: "+91 98200 00000",
        email: "support@mamtaassociates.in",
        location: "India manufacturing",
        catalogEyebrow: "Our Core Solutions",
        catalogTitle: "Engineered for Specific Industrial Applications.",
        catalogDescription:
          "Our complete range is designed for critical hygiene needs, reducing inventory and training costs while ensuring resource, manpower, and utility savings."
      },
      brand: {
        name: "MAMTA ASSOCIATES",
        tagline: "Green Cleaning Technology"
      },
      catalog: {
        footer: "Mamta Associates. All rights reserved. Powered by Haylide Green Cleaning Technology."
      }
    },
    products
  });
  const statsRef = useRef<HTMLElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });
  
  const homeText = content.siteText.home;
  const brandText = content.siteText.brand;
  const featuredProducts = content.products.slice(0, 3);

  useEffect(() => {
    fetch("/api/content", { cache: "no-store" })
      .then((response) => response.json())
      .then((nextContent) => {
        if (nextContent?.siteText?.home && Array.isArray(nextContent.products)) {
          setContent(nextContent);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <main className="bg-slatewash dark:bg-slate-950 transition-colors duration-500">


      {/* ── HERO ── */}
      <section className="relative min-h-screen bg-slate-50 dark:bg-transparent pt-20 border-b border-slate-200 dark:border-white/10 transition-colors duration-500 overflow-hidden">
        {/* Dark mode background orbs */}
        <div className="absolute top-0 right-1/4 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/2 rounded-full bg-emerald-600/20 blur-[120px] hidden dark:block pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 h-[600px] w-[600px] -translate-x-1/3 translate-y-1/3 rounded-full bg-teal-600/10 blur-[150px] hidden dark:block pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl grid min-h-[calc(100vh-5rem)] grid-cols-1 items-center gap-12 px-5 py-10 sm:px-8 lg:grid-cols-2 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="mb-7 inline-flex items-center gap-3 rounded-md border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-2 backdrop-blur-sm">
              <Leaf className="h-5 w-5 text-forest dark:text-emerald-400" />
              <p className="text-sm font-semibold uppercase tracking-wider text-forest dark:text-emerald-300">{homeText.heroBadge}</p>
            </div>

            <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
              {homeText.heroTitleLine1}
              <br />
              {homeText.heroTitleLine2}
              <br />
              <span className="text-forest dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-emerald-400 dark:to-teal-200">{homeText.heroTitleAccent}</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              {homeText.heroDescription}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                "ISO 9001:2008 WHO-GMP",
                "US FDA GRAS Listed",
                "Meet NABH Standards"
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-md border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 shadow-sm backdrop-blur-sm">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 rounded-md bg-forest dark:bg-emerald-500 px-8 py-4 text-base font-bold text-white shadow-md transition hover:bg-canopy dark:hover:bg-emerald-400 dark:hover:text-slate-950"
              >
                {homeText.primaryCta}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-md border border-slate-300 dark:border-white/20 bg-white dark:bg-white/5 px-8 py-4 text-base font-semibold text-slate-700 dark:text-white shadow-sm transition hover:bg-slate-50 dark:hover:bg-white/10 backdrop-blur-sm"
              >
                {homeText.secondaryCta}
              </a>
            </div>

            <div className="mt-10 grid gap-3 text-sm text-slate-500 dark:text-slate-400 sm:grid-cols-3">
              <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> {homeText.phone}</span>
              <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> {homeText.email}</span>
              <span className="flex items-center gap-2"><Factory className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> {homeText.location}</span>
            </div>
          </motion.div>

          <div className="relative grid grid-cols-2 gap-4 lg:gap-6 h-full min-h-[480px]">
            {/* Card A: Product Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative col-span-2 sm:col-span-1 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden flex flex-col justify-end min-h-[320px]"
            >
              <Image 
                src="/images/ANU UNCLE1.jpeg" 
                alt="Complete Range" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <div className="relative z-10 p-6 mt-auto">
                <p className="text-xs font-bold uppercase tracking-widest text-white/90">Comprehensive Range</p>
              </div>
            </motion.div>

            <div className="col-span-2 sm:col-span-1 flex flex-col gap-4 lg:gap-6">
              {/* Card B: Legacy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-1 rounded-xl border border-slate-200 dark:border-white/10 bg-forest dark:bg-slate-900/50 p-6 shadow-sm flex flex-col justify-center text-white backdrop-blur-sm"
              >
                <Award className="h-8 w-8 text-emerald-300 dark:text-emerald-400 mb-4" />
                <p className="text-3xl font-bold tracking-tight">22+ Years</p>
                <p className="mt-2 text-sm text-emerald-100/90 dark:text-slate-300 leading-relaxed">
                  Of uncompromising quality and GreenPro certified chemical engineering.
                </p>
              </motion.div>

              {/* Card C: Products */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex-1 rounded-xl border border-emerald-100 dark:border-white/10 bg-emerald-50 dark:bg-white/5 p-6 shadow-sm flex flex-col justify-center backdrop-blur-sm"
              >
                <FlaskConical className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mb-4" />
                <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">60+ Products</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 font-medium">Specialty formulations</p>
              </motion.div>
            </div>

            {/* Card D: Full width Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="col-span-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-sm flex flex-wrap items-center justify-between gap-6 backdrop-blur-sm"
            >
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Globally Certified Standards</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Manufactured under WHO-GMP guidelines</p>
              </div>
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
                  <ShieldCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
                  <Globe className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
                  <Leaf className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CATALOG SNAPSHOT ── */}
      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-canopy dark:text-emerald-400">{homeText.catalogEyebrow}</p>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{homeText.catalogTitle}</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              {homeText.catalogDescription}
            </p>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} {...product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE CAROUSEL ── */}
      <section className="bg-forest dark:bg-slate-900/50 py-16 px-5 sm:px-8 transition-colors duration-500">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-emerald-300 dark:text-emerald-400">
              Our Commitment
            </p>
            <h2 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl">
              The Mamta Associates Promise
            </h2>
            <QuoteCarousel />
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} className="py-16 px-5 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="mb-10 text-center"
          >
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-canopy dark:text-emerald-400">By the numbers</p>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Proof, not just promises</h2>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} {...stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="bg-white dark:bg-transparent py-16 px-5 sm:px-8 transition-colors duration-500">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="mb-12 text-center"
          >
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-canopy dark:text-emerald-400">The Mamta Associates Advantage</p>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              Engineered for Operational Excellence.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 dark:text-slate-400">
              Every formula is rigorously tested to deliver professional-grade cleaning performance while protecting people, surfaces, and the environment. Uncompromising efficacy meets independently verified environmental safety.
            </p>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
            {FEATURES.map((feature, i) => (
              <div key={feature.title} className={i === 0 ? "lg:col-span-4" : i === 1 || i === 2 ? "lg:col-span-4" : "lg:col-span-3"}>
                <FeatureCard {...feature} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / SAFETY PROMISE ── */}
      <section id="about" className="py-16 px-5 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65 }}
            >
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-canopy dark:text-emerald-400">Our Philosophy</p>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                Uncompromising Performance.
                <br />Certified Safety.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-500 dark:text-slate-400">
                Mamta Associates leads the industry with formulations that ensure world-class efficacy without compromising environmental or human health. Our innovative products are driven by a commitment to true green chemistry.
              </p>
              <p className="mt-4 text-base leading-7 text-slate-500 dark:text-slate-400">
                From FDA-licensed hospital-grade disinfectants to US FDA GRAS-compliant kitchen degreasers, our chemistry relies on readily biodegradable surfactants and advanced enzyme systems to deliver exceptional results.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["GreenPro Certified", "STP Safe", "FDA Licensed", "WHO-GMP Following"].map((badge) => (
                  <span key={badge} className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border dark:border-emerald-500/20 px-4 py-2 text-sm font-semibold text-forest dark:text-emerald-300">
                    <ShieldCheck className="h-4 w-4 text-mint dark:text-emerald-400" />
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="grid gap-4 sm:grid-cols-2"
            >
              {[
                { icon: <Hospital className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />, title: "Hospital Grade", desc: "Broad-spectrum disinfection meeting healthcare facility standards." },
                { icon: <Utensils className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />, title: "Food Safe", desc: "US FDA GRAS compliant formulas for food preparation zones." },
                { icon: <Factory className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />, title: "Industrial Strength", desc: "Heavy-duty degreasing without petrochemical solvents." },
                { icon: <Leaf className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />, title: "Eco Certified", desc: "Independently verified biodegradable and aquatic-safe chemistry." }
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`rounded-xl border border-emerald-100 dark:border-white/10 bg-white dark:bg-white/5 p-5 shadow-sm dark:shadow-none backdrop-blur-sm ${i === 0 ? "sm:translate-y-2" : i === 3 ? "sm:-translate-y-2" : ""}`}
                >
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MESSAGE FROM PROPRIETOR ── */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-20 px-5 sm:px-8 border-t border-slate-200 dark:border-white/10 transition-colors duration-500">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full aspect-[4/5] max-w-sm mx-auto rounded-xl overflow-hidden shadow-xl"
            >
              <Image 
                src="/images/founder.jpeg"
                alt="Founder & Proprietor"
                fill
                className="object-cover brightness-110 contrast-125 saturate-110"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Quote className="h-12 w-12 text-emerald-200 dark:text-emerald-500/50 mb-6" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl mb-6">
                A Legacy of Uncompromising Quality
              </h2>
              <div className="space-y-4 text-lg text-slate-600 dark:text-slate-300">
                <p>
                  Since 2003, Mamta Associates has been built on a singular vision: providing industrial and commercial facilities with cleaning technology that performs without compromise. 
                </p>
                <p>
                  We recognized early on that true efficiency doesn't come from taking shortcuts. It comes from advanced green chemistry, rigorous testing, and a deep understanding of real-world operational challenges.
                </p>
                <p>
                  Today, as a leading provider of GreenPro certified cleaning chemicals, our commitment remains unchanged. We deliver hospital-grade disinfection, food-safe hygiene, and industrial strength cleaning while protecting our people, our water bodies, and our planet.
                </p>
              </div>
              <div className="mt-8">
                <p className="text-xl font-bold text-forest dark:text-emerald-100">Founder & Proprietor</p>
                <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mt-1">Mamta Associates</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-forest dark:bg-slate-900/80 py-20 px-5 sm:px-8 border-t border-transparent dark:border-white/5 transition-colors duration-500">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-emerald-100 backdrop-blur-sm">
              <Star className="h-4 w-4 text-mint dark:text-emerald-400" />
              Trusted by hospitals, hotels, and industrial facilities across India
            </div>
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Partner with us for a sustainable operational ecosystem.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-emerald-50/85">
              Explore our complete range of high-performance green cleaning chemistry. Discover solutions engineered for maximum efficacy, compliance, and environmental responsibility.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 rounded-md bg-white dark:bg-emerald-500 px-8 py-4 text-base font-bold text-forest dark:text-white shadow-md transition hover:bg-slate-50 dark:hover:bg-emerald-400 hover:scale-105"
              >
                Browse Product Catalog
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-transparent px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
              >
                <Mail className="h-5 w-5" />
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-emerald-100 dark:border-white/10 bg-white dark:bg-slate-950/80 py-10 px-5 sm:px-8 transition-colors duration-500 backdrop-blur-md">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest dark:bg-white/10 text-white">
                <Leaf className="h-5 w-5 text-white dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{brandText.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{brandText.tagline}</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5"><Phone className="h-4 w-4 text-canopy dark:text-emerald-400" /> {homeText.phone}</span>
              <span className="flex items-center gap-1.5"><Mail className="h-4 w-4 text-canopy dark:text-emerald-400" /> {homeText.email}</span>
              <span className="flex items-center gap-1.5"><Factory className="h-4 w-4 text-canopy dark:text-emerald-400" /> {homeText.location}</span>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-100 dark:border-white/10 pt-6 text-center text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} {content.siteText.catalog.footer}
          </div>
        </div>
      </footer>
      <FAQChatbot />
    </main>
  );
}
