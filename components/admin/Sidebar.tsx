
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, User, Settings as SettingsIcon, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: User, label: 'Profile', path: '/admin/profile' },
  { icon: SettingsIcon, label: 'Inventory Management', path: '/admin/inventory-management' },
];

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className={cn(
      'bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out flex flex-col',
      isCollapsed ? 'w-16' : 'w-64'
    )}>
      <div className="p-4 flex justify-between items-center border-b border-sidebar-border">
        {!isCollapsed && <span className="font-semibold">Admin Menu</span>}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 hover:bg-sidebar-accent rounded-md">
          <Menu size={20} />
        </button>
      </div>
      <nav className="flex-1 p-2">
        {menuItems.map(item => (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              'flex items-center space-x-2 px-3 py-2 rounded-md transition-colors',
              pathname === item.path
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'hover:bg-sidebar-accent/50',
              isCollapsed && 'justify-center'
            )}
          >
            <item.icon size={20} />
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
}
