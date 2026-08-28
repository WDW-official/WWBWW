import Link from 'next/link'
const logoUrl =
  'https://res.cloudinary.com/dzn1k1z8r/image/upload/v1787784025/woodworks_by_wale_williams_transparent_vteeqg.png'
export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container-luxe grid gap-10 py-14 md:grid-cols-[1fr_2fr_1fr]">
        <div>
          <img
            src={logoUrl}
            alt="Woodworks by Walé Williams"
            className="h-14 w-auto brightness-0 invert"
          />
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/60">
            Contemporary laser-cut and laser-engraved decorative art, home décor
            and bespoke wooden pieces.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.18em] text-white/50">
              Shop
            </h4>
            {[
              'Mandalas',
              'Wall Art',
              'Lighting',
              'Ornaments',
              'Personalised',
            ].map((x) => (
              <Link
                className="mb-2 block text-sm text-white/80"
                href="/shop"
                key={x}
              >
                {x}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.18em] text-white/50">
              Customer care
            </h4>
            {[
              ['Custom Work', '/custom-work'],
              ['Contact', '/contact'],
              // ['Shipping & Returns', '#'],
              // ['Admin', '/admin/products'],
            ].map(([x, href]) => (
              <Link
                className="mb-2 block text-sm text-white/80"
                href={href}
                key={x}
              >
                {x}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-xs uppercase tracking-[0.18em] text-white/50">
            Follow
          </h4>
          <p className="text-sm text-white/70">
            Instagram · Facebook · TikTok · Pinterest
          </p>
          <div className="mt-6 text-xs text-white/40">
            Secure checkout · Visa · Mastercard · Apple Pay
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © 2026 Woodworks by Walé Williams. All rights reserved.
      </div>
    </footer>
  )
}
