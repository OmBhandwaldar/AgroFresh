// import { v4 as uuidv4 } from 'uuid';

// // Dummy data definitions
// type Category = { name: string; slug: string };
// type Type = { name: string; slug: string; categorySlug: string };
// type Product = {
//   id: string;
//   name: string;
//   slug: string;
//   category: string;
//   type: string;
//   price: number;
// };

// // Sample categories
// const categories: Category[] = [
//   { name: 'Vegetables', slug: 'vegetables' },
//   { name: 'Fruits', slug: 'fruits' },
// ];

// // Sample types
// const types: Type[] = [
//   { name: 'Leafy Vegetables', slug: 'leafy-vegetables', categorySlug: 'vegetables' },
//   { name: 'Root Vegetables', slug: 'root-vegetables', categorySlug: 'vegetables' },
//   { name: 'Citrus Fruits', slug: 'citrus-fruits', categorySlug: 'fruits' },
//   { name: 'Berries', slug: 'berries', categorySlug: 'fruits' },
// ];

// // Sample products
// const products: Product[] = [
//   {
//     id: uuidv4(),
//     name: 'Spinach',
//     slug: 'spinach',
//     category: 'vegetables',
//     type: 'leafy-vegetables',
//     price: 2.5,
//   },
//   {
//     id: uuidv4(),
//     name: 'Carrot',
//     slug: 'carrot',
//     category: 'vegetables',
//     type: 'root-vegetables',
//     price: 1.8,
//   },
//   {
//     id: uuidv4(),
//     name: 'Orange',
//     slug: 'orange',
//     category: 'fruits',
//     type: 'citrus-fruits',
//     price: 3.0,
//   },
//   {
//     id: uuidv4(),
//     name: 'mosambi',
//     slug: 'mosambi',
//     category: 'fruits',
//     type: 'citrus-fruits',
//     price: 5.0,
//   },
//   {
//     id: uuidv4(),
//     name: 'Strawberry',
//     slug: 'strawberry',
//     category: 'fruits',
//     type: 'berries',
//     price: 4.0,
//   },
// ];

// // Data access functions
// export async function getAllCategories(): Promise<Category[]> {
//   return categories;
// }

// export async function getTypesForCategory(categorySlug: string): Promise<Type[]> {
//   return types.filter((t) => t.categorySlug === categorySlug);
// }

// export async function getAllProducts(): Promise<Product[]> {
//   return products;
// }

// export async function getProductsByType(categorySlug: string, typeSlug: string): Promise<Product[]> {
//   return products.filter(
//     (p) => p.category === categorySlug && p.type === typeSlug
//   );
// }

// export async function getProductById(id: string): Promise<Product | undefined> {
//   return products.find((p) => p.id === id);
// }




// ------------------------------------------------------------------------------------------------------
// lib/data.ts
// import { v4 as uuidv4 } from "uuid";

export type Category = { name: string; slug: string };
export type Type = { name: string; slug: string; categorySlug: string };
export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  type: string;
  price: number;
  description: string;
  imageUrl: string;
};

// 1) Categories
const categories: Category[] = [
  { name: "Vegetables", slug: "vegetables" },
  { name: "Fruits",     slug: "fruits"     },
];

// 2) Types
const types: Type[] = [
  { name: "Leafy Vegetables", slug: "leafy-vegetables",   categorySlug: "vegetables" },
  { name: "Root Vegetables",  slug: "root-vegetables",    categorySlug: "vegetables" },
  { name: "Citrus Fruits",    slug: "citrus-fruits",      categorySlug: "fruits"     },
  // …add more as needed
];

// 3) Products
export const products: Product[] = [
  {
    id: "1",
    name: "Carrot",
    slug: "carrot",
    category: "vegetables",
    type: "root-vegetables",
    price: 2.5,
    description: "Fresh organic carrots, sold in bulk per kg.",
    imageUrl: "/images/products/carrot.jpg",
  },
  {
    id: "2",
    name: "Potato",
    slug: "potato",
    category: "vegetables",
    type: "root-vegetables",
    price: 1.8,
    description: "Premium quality potatoes, perfect for all cooking needs.",
    imageUrl: "/images/products/potato.jpg",
  },
  {
    id: "3",
    name: "Tomato",
    slug: "tomato",
    category: "vegetables",
    type: "fruiting-vegetables",
    price: 3.2,
    description: "Juicy, vine-ripened tomatoes, sold in bulk.",
    imageUrl: "/images/products/tomato.jpg",
  },
  {
    id: "4",
    name: "Onion",
    slug: "onion",
    category: "vegetables",
    type: "bulb-vegetables",
    price: 2.0,
    description: "Fresh onions, available in bulk quantities.",
    imageUrl: "/images/products/onion.jpg",
  },
  {
    id: "5",
    name: "Apple",
    slug: "apple",
    category: "fruits",
    type: "pome-fruits",
    price: 3.5,
    description: "Crisp and sweet apples, perfect for snacking or cooking.",
    imageUrl: "/images/products/apple.jpg",
  },
  {
    id: "6",
    name: "Banana",
    slug: "banana",
    category: "fruits",
    type: "tropical-fruits",
    price: 2.8,
    description: "Fresh bananas, available in bulk quantities.",
    imageUrl: "/images/products/banana.jpg",
  },
  {
    id: "7",
    name: "Orange",
    slug: "orange",
    category: "fruits",
    type: "citrus-fruits",
    price: 3.0,
    description: "Sweet and juicy oranges, perfect for juicing.",
    imageUrl: "/images/products/orange.jpg",
  },
  {
    id: "8",
    name: "Grapes",
    slug: "grapes",
    category: "fruits",
    type: "berries",
    price: 4.5,
    description: "Fresh grapes, available in different varieties.",
    imageUrl: "/images/products/grapes.jpg",
  },
  {
    id: "9",
    name: "Rice",
    slug: "rice",
    category: "grains",
    type: "cereals",
    price: 2.2,
    description: "Premium quality rice, available in bulk.",
    imageUrl: "/images/products/rice.jpg",
  },
  {
    id: "10",
    name: "Wheat",
    slug: "wheat",
    category: "grains",
    type: "cereals",
    price: 2.0,
    description: "High-quality wheat grains for various uses.",
    imageUrl: "/images/products/wheat.jpg",
  }
];

export async function getAllCategories() {
  return categories;
}

export async function getTypesForCategory(categorySlug: string) {
  return types.filter((t) => t.categorySlug === categorySlug);
}

export async function getProductsByType(
  categorySlug: string,
  typeSlug: string
) {
  return products.filter(
    (p) => p.category === categorySlug && p.type === typeSlug
  );
}

export async function getAllProducts() {
  return products;
}

export async function getProductById(id: string) {
  return products.find((p) => p.id === id) || null;
}

