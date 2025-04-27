// 'use client'
// import { Suspense } from 'react';
// import CategoryBanner from "@/components/CategoryBanner";
import ProductGridWrapper from '@/components/ProductGridWrapper';
import CategoryGridWraper from '@/components/CategoryGridWrapper';
// import { getServerSession } from "next-auth/next";
// import { authOptions } from '@/lib/auth';


export default async function Home() {
  // const session = await getServerSession(authOptions);
  return (
    <div className="min-h-screen bg-gray-50">
    
    <main className="container mx-auto px-4 py-8">
      {/* Featured Banners */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
      </div> */}
      <div className="mb-12">

      <CategoryGridWraper />

       <ProductGridWrapper />
      </div>
    </main>
  </div>
  );
}