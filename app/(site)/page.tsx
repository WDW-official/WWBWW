import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import HeroRotatingWord from '@/components/HeroRotatingWord'
import { ArrowRight, Check, ImagePlus, Palette, Ruler, FileCheck, Sparkles } from 'lucide-react'
import { getProducts } from '@/lib/products'

const cats = [
  ['MULTI-LAYERED MANDALAS','Intricate layers. Extraordinary depth.','/images/mockup/cat-mandala.jpg'],
  ['WALL ART','Statement pieces for contemporary spaces.','/images/mockup/cat-tree.jpg'],
  ['LIGHT & SHADOW','Laser-cut lampshades and lighting.','/images/mockup/cat-light.jpg'],
  ['ORNAMENTS','Small pieces with extraordinary detail.','/images/mockup/cat-ornament.jpg'],
  ['PERSONALISED','Made uniquely for you.','/images/mockup/cat-personalised.jpg'],
  ['BESPOKE','Your idea. Our craft.','/images/mockup/cat-bespoke.jpg'],
]

const journal = [
  ['Behind the scenes: The laser cutting process','May 14, 2026','/images/mockup/journal-laser.jpg'],
  ["Design inspiration: Nature’s geometry",'Apr 28, 2026','/images/mockup/journal-tree.jpg'],
  ['Interior installations: Adding warmth with wood','Apr 12, 2026','/images/mockup/journal-lamp.jpg'],
  ['Custom projects: Bespoke creations','Mar 30, 2026','/images/mockup/journal-mandala.jpg'],
]

export const dynamic = 'force-dynamic'

