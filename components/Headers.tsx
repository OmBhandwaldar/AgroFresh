// 'use client';

// import { useEffect, useState } from 'react';
// import { Search, X, Trash2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { useCart } from '@/context/CartContext';
// import { signOut, useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

// type OrderResult = {
//   id: string;
//   name: string;
//   contact: string;
//   house: string;
//   building: string;
//   landmark: string;
//   city: string;
//   state: string;
//   pincode: string;
//   status: string;
//   items: Array<{
//     id: string;
//     product: { name: string };
//     quantity: number;
//     price: number;
//   }>;
// };


// export default function Headers() {
//   const [cartOpen, setCartOpen] = useState(false);
//   const [checkoutMode, setCheckoutMode] = useState(false);
//   const [orderResult, setOrderResult] = useState<OrderResult | null>(null);
//   const { items, loading, updateItem, removeItem, clearCart } = useCart();
//   const router = useRouter();
//   const { data: session } = useSession();
//   const [userMenuOpen, setUserMenuOpen] = useState(false);


//   if (loading) {
//     return <div>Loading cart...</div>;  // or return null
//   }
//     if(!session) {
//     return (
//       <div>session not found</div>
//     );
//   }
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     const name  = session?.user?.name;
//     const contact = session?.user?.phone;
//     const adminName    = process.env.NEXT_PUBLIC_ADMIN_NAME;
//     const adminContact = process.env.NEXT_PUBLIC_ADMIN_CONTACT;

//     setIsAdmin(
//       name  === adminName &&
//       contact === adminContact
//     );
//   }, [session]);

//   if(isAdmin){
//     router.push('/admin');
//   }


//   const safeItems = items ?? []; // fallback to empty array
// const totalPrice = safeItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

//   // const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
//   const deliveryCharge = 50;
//   const grandTotal = totalPrice + deliveryCharge;

//   // Address state
//   const [address, setAddress] = useState({
//     house: '',
//     building: '',
//     landmark: '',
//     city: '',
//     state: '',
//     pincode: '',
//   });

//   const handlePay = async () => {
//     const res = await fetch('/api/orders', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(address),
//     });
//     const order:OrderResult = await res.json();
//     if (!res.ok) {
//       alert('Failed to place order');
//       return;
//     }
//     setOrderResult(order);
//     clearCart();
//   };

//   const initial = session?.user?.name?.[0]?.toUpperCase() ?? '';
  
  

//   return (
//     <>
//         <header className="border-b">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <h1 className="text-2xl font-bold text-yellow-400">
//             Agro<span className="text-[#0C831F]">Fresh</span>
//           </h1>


//           <div className="hidden md:flex items-center gap-4 relative">
//             {!session ? (
//               <Button variant="ghost">Login</Button>
//             ) : (
//               <div className="relative">
//                 <button
//                   onClick={() => setUserMenuOpen((o) => !o)}
//                   className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium"
//                 >
//                   {initial}
//                 </button>
//                 {userMenuOpen && (
//                   <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded border">
//                     <button
//                       onClick={() => {
//                         router.push('/orders');
//                         setUserMenuOpen(false);
//                       }}
//                       className="block w-full px-4 py-2 text-left hover:bg-gray-100"
//                     >
//                       Orders
//                     </button>
//                     <button
//                       onClick={() => signOut()}
//                       className="block w-full px-4 py-2 text-left hover:bg-gray-100"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}

