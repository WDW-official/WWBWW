import { NextResponse } from 'next/server'
import { isAdminRequest, unauthorized } from '@/lib/admin-auth'
import { getDb } from '@/lib/mongodb'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  if (!isAdminRequest(request)) return unauthorized()

  const db = await getDb()
  const [products, orders, customRequests, paidOrders, latestOrders] = await Promise.all([
    db.collection('products').countDocuments(),
    db.collection('orders').countDocuments(),
    db.collection('customRequests').countDocuments({ status: { $ne: 'completed' } }),
    db.collection('orders').find({ status: { $in: ['paid', 'processing', 'completed'] } }).toArray(),
    db.collection('orders').find().sort({ createdAt: -1 }).limit(5).toArray(),
  ])

  const revenue = paidOrders.reduce((sum, order) => sum + Number(order.amount || 0), 0)
  const pendingOrders = await db.collection('orders').countDocuments({ status: 'pending' })

  return NextResponse.json({
    stats: {
      products,
      orders,
      pendingOrders,
      customRequests,
      revenue,
      currency: paidOrders[0]?.currency || process.env.PAYSTACK_CURRENCY || 'NGN',
    },
    latestOrders: latestOrders.map((order) => ({ ...order, id: order._id.toString(), _id: undefined })),
  })
}
