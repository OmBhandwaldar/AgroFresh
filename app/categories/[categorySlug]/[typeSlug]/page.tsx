// app/categories/[categorySlug]/[typeSlug]/page.tsx
import { notFound } from "next/navigation";
// import {
//   getAllCategories,
//   getTypesForCategory,
// } from "@/lib/data";
import { getProductsByCategoryAndType } from "@/lib/actions";
import ProductGrid from "@/components/ProductGrid";

interface PageProps {
  params: Promise<{
    categorySlug: string;
    typeSlug: string;
  }>;
}

// 1. Pre-render every (category, type) pair at build time
// export async function generateStaticParams(): Promise<
//   { categorySlug: string; typeSlug: string }[]
// > {
//   const categories = await getAllCategories();
//   const allParams: { categorySlug: string; typeSlug: string }[] = [];

//   for (const cat of categories) {
//     const types = await getTypesForCategory(cat.slug);
//     types.forEach((t) => {
//       allParams.push({
//         categorySlug: cat.slug,
//         typeSlug: t.slug,
//       });
//     });
//   }

//   return allParams;
// }

export default async function CategoryTypePage({ params }: PageProps) {
  const resolvedParams = await params;
  // const { categorySlug, typeSlug } = params;
  const products = await getProductsByCategoryAndType(resolvedParams.categorySlug, resolvedParams.typeSlug);

  if (!products.length) {
    notFound();
  }

  return (
    // <div className="container mx-auto px-4 py-8">
    //   <h1 className="text-2xl font-bold mb-6">
    //     {products[0].type.category.name} - {products[0].type.name}
    //   </h1>
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    //     {products.map((product) => (
    //       <Link key={product.id}href={`/products/${resolvedParams.typeSlug}/${product.id}`}><div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
    //         <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
    //         <p className="text-gray-600 mb-2">Price: ${product.price}</p>
    //         <p className="text-sm text-gray-500">{product.description}</p>
    //       </div></Link>
    //     ))}
    //   </div>
    // </div>
    <>
    <h2 className="text-xl font-semibold mb-6">Featured Products</h2>
      <ProductGrid products={products}/>
  </>
  );
}