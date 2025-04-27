'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

type Order = {
  id: string;
  name: string;
  contact: string;
  status: string;
  house: string;
  building: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  items: { product: { name: string }; quantity: number; price: number }[];
};

export default function OrdersTable() {
  const queryClient = useQueryClient();
  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: () => fetch('/api/admin/orders').then(res => res.json())
  });

  const patchMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      }).then(res => res.json()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] })
  });

  const [productModal, setProductModal] = useState<Order['items'] | null>(null);
  const [statusMenu, setStatusMenu] = useState<string | null>(null);
  const [menuPos, setMenuPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  return (
    <div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Sr.no</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Products</th>
            <th className="px-4 py-2">House</th>
            <th className="px-4 py-2">Building</th>
            <th className="px-4 py-2">Landmark</th>
            <th className="px-4 py-2">City</th>
            <th className="px-4 py-2">State</th>
            <th className="px-4 py-2">Pincode</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={order.id} className="text-center border-t">
              <td className="px-4 py-2">{idx + 1}</td>
              <td className="px-4 py-2">{order.name}</td>
              <td className="px-4 py-2">{order.contact}</td>
              <td
                className="px-4 py-2 cursor-pointer hover:underline"
                onClick={e => {
                  const rect = (e.target as HTMLElement).getBoundingClientRect();
                  setStatusMenu(order.id);
                  setMenuPos({ x: rect.left, y: rect.bottom });
                }}
              >
                {order.status}
              </td>
              <td
                className="px-4 py-2 text-blue-600 cursor-pointer hover:underline"
                onClick={() => setProductModal(order.items)}
              >
                Products
              </td>
              <td className="px-4 py-2">{order.house}</td>
              <td className="px-4 py-2">{order.building}</td>
              <td className="px-4 py-2">{order.landmark}</td>
              <td className="px-4 py-2">{order.city}</td>
              <td className="px-4 py-2">{order.state}</td>
              <td className="px-4 py-2">{order.pincode}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Status Dropdown */}
      {statusMenu && (
        <div
          className="absolute bg-white shadow rounded p-2"
          style={{ top: menuPos.y, left: menuPos.x }}
        >
          {['pending', 'in progress', 'delivered'].map(s => (
            <div
              key={s}
              className="px-4 py-1 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                patchMutation.mutate({ id: statusMenu, status: s });
                setStatusMenu(null);
              }}
            >
              {s}
            </div>
          ))}
        </div>
      )}

      {/* Products Modal */}
      {productModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Order Products</h2>
            <ul className="space-y-2">
              {productModal.map((item, i) => (
                <li key={i} className="flex justify-between">
                  <span>{item.product.name}</span>
                  <span>{item.quantity} × ₹{item.price}</span>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setProductModal(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}