import './globals.css'
import { ToastProvider } from '@/components/ToastProvider'

export const metadata = { title: 'Woodworks by Walé Williams', description: 'Contemporary laser-cut wooden art and bespoke pieces.' }

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body><ToastProvider>{children}</ToastProvider></body></html>
}
