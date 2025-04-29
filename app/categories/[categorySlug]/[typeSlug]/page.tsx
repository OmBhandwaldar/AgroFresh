import { notFound } from "next/navigation";
import { getProductsByCategoryAndType } from "@/lib/actions";
import ProductGrid from "@/components/ProductGrid";

interface PageProps {
  params: Promise<{
    categorySlug: string;
    typeSlug: string;
  }>;
}

export default async function CategoryTypePage({ params }: PageProps) {
  const resolvedParams = await params;
  const products = await getProductsByCategoryAndType(resolvedParams.categorySlug, resolvedParams.typeSlug);

  if (!products.length) {
    notFound();
  }

  return (
    <>
    <h2 className="text-xl font-semibold mb-6">Featured Products</h2>
      <ProductGrid products={products}/>
  </>
  );
}