"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Leaf, ShieldCheck, Factory, Phone, Mail, ArrowRight,
  Star, Droplets, Recycle, Award, ChevronLeft, ChevronRight,
  FlaskConical, Globe, Zap
} from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { HeroScene } from "./HeroScene";
import { products } from "@/lib/products";

const ECO_QUOTES = [
  {
    quote: "The Earth does not belong to us. We belong to the Earth.",
    author: "Chief Seattle",
    icon: "🌍"
  },
  {
    quote: "We do not inherit the earth from our ancestors; we borrow it from our children.",
    author: "Native American Proverb",
    icon: "🌱"
  },
  {
    quote: "In every walk with nature, one receives far more than he seeks.",
    author: "John Muir",
    icon: "🍃"
  },
  {
    quote: "The greatest threat to our planet is the belief that someone else will save it.",
    author: "Robert Swan",
    icon: "♻️"
  },
  {
    quote: "Sustainability is not a destination. It is a way of thinking and acting.",
    author: "Mamta Associates",
    icon: "💚"
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

const FEATURED_PRODUCTS = [products[0], products[1], products[2]];

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
      setIndex((prev) => (prev + 1) % ECO_QUOTES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  function goTo(next: number, dir: number) {
    setDirection(dir);
    setIndex((next + ECO_QUOTES.length) % ECO_QUOTES.length);
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 })
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 px-8 py-10 backdrop-blur-md">
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <button
          onClick={() => goTo(index - 1, -1)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
          aria-label="Previous quote"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <button
          onClick={() => goTo(index + 1, 1)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
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
            <p className="mb-3 text-4xl">{ECO_QUOTES[index].icon}</p>
            <blockquote className="text-lg font-medium italic leading-8 text-white sm:text-xl">
              &ldquo;{ECO_QUOTES[index].quote}&rdquo;
            </blockquote>
            <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-emerald-200">
              — {ECO_QUOTES[index].author}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {ECO_QUOTES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > index ? 1 : -1)}
            className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-mint" : "w-2 bg-white/30"}`}
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
      className="flex flex-col items-center rounded-2xl border border-emerald-100 bg-white p-6 shadow-lift text-center"
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-canopy">
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-3xl font-bold text-forest">{value}</p>
      <p className="mt-1 text-sm font-medium text-slate-500">{label}</p>
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
      className="group rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:shadow-lift hover:-translate-y-1"
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-canopy transition group-hover:bg-forest group-hover:text-white">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
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
      className={`group rounded-[1.75rem] border border-emerald-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lift ${
        index === 0 ? "lg:col-span-2" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-canopy">{category}</p>
          <h3 className="mt-2 text-xl font-semibold leading-tight text-slate-900">{title}</h3>
        </div>
        <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-forest">
          {active}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {badges.slice(0, 3).map((badge) => (
          <span key={badge} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {badge}
          </span>
        ))}
      </div>

      <p className="mt-5 text-sm leading-6 text-slate-500">{impact}</p>

      <div className="mt-6 h-px bg-gradient-to-r from-emerald-100 via-slate-200 to-transparent" />
      <p className="mt-4 text-sm font-medium text-slate-700 transition group-hover:text-forest">
        Built for real facility workflows, not just a nice-looking shelf.
      </p>
    </motion.article>
  );
}

export function LandingPage() {
  const statsRef = useRef<HTMLElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <main className="bg-slatewash">
      {/* ── NAV ── */}
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-white/10 bg-forest/90 px-5 py-3 backdrop-blur-md sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-forest">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-100">MAMTA ASSOCIATES</p>
            <p className="hidden text-[10px] text-emerald-50/70 sm:block">Green Cleaning Technology</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="#features" className="hidden text-sm font-medium text-emerald-100 transition hover:text-white sm:block">
            Features
          </a>
          <a href="#about" className="hidden text-sm font-medium text-emerald-100 transition hover:text-white sm:block">
            About
          </a>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 rounded-lg bg-mint px-4 py-2 text-sm font-semibold text-forest shadow-sm transition hover:bg-emerald-400"
          >
            View Catalog
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen overflow-hidden bg-forest pt-16 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.18),transparent_26%),radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.11),transparent_18%),linear-gradient(115deg,rgba(0,77,64,1)_0%,rgba(11,102,70,0.92)_43%,rgba(4,120,87,0.76)_100%)]" />
        <div className="absolute inset-0 opacity-18 [background-image:linear-gradient(rgba(255,255,255,0.11)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.11)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="absolute right-[-8rem] top-20 h-[24rem] w-[24rem] rounded-full bg-mint/10 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[-7rem] h-[20rem] w-[20rem] rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 grid min-h-[calc(100vh-4rem)] grid-cols-1 items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_1.02fr] lg:px-12 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="mb-7 inline-flex items-center gap-4 rounded-full border border-white/15 bg-white/8 px-4 py-2 backdrop-blur-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-forest">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-100">MAMTA ASSOCIATES</p>
                <p className="text-sm text-emerald-50/80">A small catalogue with a very specific job</p>
              </div>
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
              Cleaning chemistry
              <br />
              that has to hold up
              <br />
              <span className="text-mint">in the real world.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-50/88">
              We make hospital, kitchen, laundry, washroom, and industrial products for teams that care about what happens after the brochure ends - the wipe-down, the rinse, the audit, the next shift.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Built for procurement, ops, and compliance",
                "No perfume-first shortcuts",
                "GreenPro, FDA, WHO-GMP"
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/15 bg-white/8 px-4 py-3 text-sm text-emerald-50/92 backdrop-blur-md">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {BADGES.map((badge) => (
                <span key={badge} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                  <ShieldCheck className="h-4 w-4 text-mint" />
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 rounded-xl bg-mint px-7 py-3.5 text-base font-bold text-forest shadow-lift transition hover:bg-emerald-400 hover:scale-105"
              >
                See the catalog
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                What makes it different
              </a>
            </div>

            <div className="mt-10 grid gap-3 text-sm text-emerald-50 sm:grid-cols-3">
              <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-mint" /> +91 98200 00000</span>
              <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-mint" /> support@mamtaassociates.in</span>
              <span className="flex items-center gap-2"><Factory className="h-4 w-4 text-mint" /> India manufacturing, global supply</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, ease: "easeOut", delay: 0.15 }}
            className="relative min-h-[560px] overflow-hidden rounded-[2rem] border border-white/14 bg-white/8 shadow-2xl backdrop-blur-sm"
          >
            <HeroScene />
            <div className="absolute left-6 top-6 max-w-[230px] rounded-2xl border border-white/24 bg-white/14 p-4 shadow-lift backdrop-blur-md">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-100">Field note</p>
              <p className="mt-2 text-sm leading-6 text-white/90">
                The first thing customers notice is not the claim. It&apos;s that the product behaves the same at the bench, on site, and in procurement.
              </p>
            </div>
            <div className="absolute inset-x-6 bottom-6 rounded-[1.5rem] border border-white/24 bg-white/18 p-5 shadow-lift backdrop-blur-md sm:left-auto sm:right-8 sm:w-[360px]">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-white text-xl font-bold text-forest shadow-lg">
                  1979
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-emerald-100">Made in India</p>
                  <h2 className="mt-0.5 text-lg font-bold text-white">Mamta Associates</h2>
                  <p className="mt-1.5 text-sm leading-5 text-emerald-50/88">
                    Practical green chemistry for healthcare, food zones, laundry rooms, and hard-working floors.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
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
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-canopy">Catalog snapshot</p>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">A few products, shown the way buyers actually read them.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-500">
              The catalog is built around real buying decisions: what zone it belongs in, what it replaces, and what it needs to survive in the field.
            </p>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-3">
            {FEATURED_PRODUCTS.map((product, index) => (
              <ProductCard key={product.id} {...product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE CAROUSEL ── */}
      <section className="bg-forest py-16 px-5 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-emerald-300">
              Sustainability notes
            </p>
            <h2 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl">
              Why the catalog exists
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
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-canopy">By the numbers</p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Proof, not just promises</h2>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} {...stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="bg-white py-16 px-5 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="mb-12 text-center"
          >
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-canopy">Why people buy it</p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Science-backed, but written for human beings.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500">
              Every formula is engineered to deliver professional-grade cleaning performance while protecting people, surfaces, and the environment. The difference is in the details: dilution, dwell time, compatibility, and what gets left behind.
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
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-canopy">Our promise</p>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Safe enough for the audit.
                <br />Strong enough for the job.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-500">
                Mamta Associates was founded on the belief that industrial cleaning doesn&apos;t have to come at the cost of environmental health. Every product in our catalog is formulated to be as safe for the planet as it is effective for your facility.
              </p>
              <p className="mt-4 text-base leading-7 text-slate-500">
                From hospital-grade disinfectants to food-safe kitchen degreasers, our chemistry is built on biodegradable surfactants, enzyme systems, and GRAS-compliant actives — with zero compromise on performance.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["GreenPro Certified", "STP Safe", "FDA Licensed", "WHO-GMP Following"].map((badge) => (
                  <span key={badge} className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2 text-sm font-semibold text-forest">
                    <ShieldCheck className="h-4 w-4 text-mint" />
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
                { icon: "🏥", title: "Hospital Grade", desc: "Broad-spectrum disinfection meeting healthcare facility standards." },
                { icon: "🍽️", title: "Food Safe", desc: "US FDA GRAS compliant formulas for food preparation zones." },
                { icon: "🏭", title: "Industrial Strength", desc: "Heavy-duty degreasing without petrochemical solvents." },
                { icon: "🌿", title: "Eco Certified", desc: "Independently verified biodegradable and aquatic-safe chemistry." }
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm ${i === 0 ? "sm:translate-y-2" : i === 3 ? "sm:-translate-y-2" : ""}`}
                >
                  <p className="mb-2 text-3xl">{item.icon}</p>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-forest py-20 px-5 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-emerald-100 backdrop-blur-sm">
              <Star className="h-4 w-4 text-mint" />
              Trusted by hospitals, hotels, and industrial facilities across India
            </div>
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Ready to build a cleaner, calmer ops stack?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-emerald-50/85">
              Browse our full catalog of eco-certified cleaning chemistry. Filter by category, application, and certifications to find the right product for your facility.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 rounded-xl bg-mint px-8 py-4 text-base font-bold text-forest shadow-lift transition hover:bg-emerald-400 hover:scale-105"
              >
                Browse Product Catalog
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="mailto:support@mamtaassociates.in"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                <Mail className="h-5 w-5" />
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-emerald-100 bg-white py-10 px-5 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest text-white">
                <Leaf className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">MAMTA ASSOCIATES</p>
                <p className="text-xs text-slate-500">Green Cleaning Technology</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><Phone className="h-4 w-4 text-canopy" /> +91 98200 00000</span>
              <span className="flex items-center gap-1.5"><Mail className="h-4 w-4 text-canopy" /> support@mamtaassociates.in</span>
              <span className="flex items-center gap-1.5"><Factory className="h-4 w-4 text-canopy" /> India manufacturing</span>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} Mamta Associates. All rights reserved. Powered by Haylide Green Cleaning Technology.
          </div>
        </div>
      </footer>
    </main>
  );
}