//               <Button
//               variant="secondary"
//               className="bg-[#0C831F] text-white"
//               onClick={() => {
//                 setCartOpen(true);
//                 setCheckoutMode(false);
//                 setOrderResult(null);
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
//           <h2 className="text-lg font-semibold">
//             {orderResult
//               ? 'Order Confirmation'
//               : checkoutMode
//               ? 'Checkout'
//               : 'My Cart'}
//           </h2>
//           <button
//             onClick={() => {
//               setCartOpen(false);
//               setCheckoutMode(false);
//               setOrderResult(null);
//             }}
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>
//         <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 96px)' }}>
//           {orderResult ? (
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold">Order placed successfully!</h3>
//               <p>Name: {orderResult.name}</p>
//               <p>Contact: {orderResult.contact}</p>
//               <p>
//                 Address: {orderResult.house}, {orderResult.building},{' '}
//                 {orderResult.landmark}, {orderResult.city}, {orderResult.state} –{' '}
//                 {orderResult.pincode}
//               </p>
//               <p>Status: {orderResult.status}</p>
//               <div className="space-y-2">
//                 {orderResult?.items?.map((it) => (
//                   <div key={it.id} className="border p-2 rounded">
//                     <p>Product: {it.product.name}</p>
//                     <p>Qty: {it.quantity}</p>
//                     <p>Price: ₹{it.price}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : checkoutMode ? (
//             <div className="space-y-4">
//               <Input
//                 placeholder="House No. & Floor"
//                 value={address.house}
//                 onChange={e => setAddress(a => ({ ...a, house: e.target.value }))}
//               />
//               <Input
//                 placeholder="Building & Block No."
//                 value={address.building}
//                 onChange={e => setAddress(a => ({ ...a, building: e.target.value }))}
//               />
//               <Input
//                 placeholder="Landmark & Area Name"
//                 value={address.landmark}
//                 onChange={e => setAddress(a => ({ ...a, landmark: e.target.value }))}
//               />
//               <Input
//                 placeholder="City"
//                 value={address.city}
//                 onChange={e => setAddress(a => ({ ...a, city: e.target.value }))}
//               />
//               <Input
//                 placeholder="State"
//                 value={address.state}
//                 onChange={e => setAddress(a => ({ ...a, state: e.target.value }))}
//               />
//               <Input
//                 type="number"
//                 placeholder="Pincode"
//                 value={address.pincode}
//                 onChange={e => setAddress(a => ({ ...a, pincode: e.target.value }))}
//               />
//               <Button className="w-full" onClick={handlePay}>
//                 Pay ₹{grandTotal}
//               </Button>
//             </div>
//           ) : loading ? (
//             <p>Loading...</p>
//           ) : items.length === 0 ? (
//             <p>Your cart is empty.</p>
//           ) : (
//             <>
//               {items.map(item => (
//                 <div key={item.id} className="flex items-center justify-between mb-4">
//                   <div>
//                     <p className="font-medium">{item.product.name}</p>
//                     <p>
//                       ₹{item.product.price} × {item.quantity} = ₹
//                       {item.product.price * item.quantity}
//                     </p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Button size="icon" onClick={() => updateItem(item.id, item.quantity - 1)}>
//                       -
//                     </Button>
//                     <span>{item.quantity}</span>
//                     <Button size="icon" onClick={() => updateItem(item.id, item.quantity + 1)}>
//                       +
//                     </Button>
//                     <Button size="icon" variant="ghost" onClick={() => removeItem(item.id)}>
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

//               <Button className="w-full" onClick={() => setCheckoutMode(true)}>
//                 Continue to Checkout
//               </Button>
//             </>
//           )}
//         </div>
//       </aside>
//     </>
//   );
// }




// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { Search, X, Trash2 } from 'lucide-react';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { useCart } from '@/context/CartContext';
// // import { signOut, useSession } from 'next-auth/react';
// // import { useRouter } from 'next/navigation';

// // type OrderResult = {
// //   id: string;
// //   name: string;
// //   contact: string;
// //   house: string;
// //   building: string;
// //   landmark: string;
// //   city: string;
// //   state: string;
// //   pincode: string;
// //   status: string;
// //   items: Array<{
// //     id: string;
// //     product: { name: string };
// //     quantity: number;
// //     price: number;
// //   }>;
// // };


// 'use client';

// import { useEffect, useState } from 'react';
// import { Search, X, Trash2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { useCart } from '@/context/CartContext';
// import { signOut, useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

// type OrderResult = {
//   id: string;
//   name: string;
//   contact: string;
//   house: string;
//   building: string;
//   landmark: string;
//   city: string;
//   state: string;
//   pincode: string;
//   status: string;
//   items: Array<{
//     id: string;
//     product: { name: string };
//     quantity: number;
//     price: number;
//   }>;
// };

