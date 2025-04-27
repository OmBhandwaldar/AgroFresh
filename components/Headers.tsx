// "use client";

// import { useState } from 'react';
// import { Search, X, Trash2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { useCart } from '@/context/CartContext';

// export default function Header() {
//   const [cartOpen, setCartOpen] = useState(false);
//   const { items, loading, updateItem, removeItem } = useCart();

//   const totalPrice = items.reduce((sum, item) => {
//     return sum + item.product.price * item.quantity;
//   }, 0);

//   const deliveryCharge=50;

//   return (
//     <>
//       {/* ... existing header markup ... */}
//       <header className="border-b">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between gap-4">
//             {/* Logo */}
//             <h1 className="text-2xl font-bold text-yellow-400">Agro<span className='text-[#0C831F]'>Fresh</span></h1>

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
//               className="hidden md:flex bg-[#0C831F] text-white hover:bg-white hover:text-black hover:border hover:border-[#0C831F]"
//               onClick={() => setCartOpen(true)}
//             >
//               My Cart
//             </Button>
//           </div>
//         </div>
//       </header>

//       {/* Overlay */}
//       <div
//         className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
//           cartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
//         }`}
//         onClick={() => setCartOpen(false)}
//       />

//       {/* Cart Sidebar */}
//       <aside
//         className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white z-50 transform transition-transform duration-300 ${
//           cartOpen ? 'translate-x-0' : 'translate-x-full'
//         }`}
//       >
//         <div className="p-4 flex items-center justify-between border-b">
//           <h2 className="text-lg font-semibold">My Cart</h2>
//           <button onClick={() => setCartOpen(false)}>
//             <X className="h-5 w-5" />
//           </button>
//         </div>

//         <div className="p-4 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 96px)' }}>
//           {loading ? (
//             <p>Loading...</p>
//           ) : items.length === 0 ? (
//             <p>Your cart is empty.</p>
//           ) : (
//             items.map(item => (
//               <div key={item.id} className="flex items-center justify-between">
//                 <div>
//                   <p className="font-medium">{item.product.name}</p>
//                   <p>₹{item.product.price} × {item.quantity} = ₹{item.product.price * item.quantity}</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Button size="icon" onClick={() => updateItem(item.id, item.quantity - 1)}>-</Button>
//                   <span>{item.quantity}</span>
//                   <Button size="icon" onClick={() => updateItem(item.id, item.quantity + 1)}>+</Button>
//                   <Button size="icon" variant="ghost" onClick={() => removeItem(item.id)}>
//                     <Trash2 className="h-4 w-4 text-red-500" />
//                   </Button>
//                 </div>
//               </div>
//             ))
//           )}

//           <div className='py-2 mt-2 bg-slate-50 px-3 mb-4 rounded-lg'>
//             <div className='font-bold mb-1'>Bill details</div>
//             <div className='flex justify-between mb-1'>
//               <div>Items total</div>
//               <div>{totalPrice}</div>
//             </div>
//             <div className='flex justify-between mb-1'>
//               <div>Delivery charges</div>
//               <div>50</div>
//             </div>
//             <div className='flex justify-between font-semibold border-t pt-2 mt-1'>
//               <div>Grand total</div>
//               <div>{`${totalPrice + deliveryCharge} `}</div>
//             </div>
//           </div>

//           <Button
//             variant="secondary"
//             className="hidden w-full h-12 md:flex bg-[#0C831F] text-white hover:bg-white hover:text-black hover:border hover:border-[#0C831F]"
//           >
//             Continue to Checkout
//           </Button>
          
//         </div>
//       </aside>
//     </>
//   );
// }


//-----------------------------------------abracadabra---------------------------------------------------
// "use client";

// import { useState } from "react";
// import { Search, X, Trash2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useCart } from "@/context/CartContext";

// export default function Header() {
//   const [cartOpen, setCartOpen] = useState(false);
//   const [checkoutMode, setCheckoutMode] = useState(false);
//   const { items, loading, updateItem, removeItem } = useCart();

