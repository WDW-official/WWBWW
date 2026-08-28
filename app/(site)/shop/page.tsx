import ProductCard from '@/components/ProductCard'
import { SlidersHorizontal } from 'lucide-react'
import { getProducts } from '@/lib/products'
import type { Product } from '@/lib/types'

export const dynamic = 'force-dynamic'

const sortLabels = {
  featured: 'Featured',
  newest: 'Newest',
  'price-low': 'Price: Low to High',
  'price-high': 'Price: High to Low',
  name: 'Name',
} as const

type SortKey = keyof typeof sortLabels

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function sortProducts(products: Product[], sort: SortKey) {
  return [...products].sort((a, b) => {
    if (sort === 'price-low') return a.price - b.price
    if (sort === 'price-high') return b.price - a.price
    if (sort === 'name') return a.name.localeCompare(b.name)
    return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
  })
}

export default async function Shop({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const params = searchParams ? await searchParams : {}
  const products = await getProducts()
  const categories = Array.from(new Set(products.map((product) => product.category).filter(Boolean))).sort()
  const category = getParam(params.category) || 'all'
  const sortParam = getParam(params.sort)
  const sort = sortParam && sortParam in sortLabels ? (sortParam as SortKey) : 'featured'
  const filteredProducts = category === 'all' ? products : products.filter((product) => product.category === category)
  const visibleProducts = sortProducts(filteredProducts, sort)

  return <main className="container-luxe py-10 md:py-14"><div className="flex flex-col gap-5 border-b border-black/10 pb-8 md:flex-row md:items-end md:justify-between"><div><div className="text-xs uppercase tracking-[0.15em] text-champagne">Shop</div><h1 className="editorial mt-2 text-4xl leading-none md:text-6xl">THE COLLECTION</h1><p className="mt-4 max-w-2xl text-sm leading-6 text-black/60">Precision-cut decorative art, lighting, ornaments and personalised pieces made from natural wood.</p></div><form className="flex flex-wrap gap-2 md:justify-end"><label className="inline-flex items-center gap-2 rounded-md border border-black/15 bg-white px-3 py-2 text-xs"><SlidersHorizontal size={14}/><span className="sr-only">Filter by category</span><select name="category" defaultValue={category} className="bg-transparent text-xs outline-none"><option value="all">All categories</option>{categories.map((item)=><option key={item} value={item}>{item}</option>)}</select></label><label className="shrink-0 rounded-md border border-black/15 bg-white px-3 py-2 text-xs"><span className="sr-only">Sort products</span><select name="sort" defaultValue={sort} className="bg-transparent text-xs outline-none">{Object.entries(sortLabels).map(([value, label])=><option key={value} value={value}>{label}</option>)}</select></label><button className="rounded-md bg-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white">Apply</button></form></div>{visibleProducts.length ? <div className="grid grid-cols-2 gap-4 py-10 sm:gap-7 lg:grid-cols-4">{visibleProducts.map((product)=><ProductCard key={product.id} product={product}/>)}</div> : <div className="py-16 text-sm text-black/55">No products match this selection.</div>}</main>
}
