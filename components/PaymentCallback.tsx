'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PaymentCallback() {
  const params = useSearchParams()
  const reference = params.get('reference') || params.get('trxref') || ''
  const [status, setStatus] = useState('Verifying payment...')

  useEffect(() => {
    if (!reference) {
      setStatus('Payment reference was not found.')
      return
    }

    fetch(`/api/paystack/verify?reference=${encodeURIComponent(reference)}`)
      .then((response) => response.json())
      .then((data) => setStatus(data.paid ? 'Payment received. Your order is now confirmed.' : data.error || 'Payment was not successful.'))
      .catch(() => setStatus('Payment verification failed. Please track your order with the reference.'))
  }, [reference])

  return (
    <main className="container-luxe grid min-h-[55vh] place-items-center py-16 text-center">
      <div className="max-w-xl">
        <div className="text-xs uppercase tracking-[0.15em] text-champagne">Paystack checkout</div>
        <h1 className="editorial mt-3 text-4xl leading-none md:text-6xl">ORDER UPDATE</h1>
        <p className="mt-5 text-sm leading-6 text-black/60">{status}</p>
        {reference && <p className="mt-3 text-xs uppercase tracking-[0.14em] text-black/45">{reference}</p>}
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/order-tracking" className="btn-gold">Track order</Link>
          <Link href="/shop" className="rounded-md border border-black/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em]">Back to shop</Link>
        </div>
      </div>
    </main>
  )
}
