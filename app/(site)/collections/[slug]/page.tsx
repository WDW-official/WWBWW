import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import AutoFilterSelect from '@/components/AutoFilterSelect'
import ProductCard from '@/components/ProductCard'
import ScrollToTop from '@/components/ScrollToTop'
import {
  collections,
  getCollectionBySlug,
  getCollectionCount,
  getDynamicSubCollections,
  productMatchesCollection,
  productMatchesSubCollection,
} from '@/lib/collections'
import { getProducts } from '@/lib/products'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }))
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ sub?: string | string[] }>
}) {
  const { slug } = await params
  const query = searchParams ? await searchParams : {}
  const selectedSubSlug = Array.isArray(query.sub) ? query.sub[0] : query.sub
  const collection = getCollectionBySlug(slug)
  if (!collection) notFound()

  const products = await getProducts()
  const collectionProducts = products.filter((product) =>
    productMatchesCollection(product, collection)
  )
  const subCollections = getDynamicSubCollections(products, collection)
  const selectedSubCollection = subCollections.find(
    (subCollection) => subCollection.slug === selectedSubSlug
  )
  const visibleProducts = selectedSubCollection
    ? collectionProducts.filter((product) =>
        productMatchesSubCollection(product, selectedSubCollection)
      )
    : collectionProducts

  return (
    <main>
      <ScrollToTop />
      <section className="relative overflow-hidden bg-black text-white">
        <img
          src={collection.bannerImage}
          alt={collection.name}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="container-luxe relative z-10 flex min-h-[100px] items-end py-8 md:min-h-[440px] md:py-14">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.16em] text-white/70">
              Collection
            </div>
            <h1 className="editorial mt-2 text-3xl leading-none md:mt-3 md:text-6xl">
              {collection.name}
            </h1>
            <p className="mt-3 max-w-2xl text-xs leading-6 text-white/75 md:mt-5 md:text-sm md:leading-7">
              {collection.description}
            </p>
          </div>
        </div>
      </section>

      <section className="container-luxe py-10 md:py-14">
        <div className="mb-7 flex items-end justify-between gap-5 border-t border-black/10 pt-10">
          <div>
            <div className="text-xs uppercase tracking-[0.15em] text-champagne">
              Available now
            </div>
            <h2 className="editorial mt-2 text-3xl leading-none md:text-4xl">
              PIECES
            </h2>
          </div>
          <span className="text-xs uppercase tracking-[0.14em] text-black/45">
            {visibleProducts.length}{' '}
            {visibleProducts.length === 1 ? 'piece' : 'pieces'}
          </span>
        </div>
        {subCollections.length > 0 && (
          <div className="mb-8 max-w-sm">
            <label className="flex min-w-0 flex-1 items-center rounded-md border border-black/15 bg-white px-3 py-2 text-xs">
              <span className="sr-only">Filter by sub-collection</span>
              <AutoFilterSelect
                name="sub"
                defaultValue={selectedSubCollection?.slug || 'all'}
                className="w-full bg-transparent text-xs outline-none"
                options={[
                  {
                    label: `All pieces (${getCollectionCount(products, collection)})`,
                    value: 'all',
                  },
                  ...subCollections.map((subCollection) => {
                    const count = collectionProducts.filter((product) =>
                      productMatchesSubCollection(product, subCollection)
                    ).length

                    return {
                      label: `${subCollection.name} (${count})`,
                      value: subCollection.slug,
                    }
                  }),
                ]}
              />
            </label>
          </div>
        )}
        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-7 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-black/10 bg-white p-8 text-sm text-black/55">
            No pieces match this filter yet.
          </div>
        )}
        <Link
          href="/collections"
          className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]"
        >
          View all collections <ArrowRight size={14} />
        </Link>
      </section>
    </main>
  )
}
