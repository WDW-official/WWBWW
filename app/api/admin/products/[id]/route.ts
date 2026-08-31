import { NextResponse } from 'next/server'
import { isAdminRequest, unauthorized } from '@/lib/admin-auth'
import { slugify, updateProduct } from '@/lib/products'

export const runtime = 'nodejs'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminRequest(request)) return unauthorized()

  const { id } = await params
  const body = await request.json()
  const name = String(body.name || '').trim()
  const price = Math.round(Number(body.price || 0) * 100)
  const images = Array.isArray(body.images) ? body.images.filter(Boolean) : []

  if (!name || !price || images.length === 0) {
    return NextResponse.json(
      { error: 'Name, price, and at least one image are required.' },
      { status: 400 }
    )
  }

  const product = await updateProduct(id, {
    name,
    slug: body.slug ? slugify(String(body.slug)) : slugify(name),
    subtitle: String(body.subtitle || body.category || 'Woodwork piece'),
    description: String(body.description || ''),
    category: String(body.category || 'Decorative Art'),
    subCollection: body.subCollection ? String(body.subCollection) : undefined,
    price,
    currency: String(
      body.currency || process.env.PAYSTACK_CURRENCY || 'NGN'
    ).toUpperCase(),
    images,
    stock: Number(body.stock || 0),
    status: body.status === 'draft' ? 'draft' : 'active',
    materials: body.materials ? String(body.materials) : undefined,
    dimensions: body.dimensions ? String(body.dimensions) : undefined,
  }).catch(() => null)

  if (!product)
    return NextResponse.json(
      { error: 'Product was not found.' },
      { status: 404 }
    )

  return NextResponse.json({ product })
}
