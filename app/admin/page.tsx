import OrdersTable from '@/components/admin/OrdersTable';
import React from 'react';

export default function AdminDashboardPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> */}
        {/* ...same cards as before... */}
      {/* </div> */}
      <OrdersTable />
    </>
  );
}