// export default function Headers() {
//   const [cartOpen, setCartOpen] = useState(false);
//   const [checkoutMode, setCheckoutMode] = useState(false);
//   const [orderResult, setOrderResult] = useState<OrderResult | null>(null);
//   const { items, loading, updateItem, removeItem, clearCart } = useCart();
//   const router = useRouter();
//   const { data: session } = useSession();
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//     // Address state
//     const [address, setAddress] = useState({
//       house: '',
//       building: '',
//       landmark: '',
//       city: '',
//       state: '',
//       pincode: '',
//     });

//   if (loading) {
//     return <div>Loading cart...</div>;  // or return null
//   }

//   if(!session){

//     const safeItems = items ?? []; // fallback to empty array
//     const totalPrice = safeItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    
//     // const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
//     const deliveryCharge = 50;
//     const grandTotal = totalPrice + deliveryCharge;
//   }
  

  
//     const handlePay = async () => {
//       const res = await fetch('/api/orders', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(address),
//       });
//       const order:OrderResult = await res.json();
//       if (!res.ok) {
//         alert('Failed to place order');
//         return;
//       }
//       setOrderResult(order);
//       clearCart();
//     };
  
//     const initial = session?.user?.name?.[0]?.toUpperCase() ?? '';

//     if(!session) {
//     return (
//       <>
//         <header className="border-b">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <h1 className="text-2xl font-bold text-yellow-400">
//             Agro<span className="text-[#0C831F]">Fresh</span>
//           </h1>


//           <div className="hidden md:flex items-center gap-4 relative">
//               <Button variant="ghost">Login</Button>

//               <Button
//               variant="secondary"
//               className="bg-[#0C831F] text-white"
//               onClick={() => {
//                 setCartOpen(true);
//                 setCheckoutMode(false);
//                 setOrderResult(null);
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
//           <h2 className="text-lg font-semibold">
//             {orderResult
//               ? 'Order Confirmation'
//               : checkoutMode
//               ? 'Checkout'
//               : 'My Cart'}
//           </h2>
//           <button
//             onClick={() => {
//               setCartOpen(false);
//               setCheckoutMode(false);
//               setOrderResult(null);
//             }}
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>
//         <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 96px)' }}>
//           {orderResult ? (
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold">Order placed successfully!</h3>
//               <p>Name: {orderResult.name}</p>
//               <p>Contact: {orderResult.contact}</p>
//               <p>
//                 Address: {orderResult.house}, {orderResult.building},{' '}
//                 {orderResult.landmark}, {orderResult.city}, {orderResult.state} –{' '}
//                 {orderResult.pincode}
//               </p>
//               <p>Status: {orderResult.status}</p>
//               <div className="space-y-2">
//                 {orderResult?.items?.map((it) => (
//                   <div key={it.id} className="border p-2 rounded">
//                     <p>Product: {it.product.name}</p>
//                     <p>Qty: {it.quantity}</p>
//                     <p>Price: ₹{it.price}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : checkoutMode ? (
//             <div className="space-y-4">
//               <Input
//                 placeholder="House No. & Floor"
//                 value={address.house}
//                 onChange={e => setAddress(a => ({ ...a, house: e.target.value }))}
//               />
//               <Input
//                 placeholder="Building & Block No."
//                 value={address.building}
//                 onChange={e => setAddress(a => ({ ...a, building: e.target.value }))}
//               />
//               <Input
//                 placeholder="Landmark & Area Name"
//                 value={address.landmark}
//                 onChange={e => setAddress(a => ({ ...a, landmark: e.target.value }))}
//               />
//               <Input
//                 placeholder="City"
//                 value={address.city}
//                 onChange={e => setAddress(a => ({ ...a, city: e.target.value }))}
//               />
//               <Input
//                 placeholder="State"
//                 value={address.state}
//                 onChange={e => setAddress(a => ({ ...a, state: e.target.value }))}
//               />
//               <Input
//                 type="number"
//                 placeholder="Pincode"
//                 value={address.pincode}
//                 onChange={e => setAddress(a => ({ ...a, pincode: e.target.value }))}
//               />
//               <Button className="w-full" onClick={handlePay}>
//                 Pay ₹{grandTotal}
//               </Button>
//             </div>
//           ) : loading ? (
//             <p>Loading...</p>
//           ) : items.length === 0 ? (
//             <p>Your cart is empty.</p>
//           ) : (
//             <>
//               {items.map(item => (
//                 <div key={item.id} className="flex items-center justify-between mb-4">
//                   <div>
//                     <p className="font-medium">{item.product.name}</p>
//                     <p>
//                       ₹{item.product.price} × {item.quantity} = ₹
//                       {item.product.price * item.quantity}
//                     </p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Button size="icon" onClick={() => updateItem(item.id, item.quantity - 1)}>
//                       -
//                     </Button>
//                     <span>{item.quantity}</span>
//                     <Button size="icon" onClick={() => updateItem(item.id, item.quantity + 1)}>
//                       +
//                     </Button>
//                     <Button size="icon" variant="ghost" onClick={() => removeItem(item.id)}>
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

