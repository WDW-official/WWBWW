'use client'

import { ShoppingBag } from 'lucide-react'
import type { Product } from '@/lib/types'
import { useCart } from './CartProvider'
import { useToast } from './ToastProvider'

export default function AddToCartButton({ product, compact = false, iconOnlyOnMobile = false }: { product: Product; compact?: boolean; iconOnlyOnMobile?: boolean }) {
  const { addProduct } = useCart()
  const { toast } = useToast()

  return (
    <button
      onClick={() => {
        addProduct(product)
        toast({ type: 'success', title: 'Added to cart', message: `${product.name} has been added to your cart.` })
      }}
      className={
        compact
          ? 'inline-flex w-full items-center justify-center gap-2 rounded-md bg-champagne px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-white transition hover:bg-[#9e7438]'
          : 'btn-gold flex-1 gap-2'
      }
    >
      <ShoppingBag size={compact ? 13 : 16} />
      <span className={iconOnlyOnMobile ? 'hidden sm:inline' : ''}>Add to cart</span>
    </button>
  )
}
