'use client'
import CategoryBanner from "@/components/CategoryBanner";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleVegetablesClick = () => {
    router.push("/categories/vegetables");
  };

  const handlePetCareClick = () => {
    router.push("/categories/pet-care");
  };

  const handleFruitsClick = () => {
    router.push("/categories/fruits");
  };

  return (
    <div className="min-h-screen bg-gray-50">
    {/* <Header /> */}
    
    <main className="container mx-auto px-4 py-8">
      {/* Featured Banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <CategoryBanner
          title="Vegetables at your doorstep!"
          subtitle="Brocoli, blbla and many more"
          color="bg-emerald-400"
          buttonText="Order Now"
          onClick={handleVegetablesClick}
        />
        <CategoryBanner
          title="Pet Care supplies in minutes"
          subtitle="Food, treats, toys & more"
          color="bg-yellow-400"
          buttonText="Order Now"
          onClick={handlePetCareClick}
        />
        <CategoryBanner
          title="Need fresh fruits to eat?"
          subtitle="Get organic fruits super fast"
          color="bg-blue-200"
          buttonText="Order Now"
          onClick={handleFruitsClick}
        />
      </div>

      {/* Category Grid */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Shop by Category</h2>
        <CategoryGrid />
      </div>

       {/* Product Grid */}
       <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Featured Products</h2>
          <ProductGrid />
        </div>
    </main>
  </div>
  );
}
