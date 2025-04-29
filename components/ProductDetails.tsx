import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  type: string;
  price: number;
  imageUrl: string;
  description: string;
}


const ProductDetails = ({id, slug, name, category, type, price, description, imageUrl} : Product) => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Fixed Left Panel */}
      <div className="w-1/2 sticky top-0 h-screen p-8 flex items-center justify-center">
        <Image
          width={80}
          height={100}
          src={imageUrl}
          alt="Amul Masti Pouch Curd"
          className="max-w-[80%] h-auto"
        />
      </div>

      {/* Scrollable Right Panel */}
      <div className="w-1/2 min-h-screen overflow-y-auto p-8">
        <div className="text-sm text-muted-foreground mb-6">
          {description}
          {category}{type}
          {id}
          {slug}
        </div>

        {/* Product Title */}
        <h1 className="text-4xl font-bold mb-4">{name}</h1>

        {/* Cooking Time */}
        <div className="flex items-center gap-2 mb-6">
          <a href="#" className="text-green-600 hover:underline">View all by vegetables</a>
        </div>

        {/* Price Section */}
        <div className="mb-8">
          <div className="text-lg mb-2">400 g</div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-lg font-semibold">MRP ₹{price}</span>
              <div className="text-sm text-muted-foreground">(Inclusive of all taxes)</div>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">ADD</Button>
          </div>
        </div>

        {/* Why Shop Section */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Why shop from agrofresh?</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                🚀
              </div>
              <div>
                <h3 className="font-semibold mb-1">Superfast Delivery</h3>
                <p className="text-muted-foreground">Get your order delivered to your doorstep at the earliest from dark stores near you.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                💰
              </div>
              <div>
                <h3 className="font-semibold mb-1">Best Prices & Offers</h3>
                <p className="text-muted-foreground">Best price destination with offers directly from the manufacturers.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                🛒
              </div>
              <div>
                <h3 className="font-semibold mb-1">Wide Assortment</h3>
                <p className="text-muted-foreground">Choose from 5000+ products across food, personal care, household & other categories.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetails;
