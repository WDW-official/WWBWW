import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { getProducts } from '@/lib/products'

export const dynamic = 'force-dynamic'

const collectionMeta = [
  {
    name: 'Mandalas',
    description: 'Intricate geometry built layer by layer.',
    image: '/images/mockup/cat-mandala.jpg',
  },
  {
    name: 'Wall Art',
    description: 'Statement pieces for contemporary spaces.',
    image: '/images/mockup/cat-tree.jpg',
  },
  {
    name: 'Lighting',
    description: 'Laser-cut forms designed to cast beautiful shadows.',
    image: '/images/mockup/cat-light.jpg',
  },
  {
    name: 'Ornaments',
    description: 'Small pieces with extraordinary detail.',
    image: '/images/mockup/cat-ornament.jpg',
  },
  {
    name: 'Personalised',
    description: 'Names, dates and details made uniquely for you.',
    image: '/images/mockup/cat-personalised.jpg',
  },
]

export default async function Collections() {
  const products = await getProducts()
  const productCategories = Array.from(
    new Set(products.map((product) => product.category).filter(Boolean))
  )
  const knownCollections = collectionMeta.map((collection) => collection.name)
  const extraCollections = productCategories
    .filter((category) => !knownCollections.includes(category))
    .map((category) => ({
      name: category,
      description: 'Explore available pieces from this collection.',
      image:
        products.find((product) => product.category === category)?.images[0] ||
        '/images/mockup/cat-tree.jpg',
    }))
  const collections = [...collectionMeta, ...extraCollections]
  const featuredProducts = products.slice(0, 4)

  return (
    <main>
      <section className="container-luxe py-12 md:py-16">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.15em]">Collections</div>
          <h1 className="editorial mt-3 text-5xl leading-none md:text-6xl">
            ART FOR CONTEMPORARY SPACES.
          </h1>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map(({ name, description, image }) => {
            const count = products.filter(
              (product) => product.category === name
            ).length
            return (
              <Link
                href={{ pathname: '/shop', query: { category: name } }}
                className="group overflow-hidden rounded-lg border border-black/10 bg-white"
                key={name}
              >
                <div className="overflow-hidden bg-[#eee7de]">
                  <img
                    src={image}
                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                    alt={name}
                  />
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="editorial text-3xl">{name}</h2>
                    <span className="shrink-0 rounded-full border border-black/10 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-black/50">
                      {count} {count === 1 ? 'piece' : 'pieces'}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-black/55">
                    {description}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
                    View collection <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            )
          })}
          <Link
            href="/custom-work"
            className="group overflow-hidden rounded-lg border border-black/10 bg-white"
          >
            <div className="overflow-hidden bg-[#eee7de]">
              <img
                src="/images/mockup/cat-bespoke.jpg"
                className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                alt="Bespoke"
              />
            </div>
            <div className="p-5 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <h2 className="editorial text-3xl">Bespoke</h2>
                <span className="shrink-0 rounded-full border border-black/10 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-black/50">
                  Custom
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-black/55">
                Original pieces developed around your idea.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
                Start a project <ArrowRight size={14} />
              </div>
            </div>
          </Link>
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
