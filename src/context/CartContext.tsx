"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextType {
  isCartOpen: boolean;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false); // useState always returns an array of exactly two elements

  const toggleCart = () => {
    setIsCartOpen(prevState => {
      return !prevState;
    });
  };

  // The children is fetched from the layout.tsx, so it's extremely convoluted.
  return (
    <CartContext.Provider value={{ isCartOpen, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};
