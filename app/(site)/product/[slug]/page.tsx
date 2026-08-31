import { MessageCircle, Phone } from 'lucide-react'
import { notFound } from 'next/navigation'
import ProductGallery from '@/components/ProductGallery'
import {
  businessPhoneHref,
  businessWhatsappNumber,
  siteUrl,
} from '@/lib/business'
import { formatMoney } from '@/lib/demo-products'
import { getProductBySlug } from '@/lib/products'

export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const productDetails = [
    ['Collection', product.category || 'Decorative Art'],
    ...(product.subCollection
      ? [['Sub-collection', product.subCollection]]
      : []),
    ['Dimensions', product.dimensions || 'Standard studio size'],
    [
      'Construction',
      product.materials ||
        'Designed digitally, precision-cut, assembled by hand, then finished in the studio.',
    ],
    ['Price', formatMoney(product.price, product.currency)],
  ]
  const productUrl = `${siteUrl}/product/${product.slug}`
  const whatsappMessage = [
    `Hello, I would like to buy this product: ${product.name}`,
    `Collection: ${product.category || 'Decorative Art'}`,
    ...(product.subCollection
      ? [`Sub-collection: ${product.subCollection}`]
      : []),
    `Dimensions: ${product.dimensions || 'Standard studio size'}`,
    `Construction: ${
      product.materials ||
      'Designed digitally, precision-cut, assembled by hand, then finished in the studio.'
    }`,
    `Price: ${formatMoney(product.price, product.currency)}`,
    `Product page: ${productUrl}`,
  ].join('\n')
  const whatsappHref = `https://wa.me/${businessWhatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <main className="container-luxe py-8 md:py-12">
      <div className="grid gap-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-12">
        <ProductGallery images={product.images} name={product.name} />
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="text-xs uppercase tracking-[0.16em] text-champagne">
            {product.category}
          </div>
          <h1 className="editorial mt-2 text-4xl leading-none md:text-5xl">
            {product.name}
          </h1>
          <div className="mt-4 text-2xl">
            {formatMoney(product.price, product.currency)}
          </div>
          <p className="mt-6 text-sm leading-7 text-black/60">
            {product.description}
          </p>
          <div className="mt-10 border-t border-black/10 pt-6">
            <h2 className="text-sm font-semibold">PRODUCT DETAILS</h2>
            <div className="mt-4 overflow-hidden rounded-lg border border-black/10">
              <table className="w-full text-left text-sm">
                <tbody>
                  {productDetails.map(([label, value]) => (
                    <tr
                      key={label}
                      className="border-b border-black/10 last:border-b-0"
                    >
                      <th className="w-[38%] bg-[#f1ede6] px-4 py-3 align-top text-[11px] font-semibold uppercase tracking-[0.14em] text-black/55">
                        {label}
                      </th>
                      <td className="px-4 py-3 leading-6 text-black/65">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="btn-gold min-h-12 w-full gap-2"
              >
                <MessageCircle size={16} />
                Message
              </a>
              <a
                href={businessPhoneHref}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-black/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em]"
              >
                <Phone size={16} />
                Call to buy
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
