'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CategoryItemProps {
    icon?: string;
    name: string;
    slug: string;
    categorySlug: string;
  }
  
  export const CategoryItem = ({ icon="/placeholder.svg", name, slug, categorySlug }: CategoryItemProps) => {
    const router = useRouter();

    const handleClick = () => {
      router.push(`/categories/${categorySlug}/${slug}`);
    };

    return (
      <div 
        className="flex flex-col items-center p-4 hover:shadow-md rounded-lg transition-shadow cursor-pointer"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick();
          }
        }}
      >
        <Image width={20} height={20} src={icon} alt={name} className="w-20 h-20 object-contain mb-2" />
        <span className="text-sm text-center">{name}</span>
      </div>
    );
  };
  
  const CategoryGrid = () => {
    const categories = [
      { icon: "/placeholder.svg", name: "Root Vegetables", slug: "root-vegetables", categorySlug: "vegetables" },
      { icon: "/placeholder.svg", name: "Leafy Vegetables", slug: "leafy-vegetables", categorySlug: "vegetables" },
      { icon: "/placeholder.svg", name: "Fruiting Vegetables", slug: "fruiting-vegetables", categorySlug: "vegetables" },
      { icon: "/placeholder.svg", name: "Citrus Fruits", slug: "citrus-fruits", categorySlug: "fruits" },
      { icon: "/placeholder.svg", name: "Berries", slug: "berries", categorySlug: "fruits" },
      { icon: "/placeholder.svg", name: "Tropical Fruits", slug: "tropical-fruits", categorySlug: "fruits" },
      { icon: "/placeholder.svg", name: "Pome Fruits", slug: "pome-fruits", categorySlug: "fruits" },
      { icon: "/placeholder.svg", name: "Cereals", slug: "cereals", categorySlug: "grains" },
      { icon: "/placeholder.svg", name: "Pulses", slug: "pulses", categorySlug: "grains" },
      { icon: "/placeholder.svg", name: "Oil Seeds", slug: "oil-seeds", categorySlug: "grains" },
    ];
  
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((category) => (
          <CategoryItem key={category.slug} {...category} />
        ))}
      </div>
    );
  };
  
  export default CategoryGrid;