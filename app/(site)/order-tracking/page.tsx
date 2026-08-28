import OrderTrackingForm from '@/components/OrderTrackingForm'

export default function OrderTracking() {
  return <main className="container-luxe py-10 md:py-14"><div className="mb-8 max-w-3xl"><div className="text-xs uppercase tracking-[0.15em] text-champagne">Order tracking</div><h1 className="editorial mt-2 text-4xl leading-none md:text-6xl">TRACK YOUR PIECE</h1><p className="mt-4 text-sm leading-6 text-black/60">Check payment and production status with your order reference.</p></div><OrderTrackingForm/></main>
}
