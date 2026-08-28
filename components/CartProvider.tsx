'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { CartItem, Product } from '@/lib/types'

type CartContextValue = {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addProduct: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  total: number
  count: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem('woodworks-cart')
    if (stored) setItems(JSON.parse(stored))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('woodworks-cart', JSON.stringify(items))
  }, [items])

  const value = useMemo<CartContextValue>(() => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
    const count = items.reduce((sum, item) => sum + item.quantity, 0)

    return {
      items,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addProduct: (product) => {
        setItems((current) => {
          const existing = current.find((item) => item.productId === product.id)
          if (existing) {
            return current.map((item) =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          }
          return [
            ...current,
            {
              productId: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              currency: product.currency,
              image: product.images[0],
              quantity: 1,
            },
          ]
        })
      },
      removeItem: (productId) =>
        setItems((current) =>
          current.filter((item) => item.productId !== productId)
        ),
      updateQuantity: (productId, quantity) =>
        setItems((current) =>
          current.map((item) =>
            item.productId === productId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          )
        ),
      clearCart: () => setItems([]),
      total,
      count,
    }
  }, [isOpen, items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
