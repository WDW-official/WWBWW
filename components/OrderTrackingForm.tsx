'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'
import { formatMoney } from '@/lib/demo-products'
import type { Order } from '@/lib/types'

export default function OrderTrackingForm() {
  const [reference, setReference] = useState('')
  const [email, setEmail] = useState('')
  const [order, setOrder] = useState<Order | null>(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    setOrder(null)

    const params = new URLSearchParams({ reference })
    if (email) params.set('email', email)
    const response = await fetch(`/api/orders/track?${params.toString()}`)
    const data = await response.json()
    setLoading(false)

    if (!response.ok) {
      setMessage(data.error || 'Order not found.')
      return
    }

    setOrder(data.order)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
      <form
        onSubmit={submit}
        className="rounded-lg border border-black/10 bg-white p-5 shadow-luxe md:p-7"
      >
        <div className="grid gap-3">
          <input
            required
            value={reference}
            onChange={(event) => setReference(event.target.value)}
            placeholder="Order reference"
            className="rounded-md border border-black/15 px-4 py-3 text-sm outline-none"
          />
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Email used at checkout"
            className="rounded-md border border-black/15 px-4 py-3 text-sm outline-none"
          />
        </div>
        {message && <p className="mt-3 text-sm text-red-700">{message}</p>}
        <button
          disabled={loading}
          className="btn-gold mt-4 w-full gap-2 disabled:opacity-60"
        >
          <Search size={16} />
          {loading ? 'Checking...' : 'Track order'}
        </button>
      </form>

      <section className="rounded-lg border border-black/10 bg-[#f1ede6] p-5 md:p-7">
        {order ? (
          <div>
            <div className="flex flex-col gap-3 border-b border-black/10 pb-5 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.15em] text-black/45">
                  Reference
                </div>
                <h2 className="mt-1 text-xl font-semibold">
                  {order.reference}
                </h2>
              </div>
              <span className="w-fit rounded-full bg-black px-3 py-1 text-xs uppercase tracking-[0.13em] text-white">
                {order.status}
              </span>
            </div>
            <div className="mt-5 grid gap-3">
              {order.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between gap-4 text-sm"
                >
                  <span>
                    {item.quantity} x {item.name}
                  </span>
                  <strong>{formatMoney(item.lineTotal, item.currency)}</strong>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-5">
              <span className="text-sm uppercase tracking-[0.14em] text-black/55">
                Total
              </span>
              <strong>{formatMoney(order.amount, order.currency)}</strong>
            </div>
          </div>
        ) : (
          <div className="grid min-h-64 place-items-center text-center">
            <div>
              <p className="editorial text-3xl">Order status appears here.</p>
              <p className="mt-2 text-sm text-black/55">
                Use the reference from your Paystack checkout or confirmation
                message.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
