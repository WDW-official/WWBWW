'use client'

import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'
import { formatMoney } from '@/lib/demo-products'
import { useCart } from './CartProvider'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart, total } = useCart()
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const currency = items[0]?.currency || 'NGN'

  async function checkout(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setStatus('')

    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, items }),
    })
    const data = await response.json()
    setLoading(false)

    if (!response.ok) {
      setStatus(data.error || 'Checkout failed. Please try again.')
      return
    }

    clearCart()
    window.location.href = data.authorizationUrl
  }

  return (
    <div className={`fixed inset-0 z-[80] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <button
        aria-label="Close cart overlay"
        onClick={closeCart}
        className={`absolute inset-0 bg-black/45 transition ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#fbfaf7] shadow-luxe transition duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-black/10 p-5">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em]">
            <ShoppingBag size={18} /> Cart
          </div>
          <button aria-label="Close cart" onClick={closeCart} className="rounded-full border border-black/15 p-2">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div>
                <p className="editorial text-3xl">Your cart is empty.</p>
                <p className="mt-2 text-sm text-black/55">Add a piece from the collection to begin checkout.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="grid grid-cols-[84px_1fr] gap-4 border-b border-black/10 pb-4">
                  <img src={item.image} alt={item.name} className="aspect-square rounded-md object-cover" />
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <p className="mt-1 text-xs text-black/50">{formatMoney(item.price, item.currency)}</p>
                      </div>
                      <button onClick={() => removeItem(item.productId)} className="text-xs text-black/45">
                        Remove
                      </button>
                    </div>
                    <div className="mt-3 inline-flex items-center rounded-md border border-black/15">
                      <button
                        aria-label="Decrease quantity"
                        className="p-2"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        aria-label="Increase quantity"
                        className="p-2"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <form onSubmit={checkout} className="border-t border-black/10 p-5">
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="uppercase tracking-[0.14em] text-black/55">Subtotal</span>
              <strong>{formatMoney(total, currency)}</strong>
            </div>
            <div className="grid gap-3">
              <input
                required
                placeholder="Name"
                className="rounded-md border border-black/15 bg-white px-4 py-3 text-sm outline-none"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
              <input
                required
                type="email"
                placeholder="Email"
                className="rounded-md border border-black/15 bg-white px-4 py-3 text-sm outline-none"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
              />
              <input
                placeholder="Phone"
                className="rounded-md border border-black/15 bg-white px-4 py-3 text-sm outline-none"
                value={form.phone}
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
              />
            </div>
            {status && <p className="mt-3 text-sm text-red-700">{status}</p>}
            <button disabled={loading} className="btn-gold mt-4 w-full disabled:opacity-60">
              {loading ? 'Opening Paystack...' : 'Pay with Paystack'}
            </button>
          </form>
        )}
      </aside>
    </div>
  )
}
