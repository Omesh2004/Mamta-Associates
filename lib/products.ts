export type Product = {
  id: string;
  title: string;
  category: "Hospital" | "Kitchen" | "Laundry" | "Washroom" | "Industrial";
  application: Array<"CIP" | "Manual" | "Surface">;
  certifications: Array<"FDA" | "GreenPro" | "US FDA GRAS">;
  active: string;
  price: number;
  caseQty: string;
  badges: string[];
  imageTone: string;
  packageType: "trigger" | "drum" | "jug" | "gel" | "pump";
  popularity: number;
  ecoScore: number;
  molecule: string;
  compatibility: string[];
  dilution: string;
  impact: string;
};

export const categories = ["Hospital", "Kitchen", "Laundry", "Washroom", "Industrial"] as const;
export const applications = ["CIP", "Manual", "Surface"] as const;
export const certifications = ["FDA", "GreenPro", "US FDA GRAS"] as const;

export const products: Product[] = [
  {
    id: "green-shield-hospital",
    title: "Green-Shield Hospital Disinfectant Surface Cleaner",
    category: "Hospital",
    application: ["Manual", "Surface"],
    certifications: ["FDA", "GreenPro"],
    active: "Benzalkonium Chloride / Quat + Ethanol",
    price: 80,
    caseQty: "Case of 4x5L",
    badges: ["FDA Approved", "Zero VOC", "Multi-surface safe"],
    imageTone: "from-emerald-50 via-white to-teal-100",
    packageType: "trigger",
    popularity: 96,
    ecoScore: 120,
    molecule:
      "Benzalkonium Chloride disrupts cell membranes and compromises bilayer permeability at 50-500 ppm, supporting broad action against Gram-negative and Gram-positive bacteria, MRSA, H1N1, and SARS-class enveloped viruses.",
    compatibility: ["Marble", "Granite", "Tiles", "Stainless Steel", "Wood"],
    dilution:
      "Dilution: 1% to 3% (10ml to 30ml per liter of water) depending on soil severity. Contact Time: 3-5 minutes. No rinse required on food contact zones up to 250 ppm.",
    impact:
      "100% readily biodegradable ingredients. Free from APE/NPE, Phosphates, EDTA, NTA, HCI, and Parabens. Safe for aquatic life; passes 96-hour BioAssay metrics."
  },
  {
    id: "industrial-degreaser",
    title: "Industrial Heavy Duty Degreaser / Machine Formula",
    category: "Industrial",
    application: ["CIP", "Manual"],
    certifications: ["GreenPro"],
    active: "Alkyl Polyglucosides / Bio-surfactants",
    price: 138,
    caseQty: "Case of 4x5L",
    badges: ["Zero VOC", "Heavy-grease cutting", "Machinery safe"],
    imageTone: "from-slate-100 via-white to-emerald-100",
    packageType: "drum",
    popularity: 91,
    ecoScore: 145,
    molecule:
      "Alkyl polyglucoside bio-surfactants lower surface tension and lift mineral oil, grease, and shop-floor soils without APE/NPE surfactants or harsh caustic solvent dependency.",
    compatibility: ["Machine housings", "Concrete", "Stainless Steel", "Painted metal", "Shop floors"],
    dilution:
      "Dilution: 2% to 5% for manual cleaning, up to 8% for heavy machinery soil. Allow 5 minutes dwell time, agitate, and rinse with clean water.",
    impact:
      "Biodegradable surfactant system designed to reduce petrochemical solvent load while maintaining high-performance industrial degreasing."
  },
  {
    id: "eco-laundry-liquid",
    title: "Eco-Laundry Liquid Detergent - Hypoallergenic",
    category: "Laundry",
    application: ["Manual"],
    certifications: ["GreenPro"],
    active: "Neutral soda-free enzyme formula",
    price: 199,
    caseQty: "Case of 4x5L",
    badges: ["Phosphate Free", "Skin-safe", "Biodegradable"],
    imageTone: "from-lime-50 via-white to-emerald-100",
    packageType: "jug",
    popularity: 94,
    ecoScore: 132,
    molecule:
      "Neutral enzyme cleaning chemistry breaks down protein and starch soils at mild pH, preserving fabric feel while avoiding soda-heavy alkalinity.",
    compatibility: ["Cotton", "Polyester", "Microfiber", "Linen", "Hospital linen"],
    dilution:
      "Dose 10ml to 20ml per kg of laundry depending on soil load. Use cooler wash cycles where possible for lower energy consumption.",
    impact:
      "Phosphate-free, biodegradable laundry chemistry formulated for sensitive skin and reduced aquatic nutrient load."
  },
  {
    id: "kitchen-food-safe",
    title: "Kitchen Food-Safe Degreaser Spray",
    category: "Kitchen",
    application: ["Manual", "Surface"],
    certifications: ["FDA", "US FDA GRAS"],
    active: "US FDA GRAS compliant food-zone surfactants",
    price: 39,
    caseQty: "Case of 4x5L",
    badges: ["Food-Grade certified", "Grease-cutting", "Non-toxic"],
    imageTone: "from-cyan-50 via-white to-emerald-100",
    packageType: "trigger",
    popularity: 89,
    ecoScore: 115,
    molecule:
      "Food-zone surfactants disperse edible oils and carbonized residue while aligning with US FDA GRAS expectations for safer kitchen cleaning workflows.",
    compatibility: ["Food counters", "Hobs", "Tiles", "Stainless Steel", "Exhaust panels"],
    dilution:
      "Spray neat for equipment grease or dilute 1% to 3% for daily counters. Wipe after 2-3 minutes and rinse where direct food contact is expected.",
    impact:
      "Low-VOC kitchen chemistry built to replace harsh degreasers in food preparation environments."
  },
  {
    id: "lavish-lavender-gel",
    title: "Lavish Lavender Air Freshener Gel",
    category: "Washroom",
    application: ["Manual"],
    certifications: ["GreenPro"],
    active: "Synthetic solvent-free gel fragrance base",
    price: 72,
    caseQty: "Case of 4x1L",
    badges: ["Zero VOC", "Natural scent", "Long-lasting"],
    imageTone: "from-violet-50 via-white to-emerald-50",
    packageType: "gel",
    popularity: 87,
    ecoScore: 108,
    molecule:
      "A solvent-free gel matrix releases fragrance gradually without relying on synthetic solvent evaporation or aggressive aerosol propellants.",
    compatibility: ["Washrooms", "Lobbies", "Patient rooms", "Office corridors", "Pantries"],
    dilution: "Use as supplied. Place in a ventilated area and replace according to room size and odor load.",
    impact:
      "VOC-free fragrance delivery designed for indoor air comfort in hospitality, healthcare, and institutional spaces."
  },
  {
    id: "soft-hands-soap",
    title: "Soft Hands Antimicrobial Eco-Soap",
    category: "Washroom",
    application: ["Manual"],
    certifications: ["FDA", "GreenPro"],
    active: "Skin-conditioning alcohol-free antimicrobial blend",
    price: 15,
    caseQty: "Case of 4x5L",
    badges: ["Alcohol-Free", "Skin-Conditioning", "Biodegradable"],
    imageTone: "from-emerald-50 via-white to-sky-50",
    packageType: "pump",
    popularity: 92,
    ecoScore: 118,
    molecule:
      "An alcohol-free antimicrobial wash system pairs mild cleansing agents with skin-conditioning humectants for repeated hand hygiene routines.",
    compatibility: ["Handwash stations", "Hospitals", "Hotels", "Food plants", "Office washrooms"],
    dilution: "Use as supplied in dispenser pumps. Wet hands, lather for 20 seconds, rinse thoroughly, and dry with a clean towel.",
    impact:
      "Biodegradable handwash base formulated to support frequent use without parabens, phosphates, or harsh solvent carriers."
  }
];
