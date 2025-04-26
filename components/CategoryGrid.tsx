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
  
  interface Type {
    id: string;
    name: string;
    slug: string;
    categoryId: string;
    category: {
      id: string;
      name: string;
      slug: string;
    };
  }

  interface CategoryGridProps {
    types: Type[];
  }

  const CategoryGrid = ({ types }: CategoryGridProps) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {types.map((type) => (
          <CategoryItem
            key={type.id}
            name={type.name}
            slug={type.slug}
            categorySlug={type.category.slug}
          />
        ))}
      </div>
    );
  };
  
  export default CategoryGrid;