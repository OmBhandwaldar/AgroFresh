// app/products/[productSlug]/[productId]/page.tsx
import { notFound } from "next/navigation";
import { getAllProducts, getProductById } from "@/lib/data";
import ProductDetails from "@/components/ProductDetails";

type Props = {
  params: Promise<{
    productSlug: string;
    productId:   string;
  }>;
};

export async function generateStaticParams(): Promise<
  { productSlug: string; productId: string }[]
> {
  const all = await getAllProducts();
  return all.map((p) => ({
    productSlug: p.slug,
    productId:   p.id,
  }));
}

export default async function ProductPage({ params }: Props) {
  // const { productSlug, productId } = params;
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.productId);

  if (!product || product.slug !== resolvedParams.productSlug) {
    notFound();
  }
  // if (!product || product.slug !== productSlug) {
  //   notFound();
  // }

  return (
    // <article>
    //   <Image width={80} height={80} src={product.imageUrl} alt={product.name} />
    //   <h1>{product.name}</h1>
    //   <p>
    //     Category: {product.category} — Type: {product.type}
    //   </p>
    //   <p>{product.description}</p>
    //   <p>
    //     <strong>Price:</strong> ${product.price.toFixed(2)} / kg
    //   </p>
    //   {/* Add quantity selector & Add to Cart button here */}
    // </article>
    <ProductDetails id={product.id} slug={product.slug} name={product.name} category={product.category} type={product.type} price={product.price} description={product.description} imageUrl={product.imageUrl} />
  );
}
