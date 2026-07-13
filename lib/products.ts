import content from "@/data/site-content.json";

export type ProductCategory = "Hospital" | "Kitchen" | "Laundry" | "Washroom" | "Industrial";
export type ProductApplication = "CIP" | "Manual" | "Surface";
export type ProductCertification = "FDA" | "GreenPro" | "US FDA GRAS";
export type ProductPackageType = "trigger" | "drum" | "jug" | "gel" | "pump";

export type Product = {
  id: string;
  title: string;
  category: ProductCategory;
  application: ProductApplication[];
  certifications: ProductCertification[];
  active: string;
  price: number;
  caseQty: string;
  badges: string[];
  imageTone: string;
  packageType: ProductPackageType;
  popularity: number;
  ecoScore: number;
  molecule: string;
  compatibility: string[];
  dilution: string;
  impact: string;
  imageUrl?: string | null;
};

export const categories = ["Hospital", "Kitchen", "Laundry", "Washroom", "Industrial"] as const;
export const applications = ["CIP", "Manual", "Surface"] as const;
export const certifications = ["FDA", "GreenPro", "US FDA GRAS"] as const;
export const packageTypes = ["trigger", "drum", "jug", "gel", "pump"] as const;

export const products = content.products as Product[];
