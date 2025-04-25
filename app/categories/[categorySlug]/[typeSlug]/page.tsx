// app/categories/[categorySlug]/[typeSlug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllCategories,
  getTypesForCategory,
  getProductsByType,
} from "@/lib/data";

type Props = {
  params: Promise<{
    categorySlug: string;
    typeSlug: string;
  }>;
};

// 1. Pre-render every (category, type) pair at build time
export async function generateStaticParams(): Promise<
  { categorySlug: string; typeSlug: string }[]
> {
  const categories = await getAllCategories();
  const allParams: { categorySlug: string; typeSlug: string }[] = [];

  for (const cat of categories) {
    const types = await getTypesForCategory(cat.slug);
    types.forEach((t) => {
      allParams.push({
        categorySlug: cat.slug,
        typeSlug: t.slug,
      });
    });
  }

  return allParams;
}

export default async function TypePage({ params }: Props) {
  // const { categorySlug, typeSlug } = params;
  const resolvedParams =await params;

  // 2. Fetch — you could also validate that the category/type exist
  const products = await getProductsByType(resolvedParams.categorySlug, resolvedParams.typeSlug);
  // const products = await getProductsByType(categorySlug, typeSlug);
  if (!products.length) {
    // no products or invalid slugs → 404
    notFound();
  }

  return (
    <main>
      <h1>
        {resolvedParams.categorySlug.replace("-", " ")} › {resolvedParams.typeSlug.replace("-", " ")}
      </h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <Link href={`/products/${p.slug}/${p.id}`}>
              {p.name} — ${p.price.toFixed(2)}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
