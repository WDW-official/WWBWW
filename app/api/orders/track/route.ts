import { NextResponse } from 'next/server'
import { findOrder } from '@/lib/orders'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const reference = searchParams.get('reference')?.trim()
  const email = searchParams.get('email')?.trim()

  if (!reference) {
    return NextResponse.json(
      { error: 'Order reference is required.' },
      { status: 400 }
    )
  }

  const order = await findOrder(reference, email || undefined)
  if (!order) {
    return NextResponse.json({ error: 'Order not found.' }, { status: 404 })
  }

  return NextResponse.json({ order })
}
