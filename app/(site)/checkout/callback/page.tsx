import { Suspense } from 'react'
import PaymentCallback from '@/components/PaymentCallback'

export default function CheckoutCallback() {
  return (
    <Suspense>
      <PaymentCallback />
    </Suspense>
  )
}
