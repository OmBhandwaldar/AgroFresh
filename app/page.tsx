// 'use client'
// import { Suspense } from 'react';
// import CategoryBanner from "@/components/CategoryBanner";
import ProductGridWrapper from '@/components/ProductGridWrapper';
import CategoryGridWraper from '@/components/CategoryGridWrapper';
// import { getServerSession } from "next-auth/next";
// import { authOptions } from '@/lib/auth';
import HeroSection from '@/components/HeroSection';


export default async function Home() {
  // 
  return (
    <div className="min-h-screen bg-gray-50">
    {/* {session ? <div>{session.user.name}</div> : <div>not logged in</div>} */}
    <main className="container mx-auto px-4 py-8">
      <HeroSection />
      <div className="mb-12">

      <CategoryGridWraper />

       <ProductGridWrapper />
      </div>
    </main>
  </div>
  );
}