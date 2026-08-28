import { ObjectId } from 'mongodb'
import { getDb } from './mongodb'
import type { CartItem, Order } from './types'

type OrderDocument = Omit<Order, 'id'> & { _id: ObjectId }

function serializeOrder(order: OrderDocument): Order {
  const { _id, ...rest } = order
  return { ...rest, id: _id.toString() }
}

export function makeOrderReference() {
  return `WW-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
}

export function normalizeOrderItems(items: CartItem[]) {
  return items.map((item) => ({
    ...item,
    quantity: Math.max(1, Number(item.quantity) || 1),
    lineTotal: item.price * Math.max(1, Number(item.quantity) || 1),
  }))
}

export async function createOrder(input: {
  email: string
  name: string
  phone?: string
  items: CartItem[]
  callbackUrl?: string
}) {
  const db = await getDb()
  const now = new Date().toISOString()
  const items = normalizeOrderItems(input.items)
  const amount = items.reduce((sum, item) => sum + item.lineTotal, 0)
  const currency = items[0]?.currency || process.env.PAYSTACK_CURRENCY || 'NGN'
  const reference = makeOrderReference()

  const document = {
    reference,
    email: input.email,
    name: input.name,
    phone: input.phone,
    items,
    amount,
    currency,
    status: 'pending' as const,
    createdAt: now,
    updatedAt: now,
  }

  const result = await db.collection('orders').insertOne(document)
  return { ...document, id: result.insertedId.toString() }
}

export async function updateOrderPayment(
  reference: string,
  payment: Partial<Order>
) {
  const db = await getDb()
  await db.collection('orders').updateOne(
    { reference },
    {
      $set: {
        ...payment,
        updatedAt: new Date().toISOString(),
      },
    }
  )
}

export async function findOrder(reference: string, email?: string) {
  const db = await getDb()
  const query = email ? { reference, email } : { reference }
  const order = await db.collection<OrderDocument>('orders').findOne(query)
  return order ? serializeOrder(order) : null
}