export default async function Home(){
const products = await getProducts()
return <main>
  <section className="relative overflow-hidden bg-[#f3ede4]">
    <div className="grid min-h-[auto] items-stretch lg:min-h-[560px] lg:grid-cols-[0.92fr_1.08fr]">
      <div className="relative z-20 flex items-center px-5 py-12 md:px-8 md:py-16 lg:py-20 lg:pl-[max(2.5rem,calc((100vw-1500px)/2+2.5rem))] lg:pr-10">
        <div className="max-w-xl">
          <h1 className="editorial text-[44px] italic leading-[.9] md:text-[72px] lg:text-[78px]">ART.<br/>CUT WITH<br/><HeroRotatingWord/></h1>
          <p className="mt-6 max-w-sm text-base leading-6 text-black/70">Contemporary decorative art crafted through the precision of laser cutting and engraving.</p>
          <div className="mt-7 flex flex-wrap gap-3"><Link href="/shop" className="btn-gold">Shop the collection</Link><Link href="/custom-work" className="inline-flex items-center rounded-md border border-black/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.13em]">Create something bespoke</Link></div>
          <div className="mt-10 flex gap-2"><span className="h-2 w-2 rounded-full bg-black"/><span className="h-2 w-2 rounded-full border border-black"/><span className="h-2 w-2 rounded-full border border-black"/></div>
        </div>
      </div>
      <div className="relative min-h-[290px] md:min-h-[390px] lg:min-h-[560px]"><div className="absolute inset-y-0 left-0 z-10 hidden w-44 bg-gradient-to-r from-[#f3ede4] via-[#f3ede4]/85 to-transparent lg:block"/><div className="absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-[#f3ede4] to-transparent lg:hidden"/><img src="https://res.cloudinary.com/dzn1k1z8r/image/upload/v1787885582/ChatGPT_Image_Aug_28_2026_03_51_47_AM_b59yij.png" alt="Intricate layered wooden mandala" className="absolute inset-0 h-full w-full object-cover object-center lg:object-[55%_center]"/></div>
    </div>
  </section>

  <section className="container-luxe py-6 md:py-8"><div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">{cats.map(([t,s,i])=><Link href="/collections" key={t} className="group overflow-hidden rounded-xl border border-black/10 bg-white"><div className="overflow-hidden"><img src={i} alt={t} className="aspect-[1.16/1] w-full object-cover transition duration-500 group-hover:scale-105"/></div><div className="p-4"><div className="text-[11px] font-semibold leading-tight">{t}</div><div className="mt-1 text-[11px] leading-4 text-black/55">{s}</div></div></Link>)}</div></section>

  <section className="container-luxe py-5"><div className="grid overflow-hidden rounded-xl bg-[#efe4d5] lg:grid-cols-[.72fr_1.28fr]"><div className="p-8 md:p-12"><h2 className="editorial text-5xl italic leading-[.92] tracking-[-.03em]">LAYER BY LAYER.<br/>DETAIL BY DETAIL.</h2><p className="mt-5 max-w-sm text-sm leading-6 text-black/65">Multiple individual pieces of wood are precision-cut and assembled to create depth, geometry, texture and shadow.</p><Link href="/collections" className="btn-gold mt-6">Explore mandalas</Link></div><div className="grid grid-cols-2"><img src="/images/mockup/layers-exploded.jpg" alt="Exploded wooden mandala layers" className="h-full min-h-[340px] w-full object-cover"/><img src="/images/mockup/layers-mandala.jpg" alt="Finished layered mandala" className="h-full min-h-[340px] w-full object-cover"/></div></div></section>

  <section className="container-luxe py-10"><div className="mb-8 flex items-center gap-5"><div className="h-px flex-1 bg-[#b9935e]"/><h2 className="editorial text-center text-2xl tracking-wide md:text-3xl">FEATURED PRODUCTS</h2><div className="h-px flex-1 bg-[#b9935e]"/></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{products.slice(0,4).map((product)=><ProductCard key={product.id} product={product}/>)}</div><div className="mt-7 text-center"><Link href="/shop" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em]">View all products <ArrowRight size={14}/></Link></div></section>

  <section className="container-luxe py-5"><div className="grid overflow-hidden rounded-xl bg-[#171717] text-white lg:grid-cols-[.55fr_1.45fr]"><img src="/images/mockup/custom-plaque.jpg" alt="Bespoke Williams wooden plaque" className="h-full min-h-[310px] w-full object-cover"/><div className="grid gap-8 p-8 md:p-12 lg:grid-cols-[.9fr_1.1fr]"><div><h2 className="editorial text-5xl italic leading-[.9]">YOUR IDEA.<br/>OUR CRAFT.</h2><p className="mt-5 text-sm leading-6 text-white/65">Create something that exists nowhere else. From names and dates to intricate artwork and completely original designs, we turn your ideas into precision-cut wooden pieces.</p><Link href="/custom-work" className="btn-gold mt-6">Start a custom project</Link></div><div className="grid gap-3 text-xs sm:grid-cols-2"><div className="flex gap-3"><Check className="text-[#c89a59]" size={17}/><span>Tell us what you want</span></div><div className="flex gap-3"><ImagePlus className="text-[#c89a59]" size={17}/><span>Upload artwork or inspiration</span></div><div className="flex gap-3"><Palette className="text-[#c89a59]" size={17}/><span>Choose your material</span></div><div className="flex gap-3"><Ruler className="text-[#c89a59]" size={17}/><span>Choose your size</span></div><div className="flex gap-3"><FileCheck className="text-[#c89a59]" size={17}/><span>Receive a design proof</span></div><div className="flex gap-3"><Sparkles className="text-[#c89a59]" size={17}/><span>We cut, engrave & create</span></div></div></div></div></section>

  <section className="container-luxe py-10"><div className="grid overflow-hidden rounded-xl border border-black/10 bg-white lg:grid-cols-[.55fr_1.45fr]"><div className="p-8 md:p-10"><h2 className="editorial text-4xl leading-[.95]">WHERE CRAFT<br/>MEETS TECHNOLOGY.</h2><p className="mt-5 text-sm leading-6 text-black/60">Woodworks by Walé Williams combines an appreciation for traditional craftsmanship with modern digital design and precision laser technology.</p><p className="mt-4 text-sm leading-6 text-black/60">The machine provides precision. The design provides imagination. The craftsmanship brings it to life.</p></div><div className="grid grid-cols-3"><img src="/images/mockup/philosophy-workshop.jpg" className="h-full min-h-[300px] w-full object-cover" alt="Workshop"/><img src="/images/mockup/philosophy-laser.jpg" className="h-full min-h-[300px] w-full object-cover" alt="Laser cutting"/><img src="/images/mockup/philosophy-detail.jpg" className="h-full min-h-[300px] w-full object-cover" alt="Finishing detail"/></div></div></section>

  <section className="container-luxe py-4"><div className="flex items-end justify-between"><div><div className="text-xs uppercase tracking-[.14em]">From sheet</div><h2 className="editorial mt-1 text-4xl">TO STATEMENT PIECE.</h2></div><Link href="/journal" className="text-xs uppercase tracking-[.12em]">View all</Link></div><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{journal.map(([t,d,i])=><article key={t} className="overflow-hidden rounded-xl border border-black/10 bg-white"><img src={i} alt={t} className="aspect-[2.05/1] w-full object-cover"/><div className="p-4"><h3 className="text-sm font-medium leading-5">{t}</h3><p className="mt-2 text-[10px] uppercase tracking-wider text-black/45">{d}</p></div></article>)}</div></section>

  <section className="container-luxe py-10"><div className="mb-4 flex items-center justify-between"><div className="text-xs uppercase tracking-[.14em]">Follow our journey @woodworksbywale</div><div className="text-xs">Instagram · Facebook · TikTok · Pinterest</div></div><div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">{['social-wall.jpg','social-lamp.jpg','social-workshop.jpg','social-mandala.jpg','social-interior.jpg','social-layers.jpg','social-craft.jpg'].map(x=><img key={x} src={`/images/mockup/${x}`} className="aspect-[1.4/1] w-full rounded-md object-cover" alt="Woodworks studio gallery"/>)}</div></section>

  <section className="container-luxe pb-10"><div className="rounded-xl border border-black/10 bg-[#f1ede6] p-7 md:flex md:items-center md:justify-between"><div><h3 className="editorial text-3xl">JOIN THE WORKSHOP.</h3><p className="mt-2 text-sm text-black/55">Be the first to discover new designs, limited collections, bespoke projects and behind-the-scenes stories.</p></div><div className="mt-5 flex w-full max-w-lg md:mt-0"><input className="min-w-0 flex-1 rounded-l-md border border-black/15 bg-white px-4 py-3 text-sm outline-none" placeholder="ENTER YOUR EMAIL"/><button className="rounded-r-md bg-champagne px-6 text-xs uppercase tracking-wider text-white">Subscribe</button></div></div></section>
</main>
}