//   const totalPrice = items.reduce((sum, item) => {
//     return sum + item.product.price * item.quantity;
//   }, 0);

//   const deliveryCharge = 50;
//   const grandTotal = totalPrice + deliveryCharge;

//   return (
//     <>
//       {/* ... existing header markup ... */}
//       <header className="border-b">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between gap-4">
//             {/* Logo */}
//             <h1 className="text-2xl font-bold text-yellow-400">
//               Agro<span className="text-[#0C831F]">Fresh</span>
//             </h1>

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
//               className="hidden md:flex bg-[#0C831F] text-white hover:bg-white hover:text-black hover:border hover:border-[#0C831F]"
//               onClick={() => {
//                 setCartOpen(true);
//                 setCheckoutMode(false);
//               }}
//             >
//               My Cart
//             </Button>
//           </div>
//         </div>
//       </header>

//       {/* Overlay */}
//       <div
//         className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
//           cartOpen
//             ? "opacity-100 pointer-events-auto"
//             : "opacity-0 pointer-events-none"
//         }`}
//         onClick={() => setCartOpen(false)}
//       />

//       {/* Cart Sidebar */}
//       <aside
//         className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white z-50 transform transition-transform duration-300 ${
//           cartOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="p-4 flex items-center justify-between border-b">
//           <h2 className="text-lg font-semibold">
//             {checkoutMode ? "Checkout" : "My Cart"}
//           </h2>
//           <button
//             onClick={() => {
//               setCartOpen(false);
//               setCheckoutMode(false);
//             }}
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>

//         <div
//           className="p-4 space-y-4 overflow-y-auto"
//           style={{ maxHeight: "calc(100vh - 96px)" }}
//         >
//           {checkoutMode ? (
//             <div className="space-y-4">
//               <label className="font-semibold mb-2">Enter your address</label>
//               <textarea
//                 placeholder="Any special instructions?"
//                 className="w-full border rounded p-2"
//                 rows={4}
//               />
//               <Button
//                 variant="secondary"
//                 className="w-full h-12 bg-[#0C831F] text-white hover:bg-white hover:text-black hover:border hover:border-[#0C831F]"
//                 onClick={() => {
//                   // TODO: trigger payment
//                 }}
//               >
//                 Pay ₹{grandTotal}
//               </Button>
//             </div>
//           ) : loading ? (
//             <p>Loading...</p>
//           ) : items.length === 0 ? (
//             <p>Your cart is empty.</p>
//           ) : (
//             // Cart items view
//             <>
//               {items.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex items-center justify-between"
//                 >
//                   <div>
//                     <p className="font-medium">{item.product.name}</p>
//                     <p>
//                       ₹{item.product.price} × {item.quantity} = ₹
//                       {item.product.price * item.quantity}
//                     </p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Button
//                       size="icon"
//                       onClick={() =>
//                         updateItem(item.id, item.quantity - 1)
//                       }
//                     >
//                       -
//                     </Button>
//                     <span>{item.quantity}</span>
//                     <Button
//                       size="icon"
//                       onClick={() =>
//                         updateItem(item.id, item.quantity + 1)
//                       }
//                     >
//                       +
//                     </Button>
//                     <Button
//                       size="icon"
//                       variant="ghost"
//                       onClick={() => removeItem(item.id)}
//                     >
//                       <Trash2 className="h-4 w-4 text-red-500" />
//                     </Button>
//                   </div>
//                 </div>
//               ))}

//               <div className="py-2 mt-2 bg-slate-50 px-3 mb-4 rounded-lg">
//                 <div className="font-bold mb-1">Bill details</div>
//                 <div className="flex justify-between mb-1">
//                   <div>Items total</div>
//                   <div>₹{totalPrice}</div>
//                 </div>
//                 <div className="flex justify-between mb-1">
//                   <div>Delivery charges</div>
//                   <div>₹{deliveryCharge}</div>
//                 </div>
//                 <div className="flex justify-between font-semibold border-t pt-2 mt-1">
//                   <div>Grand total</div>
//                   <div>₹{grandTotal}</div>
//                 </div>
//               </div>

