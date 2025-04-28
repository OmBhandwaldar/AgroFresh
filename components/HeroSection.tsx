'use client'
import { useRouter } from "next/navigation";
import CategoryBanner from "./CategoryBanner";

export default function HeroSection() {
  const router = useRouter();

  function handleVegetablesClick() {
    router.push("/categories/vegetables/leafy-vegetables");
  }

  function handleFruitsClick() {
    router.push("/categories/fruits/citrus-fruits");
  }

  function handleMangosClick() {
    router.push("/categories/fruits/strawberry");
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
    <CategoryBanner
        title="Can't Resist Eating Strawberries?"
        subtitle="Get organic strawberries delivered to your doorstep"
        color="bg-blue-200"
        buttonText="Order Now"
        onClick={handleMangosClick}
      />
      <CategoryBanner
        title="Want Fresh Leafy Vegetables?"
        subtitle="Broccoli, collard and many more"
        color="bg-emerald-400"
        buttonText="Order Now"
        onClick={handleVegetablesClick}
      />
    <CategoryBanner
        title="Craving for some fruits?"
        subtitle="Mangos, apples and many more"
        color="bg-yellow-400"
        buttonText="Order Now"
        onClick={handleFruitsClick}
      />
    </div>
  );
}
