import type { Product, ProductCategory, ProductApplication, ProductCertification, ProductPackageType } from "@/lib/products";
import { prisma } from "@/lib/prisma";

export type SiteContent = {
  siteText: Record<string, unknown>;
  products: Product[];
};

export async function readSiteContent(): Promise<SiteContent> {
  const [productsData, siteTextData] = await Promise.all([
    prisma.product.findMany(),
    prisma.siteText.findUnique({ where: { id: 'global' } })
  ]);

  const products = productsData.map((p: any) => ({
    ...p,
    category: p.category as ProductCategory,
    application: p.application as ProductApplication[],
    certifications: p.certifications as ProductCertification[],
    packageType: p.packageType as ProductPackageType,
  }));

  const siteText = siteTextData ? (siteTextData.value as Record<string, unknown>) : {};

  return { siteText, products };
}

export async function writeSiteContent(content: SiteContent) {
  validateSiteContent(content);

  await prisma.$transaction([
    prisma.siteText.upsert({
      where: { id: 'global' },
      update: { value: content.siteText as any },
      create: { id: 'global', value: content.siteText as any }
    }),
    prisma.product.deleteMany(),
    prisma.product.createMany({
      data: content.products.map((p: any) => ({
        id: p.id,
        title: p.title,
        category: p.category,
        application: p.application,
        certifications: p.certifications,
        active: p.active,
        price: p.price,
        caseQty: p.caseQty,
        badges: p.badges,
        imageTone: p.imageTone,
        packageType: p.packageType,
        popularity: p.popularity,
        ecoScore: p.ecoScore,
        molecule: p.molecule,
        compatibility: p.compatibility,
        dilution: p.dilution,
        impact: p.impact,
        imageUrl: p.imageUrl,
      }))
    })
  ], {
    maxWait: 10000, // 10 seconds
    timeout: 20000, // 20 seconds
  });
}

export function validateSiteContent(content: unknown): asserts content is SiteContent {
  if (!content || typeof content !== "object") {
    throw new Error("Content must be an object.");
  }

  const next = content as Partial<SiteContent>;
  if (!next.siteText || typeof next.siteText !== "object") {
    throw new Error("Content must include a siteText object.");
  }

  if (!Array.isArray(next.products)) {
    throw new Error("Content must include a products array.");
  }

  const ids = new Set<string>();
  next.products.forEach((product, index) => {
    if (!product.id || !product.title || !product.category) {
      throw new Error(`Product ${index + 1} needs id, title, and category.`);
    }

    if (ids.has(product.id)) {
      throw new Error(`Duplicate product id: ${product.id}`);
    }

    ids.add(product.id);
  });
}
