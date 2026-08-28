import { Heart } from 'lucide-react'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/AddToCartButton'
import ProductGallery from '@/components/ProductGallery'
import { formatMoney } from '@/lib/demo-products'
import { getProductBySlug } from '@/lib/products'

export default async function Product({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  return <main className="container-luxe py-8 md:py-12"><div className="grid gap-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-12"><ProductGallery images={product.images} name={product.name}/><div className="lg:sticky lg:top-28 lg:self-start"><div className="text-xs uppercase tracking-[0.16em] text-champagne">{product.category}</div><h1 className="editorial mt-2 text-4xl leading-none md:text-5xl">{product.name}</h1><div className="mt-4 text-2xl">{formatMoney(product.price, product.currency)}</div><p className="mt-6 text-sm leading-7 text-black/60">{product.description}</p><div className="mt-8 grid gap-5"><label className="text-sm">Size<select className="mt-2 w-full rounded-md border border-black/15 bg-white p-3"><option>{product.dimensions || 'Standard studio size'}</option><option>Custom size quote</option></select></label><label className="text-sm">Finish<select className="mt-2 w-full rounded-md border border-black/15 bg-white p-3"><option>Natural Oak</option><option>Walnut</option><option>Matte Black</option></select></label><div className="flex gap-3"><AddToCartButton product={product}/><button aria-label="Save product" className="rounded-md border border-black/15 px-4"><Heart/></button></div></div><div className="mt-10 border-t border-black/10 pt-6"><h2 className="text-sm font-semibold">THE DETAILS</h2><p className="mt-3 text-sm leading-7 text-black/55">{product.materials || 'Designed digitally, precision-cut, assembled by hand, then finished in the studio.'}</p></div></div></div></main>
}