//               <Button className="w-full" onClick={() => setCheckoutMode(true)}>
//                 Continue to Checkout
//               </Button>
//             </>
//           )}
//         </div>
//       </aside>
//     </>
//     );
//   }


//   // const [isAdmin, setIsAdmin] = useState(false);

//   // useEffect(() => {
//   //   const name  = session?.user?.name;
//   //   const contact = session?.user?.phone;
//   //   const adminName    = process.env.NEXT_PUBLIC_ADMIN_NAME;
//   //   const adminContact = process.env.NEXT_PUBLIC_ADMIN_CONTACT;

//   //   setIsAdmin(
//   //     name  === adminName &&
//   //     contact === adminContact
//   //   );
//   // }, [session]);

//   // if(isAdmin){
//   //   router.push('/admin');
//   // }



  
  

//   return (
//     <>
//         <header className="border-b">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <h1 className="text-2xl font-bold text-yellow-400">
//             Agro<span className="text-[#0C831F]">Fresh</span>
//           </h1>


//           <div className="hidden md:flex items-center gap-4 relative">
//               <div className="relative">
//                 <button
//                   onClick={() => setUserMenuOpen((o) => !o)}
//                   className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium"
//                 >
//                   {initial}
//                 </button>
//                 {userMenuOpen && (
//                   <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded border">
//                     <button
//                       onClick={() => {
//                         router.push('/orders');
//                         setUserMenuOpen(false);
//                       }}
//                       className="block w-full px-4 py-2 text-left hover:bg-gray-100"
//                     >
//                       Orders
//                     </button>
//                     <button
//                       onClick={() => signOut()}
//                       className="block w-full px-4 py-2 text-left hover:bg-gray-100"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//               <Button
//               variant="secondary"
//               className="bg-[#0C831F] text-white"
//               onClick={() => {
//                 setCartOpen(true);
//                 setCheckoutMode(false);
//                 setOrderResult(null);
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
//           <h2 className="text-lg font-semibold">
//             {orderResult
//               ? 'Order Confirmation'
//               : checkoutMode
//               ? 'Checkout'
//               : 'My Cart'}
//           </h2>
//           <button
//             onClick={() => {
//               setCartOpen(false);
//               setCheckoutMode(false);
//               setOrderResult(null);
//             }}
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>
//         <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 96px)' }}>
//           {orderResult ? (
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold">Order placed successfully!</h3>
//               <p>Name: {orderResult.name}</p>
//               <p>Contact: {orderResult.contact}</p>
//               <p>
//                 Address: {orderResult.house}, {orderResult.building},{' '}
//                 {orderResult.landmark}, {orderResult.city}, {orderResult.state} –{' '}
//                 {orderResult.pincode}
//               </p>
//               <p>Status: {orderResult.status}</p>
//               <div className="space-y-2">
//                 {orderResult?.items?.map((it) => (
//                   <div key={it.id} className="border p-2 rounded">
//                     <p>Product: {it.product.name}</p>
//                     <p>Qty: {it.quantity}</p>
//                     <p>Price: ₹{it.price}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : checkoutMode ? (
//             <div className="space-y-4">
//               <Input
//                 placeholder="House No. & Floor"
//                 value={address.house}
//                 onChange={e => setAddress(a => ({ ...a, house: e.target.value }))}
//               />
//               <Input
//                 placeholder="Building & Block No."
//                 value={address.building}
//                 onChange={e => setAddress(a => ({ ...a, building: e.target.value }))}
//               />
//               <Input
//                 placeholder="Landmark & Area Name"
//                 value={address.landmark}
//                 onChange={e => setAddress(a => ({ ...a, landmark: e.target.value }))}
//               />
//               <Input
//                 placeholder="City"
//                 value={address.city}
//                 onChange={e => setAddress(a => ({ ...a, city: e.target.value }))}
//               />
//               <Input
//                 placeholder="State"
//                 value={address.state}
//                 onChange={e => setAddress(a => ({ ...a, state: e.target.value }))}
//               />
//               <Input
//                 type="number"
//                 placeholder="Pincode"
//                 value={address.pincode}
//                 onChange={e => setAddress(a => ({ ...a, pincode: e.target.value }))}
//               />
//               <Button className="w-full" onClick={handlePay}>
//                 Pay ₹{grandTotal}
//               </Button>
//             </div>
//           ) : loading ? (
//             <p>Loading...</p>
//           ) : items.length === 0 ? (
//             <p>Your cart is empty.</p>
//           ) : (
//             <>
//               {items.map(item => (
//                 <div key={item.id} className="flex items-center justify-between mb-4">
//                   <div>
//                     <p className="font-medium">{item.product.name}</p>
//                     <p>
//                       ₹{item.product.price} × {item.quantity} = ₹
//                       {item.product.price * item.quantity}
//                     </p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Button size="icon" onClick={() => updateItem(item.id, item.quantity - 1)}>
//                       -
//                     </Button>
//                     <span>{item.quantity}</span>
//                     <Button size="icon" onClick={() => updateItem(item.id, item.quantity + 1)}>
//                       +
//                     </Button>
//                     <Button size="icon" variant="ghost" onClick={() => removeItem(item.id)}>
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

