import { NextResponse } from 'next/server'
import { findOrder, updateOrderPayment } from '@/lib/orders'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY
  const { searchParams } = new URL(request.url)
  const reference = searchParams.get('reference')

  if (!secretKey) {
    return NextResponse.json(
      { error: 'PAYSTACK_SECRET_KEY is not configured.' },
      { status: 500 }
    )
  }

  if (!reference) {
    return NextResponse.json(
      { error: 'Missing payment reference.' },
      { status: 400 }
    )
  }

  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    }
  )
  const payment = await response.json()
  const paid =
    response.ok && payment.status && payment.data?.status === 'success'

  await updateOrderPayment(reference, { status: paid ? 'paid' : 'failed' })
  const order = await findOrder(reference)

  return NextResponse.json({
    paid,
    order,
    payment: { status: payment.data?.status, message: payment.message },
  })
}
