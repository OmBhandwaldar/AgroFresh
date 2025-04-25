import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface ProductCardProps {
  title: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  deliveryTime: string;
  quantity: string;
}

const ProductCard = ({
  title,
  image,
  price,
  originalPrice,
  discount,
  deliveryTime,
  quantity,
}: ProductCardProps) => {
  return (
    <Card className="relative group">
      <Badge 
        variant="default" 
        className="absolute top-2 left-2 bg-purple-600 hover:bg-purple-600"
      >
        {discount}% Off
      </Badge>
      
      <CardContent className="p-4">
        <div className="aspect-square mb-4">
          <Image
          width={100}
          height={100}
            src={image}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium text-sm line-clamp-2">{title}</h3>
          
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold">₹{price}</p>
            <p className="text-sm text-muted-foreground line-through">₹{originalPrice}</p>
          </div>

          <div className="text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              {/* <img src="/placeholder.svg" alt="clock" className="w-4 h-4" /> */}
              {deliveryTime}
            </div> 
            {/* <div>{deliveryTime}</div> */}
            <div>{quantity}</div>
          </div>

          <Button variant="outline" className="w-full">Add to Cart</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;