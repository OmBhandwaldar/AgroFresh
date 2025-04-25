// app/categories/[categorySlug]/page.tsx
import Link from "next/link";
import { getAllCategories, getTypesForCategory } from "@/lib/data";

type Props = {
  params: Promise<{ categorySlug: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const types = await getTypesForCategory(resolvedParams.categorySlug);
  
  return (
    <main>
      <h1>{resolvedParams.categorySlug.replace("-", " ")}</h1>
      <ul>
        {types.map(t => (
          <li key={t.slug}>
            <Link href={`/categories/${resolvedParams.categorySlug}/${t.slug}`}>
              {t.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

// ✅ Add this to avoid "params must be awaited" error
export async function generateStaticParams() {
    const categories = await getAllCategories();
    return categories.map((c) => ({
      categorySlug: c.slug,
    }));
  }