"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Check, FlaskConical, Leaf, Minus, Plus, ShieldCheck, X } from "lucide-react";
import type { Product } from "@/lib/products";
import { ProductVisual } from "./ProductVisual";

type ProductModalProps = {
  product: Product | null;
  quantities: Record<string, number>;
  onOpenChange: (open: boolean) => void;
  onQuantityChange: (id: string, next: number) => void;
};

export function ProductModal({ product, quantities, onOpenChange, onQuantityChange }: ProductModalProps) {
  const quantity = product ? quantities[product.id] ?? 1 : 1;

  return (
    <Dialog.Root open={Boolean(product)} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {product && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-40 bg-forest/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            {/* Centering wrapper — flex keeps the modal truly centred without fighting Framer Motion transforms */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <Dialog.Content asChild>
              <motion.div
                className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl outline-none"
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
              >
                <div className="flex max-h-[92vh] flex-col overflow-y-auto">
                  <div className="sticky top-0 z-10 flex items-center justify-between border-b border-emerald-100 bg-white/92 px-5 py-4 backdrop-blur-md">
                    <div>
                      <Dialog.Title className="text-xl font-semibold text-slate-950">{product.title}</Dialog.Title>
                      <Dialog.Description className="mt-1 text-sm text-slate-500">{product.active}</Dialog.Description>
                    </div>
                    <Dialog.Close className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:border-forest hover:text-forest">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close product detail</span>
                    </Dialog.Close>
                  </div>

                  <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="border-b border-emerald-100 bg-slatewash p-5 lg:border-b-0 lg:border-r">
                      <ProductVisual product={product} large />
                      <div className="mt-5 rounded-md bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-canopy">
                          <FlaskConical className="h-4 w-4" />
                          Active Molecule Breakdown
                        </div>
                        <p className="mt-3 text-sm leading-7 text-slate-700">{product.molecule}</p>
                      </div>
                      <div className="mt-4 rounded-md bg-forest p-5 text-white shadow-lift">
                        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-100">
                          <Leaf className="h-4 w-4 text-mint" />
                          Eco-Impact Rating
                        </div>
                        <p className="mt-3 text-3xl font-semibold">{product.ecoScore} L</p>
                        <p className="text-sm text-emerald-50/85">Synthetic solvents avoided</p>
                      </div>
                    </div>

                    <div className="p-5 pb-28">
                      <div className="rounded-md border border-emerald-100 p-5">
                        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-canopy">End Use Summary</h3>
                        <div className="mt-4 grid gap-2 sm:grid-cols-2">
                          {product.compatibility.map((item) => (
                            <span key={item} className="flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-forest">
                              <Check className="h-4 w-4 text-mint" />
                              Safe on {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 rounded-md border border-emerald-100 p-5">
                        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-canopy">Use Procedure & Dilution Matrix</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-700">{product.dilution}</p>
                      </div>

                      <div className="mt-4 rounded-md border border-emerald-100 bg-emerald-50/70 p-5">
                        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-canopy">
                          <ShieldCheck className="h-4 w-4" />
                          Environmental Safety Blueprint
                        </div>
                        <p className="mt-3 text-sm leading-7 text-slate-700">{product.impact}</p>
                      </div>
                    </div>
                  </div>

                  <div className="sticky bottom-0 flex flex-col gap-3 border-t border-emerald-100 bg-white/94 px-5 py-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-600">Case multiplier</span>
                      <div className="flex h-11 items-center overflow-hidden rounded-md border border-slate-200 bg-white">
                        <button className="flex h-11 w-11 items-center justify-center text-slate-600 hover:bg-emerald-50" onClick={() => onQuantityChange(product.id, quantity - 1)}>
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center text-sm font-bold text-slate-950">{quantity}</span>
                        <button className="flex h-11 w-11 items-center justify-center text-slate-600 hover:bg-emerald-50" onClick={() => onQuantityChange(product.id, quantity + 1)}>
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Unit Price</p>
                        <p className="text-xl font-extrabold text-slate-900">₹{product.price.toFixed(0)}</p>
                        <p className="text-[11px] text-slate-400">{product.caseQty}</p>
                      </div>
                    </div>
                    <button className="rounded-md bg-forest px-6 py-3 text-sm font-semibold text-white shadow-lift transition hover:bg-canopy">
                      Finalize Quote request
                    </button>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
