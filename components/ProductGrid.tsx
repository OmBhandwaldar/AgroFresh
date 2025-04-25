import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const products = [
    {
      title: "Nokia 105 Classic Single Sim with Wireless FM",
      image: "/placeholder.svg",
      price: 1199,
      originalPrice: 1599,
      discount: 25,
      deliveryTime: "17 Mins",
      quantity: "1 pc"
    },
    {
      title: "itel Power 120 | 2 inch Big Display | 1000mAh Battery",
      image: "/placeholder.svg",
      price: 1199,
      originalPrice: 1599,
      discount: 25,
      deliveryTime: "17 Mins",
      quantity: "1 pc"
    },
    {
      title: "itel Ace 3 Shine | 1.8 Inch Display | 1000mAh Battery",
      image: "/placeholder.svg",
      price: 899,
      originalPrice: 1249,
      discount: 28,
      deliveryTime: "17 Mins",
      quantity: "1 pc"
    },
    {
      title: "Lava Hero Shakti 2025 Dual Sim | Military Grade",
      image: "/placeholder.svg",
      price: 799,
      originalPrice: 1199,
      discount: 35,
      deliveryTime: "17 Mins",
      quantity: "1 piece"
    },
    {
      title: "Abra ka dabra | Military Grade",
      image: "/placeholder.svg",
      price: 799,
      originalPrice: 1199,
      discount: 35,
      deliveryTime: "17 Mins",
      quantity: "1 piece"
    },
    {
      title: "Dabra ka abra | Military Grade",
      image: "/placeholder.svg",
      price: 799,
      originalPrice: 1199,
      discount: 35,
      deliveryTime: "17 Mins",
      quantity: "1 piece"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard key={product.title} {...product} />
      ))}
    </div>
  );
};

export default ProductGrid;