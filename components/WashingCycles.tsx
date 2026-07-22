"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Flame,
  Droplets,
  Timer,
  Info,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Zap,
  ChevronRight,
  TrendingDown,
  Layers
} from "lucide-react";

type TierDetails = {
  name: string;
  badge?: string;
  products: { name: string; desc: string; type?: string }[];
};

type CycleStep = {
  title: string;
  type: "wash" | "rinse" | "neutralize";
  tiers?: TierDetails[];
  description?: string;
};

type LaundryProgram = {
  id: string;
  category: string;
  icon: string;
  title: string;
  cyclesCount: string;
  subtitle: string;
  steps: CycleStep[];
  savings: string[];
};

const LAUNDRY_PROGRAMS: LaundryProgram[] = [
  {
    id: "towels-linen",
    category: "Towels / Linen",
    icon: "🛏️",
    title: "Towels & Linen Program",
    cyclesCount: "2+2 Cycle Program",
    subtitle: "Eco friendly cycle with Oxygen Bleach formulation",
    steps: [
      {
        title: "Detergent & Bleach Cycle",
        type: "wash",
        description: "Primary wash cycle to emulsify soils and lift stains using eco-friendly active chemistry.",
        tiers: [
          {
            name: "Super Premium",
            badge: "Completely Eco Friendly",
            products: [{ name: "Laundro Complete", desc: "Powder Detergent & Oxy Bleach" }]
          },
          {
            name: "Premium",
            products: [{ name: "Laundro Excel", desc: "Econo Powder Oxy-Detergent" }]
          },
          {
            name: "Regular",
            products: [
              { name: "Laundro Det", desc: "Powder Detergent & Booster" },
              { name: "LaundroBleach - O", desc: "Powder Oxygen Bleach" }
            ]
          },
          {
            name: "Economy",
            products: [
              { name: "Laundro Shot", desc: "Econo Powder Detergent & Booster" },
              { name: "LaundroBleach - O", desc: "Powder Oxygen Bleach" }
            ]
          }
        ]
      },
      {
        title: "Intermediate Rinse",
        type: "rinse",
        description: "Flush cycle to remove suspended dirt, surfactant residue, and bleach agents."
      },
      {
        title: "Neutralizer & Softener Cycle",
        type: "neutralize",
        description: "Final conditioning to balance pH, soften fabric fibers, and eliminate static cling.",
        tiers: [
          {
            name: "Super Premium & Premium",
            products: [{ name: "LaundroSoft - N", desc: "Softener & Neutralizer" }]
          },
          {
            name: "Regular & Economy",
            products: [
              { name: "Laundro Rinse", desc: "Liquid Neutralizer" },
              { name: "LaundroSoft", desc: "Liquid Softener" }
            ]
          }
        ]
      },
      {
        title: "Final Rinse & Extract",
        type: "rinse",
        description: "Last rinse and high-speed spin extraction to prepare linen for rapid drying."
      }
    ],
    savings: [
      "Saving of 4 Cycles (Electricity & Water)",
      "Range of Cost Options (Economy to Super Premium)",
      "Use of Oxy Bleach ensures Long Life of Towels & Linen"
    ]
  },
  {
    id: "guest-laundry",
    category: "Guest Laundry",
    icon: "👔",
    title: "Guest Laundry Program",
    cyclesCount: "2 Cycle Program",
    subtitle: "Eco friendly high-speed quality cleaning program",
    steps: [
      {
        title: "Detergent & Bleach Cycle",
        type: "wash",
        description: "Main cleaning wash tailored for delicate guest garments and high brightness levels.",
        tiers: [
          {
            name: "Super Premium",
            badge: "Whites + Color",
            products: [{ name: "Laundro Complete", desc: "Powder Detergent & Oxy Bleach" }]
          },
          {
            name: "Premium",
            badge: "Whites + Color",
            products: [{ name: "Laundro Excel", desc: "Econo Powder Oxy-Detergent" }]
          },
          {
            name: "Regular",
            badge: "Whites + Color",
            products: [
              { name: "LaundroKleen", desc: "Light Duty Liquid Detergent" },
              { name: "LaundroBleach - O", desc: "Powder Oxygen Bleach" }
            ]
          },
          {
            name: "Economy",
            badge: "White + Colour",
            products: [{ name: "LaundroKleen", desc: "Light Duty Liquid Detergent" }]
          }
        ]
      },
      {
        title: "Rinse & Extract",
        type: "rinse",
        description: "Thorough rinsing and extraction for soft, chemical-free guest clothing."
      }
    ],
    savings: [
      "Optimized 2-step layout for fastest cycle turnaround",
      "Protects delicate colors and fabric strength",
      "Gentle skin-friendly chemical residues"
    ]
  },
  {
    id: "staff-uniforms",
    category: "Staff / F&B Laundry",
    icon: "🧥",
    title: "Staff Uniforms & F&B Program",
    cyclesCount: "2+2 Cycle Program",
    subtitle: "Heavy emulsification cycle with active Oxygen Bleach",
    steps: [
      {
        title: "Detergent & Bleach Cycle",
        type: "wash",
        description: "Heavy soil removal with specialized emulsifiers for kitchen grease and uniform stains.",
        tiers: [
          {
            name: "Super Premium",
            badge: "Completely Eco Friendly",
            products: [
              { name: "Laundro Complete", desc: "Powder Detergent & Oxy Bleach" },
              { name: "Laundro Mulse - E", desc: "Liquid Emulsifier" }
            ]
          },
          {
            name: "Premium",
            products: [
              { name: "Laundro Excel", desc: "Econo Powder Oxy-Detergent" },
              { name: "Laundro Mulse - E", desc: "Liquid Emulsifier" }
            ]
          },
          {
            name: "Regular",
            products: [
              { name: "Laundro Det", desc: "Powder Detergent & Booster" },
              { name: "LaundroBleach - O", desc: "Powder Oxygen Bleach" },
              { name: "Laundro Mulse - E", desc: "Liquid Emulsifier" }
            ]
          },
          {
            name: "Economy",
            products: [
              { name: "Laundro Shot", desc: "Econo Powder Detergent & Booster" },
              { name: "LaundroBleach - O", desc: "Powder Oxygen Bleach" },
              { name: "Laundro Mulse - E", desc: "Liquid Emulsifier" }
            ]
          }
        ]
      },
      {
        title: "Intermediate Rinse",
        type: "rinse",
        description: "F&B stain extraction rinse."
      },
      {
        title: "Neutralizer Cycle",
        type: "neutralize",
        description: "pH stabilization to prevent skin irritation from uniforms during long shifts.",
        tiers: [
          {
            name: "All Tiers",
            products: [{ name: "Laundro Rinse", desc: "Liquid Neutralizer" }]
          }
        ]
      },
      {
        title: "Final Rinse & Extract",
        type: "rinse",
        description: "Final extraction for grease-free, press-ready uniforms."
      }
    ],
    savings: [
      "Saving of 4 Cycles (Electricity & Water)",
      "High-performance oil & grease emulsification",
      "Use of Oxy Bleach yields Long Life of Towels & Uniforms"
    ]
  }
];

