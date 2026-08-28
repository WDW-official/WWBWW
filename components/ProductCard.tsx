import Link from 'next/link'
import { Heart } from 'lucide-react'
import type { Product } from '@/lib/types'
import { formatMoney } from '@/lib/demo-products'
import AddToCartButton from './AddToCartButton'

export default function ProductCard({product}:{product:Product}){return <article className="group">
  <Link href={`/product/${product.slug}`} className="relative block overflow-hidden rounded-lg bg-[#eee7de]">
    <img src={product.images[0]} alt={product.name} className="aspect-[4/4.7] w-full object-cover transition duration-500 group-hover:scale-[1.03]"/>
    <span className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-sm backdrop-blur"><Heart size={16}/></span>
  </Link>
  <div className="pt-4"><h3 className="font-medium">{product.name}</h3><p className="mt-1 text-xs text-black/50">{product.subtitle}</p><p className="mt-2 text-sm font-semibold">{formatMoney(product.price, product.currency)}</p>
  <div className="mt-3 flex gap-2"><Link href={`/product/${product.slug}`} className="flex-[3] rounded-md border border-black/20 px-3 py-2 text-center text-[10px] uppercase tracking-wider sm:flex-1">View</Link><div className="flex-1 sm:flex-1"><AddToCartButton product={product} compact iconOnlyOnMobile/></div></div></div>
</article>}
