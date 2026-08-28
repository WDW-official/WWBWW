import { NextResponse } from 'next/server'
import { isAdminRequest, unauthorized } from '@/lib/admin-auth'
import { getAdminProducts } from '@/lib/products'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  if (!isAdminRequest(request)) return unauthorized()

  try {
    const products = await getAdminProducts()
    return NextResponse.json({ products })
  } catch {
    return NextResponse.json({ error: 'Products could not be loaded. Check MongoDB configuration.' }, { status: 503 })
  }
}
