// app/categories/page.tsx
import Link from "next/link";
import { getAllCategories } from "@/lib/data";

export default async function CategoriesPage() {
  const categories = await getAllCategories(); // e.g. [{ name, slug }]
  return (
    <main>
      <h1>Shop by Category</h1>
      <ul>
        {categories.map(cat => (
          <li key={cat.slug}>
            <Link href={`/categories/${cat.slug}`}>
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
