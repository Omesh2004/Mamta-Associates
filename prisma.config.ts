import "dotenv/config";
import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.Mamta_Associates_PRISMA_DATABASE_URL || "postgresql://dummy:dummy@localhost/dummy",
  },
});
