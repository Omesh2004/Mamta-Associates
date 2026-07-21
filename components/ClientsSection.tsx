"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const CLIENTS = [
  { name: "Indian Railways", logo: "/images/logos/indian-railways.png" },
  { name: "Novotel Hotels", logo: "/images/logos/novotel.png" },
  { name: "Munna Maharaj Caterers", logo: "/images/logos/munna_maharaj.png" },
  { name: "Iq City Hospital", logo: "/images/logos/iq_city.png" },
  { name: "Ganpati Caterers", logo: "/images/logos/Ganpati Caterers.jpg" },
  { name: "Gee Gee Caterers", logo: "/images/logos/gee_gee.png" },
  { name: "Exporters to Bangladesh & Bhutan", logo: "/images/logos/exporters.png" },
];

export function ClientsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="bg-white dark:bg-transparent py-16 px-5 sm:px-8 border-y border-slate-200 dark:border-white/5 transition-colors duration-500 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mb-10 text-center"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-canopy dark:text-emerald-400">
            Trusted Partners
          </p>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Our Leading Consumers
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 dark:text-slate-400">
            Providing high-performance, safe cleaning solutions to industry leaders across hospitality, healthcare, railways, and international exports.
          </p>
        </motion.div>

        <div className="relative mt-12 flex items-center group">
          {/* Left Arrow */}
          <button 
            onClick={() => scroll("left")}
            className="absolute left-0 z-20 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-md text-slate-600 transition-all hover:scale-110 hover:text-emerald-600 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-emerald-400 hidden sm:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Fading Edges */}
          <div className="absolute left-0 top-0 z-10 h-full w-12 sm:w-24 bg-gradient-to-r from-white dark:from-slate-950 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 z-10 h-full w-12 sm:w-24 bg-gradient-to-l from-white dark:from-slate-950 to-transparent pointer-events-none" />

          {/* Scroll Track */}
          <div 
            ref={scrollRef}
            className="flex w-full overflow-x-auto snap-x snap-mandatory items-center gap-10 sm:gap-16 px-6 sm:px-12 py-4 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {CLIENTS.map((client, index) => (
              <div 
                key={`${client.name}-${index}`} 
                className="flex shrink-0 snap-center flex-col items-center justify-center gap-4 transition-all duration-300 group/item hover:-translate-y-1"
              >
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 overflow-hidden rounded-xl border border-slate-100 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm transition-all duration-300 group-hover/item:shadow-md group-hover/item:border-slate-200 dark:group-hover/item:border-white/20 dark:group-hover/item:shadow-emerald-900/20">
                  <div className="absolute inset-2 sm:inset-3">
                    <Image 
                      src={client.logo}
                      alt={client.logo ? `${client.name} logo` : client.name}
                      fill
                      className="object-contain transition-all duration-300 group-hover/item:opacity-100 dark:opacity-90 dark:brightness-90 dark:grayscale-[30%] group-hover/item:grayscale-0"
                      sizes="(max-width: 640px) 112px, 128px"
                    />
                  </div>
                </div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 text-center max-w-[160px]">
                  {client.name}
                </p>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => scroll("right")}
            className="absolute right-0 z-20 flex h-10 w-10 translate-x-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-md text-slate-600 transition-all hover:scale-110 hover:text-emerald-600 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-emerald-400 hidden sm:flex"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        {/* Mobile controls */}
        <div className="mt-8 flex justify-center gap-4 sm:hidden">
          <button 
            onClick={() => scroll("left")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm text-slate-600 transition-all active:scale-95 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm text-slate-600 transition-all active:scale-95 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
