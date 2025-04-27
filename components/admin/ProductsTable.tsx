// components/admin/ProductsTable.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Types
type Category = { id: string; name: string; };

type Type = { id: string; name: string; categoryId: string; };

type Product = {
  id: string;
  name: string;
  price: number;
  slug: string;
  type: { id: string; name: string; category: { id: string; name: string; } };
};

type NewProduct = {
    categoryId: string;
    typeId: string;
    name: string;
    price: string;
    slug: string;
    description: string;
    imageUrl: string;
  };
  

export default function ProductsTable() {
  const queryClient = useQueryClient();

  // Fetch products
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () => fetch('/api/admin/products').then(res => res.json())
  });

  // Fetch categories
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => fetch('/api/admin/categories').then(res => res.json())
  });

  // Fetch all types
  const { data: types = [] } = useQuery<Type[]>({
    queryKey: ['types'],
    queryFn: () => fetch('/api/admin/types').then(res => res.json())
  });

  // Delete product mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      fetch('/api/admin/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      }).then(res => res.json()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] })
  });

  // Add product mutation
  const addMutation = useMutation({
    mutationFn: (data: NewProduct) =>
      fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setShowForm(false);
      // reset form
      setFormData({ categoryId: '', typeId: '', name: '', price: '', slug: '', description: '', imageUrl: '' });
    }
  });

  // Search state
  const [search, setSearch] = useState('');
  const filtered = useMemo(
    () => products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.type.name.toLowerCase().includes(search.toLowerCase()) ||
      p.type.category.name.toLowerCase().includes(search.toLowerCase())
    ),
    [products, search]
  );

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    categoryId: '',
    typeId: '',
    name: '',
    price: '',
    slug: '',
    description: '',
    imageUrl: ''
  });

  // Types filtered by selected category
  const filteredTypes = types.filter(t => t.categoryId === formData.categoryId);

  return (
    <div>
      {/* Search & Add */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 flex-1 mr-2"
        />
        <button
          onClick={() => setShowForm(true)}
          className="p-2 bg-green-600 text-white rounded"
        >
          +
        </button>
      </div>

      {/* Products Table */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(p => (
            <tr key={p.id} className="text-center border-t">
              <td className="px-4 py-2">{p.name}</td>
              <td className="px-4 py-2">₹{p.price}</td>
              <td className="px-4 py-2">{p.type.name}</td>
              <td className="px-4 py-2">{p.type.category.name}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => deleteMutation.mutate(p.id)}
                  className="hover:text-red-600 hover:scale-90 hover:cursor-pointer"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <div className="space-y-4">
              {/* Category Dropdown */}
              <div>
                <label className="block mb-1">Category</label>
                <select
                  value={formData.categoryId}
                  onChange={e => setFormData({ ...formData, categoryId: e.target.value, typeId: '' })}
                  className="w-full border p-2"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Type Dropdown */}
              <div>
                <label className="block mb-1">Type</label>
                <select
                  value={formData.typeId}
                  onChange={e => setFormData({ ...formData, typeId: e.target.value })}
                  className="w-full border p-2"
                  disabled={!formData.categoryId}
                >
                  <option value="">Select type</option>
                  {filteredTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>

              {/* Other Inputs */}
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full border p-2"
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                className="w-full border p-2"
              />
              <input
                type="text"
                placeholder="Slug"
                value={formData.slug}
                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                className="w-full border p-2"
              />
              <input
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full border p-2"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full border p-2"
              />
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setShowForm(false)} className="mr-4">Cancel</button>
              <button
                onClick={() => addMutation.mutate(formData)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}