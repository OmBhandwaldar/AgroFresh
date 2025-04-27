
'use client';

import React, { ReactNode } from 'react';
import AdminSidebar from './Sidebar';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 bg-background p-6">
        {children}
      </main>
    </div>
  );
}