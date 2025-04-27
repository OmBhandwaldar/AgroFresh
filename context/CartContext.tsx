"use client";

import React, { createContext, useContext, useEffect, useReducer } from 'react';

type Product = { id: string; name: string; price: number; imageUrl?: string };
type CartItem = { id: string; quantity: number; product: Product };

type State = { items: CartItem[]; loading: boolean };
type Action =
  | { type: 'SET'; payload: CartItem[] }
  | { type: 'LOADING'; payload: boolean }
  | { type: 'ADD_OR_UPDATE'; payload: CartItem }
  | { type: 'REMOVE'; payload: string }
  | { type: 'CLEAR' };

const CartContext = createContext<{
  items: CartItem[];
  loading: boolean;
  addItem: (productId: string) => Promise<void>;
  updateItem: (itemId: string, qty: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => void;
}>({
  items: [],
  loading: false,
  addItem: async () => {},
  updateItem: async () => {},
  removeItem: async () => {},
  clearCart: () => {},
});

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET':
      return { ...state, items: action.payload };
    case 'LOADING':
      return { ...state, loading: action.payload };
    case 'ADD_OR_UPDATE':
      const exists = state.items.find(i => i.id === action.payload.id);
      return {
        ...state,
        items: exists
          ? state.items.map(i => (i.id === action.payload.id ? action.payload : i))
          : [...state.items, action.payload],
      };
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'CLEAR':
      return { ...state, items: [] };
  }
}

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { items: [], loading: true });

  useEffect(() => {
    fetch('/api/cart')
      .then(res => res.json())
      .then(cart => {
        dispatch({ type: 'SET', payload: cart.items });
        dispatch({ type: 'LOADING', payload: false });
      });
  }, []);

  const addItem = async (productId: string) => {
    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId }),
    });
    const item = await res.json();
    dispatch({ type: 'ADD_OR_UPDATE', payload: item });
  };

  const updateItem = async (itemId: string, quantity: number) => {
    const res = await fetch(`/api/cart/${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity }),
    });
    if (res.ok) {
      if (quantity <= 0) {
        dispatch({ type: 'REMOVE', payload: itemId });
      } else {
        const item = await res.json();
        dispatch({ type: 'ADD_OR_UPDATE', payload: item });
      }
    }
  };

  const removeItem = async (itemId: string) => {
    await fetch(`/api/cart/${itemId}`, { method: 'DELETE' });
    dispatch({ type: 'REMOVE', payload: itemId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR' });
  };

  return (
    <CartContext.Provider
      value={{ 
        items: state.items, 
        loading: state.loading, 
        addItem, 
        updateItem, 
        removeItem, 
        clearCart 
        
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);