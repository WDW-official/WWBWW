import { NextResponse } from 'next/server'
import { isAdminRequest, unauthorized } from '@/lib/admin-auth'
import { updateOrderPayment } from '@/lib/orders'

export const runtime = 'nodejs'

const allowedStatuses = ['pending', 'paid', 'processing', 'completed', 'failed']

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ reference: string }> }
) {
  if (!isAdminRequest(request)) return unauthorized()

  const { reference } = await params
  const body = await request.json()
  const status = String(body.status || '')

  if (!allowedStatuses.includes(status)) {
    return NextResponse.json(
      { error: 'Invalid order status.' },
      { status: 400 }
    )
  }

  await updateOrderPayment(reference, { status: status as never })
  return NextResponse.json({ ok: true })
}
