'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Heart, Menu, Search, User, X } from 'lucide-react'
import { useState } from 'react'
import CartButton from './CartButton'

const navItems = [
  ['Shop', '/shop'],
  // ['Collections', '/collections'],
  ['Custom Work', '/custom-work'],
  ['About', '/about'],
  // ['Journal', '/journal'],
  ['Contact', '/contact'],
]

const logoUrl = 'https://res.cloudinary.com/dzn1k1z8r/image/upload/v1787784025/woodworks_by_wale_williams_transparent_vteeqg.png'

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return <>
    {/* <div className="bg-black py-2 text-center text-[10px] uppercase tracking-[0.18em] text-white">Complimentary delivery on qualifying orders · Bespoke commissions available</div> */}
     <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="container-luxe flex h-16 items-center justify-between gap-4 md:h-20">
        <Link href="/" className="block">
          <img src={logoUrl} alt="Woodworks by Walé Williams" className="h-12 w-auto md:h-20"/>
        </Link>
        <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.08em] lg:flex">
          {navItems.map(([label, href]) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))
            return <Link key={href} href={href} aria-current={active ? 'page' : undefined} className={`border-b py-1 transition ${active ? 'border-champagne text-champagne' : 'border-transparent hover:border-black/20 hover:text-champagne'}`}>{label}</Link>
          })}
        </nav>
        <div className="flex items-center gap-4">
          {/* <Search className="hidden sm:block" size={18}/><User className="hidden sm:block" size={18}/><Heart className="hidden sm:block" size={18}/> */}
          <CartButton/>
          <Link href="/shop" className="hidden min-h-11 items-center justify-center rounded-md bg-champagne px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_12px_30px_rgba(183,138,69,0.22)] transition hover:bg-[#9e7438] lg:inline-flex">Shop now</Link>
          <button aria-label="Open menu" onClick={() => setOpen(true)} className="lg:hidden"><Menu size={22}/></button>
        </div>
      </div>
    </header>
    <div className={`fixed inset-0 z-[70] lg:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <button aria-label="Close menu overlay" onClick={() => setOpen(false)} className={`absolute inset-0 bg-black/40 transition ${open ? 'opacity-100' : 'opacity-0'}`} />
      <nav className={`absolute right-0 top-0 h-full w-[82vw] max-w-sm bg-[#fbfaf7] p-6 shadow-luxe transition duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="mb-10 flex items-center justify-between">
          <div className="text-xs font-semibold uppercase tracking-[0.22em]">Menu</div>
          <button aria-label="Close menu" onClick={() => setOpen(false)} className="rounded-full border border-black/15 p-2"><X size={18}/></button>
        </div>
        <div className="grid gap-1">
          {navItems.map(([label, href]) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))
            return <Link onClick={() => setOpen(false)} key={href} href={href} aria-current={active ? 'page' : undefined} className={`border-b py-4 text-sm font-medium uppercase tracking-[0.12em] ${active ? 'border-champagne text-champagne' : 'border-black/10'}`}>{label}</Link>
          })}
        </div>
        <Link onClick={() => setOpen(false)} href="/custom-work" className="btn-gold mt-8 w-full">Start custom project</Link>
      </nav>
    </div>
  </>
}
