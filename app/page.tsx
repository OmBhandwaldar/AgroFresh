import Header from "@/components/Headers";
import CategoryBanner from "@/components/CategoryBanner";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
    <Header />
    
    <main className="container mx-auto px-4 py-8">
      {/* Featured Banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <CategoryBanner
          title="Pharmacy at your doorstep!"
          subtitle="Cough syrups, pain relief sprays & more"
          color="bg-emerald-400"
          buttonText="Order Now"
        />
        <CategoryBanner
          title="Pet Care supplies in minutes"
          subtitle="Food, treats, toys & more"
          color="bg-yellow-400"
          buttonText="Order Now"
        />
        <CategoryBanner
          title="No time for a diaper run?"
          subtitle="Get baby care essentials in minutes"
          color="bg-blue-200"
          buttonText="Order Now"
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
