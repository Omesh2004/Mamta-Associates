import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
process.env.DATABASE_URL = process.env.Mamta_Associates_PRISMA_DATABASE_URL

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

function getProductImagePath(product: any): string | null {
  const byId: Record<string, string> = {
    "sterishine-lfra": "STERISHINE LFRA.jpeg",
    "kleen-and-shine": "KLEEN & SHINE.jpeg",
    "sterix": "STERIX A.jpeg",
    "utilex-san-plus": "UTILEX SAN +.jpeg",
    "utilex-peroxy": "UTILEX- CIP LF AC.jpeg",
    "utilex-iii": "UTILEX III HF.jpeg",
    "utilex-chlor-tab": "UTILEX CHLOR TAB.jpeg",
    "utilex-l": "UTILEX.jpeg",
    "utilex-m": "UTILEX.jpeg",
    "utilex-r": "UTILEX.jpeg",
    "utilex-drain": "WORKSHOP FLOOR DEGREASING.jpeg",
    "elq-f": "FRESH HANDS.jpeg",
    "fresh-hands-elq": "FRESH HANDS.jpeg",
    "fresh-hands-pearl": "FRESH HANDS.jpeg",
    "fresh-hands-foam": "FRESH HANDS.jpeg",
    "fresh-hands-lq": "FRESH HANDS.jpeg",
    "zing-plus": "WASHROOM HYGIENE RANGE.jpeg",
    "fresh-sterix": "WASHROOM HYGIENE RANGE.jpeg",
    "sterimop": "SANITZ.jpeg",
    "sterimop-hf": "SANITZ.jpeg",
    "oxycleanz-plus": "Oxygen Fog.jpeg",
    "quatfog": "Oxygen Fog.jpeg",
    "lfra-floor-cleaner": "CAFETARIA & KITCHEN HYGEINE.jpeg"
  };

  const exact = byId[product.id];
  if (exact) return `/images/${encodeURIComponent(exact)}`;

  if (product.id.startsWith("laundro-")) {
    if (product.id.includes("det") && !product.id.includes("laundro-det-l")) return `/images/${encodeURIComponent("POWDER- DETERGENT.jpeg")}`;
    if (product.id === "laundro-complete" || product.id === "laundro-excel" || product.id === "laundro-bleach-o") return `/images/${encodeURIComponent("POWDER- DETERGENT.jpeg")}`;
    if (product.id === "laundro-bleach-ol" || product.id === "laundro-det-l") return `/images/${encodeURIComponent("LAUNDRO- DETERGENT.jpeg")}`;
    return `/images/${encodeURIComponent("INDUSTRIAL LAUNDRY RANGE.jpeg")}`;
  }

  if (product.category === "Kitchen") return `/images/${encodeURIComponent("CAFETARIA & KITCHEN HYGEINE.jpeg")}`;
  if (product.category === "Hospital") return `/images/${encodeURIComponent("APC F.jpeg")}`;
  if (product.category === "Washroom") return `/images/${encodeURIComponent("WASHROOM HYGIENE RANGE.jpeg")}`;
  if (product.category === "Industrial") return `/images/${encodeURIComponent("WORKSHOP FLOOR DEGREASING.jpeg")}`;
  if (product.category === "Laundry") return `/images/${encodeURIComponent("INDUSTRIAL LAUNDRY RANGE.jpeg")}`;

  return null;
}

async function main() {
  const contentPath = path.join(process.cwd(), "data", "site-content.json")
  const raw = fs.readFileSync(contentPath, "utf8")
  const data = JSON.parse(raw)

  console.log(`Read ${data.products.length} products. Seeding database...`)

  // Clear existing products
  await prisma.product.deleteMany({})

  for (const product of data.products) {
    const imageUrl = product.imageUrl || getProductImagePath(product);
    await prisma.product.create({
      data: {
        id: product.id,
        title: product.title,
        category: product.category,
        application: product.application,
        certifications: product.certifications,
        active: product.active,
        price: product.price,
        caseQty: product.caseQty,
        badges: product.badges,
        imageTone: product.imageTone,
        packageType: product.packageType,
        popularity: product.popularity,
        ecoScore: product.ecoScore,
        molecule: product.molecule,
        compatibility: product.compatibility,
        dilution: product.dilution,
        impact: product.impact,
        imageUrl: imageUrl,
      }
    })
    console.log(`- Inserted product: ${product.id}`)
  }

  console.log('Seeding site text...')
  await prisma.siteText.upsert({
    where: { id: 'global' },
    update: { value: data.siteText },
    create: {
      id: 'global',
      value: data.siteText
    }
  })

  console.log('Seeding complete!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
