import { ObjectId } from 'mongodb'
import { getDb, hasMongoConfig } from './mongodb'
import { demoProducts } from './demo-products'
import type { Product } from './types'

type ProductDocument = Omit<Product, 'id'> & { _id: ObjectId }

function serializeProduct(product: ProductDocument): Product {
  const { _id, ...rest } = product
  return { ...rest, id: _id.toString() }
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export async function getProducts() {
  if (!hasMongoConfig()) return demoProducts

  try {
    const db = await getDb()
    const products = await db
      .collection<ProductDocument>('products')
      .find({ status: 'active' })
      .sort({ createdAt: -1 })
      .toArray()

    return products.map(serializeProduct)
  } catch {
    return []
  }
}

export async function getAdminProducts() {
  const db = await getDb()
  const products = await db
    .collection<ProductDocument>('products')
    .find()
    .sort({ createdAt: -1 })
    .toArray()

  return products.map(serializeProduct)
}

export async function getProductBySlug(slug: string) {
  const fallback =
    demoProducts.find((product) => product.slug === slug) || demoProducts[0]
  if (!hasMongoConfig()) return fallback

  try {
    const db = await getDb()
    const product = await db
      .collection<ProductDocument>('products')
      .findOne({ slug, status: 'active' })
    return product ? serializeProduct(product) : null
  } catch {
    return null
  }
}

export async function createProduct(
  input: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
) {
  const db = await getDb()
  const now = new Date().toISOString()
  const slug = input.slug || slugify(input.name)
  const document = {
    ...input,
    slug,
    createdAt: now,
    updatedAt: now,
  }
  const result = await db.collection('products').insertOne(document)
  return { ...document, id: result.insertedId.toString() }
}

export async function updateProduct(
  id: string,
  input: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>
) {
  if (!ObjectId.isValid(id)) return null

  const db = await getDb()
  const update = {
    ...input,
    updatedAt: new Date().toISOString(),
  }
  const result = await db
    .collection<ProductDocument>('products')
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: 'after' }
    )

  return result ? serializeProduct(result) : null
}
