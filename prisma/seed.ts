// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1) Categories
  const vegCat = await prisma.category.upsert({
    where: { slug: "vegetables" },
    update: {},
    create: { name: "Vegetables", slug: "vegetables" },
  });
  const fruitCat = await prisma.category.upsert({
    where: { slug: "fruits" },
    update: {},
    create: { name: "Fruits", slug: "fruits" },
  });

  // 2) Types for Vegetables
  const leafy = await prisma.type.upsert({
    where: { slug_categoryId: { slug: "leafy-vegetables", categoryId: vegCat.id } },
    update: {},
    create: {
      name: "Leafy Vegetables",
      slug: "leafy-vegetables",
      categoryId: vegCat.id,
    },
  });
  const root = await prisma.type.upsert({
    where: { slug_categoryId: { slug: "root-vegetables", categoryId: vegCat.id } },
    update: {},
    create: {
      name: "Root Vegetables",
      slug: "root-vegetables",
      categoryId: vegCat.id,
    },
  });
  const cruci = await prisma.type.upsert({
    where: { slug_categoryId: { slug: "cruciferous-vegetables", categoryId: vegCat.id } },
    update: {},
    create: {
      name: "Cruciferous Vegetables",
      slug: "cruciferous-vegetables",
      categoryId: vegCat.id,
    },
  });
  const legumes = await prisma.type.upsert({
    where: { slug_categoryId: { slug: "legumes-pod-vegetables", categoryId: vegCat.id } },
    update: {},
    create: {
      name: "Legumes (Pod Vegetables)",
      slug: "legumes-pod-vegetables",
      categoryId: vegCat.id,
    },
  });

  // 3) Types for Fruits
  const citrus = await prisma.type.upsert({
    where: { slug_categoryId: { slug: "citrus-fruits", categoryId: fruitCat.id } },
    update: {},
    create: {
      name: "Citrus Fruits",
      slug: "citrus-fruits",
      categoryId: fruitCat.id,
    },
  });
  const berries = await prisma.type.upsert({
    where: { slug_categoryId: { slug: "berries", categoryId: fruitCat.id } },
    update: {},
    create: {
      name: "Berries",
      slug: "berries",
      categoryId: fruitCat.id,
    },
  });
  const melons = await prisma.type.upsert({
    where: { slug_categoryId: { slug: "melons", categoryId: fruitCat.id } },
    update: {},
    create: {
      name: "Melons",
      slug: "melons",
      categoryId: fruitCat.id,
    },
  });

  // 4) Products for each type
  await Promise.all([
    // Leafy Vegetables
    prisma.product.upsert({
      where: { id: "a1111111-1111-1111-1111-111111111111" },
      update: {},
      create: {
        id: "a1111111-1111-1111-1111-111111111111",
        name: "Spinach",
        slug: "spinach",
        typeId: leafy.id,
        price: 3.0,
        description: "Fresh bunches of organic spinach, washed and ready to cook.",
        imageUrl: "/images/products/spinach.jpg",
      },
    }),
    prisma.product.upsert({
      where: { id: "a2222222-2222-2222-2222-222222222222" },
      update: {},
      create: {
        id: "a2222222-2222-2222-2222-222222222222",
        name: "Kale",
        slug: "kale",
        typeId: leafy.id,
        price: 4.5,
        description: "Green curly kale, perfect for salads and smoothies.",
        imageUrl: "/images/products/kale.jpg",
      },
    }),

    // Root Vegetables
    prisma.product.upsert({
      where: { id: "b1111111-3333-4444-5555-666666666666" },
      update: {},
      create: {
        id: "b1111111-3333-4444-5555-666666666666",
        name: "Carrot",
        slug: "carrot",
        typeId: root.id,
        price: 2.5,
        description: "Crunchy organic carrots sold in 1kg bundles.",
        imageUrl: "/images/products/carrot.jpg",
      },
    }),
    prisma.product.upsert({
      where: { id: "b2222222-3333-4444-5555-777777777777" },
      update: {},
      create: {
        id: "b2222222-3333-4444-5555-777777777777",
        name: "Potato",
        slug: "potato",
        typeId: root.id,
        price: 1.8,
        description: "Starchy potatoes, perfect for fries and mash.",
        imageUrl: "/images/products/potato.jpg",
      },
    }),

    // Cruciferous Vegetables
    prisma.product.upsert({
      where: { id: "c1111111-8888-9999-0000-aaaaaaaaaaaa" },
      update: {},
      create: {
        id: "c1111111-8888-9999-0000-aaaaaaaaaaaa",
        name: "Broccoli",
        slug: "broccoli",
        typeId: cruci.id,
        price: 3.2,
        description: "Fresh broccoli heads, rich in vitamins.",
        imageUrl: "/images/products/broccoli.jpg",
      },
    }),
    prisma.product.upsert({
      where: { id: "c2222222-8888-9999-0000-bbbbbbbbbbbb" },
      update: {},
      create: {
        id: "c2222222-8888-9999-0000-bbbbbbbbbbbb",
        name: "Cauliflower",
        slug: "cauliflower",
        typeId: cruci.id,
        price: 3.7,
        description: "White cauliflower, great for roasting or rice substitute.",
        imageUrl: "/images/products/cauliflower.jpg",
      },
    }),

    // Legumes (Pod Vegetables)
    prisma.product.upsert({
      where: { id: "d1111111-cccc-dddd-eeee-ffffffffffff" },
      update: {},
      create: {
        id: "d1111111-cccc-dddd-eeee-ffffffffffff",
        name: "Peas",
        slug: "peas",
        typeId: legumes.id,
        price: 2.2,
        description: "Sweet green peas, perfect for soups and sides.",
        imageUrl: "/images/products/peas.jpg",
      },
    }),
    prisma.product.upsert({
      where: { id: "d2222222-cccc-dddd-eeee-111111111111" },
      update: {},
      create: {
        id: "d2222222-cccc-dddd-eeee-111111111111",
        name: "Green Beans",
        slug: "green-beans",
        typeId: legumes.id,
        price: 2.8,
        description: "Crunchy green beans, ideal for steaming.",
        imageUrl: "/images/products/green-beans.jpg",
      },
    }),

    // Citrus Fruits
    prisma.product.upsert({
      where: { id: "e1111111-2222-3333-4444-555555555555" },
      update: {},
      create: {
        id: "e1111111-2222-3333-4444-555555555555",
        name: "Orange",
        slug: "orange",
        typeId: citrus.id,
        price: 3.0,
        description: "Juicy oranges, sold in bulk by the kg.",
        imageUrl: "/images/products/orange.jpg",
      },
    }),
    prisma.product.upsert({
      where: { id: "e2222222-2222-3333-4444-666666666666" },
      update: {},
      create: {
        id: "e2222222-2222-3333-4444-666666666666",
        name: "Lemon",
        slug: "lemon",
        typeId: citrus.id,
        price: 2.7,
        description: "Fresh lemons, great for dressings and drinks.",
        imageUrl: "/images/products/lemon.jpg",
      },
    }),

    // Berries
    prisma.product.upsert({
      where: { id: "f1111111-7777-8888-9999-000000000000" },
      update: {},
      create: {
        id: "f1111111-7777-8888-9999-000000000000",
        name: "Strawberry",
        slug: "strawberry",
        typeId: berries.id,
        price: 5.0,
        description: "Sweet strawberries, perfect for desserts.",
        imageUrl: "/images/products/strawberry.jpg",
      },
    }),
    prisma.product.upsert({
      where: { id: "f2222222-7777-8888-9999-111111111111" },
      update: {},
      create: {
        id: "f2222222-7777-8888-9999-111111111111",
        name: "Blueberry",
        slug: "blueberry",
        typeId: berries.id,
        price: 6.0,
        description: "Fresh blueberries, high in antioxidants.",
        imageUrl: "/images/products/blueberry.jpg",
      },
    }),

    // Melons
    prisma.product.upsert({
      where: { id: "g1111111-aaaa-bbbb-cccc-dddddddddddd" },
      update: {},
      create: {
        id: "g1111111-aaaa-bbbb-cccc-dddddddddddd",
        name: "Watermelon",
        slug: "watermelon",
        typeId: melons.id,
        price: 4.0,
        description: "Seedless watermelons, sold per kg.",
        imageUrl: "/images/products/watermelon.jpg",
      },
    }),
    prisma.product.upsert({
      where: { id: "g2222222-aaaa-bbbb-cccc-eeeeeeeeeeee" },
      update: {},
      create: {
        id: "g2222222-aaaa-bbbb-cccc-eeeeeeeeeeee",
        name: "Cantaloupe",
        slug: "cantaloupe",
        typeId: melons.id,
        price: 4.5,
        description: "Sweet cantaloupes, perfect for fruit salads.",
        imageUrl: "/images/products/cantaloupe.jpg",
      },
    }),
  ]);

  console.log("✅ Seed data created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
