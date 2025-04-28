import { Button } from "@/components/ui/button";

interface CategoryBannerProps {
  title: string;
  subtitle: string;
  color: string;
  buttonText: string;
  onClick?: () => void;
}

const CategoryBanner = ({ title, subtitle, color, buttonText, onClick }: CategoryBannerProps) => {
  return (
    <div 
      className={`${color} rounded-lg p-6 text-left cursor-pointer hover:scale-105 transition-transform duration-200`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (onClick) { 
            onClick();
          }
        }
      }}
    >
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="mb-4">{subtitle}</p>
      <Button variant="secondary" className="bg-white hover:bg-gray-100 hover:cursor-pointer">
        {buttonText}
      </Button>
    </div>
  );
};

export default CategoryBanner;