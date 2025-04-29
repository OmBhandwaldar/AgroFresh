// app/admin/dashboard/page.tsx
import OrdersTable from '@/components/admin/OrdersTable'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)

  const adminName    = process.env.NEXT_PUBLIC_ADMIN_NAME
  const adminContact = process.env.NEXT_PUBLIC_ADMIN_CONTACT
  if (
    !session ||
    session.user.name  !== adminName ||
    session.user.phone !== adminContact
  ) {
    redirect('/');
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Orders</h1>
      <OrdersTable />
    </>
  )
}