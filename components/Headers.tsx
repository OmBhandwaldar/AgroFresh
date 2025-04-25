import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-yellow-400">blinkit</h1>
          </div>

          {/* Location selector */}
          <Button variant="ghost" className="hidden md:flex">
            <span className="text-sm">3077 A1, Swapnapoorti Society...</span>
          </Button>

          {/* Search bar */}
          <div className="flex-1 max-w-xl relative">
            <Input
              type="text"
              placeholder="Search 'paneer'"
              className="w-full pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          {/* Login button */}
          <Button variant="ghost" className="hidden md:flex">
            Login
          </Button>

          {/* Cart button */}
          <Button variant="secondary" className="hidden md:flex">
            My Cart
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;