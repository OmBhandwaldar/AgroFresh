import { Button } from "@/components/ui/button";

interface CategoryBannerProps {
  title: string;
  subtitle: string;
  color: string;
  buttonText: string;
}

const CategoryBanner = ({ title, subtitle, color, buttonText }: CategoryBannerProps) => {
  return (
    <div className={`${color} rounded-lg p-6 text-left`}>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="mb-4">{subtitle}</p>
      <Button variant="secondary" className="bg-white hover:bg-gray-100">
        {buttonText}
      </Button>
    </div>
  );
};

export default CategoryBanner;
