// app/products/[productSlug]/[productId]/page.tsx
import { notFound } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";
import { getProductById } from "@/lib/actions";

type Props = {
  params: Promise<{
    productSlug: string;
    productId:   string;
  }>;
};


export default async function ProductPage({ params }: Props) {
  // const { productSlug, productId } = params;
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.productId);

  if (!product || product.slug !== resolvedParams.productSlug) {
    notFound();
  }
  
  return (
    <ProductDetails 
      id={product.id} 
      slug={product.slug} 
      name={product.name} 
      category={product.type.category.name} 
      type={product.type.name} 
      price={product.price} 
      description={product.description || ''} 
      imageUrl={product.imageUrl || ''} 
    />
  );
}
