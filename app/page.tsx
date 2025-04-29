import ProductGridWrapper from '@/components/ProductGridWrapper';
import CategoryGridWraper from '@/components/CategoryGridWrapper';
import HeroSection from '@/components/HeroSection';


export default async function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
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