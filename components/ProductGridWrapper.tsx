import { getProducts } from '@/lib/actions';
import ProductGrid from './ProductGrid';


export default async function ProductGridWrapper() {
  const products = await getProducts();
  // console.log(products);
//   return <ProductGrid products={products} />;

    return (
        <>
          <h2 className="text-xl font-semibold mb-6">Featured Products</h2>
            <ProductGrid products={products}/>
        </>
    );
}