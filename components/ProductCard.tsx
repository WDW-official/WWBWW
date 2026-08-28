import Link from 'next/link'
import { Phone } from 'lucide-react'
import type { Product } from '@/lib/types'
import { businessPhoneHref } from '@/lib/business'
import { formatMoney } from '@/lib/demo-products'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="relative block overflow-hidden rounded-lg bg-[#eee7de]"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="aspect-[4/4.7] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col pt-4">
        <h3 className="text-sm font-medium leading-5 sm:text-base">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-black/50">{product.subtitle}</p>
        <p className="mt-2 text-sm font-semibold">
          {formatMoney(product.price, product.currency)}
        </p>
        <div className="mt-auto flex gap-2 pt-3">
          <Link
            href={`/product/${product.slug}`}
            className="inline-flex min-h-9 flex-1 items-center justify-center rounded-md border border-black/20 px-3 py-2 text-center text-[10px] uppercase tracking-wider"
          >
            View
          </Link>
          <a
            href={businessPhoneHref}
            className="inline-flex min-h-9 flex-1 items-center justify-center gap-2 rounded-md bg-champagne px-3 py-2 text-center text-[10px] font-semibold uppercase tracking-wider text-white transition hover:bg-[#9e7438]"
          >
            <Phone size={13} />
            <span className="hidden sm:inline">Call to buy</span>
          </a>
        </div>
      </div>
    </article>
  )
}
