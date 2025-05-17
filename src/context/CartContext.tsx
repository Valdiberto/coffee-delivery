'use client'

import { createContext, ReactNode, useEffect, useState } from 'react'

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  img: string
}
interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  updateItemQuantity: (id: number, newQuantity: number) => void
  clearCart: () => void
}

export const CartContext = createContext({} as CartContextType)

interface CartContextProviderProps {
  children: ReactNode
}
export function CartProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart')
      if (storedCart) {
        setCart(JSON.parse(storedCart))
      }
    }
  }, [])

  function addToCart(newItem: CartItem) {
    setCart((prevCart) => {
      const itemExist = prevCart.find((item) => item.id === newItem.id)
      if (itemExist) {
        return prevCart.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        )
      } else {
        return [...prevCart, newItem]
      }
    })
  }

  function removeFromCart(id: number) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const updateItemQuantity = (id: number, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    )
  }

  function clearCart() {
    setCart([])
    localStorage.removeItem('cart')
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart])
  return (
    <CartContext.Provider
      value={{ cart, clearCart, addToCart, updateItemQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