//               <Button
//                 variant="secondary"
//                 className="w-full h-12 bg-[#0C831F] text-white hover:bg-white hover:text-black hover:border hover:border-[#0C831F]"
//                 onClick={() => setCheckoutMode(true)}
//               >
//                 Continue to Checkout
//               </Button>
//             </>
//           )}
//         </div>
//       </aside>
//     </>
//   );
// }


//-------------------------------checking
"use client";

import { useState } from "react";
import { Search, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutMode, setCheckoutMode] = useState(false);
  const { items, loading, updateItem, removeItem } = useCart();

  const totalPrice = items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const deliveryCharge = 50;
  const grandTotal = totalPrice + deliveryCharge;

  return (
    <>
      {/* ... existing header markup ... */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <h1 className="text-2xl font-bold text-yellow-400">
              Agro<span className="text-[#0C831F]">Fresh</span>
            </h1>

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
              onClick={() => {
                setCartOpen(true);
                setCheckoutMode(false);
              }}
            >
              My Cart
            </Button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          cartOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setCartOpen(false)}
      />

      {/* Cart Sidebar */}
      <aside
        className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white z-50 transform transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <h2 className="text-lg font-semibold">
            {checkoutMode ? "Checkout" : "My Cart"}
          </h2>
          <button
            onClick={() => {
              setCartOpen(false);
              setCheckoutMode(false);
            }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className="p-4 space-y-4 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 96px)" }}
        >
          {checkoutMode ? (
            // ** UPDATED CHECKOUT MODE **
            <div className="space-y-4">
              {/* ** Added: Address input fields ** */}
              <Input
                placeholder="House No. & Floor"
                className="w-full"
              /> {/* ** Added */}
              <Input
                placeholder="Building & Block No."
                className="w-full"
              /> {/* ** Added */}
              <Input
                placeholder="Landmark & Area Name"
                className="w-full"
              /> {/* ** Added */}
              <Input
                placeholder="City"
                className="w-full"
              /> {/* ** Added */}
              <Input
                placeholder="State"
                className="w-full"
              /> {/* ** Added */}
              <Input
                type="number"
                placeholder="Pincode"
                className="w-full"
              /> {/* ** Added */}

              <Button
                variant="secondary"
                className="w-full h-12 bg-[#0C831F] text-white hover:bg-white hover:text-black hover:border hover:border-[#0C831F]"
                onClick={() => {
                  // TODO: trigger payment
                }}
              >
                Pay ₹{grandTotal}
              </Button>
            </div>
          ) : loading ? (
            <p>Loading...</p>
          ) : items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            // Cart items view
            <>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p>
                      ₹{item.product.price} × {item.quantity} = ₹
                      {item.product.price * item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      onClick={() =>
                        updateItem(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      size="icon"
                      onClick={() =>
                        updateItem(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}

              <div className="py-2 mt-2 bg-slate-50 px-3 mb-4 rounded-lg">
                <div className="font-bold mb-1">Bill details</div>
                <div className="flex justify-between mb-1">
                  <div>Items total</div>
                  <div>₹{totalPrice}</div>
                </div>
                <div className="flex justify-between mb-1">
                  <div>Delivery charges</div>
                  <div>₹{deliveryCharge}</div>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2 mt-1">
                  <div>Grand total</div>
                  <div>₹{grandTotal}</div>
                </div>
              </div>

              <Button
                variant="secondary"
                className="w-full h-12 bg-[#0C831F] text-white hover:bg-white hover:text-black hover:border hover:border-[#0C831F]"
                onClick={() => setCheckoutMode(true)}
              >
                Continue to Checkout
              </Button>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
