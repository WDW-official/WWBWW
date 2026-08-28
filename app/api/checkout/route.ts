import { NextResponse } from 'next/server'
import { createOrder, updateOrderPayment } from '@/lib/orders'
import type { CartItem } from '@/lib/types'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY
  if (!secretKey) {
    return NextResponse.json({ error: 'PAYSTACK_SECRET_KEY is not configured.' }, { status: 500 })
  }

  const body = await request.json()
  const email = String(body.email || '').trim()
  const name = String(body.name || '').trim()
  const items = Array.isArray(body.items) ? (body.items as CartItem[]) : []

  if (!email || !name || items.length === 0) {
    return NextResponse.json({ error: 'Name, email, and cart items are required.' }, { status: 400 })
  }

  const order = await createOrder({
    email,
    name,
    phone: body.phone ? String(body.phone) : undefined,
    items,
  })

  const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || ''
  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      amount: String(order.amount),
      currency: order.currency,
      reference: order.reference,
      callback_url: `${origin}/checkout/callback`,
      metadata: {
        customer_name: name,
        order_id: order.id,
        items: order.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          lineTotal: item.lineTotal,
        })),
      },
    }),
  })

  const payment = await response.json()
  if (!response.ok || !payment.status) {
    await updateOrderPayment(order.reference, { status: 'failed' })
    return NextResponse.json({ error: payment.message || 'Paystack initialization failed.' }, { status: 502 })
  }

  await updateOrderPayment(order.reference, {
    paystackAccessCode: payment.data.access_code,
    paystackAuthorizationUrl: payment.data.authorization_url,
  })

  return NextResponse.json({
    reference: order.reference,
    authorizationUrl: payment.data.authorization_url,
  })
}
