// app/admin/dashboard/page.tsx
import OrdersTable from '@/components/admin/OrdersTable'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function AdminDashboardPage() {
  // 1. Grab the logged-in session
  const session = await getServerSession(authOptions)

  // 2. Your env vars (must be NEXT_PUBLIC_ to be exposed on the client too)
  const adminName    = process.env.NEXT_PUBLIC_ADMIN_NAME
  const adminContact = process.env.NEXT_PUBLIC_ADMIN_CONTACT

  // 3. If there’s no session, or it doesn’t match the admin credentials, kick them out
  if (
    !session ||
    session.user.name  !== adminName ||
    session.user.phone !== adminContact
  ) {
    redirect('/')    // send them back to ‘/’
  }

  // 4. Otherwise render the admin UI
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Orders</h1>
      <OrdersTable />
    </>
  )
}






// import OrdersTable from '@/components/admin/OrdersTable';
// import { authOptions } from '@/lib/auth';
// import { getServerSession } from 'next-auth/next';
// import React from 'react';

// export default function AdminDashboardPage() {
//   const session = getServerSession(authOptions);
//   const adminName    = process.env.NEXT_PUBLIC_ADMIN_NAME;
//   const adminContact = process.env.NEXT_PUBLIC_ADMIN_CONTACT;
//   if(session?.user.)
//   return (
//     <>
//       <h1 className="text-3xl font-bold mb-4">Orders</h1>
//       <OrdersTable />
//     </>
//   );
// }
