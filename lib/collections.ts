import type { Product } from './types'

export type SubCollection = {
  name: string
  slug: string
  description: string
  image: string
  bannerImage?: string
}

export type Collection = {
  name: string
  slug: string
  categoryValues: string[]
  description: string
  image: string
  bannerImage: string
  subCollections: SubCollection[]
}

function slugifyCollection(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export const collections: Collection[] = [
  {
    name: 'Multi-layered Mandalas',
    slug: 'multi-layered-mandalas',
    categoryValues: ['Mandalas'],
    description: 'Intricate layers, carved geometry, and extraordinary depth.',
    image:
      'https://res.cloudinary.com/dzn1k1z8r/image/upload/v1788044277/OWIWI_Close_1_jmh0nb.png',
    bannerImage:
      'https://res.cloudinary.com/dzn1k1z8r/image/upload/v1788044277/OWIWI_Close_1_jmh0nb.png',
    subCollections: [],
  },
  {
    name: 'Wall Art',
    slug: 'wall-art',
    categoryValues: ['Wall Art'],
    description: 'Statement pieces for contemporary spaces.',
    image:
      'https://res.cloudinary.com/dzn1k1z8r/image/upload/v1788043453/Cosmic_Bloom_Angles_fm6fmp.png',
    bannerImage:
      'https://res.cloudinary.com/dzn1k1z8r/image/upload/v1788043453/Cosmic_Bloom_Angles_fm6fmp.png',
    subCollections: [],
  },
  {
    name: 'Light & Shadow',
    slug: 'light-and-shadow',
    categoryValues: ['Lighting'],
    description:
      'Laser-cut lampshades and lighting designed to cast atmosphere.',
    image:
      'https://res.cloudinary.com/dzn1k1z8r/image/upload/v1788044173/Lamps_jul8xt.png',
    bannerImage:
      'https://res.cloudinary.com/dzn1k1z8r/image/upload/v1788044173/Lamps_jul8xt.png',
    subCollections: [],
  },
  // {
  //   name: 'Ornaments',
  //   slug: 'ornaments',
  //   categoryValues: ['Ornaments'],
  //   description: 'Small pieces with extraordinary detail.',
  //   image: '/images/mockup/cat-ornament.jpg',
  //   bannerImage: '/images/mockup/cat-ornament.jpg',
  //   subCollections: [
  //     {
  //       name: 'Heritage Collection',
  //       slug: 'heritage',
  //       description: 'Compact decorative pieces with refined cut details.',
  //       image: '/images/mockup/product-heritage.jpg',
  //     },
  //   ],
  // },
  {
    name: 'Bespoke & Personalised',
    slug: 'bespoke-and-personalised',
    categoryValues: ['Personalised', 'Bespoke'],
    description: 'Made uniquely for you. Your idea, our craft.',
    image:
      'https://res.cloudinary.com/dzn1k1z8r/image/upload/v1788044009/Bespoke_2_vjcsk3.png',
    bannerImage:
      'https://res.cloudinary.com/dzn1k1z8r/image/upload/v1788044009/Bespoke_2_vjcsk3.png',
    subCollections: [],
  },
]

export function getCollectionBySlug(slug: string) {
  return collections.find((collection) => collection.slug === slug)
}

export function getSubCollectionBySlug(collection: Collection, slug: string) {
  return collection.subCollections.find(
    (subCollection) => subCollection.slug === slug
  )
}

export function getDynamicSubCollections(
  products: Product[],
  collection: Collection
) {
  const collectionProducts = products.filter((product) =>
    productMatchesCollection(product, collection)
  )
  const subCollections = new Map<string, SubCollection>()

  collectionProducts.forEach((product) => {
    const name = product.subCollection?.trim()
    if (!name) return

    const slug = slugifyCollection(name)
    if (subCollections.has(slug)) return

    subCollections.set(slug, {
      name,
      slug,
      description: `Explore pieces from ${name}.`,
      image: product.images[0] || collection.image,
      bannerImage: product.images[0] || collection.bannerImage,
    })
  })

  return Array.from(subCollections.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  )
}

export function productMatchesCollection(
  product: Product,
  collection: Collection
) {
  return collection.categoryValues.includes(product.category)
}

export function productMatchesSubCollection(
  product: Product,
  subCollection: SubCollection
) {
  const value = product.subCollection?.toLowerCase()
  return (
    value === subCollection.name.toLowerCase() ||
    slugifyCollection(value || '') === subCollection.slug
  )
}

export function getCollectionCount(
  products: Product[],
  collection: Collection
) {
  return products.filter((product) =>
    productMatchesCollection(product, collection)
  ).length
}
