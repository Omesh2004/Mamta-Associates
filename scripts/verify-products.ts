import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
process.env.DATABASE_URL = process.env.Mamta_Associates_PRISMA_DATABASE_URL

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function verify() {
  const ids = ['laundro-det', 'laundro-det-ec', 'laundro-complete', 'laundro-excel', 'laundro-mulse-e', 'laundro-mulse-e-super'];
  const prods = await prisma.product.findMany({ where: { id: { in: ids } } });
  console.log('=== VERIFIED PRODUCTS IN DATABASE ===');
  prods.forEach(p => {
    console.log(`\nID: ${p.id}`);
    console.log(`Title: ${p.title}`);
    console.log(`Active: ${p.active}`);
    console.log(`Dilution: ${p.dilution}`);
    console.log(`Compatibility: ${JSON.stringify(p.compatibility)}`);
  });
}

verify()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
