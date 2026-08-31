import ProductCard from '@/components/ProductCard'
import AutoFilterSelect from '@/components/AutoFilterSelect'
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

function isString(value: string | undefined): value is string {
  return Boolean(value)
}

function sortProducts(products: Product[], sort: SortKey) {
  return [...products].sort((a, b) => {
    if (sort === 'price-low') return a.price - b.price
    if (sort === 'price-high') return b.price - a.price
    if (sort === 'name') return a.name.localeCompare(b.name)
    return (
      new Date(b.createdAt || '').getTime() -
      new Date(a.createdAt || '').getTime()
    )
  })
}

export default async function Shop({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = searchParams ? await searchParams : {}
  const products = await getProducts()
  const categories = Array.from(
    new Set(products.map((product) => product.category).filter(Boolean))
  ).sort()
  const category = getParam(params.category) || 'all'
  const subCollection = getParam(params.subCollection) || 'all'
  const sortParam = getParam(params.sort)
  const sort =
    sortParam && sortParam in sortLabels ? (sortParam as SortKey) : 'featured'
  const categoryProducts =
    category === 'all'
      ? products
      : products.filter((product) => product.category === category)
  const subCollections = Array.from(
    new Set(
      categoryProducts
        .map((product) => product.subCollection?.trim())
        .filter(isString)
    )
  ).sort()
  const activeSubCollection = subCollections.includes(subCollection)
    ? subCollection
    : 'all'
  const filteredProducts =
    activeSubCollection === 'all'
      ? categoryProducts
      : categoryProducts.filter(
          (product) => product.subCollection === activeSubCollection
        )
  const visibleProducts = sortProducts(filteredProducts, sort)

  return (
    <main className="container-luxe py-10 md:py-14">
      <div className="flex flex-col gap-5 border-b border-black/10 pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.15em] text-champagne">
            Shop
          </div>
          <h1 className="editorial mt-2 text-4xl leading-none md:text-6xl">
            THE COLLECTION
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-black/60">
            Precision-cut decorative art, lighting, ornaments and personalised
            pieces made from natural wood.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 md:justify-end">
          <label className="inline-flex items-center gap-2 rounded-md border border-black/15 bg-white px-3 py-2 text-xs">
            <SlidersHorizontal size={14} />
            <span className="sr-only">Filter by category</span>
            <AutoFilterSelect
              name="category"
              defaultValue={category}
              resetFields={['subCollection']}
              options={[
                { label: 'All categories', value: 'all' },
                ...categories.map((item) => ({ label: item, value: item })),
              ]}
            />
          </label>
          {subCollections.length > 0 && (
            <label className="inline-flex items-center gap-2 rounded-md border border-black/15 bg-white px-3 py-2 text-xs">
              <span className="sr-only">Filter by sub-collection</span>
              <AutoFilterSelect
                name="subCollection"
                defaultValue={activeSubCollection}
                options={[
                  { label: 'All sub-collections', value: 'all' },
                  ...subCollections.map((item) => ({
                    label: item,
                    value: item,
                  })),
                ]}
              />
            </label>
          )}
          <label className="shrink-0 rounded-md border border-black/15 bg-white px-3 py-2 text-xs">
            <span className="sr-only">Sort products</span>
            <AutoFilterSelect
              name="sort"
              defaultValue={sort}
              options={Object.entries(sortLabels).map(([value, label]) => ({
                label,
                value,
              }))}
            />
          </label>
        </div>
      </div>
      {visibleProducts.length ? (
        <div className="grid grid-cols-2 gap-4 py-10 sm:gap-7 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-sm text-black/55">
          No products match this selection.
        </div>
      )}
    </main>
  )
}