//               <Button className="w-full" onClick={() => setCheckoutMode(true)}>
//                 Continue to Checkout
//               </Button>
//             </>
//           )}
//         </div>
//       </aside>
//     </>
//   );
// }


// Headers.tsx
'use client';

import { useEffect, useState } from "react";
import { X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type OrderResult = {
  id: string;
  name: string;
  contact: string;
  house: string;
  building: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  status: string;
  items: Array<{
    id: string;
    product: { name: string };
    quantity: number;
    price: number;
  }>;
};

export default function Headers() {

  //--------------------------------------------------------------------------------------------------
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    items: rawItems,
    loading: cartLoading,
    updateItem,
    removeItem,
    clearCart,
  } = useCart();
  // From here on, `session` is non-null
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  // Address state
  const [address, setAddress] = useState({
    house: "",
    building: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (status === "authenticated" && session) {
      const name = session.user.name;
      
      const contact = session.user.phone;
      const adminName = process.env.NEXT_PUBLIC_ADMIN_NAME;
      const adminContact = process.env.NEXT_PUBLIC_ADMIN_CONTACT;
      if (name === adminName && contact === adminContact) {
        router.push("/admin");
      }
    }
  }, [status, session, router]);

  //------------------------------------------------------------------------------------------------------------------------
  const items = rawItems ?? []; // always an array
  const loading = cartLoading;
   // Safe calculations
   const totalPrice = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );
  const deliveryCharge = 50;
  const grandTotal = totalPrice + deliveryCharge;
  const initial = session?.user?.name[0]?.toUpperCase() ?? "";

  //-----------------------------------------------------------------------------------------------------------------
  // 1) Show spinner while NextAuth is loading
  if (status === "loading") {
    return <div>Loading session…</div>;
  }

  // 2) Show a simple header with Login if unauthenticated
  if (status === "unauthenticated") {
    return (
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-yellow-400">
            Agro<span className="text-[#0C831F]">Fresh</span>
          </h1>
          <Button onClick={() => signIn()}>
            Login
          </Button>
        </div>
      </header>
    );
  }

  // 3) Now that status === "authenticated", also guard against session === null
  if (!session) {
    // Should never happen, but satisfies TypeScript
    return null;
  }



  // // Redirect admin
  // useEffect(() => {
  //   const name = session.user.name;
  //   const contact = (session.user as any).phone; // adjust type if you’ve extended `Session`
  //   const adminName = process.env.NEXT_PUBLIC_ADMIN_NAME;
  //   const adminContact = process.env.NEXT_PUBLIC_ADMIN_CONTACT;
  //   if (name === adminName && contact === adminContact) {
  //     router.push("/admin");
  //   }
  // }, [session, router]);

  if (loading) {
    return <div>Loading cart…</div>;
  }

 


  const handlePay = async () => {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(address),
    });
    const order: OrderResult = await res.json();
    if (!res.ok) {
      alert("Failed to place order");
      return;
    }
    setOrderResult(order);
    clearCart();
  };


  return (
    <>
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-yellow-400">
            Agro<span className="text-[#0C831F]">Fresh</span>
          </h1>
          <div className="hidden md:flex items-center gap-4 relative">
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((o) => !o)}
                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium"
              >
                {initial}
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded border">
                  <button
                    onClick={() => {
                      router.push("/orders");
                      setUserMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Orders
                  </button>
                  <button
                    onClick={() => signOut()}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            <Button
              variant="secondary"
              className="bg-[#0C831F] text-white"
              onClick={() => {
                setCartOpen(true);
                setCheckoutMode(false);
                setOrderResult(null);
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
          cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setCartOpen(false)}
      />

      {/* Cart Sidebar */}
      <aside
        className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white z-50 transform transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ... the rest of your cart/checkout/order-confirmation UI ... */}
        <div className="p-4 flex items-center justify-between border-b">
          <h2 className="text-lg font-semibold">
            {orderResult
              ? 'Order Confirmation'
              : checkoutMode
              ? 'Checkout'
              : 'My Cart'}
          </h2>
          <button
            onClick={() => {
              setCartOpen(false);
              setCheckoutMode(false);
              setOrderResult(null);
            }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 96px)' }}>
          {orderResult ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Order placed successfully!</h3>
              <p>Name: {orderResult.name}</p>
              <p>Contact: {orderResult.contact}</p>
              <p>
                Address: {orderResult.house}, {orderResult.building},{' '}
                {orderResult.landmark}, {orderResult.city}, {orderResult.state} –{' '}
                {orderResult.pincode}
              </p>
              <p>Status: {orderResult.status}</p>
              <div className="space-y-2">
                {orderResult.items.map((it) => (
                  <div key={it.id} className="border p-2 rounded">
                    <p>Product: {it.product.name}</p>
                    <p>Qty: {it.quantity}</p>
                    <p>Price: ₹{it.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : checkoutMode ? (
            <div className="space-y-4">
              <Input
                placeholder="House No. & Floor"
                value={address.house}
                onChange={(e) => setAddress((a) => ({ ...a, house: e.target.value }))}
              />
              <Input
                placeholder="Building & Block No."
                value={address.building}
                onChange={(e) => setAddress((a) => ({ ...a, building: e.target.value }))}
              />
              <Input
                placeholder="Landmark & Area Name"
                value={address.landmark}
                onChange={(e) => setAddress((a) => ({ ...a, landmark: e.target.value }))}
              />
              <Input
                placeholder="City"
                value={address.city}
                onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
              />
              <Input
                placeholder="State"
                value={address.state}
                onChange={(e) => setAddress((a) => ({ ...a, state: e.target.value }))}
              />
              <Input
                type="number"
                placeholder="Pincode"
                value={address.pincode}
                onChange={(e) => setAddress((a) => ({ ...a, pincode: e.target.value }))}
              />
              <Button className="w-full" onClick={handlePay}>
                Pay ₹{grandTotal}
              </Button>
            </div>
          ) : items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p>
                      ₹{item.product.price} × {item.quantity} = ₹
                      {item.product.price * item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="icon" onClick={() => updateItem(item.id, item.quantity - 1)}>
                      –
                    </Button>
                    <span>{item.quantity}</span>
                    <Button size="icon" onClick={() => updateItem(item.id, item.quantity + 1)}>
                      +
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => removeItem(item.id)}>
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

              <Button className="w-full" onClick={() => setCheckoutMode(true)}>
                Continue to Checkout
              </Button>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
