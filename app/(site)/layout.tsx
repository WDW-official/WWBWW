import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import { CartProvider } from '@/components/CartProvider'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
      <Header />
      {children}
      <Footer />
      <CartDrawer />
    </CartProvider>
  )
}
