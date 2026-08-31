import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import {
  collections,
  getCollectionBySlug,
  getDynamicSubCollections,
  productMatchesCollection,
  productMatchesSubCollection,
} from '@/lib/collections'
import { getProducts } from '@/lib/products'

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return []
}

export default async function SubCollectionPage({
  params,
}: {
  params: Promise<{ slug: string; subSlug: string }>
}) {
  const { slug, subSlug } = await params
  const collection = getCollectionBySlug(slug)
  if (!collection) notFound()

  const products = await getProducts()
  const subCollection = getDynamicSubCollections(products, collection).find(
    (item) => item.slug === subSlug
  )
  if (!subCollection) notFound()

  const subCollectionProducts = products.filter(
    (product) =>
      productMatchesCollection(product, collection) &&
      productMatchesSubCollection(product, subCollection)
  )

  return (
    <main>
      <section className="relative overflow-hidden bg-black text-white">
        <img
          src={subCollection.bannerImage || subCollection.image}
          alt={subCollection.name}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="container-luxe relative z-10 flex min-h-[320px] items-end py-10 md:min-h-[420px] md:py-14">
          <div className="max-w-3xl">
            <Link
              href={`/collections/${collection.slug}`}
              className="text-xs uppercase tracking-[0.16em] text-white/70"
            >
              {collection.name}
            </Link>
            <h1 className="editorial mt-3 text-4xl leading-none md:text-6xl">
              {subCollection.name}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75">
              {subCollection.description}
            </p>
          </div>
        </div>
      </section>

      <section className="container-luxe py-10 md:py-14">
        <div className="mb-7 flex items-end justify-between gap-5">
          <div>
            <div className="text-xs uppercase tracking-[0.15em] text-champagne">
              Available now
            </div>
            <h2 className="editorial mt-2 text-3xl leading-none md:text-4xl">
              PIECES
            </h2>
          </div>
          <span className="text-xs uppercase tracking-[0.14em] text-black/45">
            {subCollectionProducts.length}{' '}
            {subCollectionProducts.length === 1 ? 'piece' : 'pieces'}
          </span>
        </div>
        {subCollectionProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-7 lg:grid-cols-4">
            {subCollectionProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-black/10 bg-white p-8 text-sm text-black/55">
            No pieces have been added to this sub-collection yet.
          </div>
        )}
        <Link
          href={`/collections/${collection.slug}`}
          className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]"
        >
          Back to {collection.name} <ArrowRight size={14} />
        </Link>
      </section>
    </main>
  )
}
