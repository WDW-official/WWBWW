import { NextResponse } from 'next/server'
import { isAdminRequest, unauthorized } from '@/lib/admin-auth'
import { getDb } from '@/lib/mongodb'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  if (!isAdminRequest(request)) return unauthorized()

  const db = await getDb()
  const orders = await db
    .collection('orders')
    .find()
    .sort({ createdAt: -1 })
    .limit(50)
    .toArray()
  return NextResponse.json({
    orders: orders.map((order) => ({
      ...order,
      id: order._id.toString(),
      _id: undefined,
    })),
  })
}