export function WashingCycles() {
  const [activeTab, setActiveTab] = useState("towels-linen");

  const currentProgram = LAUNDRY_PROGRAMS.find((p) => p.id === activeTab) || LAUNDRY_PROGRAMS[0];

  return (
    <section className="bg-slate-50 dark:bg-slate-900/30 py-20 px-5 sm:px-8 border-t border-slate-200 dark:border-white/10 transition-colors duration-500" id="washing-cycles">
      <div className="mx-auto max-w-7xl">
        
        {/* ── HEADER ── */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/25 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
            <Zap className="h-3.5 w-3.5" />
            Smart Operations
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Example of Reduced Washing Cycles
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 dark:text-slate-400">
            Engineered laundry systems configured to reduce washing stages, saving power and water while ensuring world-class hygiene and fabric longevity.
          </p>
        </div>

        {/* ── INTERACTIVE TAB SELECTOR ── */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 p-1.5 border border-slate-200/50 dark:border-white/5 shadow-inner">
            {LAUNDRY_PROGRAMS.map((program) => {
              const isActive = program.id === activeTab;
              return (
                <button
                  key={program.id}
                  onClick={() => setActiveTab(program.id)}
                  className={`relative flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-all duration-300 outline-none ${
                    isActive
                      ? "text-white shadow-md bg-forest dark:bg-emerald-500"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span>{program.icon}</span>
                  <span className="hidden sm:inline">{program.category}</span>
                  <span className="sm:hidden">{program.category.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── TAB CONTENT ── */}
        <div className="grid gap-8 lg:grid-cols-[1.8fr_1.2fr] items-start">
          
          {/* PIPELINE / SYSTEM STEPS */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-6 sm:p-8 shadow-sm transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/5 pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {currentProgram.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{currentProgram.subtitle}</p>
                </div>
                <span className="shrink-0 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 text-xs font-bold text-forest dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20">
                  {currentProgram.cyclesCount}
                </span>
              </div>

              {/* Steps timeline */}
              <div className="relative border-l-2 border-emerald-100 dark:border-emerald-500/20 pl-6 ml-4 space-y-8 my-4">
                {currentProgram.steps.map((step, stepIdx) => (
                  <div key={step.title} className="relative">
                    
                    {/* Circle icon locator */}
                    <div className={`absolute -left-[35px] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-bold ${
                      step.type === "wash"
                        ? "border-forest bg-forest text-white dark:border-emerald-500 dark:bg-emerald-500"
                        : step.type === "neutralize"
                        ? "border-indigo-600 bg-indigo-600 text-white dark:border-indigo-400 dark:bg-indigo-400"
                        : "border-slate-300 bg-white dark:border-white/20 dark:bg-slate-900 text-slate-500 dark:text-slate-400"
                    }`}>
                      {stepIdx + 1}
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{step.title}</h4>
                    {step.description && (
                      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{step.description}</p>
                    )}

                    {/* Tier Products breakdown within the step */}
                    {step.tiers && (
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {step.tiers.map((tier) => (
                          <div
                            key={tier.name}
                            className={`rounded-xl border p-4 shadow-sm backdrop-blur-sm transition-all duration-300 ${
                              tier.name.includes("Super Premium")
                                ? "border-emerald-200 dark:border-emerald-500/20 bg-emerald-50/40 dark:bg-emerald-500/5 hover:border-emerald-300"
                                : "border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 hover:border-slate-300 dark:hover:border-white/20"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                {tier.name}
                              </span>
                              {tier.badge && (
                                <span className="rounded-full bg-emerald-100 dark:bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-800 dark:text-emerald-400 uppercase">
                                  {tier.badge}
                                </span>
                              )}
                            </div>
                            <div className="space-y-1.5">
                              {tier.products.map((prod) => (
                                <div key={prod.name} className="flex items-start gap-1.5">
                                  <CheckCircle className="h-3.5 w-3.5 text-forest dark:text-emerald-400 shrink-0 mt-0.5" />
                                  <div>
                                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{prod.name}</p>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{prod.desc}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR: PROGRAM HIGHLIGHTS & INSTRUCTIONS */}
          <div className="space-y-6">
            
            {/* SAVINGS CARD */}
            <div className="rounded-2xl bg-gradient-to-br from-forest to-canopy dark:from-emerald-950 dark:to-teal-900 text-white p-6 sm:p-8 shadow-lg relative overflow-hidden">
              <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 opacity-10 pointer-events-none">
                <Timer className="h-40 w-40" />
              </div>
              <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-emerald-300 dark:text-emerald-400 animate-pulse" />
                Operational Benefits
              </h3>
              <ul className="space-y-3.5">
                {currentProgram.savings.map((saving, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm font-medium text-emerald-50 dark:text-slate-200">
                    <CheckCircle className="h-5 w-5 text-emerald-300 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{saving}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-emerald-200">
                <span className="flex items-center gap-1.5"><Timer className="h-4 w-4" /> Reduced cycle run time</span>
                <span className="flex items-center gap-1.5"><TrendingDown className="h-4 w-4" /> Utility & water conservation</span>
              </div>
            </div>

            {/* TECHNICAL NOTES CARD */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                <Info className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                Specialist Notes
              </h3>
              <div className="space-y-4">
                <div className="rounded-lg bg-slate-50 dark:bg-white/5 p-3 text-xs leading-relaxed">
                  <span className="font-bold text-forest dark:text-emerald-400 block mb-1">💡 Oxygen Bleach Advantage</span>
                  Oxygen bleach cycles stabilize fabric structure, giving long life to linens and towels, while avoiding the abrasive decay caused by traditional chlorines.
                </div>
                <div className="rounded-lg bg-slate-50 dark:bg-white/5 p-3 text-xs leading-relaxed">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">👔 Neutralization Necessity</span>
                  pH neutralizers are calibrated to neutralize washing residues, avoiding skin rashes for staff and guests, and maintaining uniform brightness.
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── EXPERT GUIDELINES & SPECIFICATION NOTES ── */}
        <div className="mt-12">
          <div className="border-b border-slate-200 dark:border-white/10 pb-3 mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-forest dark:text-emerald-400" />
              Expert Laundry Guidelines & System Notes
            </h3>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            
            {/* Note 1 */}
            <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5 shadow-sm">
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-forest dark:text-emerald-400 font-bold text-sm">
                A
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Chlorine Bleaching Alternative</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                <strong>Laundrochlor - 10</strong> may be used in place of Oxy Bleach <em>Laundro Bleach - O</em>. However, it must be used in a <strong>separate cycle</strong> from the detergent. Doing so will add <strong>2 extra cycles</strong> (Bleach + extra Rinse) to the program.
              </p>
            </div>

            {/* Note 2 */}
            <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5 shadow-sm">
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-forest dark:text-emerald-400 font-bold text-sm">
                B
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Heavy Soiling Performance Booster</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Use <strong>Laundro Mulse Super</strong> for cleaning heavily soiled towels, linen, guest laundry, or lightly soiled staff uniforms. Add at a <strong>low dosage</strong> in the detergent cycle for best stain emulsification results.
              </p>
            </div>

            {/* Note 3 */}
            <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5 shadow-sm">
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-forest dark:text-emerald-400 font-bold text-sm">
                C
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Stain Spotter & Removal Kit</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                The entire Stain Removal Kit is available. For blood stains, pre-soak in <strong>BST - Blood Stain Remover</strong> (diluted condition) prior to normal washing. For ink and rust stains, apply <strong>STAINEX - D-Ink</strong> and <strong>STAINEX D-Rust</strong> directly as a spotter.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
