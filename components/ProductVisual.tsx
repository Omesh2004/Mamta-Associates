import type { Product } from "@/lib/products";

type ProductVisualProps = {
  product: Product;
  large?: boolean;
};

export function ProductVisual({ product, large = false }: ProductVisualProps) {
  const height = large ? "h-72" : "h-36";

  return (
    <div className={`relative flex ${height} items-center justify-center overflow-hidden rounded-md bg-gradient-to-br ${product.imageTone} shadow-inner`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.2),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.7),transparent)]" />
      {product.packageType === "trigger" && <TriggerBottle large={large} />}
      {product.packageType === "drum" && <Drum large={large} />}
      {product.packageType === "jug" && <Jug large={large} />}
      {product.packageType === "gel" && <Gel large={large} />}
      {product.packageType === "pump" && <Pump large={large} />}
    </div>
  );
}

function TriggerBottle({ large }: { large: boolean }) {
  return (
    <div className={`relative ${large ? "h-56 w-28" : "h-28 w-14"}`}>
      <div className="absolute left-8 top-0 h-7 w-12 rounded-sm bg-forest shadow-lg" />
      <div className="absolute left-4 top-4 h-5 w-10 skew-x-[-18deg] rounded-sm bg-canopy" />
      <div className="absolute left-7 top-9 h-8 w-8 rounded-t-md bg-emerald-900" />
      <div className="absolute bottom-0 left-2 h-36 w-24 rounded-b-2xl rounded-t-lg border border-emerald-900/20 bg-white/90 shadow-2xl" />
      <div className="absolute bottom-5 left-6 h-16 w-16 rounded-lg bg-emerald-100" />
    </div>
  );
}

function Drum({ large }: { large: boolean }) {
  return (
    <div className={`relative ${large ? "h-52 w-36" : "h-28 w-20"}`}>
      <div className="absolute inset-x-2 top-0 h-6 rounded-[50%] border border-slate-300 bg-slate-200" />
      <div className="absolute inset-x-2 top-3 h-[82%] rounded-b-lg border-x border-slate-300 bg-gradient-to-r from-slate-200 via-white to-slate-300 shadow-2xl" />
      <div className="absolute inset-x-2 top-12 h-2 bg-slate-300/80" />
      <div className="absolute inset-x-2 top-24 h-2 bg-slate-300/80" />
      <div className="absolute bottom-3 left-1/2 h-9 w-16 -translate-x-1/2 rounded-md bg-emerald-100" />
    </div>
  );
}

function Jug({ large }: { large: boolean }) {
  return (
    <div className={`relative ${large ? "h-56 w-36" : "h-32 w-20"}`}>
      <div className="absolute left-10 top-0 h-12 w-14 rounded-t-lg border-4 border-emerald-900 bg-transparent" />
      <div className="absolute bottom-0 left-4 h-44 w-28 rounded-b-2xl rounded-t-xl bg-gradient-to-r from-emerald-900 via-canopy to-emerald-800 shadow-2xl" />
      <div className="absolute bottom-12 left-8 h-20 w-20 rounded-lg bg-white/80" />
      <div className="absolute left-16 top-7 h-10 w-6 bg-emerald-900" />
    </div>
  );
}

function Gel({ large }: { large: boolean }) {
  return (
    <div className={`relative ${large ? "h-52 w-32" : "h-28 w-20"}`}>
      <div className="absolute inset-x-5 top-0 h-8 rounded-t-md bg-slate-200 shadow" />
      <div className="absolute bottom-0 left-3 h-44 w-24 rounded-b-xl rounded-t-lg border border-violet-200 bg-gradient-to-b from-violet-200 via-fuchsia-300 to-violet-600 shadow-2xl" />
      <div className="absolute bottom-8 left-1/2 h-16 w-16 -translate-x-1/2 rounded-lg bg-white/75" />
    </div>
  );
}

function Pump({ large }: { large: boolean }) {
  return (
    <div className={`relative ${large ? "h-56 w-32" : "h-32 w-20"}`}>
      <div className="absolute left-10 top-0 h-5 w-14 rounded-r-md bg-forest" />
      <div className="absolute left-14 top-4 h-8 w-6 bg-forest" />
      <div className="absolute bottom-0 left-4 h-44 w-24 rounded-b-xl rounded-t-lg bg-gradient-to-r from-emerald-700 via-emerald-500 to-teal-700 shadow-2xl" />
      <div className="absolute bottom-10 left-8 h-20 w-16 rounded-lg bg-white/80" />
    </div>
  );
}
