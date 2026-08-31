import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { collections, getCollectionCount } from '@/lib/collections'
import { getProducts } from '@/lib/products'

export const dynamic = 'force-dynamic'

export default async function Collections() {
  const products = await getProducts()
  const orderedCollections = [...collections].sort(
    (a, b) => getCollectionCount(products, b) - getCollectionCount(products, a)
  )
  const featuredProducts = products.slice(0, 4)

  return (
    <main>
      <section className="container-luxe py-12 md:py-16">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.15em]">Collections</div>
          <h1 className="editorial mt-3 sm:text-5xl text-3xl leading-none md:text-6xl">
            ART FOR CONTEMPORARY SPACES.
          </h1>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {orderedCollections.map((collection) => {
            const count = getCollectionCount(products, collection)
            return (
              <Link
                href={`/collections/${collection.slug}`}
                className="group overflow-hidden rounded-lg border border-black/10 bg-white"
                key={collection.slug}
              >
                <div className="overflow-hidden bg-[#eee7de]">
                  <img
                    src={collection.image}
                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                    alt={collection.name}
                  />
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="editorial text-lg sm:text-3xl">
                      {collection.name}
                    </h2>
                    <span className="shrink-0 rounded-full border border-black/10 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-black/50">
                      {count} {count === 1 ? 'piece' : 'pieces'}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-black/55">
                    {collection.description}
                  </p>
                  {collection.subCollections.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {collection.subCollections.map((subCollection) => (
                        <span
                          key={subCollection.slug}
                          className="rounded-full bg-[#f1ede6] px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-black/55"
                        >
                          {subCollection.name}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
                    View collection <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
      {featuredProducts.length > 0 && (
        <section className="container-luxe pb-14">
          <div className="mb-7 flex items-end justify-between gap-5 border-t border-black/10 pt-10">
            <div>
              <div className="text-xs uppercase tracking-[0.15em] text-champagne">
                Available now
              </div>
              <h2 className="editorial mt-2 text-3xl leading-none md:text-4xl">
                FEATURED PIECES
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] sm:inline-flex"
            >
              Shop all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-7 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
