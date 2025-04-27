import AdminLayout from '@/components/admin/AdminLayout';
import { AdminProviders } from '@/providers/adminProviders';
import React from 'react';

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminProviders>
        <AdminLayout>
          {children}
        </AdminLayout>
      </AdminProviders>
    </>
  );
}