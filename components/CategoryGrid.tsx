import Image from "next/image";

interface CategoryItemProps {
    icon: string;
    name: string;
  }
  
  const CategoryItem = ({ icon, name }: CategoryItemProps) => {
    return (
      <div className="flex flex-col items-center p-4 hover:shadow-md rounded-lg transition-shadow">
        <Image width={20} height={20} src={icon} alt={name} className="w-20 h-20 object-contain mb-2" />
        <span className="text-sm text-center">{name}</span>
      </div>
    );
  };
  
  const CategoryGrid = () => {
    const categories = [
      { icon: "/placeholder.svg", name: "Paan Corner" },
      { icon: "/placeholder.svg", name: "Dairy, Bread & Eggs" },
      { icon: "/placeholder.svg", name: "Fruits & Vegetables" },
      { icon: "/placeholder.svg", name: "Cold Drinks & Juices" },
      { icon: "/placeholder.svg", name: "Snacks & Munchies" },
      { icon: "/placeholder.svg", name: "Breakfast & Instant Food" },
      { icon: "/placeholder.svg", name: "Sweet Tooth" },
      { icon: "/placeholder.svg", name: "Bakery & Biscuits" },
      { icon: "/placeholder.svg", name: "Tea, Coffee & Health Drink" },
      { icon: "/placeholder.svg", name: "Atta, Rice & Dal" },
    ];
  
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((category) => (
          <CategoryItem key={category.name} {...category} />
        ))}
      </div>
    );
  };
  
  export default CategoryGrid;