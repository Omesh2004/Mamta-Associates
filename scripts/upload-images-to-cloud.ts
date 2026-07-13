import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { put } from '@vercel/blob'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
process.env.DATABASE_URL = process.env.Mamta_Associates_PRISMA_DATABASE_URL

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Fetching products with local images...")
  const products = await prisma.product.findMany({
    where: {
      imageUrl: {
        startsWith: "/images/"
      }
    }
  })

  console.log(`Found ${products.length} products to update.`)
  const urlCache: Record<string, string> = {}

  for (const product of products) {
    if (!product.imageUrl) continue

    try {
      const decodedPath = decodeURIComponent(product.imageUrl)
      const fileName = decodedPath.replace("/images/", "")
      const filePath = path.join(process.cwd(), "public", "images", fileName)

      if (!fs.existsSync(filePath)) {
        console.warn(`[WARNING] File not found for ${product.id}: ${filePath}`)
        continue
      }

      let blobUrl = urlCache[fileName]

      if (!blobUrl) {
        console.log(`Uploading image for ${product.id} (${fileName})...`)
        const fileBuffer = fs.readFileSync(filePath)
        
        const blob = await put(fileName, fileBuffer, {
          access: 'public',
          addRandomSuffix: true,
          token: process.env.BLOB_READ_WRITE_TOKEN
        })
        blobUrl = blob.url
        urlCache[fileName] = blob.url
        console.log(`- Uploaded to: ${blob.url}`)
      } else {
        console.log(`- Reusing uploaded URL for ${product.id} (${fileName}): ${blobUrl}`)
      }

      await prisma.product.update({
        where: { id: product.id },
        data: { imageUrl: blobUrl }
      })
      console.log(`- Database updated for ${product.id}.`)

    } catch (error) {
      console.error(`[ERROR] Failed to process ${product.id}:`, error)
    }
  }

  console.log("Finished uploading images!")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
