'use client'

import { ShoppingBag } from 'lucide-react'
import { useCart } from './CartProvider'

export default function CartButton() {
  const { count, openCart } = useCart()

  return (
    <button
      aria-label="Open cart"
      onClick={openCart}
      className="relative rounded-full p-1"
    >
      <ShoppingBag size={19} />
      {count > 0 && (
        <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-champagne px-1 text-[10px] font-bold text-white">
          {count}
        </span>
      )}
    </button>
  )
}
