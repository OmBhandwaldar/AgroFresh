'use server'

import prisma from "@/lib/prisma";
export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        type: {
          include: {
            category: true
          }
        }
      }
    });
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getTypesForCategory() {
  try {
    const types = await prisma.type.findMany({
      include: {
        category: true
      }
    });
    return types;
  } catch (error) {
    console.error('Error fetching types:', error);
    return [];
  }
}

export async function getProductsByCategoryAndType(categorySlug: string, typeSlug: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        type: {
          slug: typeSlug,
          category: {
            slug: categorySlug
          }
        }
      },
      include: {
        type: {
          include: {
            category: true
          }
        }
      }
    });
    return products;
  } catch (error) {
    console.error('Error fetching products by category and type:', error);
    return [];
  }
}

export async function getProductById(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId
      },
      include: {
        type: {
          include: {
            category: true
          }
        }
      }
    });
    return product;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
} 