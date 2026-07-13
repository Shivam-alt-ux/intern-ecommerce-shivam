import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

interface DummyProduct {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  stock: number;
  category: string;
  brand?: string;
}

interface DummyProductsResponse {
  products: DummyProduct[];
}

async function main() {
  console.log("Fetching products from dummyjson...");

  const res = await fetch("https://dummyjson.com/products?limit=100");
  const data: DummyProductsResponse = await res.json();

  console.log(`Fetched ${data.products.length} products. Seeding database...`);

  for (const p of data.products) {
    await prisma.product.create({
      data: {
        title: p.title,
        description: p.description,
        price: p.price,
        image: p.thumbnail,
        stock: p.stock,
        category: p.category,
        brand: p.brand ?? null,
      },
    });
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });