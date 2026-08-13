import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const categories = [
  "Men's Clothing","Women's Clothing","T-Shirts","Shirts","Trousers","Jeans",
  "Hoodies & Sweatshirts","Jackets","Dresses","Shoes","Jerseys","Accessories"
];

async function main() {
  for (const name of categories) {
    await db.category.upsert({
      where: { slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-") },
      update: {},
      create: {
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80"
      }
    });
  }

  const t = await db.category.findUnique({ where: { slug: "t-shirts" } });
  const j = await db.category.findUnique({ where: { slug: "jeans" } });
  const s = await db.category.findUnique({ where: { slug: "shoes" } });

  const products = [
    {
      name: "Premium Essential Tee", slug: "premium-essential-tee", description: "A clean everyday premium cotton T-shirt.", price: 1800, salePrice: 1500,
      brand: "Next Wear", sku: "NW-TEE-001", stock: 35, sizes: "S,M,L,XL,XXL", colors: "Black,White,Brown",
      images: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=85",
      featured: true, newArrival: true, categoryId: t!.id
    },
    {
      name: "Classic Blue Denim", slug: "classic-blue-denim", description: "Modern straight-fit denim for everyday wear.", price: 3200, salePrice: 2799,
      brand: "Next Wear", sku: "NW-JNS-001", stock: 20, sizes: "30,32,34,36,38", colors: "Blue,Dark Blue",
      images: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=85",
      featured: true, newArrival: true, categoryId: j!.id
    },
    {
      name: "Urban Street Sneakers", slug: "urban-street-sneakers", description: "Clean streetwear sneakers with a versatile silhouette.", price: 4500, salePrice: null,
      brand: "Next Wear", sku: "NW-SHOE-001", stock: 12, sizes: "39,40,41,42,43,44", colors: "White,Black",
      images: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85",
      featured: true, newArrival: false, categoryId: s!.id
    }
  ];

  for (const p of products) {
    await db.product.upsert({ where: { sku: p.sku }, update: p, create: p });
  }
}

main().finally(() => db.$disconnect());
