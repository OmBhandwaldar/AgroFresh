import ProductCard from "./ProductCard";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string | null;
  imageUrl: string | null;
  type: {
    name: string;
    category: {
      name: string;
    };
  };
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  if (products.length === 0) {
    return <div className="text-center py-8">No products found</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          image={product.imageUrl || "/placeholder.svg"}
          price={product.price}
          productSlug={product.slug}
          originalPrice={product.price * 1.2} 
          discount={20} 
          quantity="1 kg"
        />
      ))}
    </div>
  );
};

export default ProductGrid