'use client'

import { ChaoticCurrency } from '@/lib/types/ChaoticCurrency'
import React, {
  createContext,
  useContext,
  useState,
  ReactNode
} from 'react'

interface CartContextType {
  isCartOpen: boolean
  toggleCart: () => void
  clearCart: () => void
  addToCart: (item: CartItem) => void
  cartItems: CartItem[]
}

interface CartItem {
  idDrink: string
  strDrink: string
  price: ChaoticCurrency
  quantity: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false) // useState always returns an array of exactly two elements
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    // Take the previous value of the cart. E.g. cartItems (either empty or not),
    // and update it with the return value of our anonymous friend when a new item is added
    setCartItems(prev => {
      const existingItem = prev.find(i => i.idDrink === item.idDrink)
      // Execute our arrow function on each item in prev; builds a new cart array which will override the previous
      if (existingItem) {
        return prev.map(i =>
          i.idDrink === item.idDrink ? { ...i, quantity: i.quantity + 1 } : i
        )
      } else {
        return [...prev, { ...item, quantity: 1 }]
      }
    })
  }

  const toggleCart = () => {
    setIsCartOpen(prevState => {
      return !prevState
    })
  }

  const clearCart = () => {
    setCartItems([])
  }

  // The children is fetched from the layout.tsx, so it's extremely convoluted.
  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        toggleCart,
        clearCart,
        addToCart,
        cartItems
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
