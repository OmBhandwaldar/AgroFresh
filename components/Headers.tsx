// import { Search } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// const Header = () => {
//   return (
//     <header className="border-b">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between gap-4">
//           {/* Logo */}
//           <div className="flex items-center">
//             <h1 className="text-2xl font-bold text-yellow-400">AgroFresh</h1>
//           </div>

//           {/* Location selector */}
//           <Button variant="ghost" className="hidden md:flex">
//             <span className="text-sm">3077 A1, Swapnapoorti Society...</span>
//           </Button>

//           {/* Search bar */}
//           <div className="flex-1 max-w-xl relative">
//             <Input
//               type="text"
//               placeholder="Search 'paneer'"
//               className="w-full pl-10"
//             />
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//           </div>

//           {/* Login button */}
//           <Button variant="ghost" className="hidden md:flex">
//             Login
//           </Button>

//           {/* Cart button */}
//           <Button variant="secondary" className="hidden md:flex">
//             My Cart
//           </Button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


//---------------------Lastest-------------------------------------
// components/Header.tsx
// "use client";

// import { useState } from "react";
// import { Search, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input }  from "@/components/ui/input";

// export default function Header() {
//   const [cartOpen, setCartOpen] = useState(false);

//   return (
//     <>
//       <header className="border-b">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between gap-4">
//             {/* Logo */}
//             <h1 className="text-2xl font-bold text-yellow-400">AgroFresh</h1>

//             {/* Location selector */}
//             <Button variant="ghost" className="hidden md:flex">
//               <span className="text-sm">3077 A1, Swapnapoorti Society...</span>
//             </Button>

//             {/* Search bar */}
//             <div className="flex-1 max-w-xl relative">
//               <Input
//                 type="text"
//                 placeholder="Search 'paneer'"
//                 className="w-full pl-10"
//               />
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//             </div>

//             {/* Login */}
//             <Button variant="ghost" className="hidden md:flex">
//               Login
//             </Button>

//             {/* Cart */}
//             <Button
//               variant="secondary"
//               className="hidden md:flex"
//               onClick={() => setCartOpen(true)}
//             >
//               My Cart
//             </Button>
//           </div>
//         </div>
//       </header>

//       {/* Slide-in Cart Panel */}
//       {/* Overlay */}
//       <div
//         className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
//           cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
//         }`}
//         onClick={() => setCartOpen(false)}
//       />

//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed inset-y-0 right-0 w-full md:w-96 bg-white z-50
//           transform transition-transform duration-300
//           ${cartOpen ? "translate-x-0" : "translate-x-full"}
//         `}
//       >
//         <div className="p-4 flex items-center justify-between border-b">
//           <h2 className="text-lg font-semibold">My Cart</h2>
//           <button onClick={() => setCartOpen(false)}>
//             <X className="h-5 w-5" />
//           </button>
//         </div>

//         <div className="p-4 space-y-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 96px)" }}>
//           {/* … Your cart items go here … */}
//           <p>Your cart is empty.</p>
//         </div>
//       </aside>
//     </>
//   );
// }
//--------------------------------------------------------



"use client";

import { useState } from 'react';
import { Search, X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const { items, loading, updateItem, removeItem } = useCart();

  return (
    <>
      {/* ... existing header markup ... */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <h1 className="text-2xl font-bold text-yellow-400">Agro<span className='text-[#0C831F]'>Fresh</span></h1>

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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            {/* Login */}
            <Button variant="ghost" className="hidden md:flex">
              Login
            </Button>

            {/* Cart */}
            <Button
              variant="secondary"
              className="hidden md:flex bg-[#0C831F] text-white hover:bg-white hover:text-black hover:border hover:border-[#0C831F]"
              onClick={() => setCartOpen(true)}
            >
              My Cart
            </Button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          cartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setCartOpen(false)}
      />

      {/* Cart Sidebar */}
      <aside
        className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white z-50 transform transition-transform duration-300 ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <h2 className="text-lg font-semibold">My Cart</h2>
          <button onClick={() => setCartOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 96px)' }}>
          {loading ? (
            <p>Loading...</p>
          ) : items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p>₹{item.product.price} × {item.quantity} = ₹{item.product.price * item.quantity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="icon" onClick={() => updateItem(item.id, item.quantity - 1)}>-</Button>
                  <span>{item.quantity}</span>
                  <Button size="icon" onClick={() => updateItem(item.id, item.quantity + 1)}>+</Button>
                  <Button size="icon" variant="ghost" onClick={() => removeItem(item.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
}
