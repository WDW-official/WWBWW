import { NextResponse } from 'next/server'
import { isAdminRequest, unauthorized } from '@/lib/admin-auth'
import { createProduct, getProducts, slugify } from '@/lib/products'

export const runtime = 'nodejs'

export async function GET() {
  const products = await getProducts()
  return NextResponse.json({ products })
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) return unauthorized()

  const body = await request.json()
  const name = String(body.name || '').trim()
  const price = Math.round(Number(body.price || 0) * 100)
  const images = Array.isArray(body.images) ? body.images.filter(Boolean) : []

  if (!name || !price || images.length === 0) {
    return NextResponse.json({ error: 'Name, price, and at least one image are required.' }, { status: 400 })
  }

  const product = await createProduct({
    name,
    slug: body.slug ? slugify(String(body.slug)) : slugify(name),
    subtitle: String(body.subtitle || body.category || 'Woodwork piece'),
    description: String(body.description || ''),
    category: String(body.category || 'Decorative Art'),
    price,
    currency: String(body.currency || process.env.PAYSTACK_CURRENCY || 'NGN').toUpperCase(),
    images,
    stock: Number(body.stock || 0),
    status: body.status === 'draft' ? 'draft' : 'active',
    materials: body.materials ? String(body.materials) : undefined,
    dimensions: body.dimensions ? String(body.dimensions) : undefined,
  })

  return NextResponse.json({ product }, { status: 201 })
}
