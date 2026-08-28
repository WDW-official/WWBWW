import Link from 'next/link'
import {
  ArrowRight,
  Check,
  Layers,
  PenTool,
  Ruler,
  Sparkles,
  Phone,
} from 'lucide-react'

const values = [
  [
    'Design-led',
    'Every piece begins with proportion, rhythm, and a clear visual purpose.',
    PenTool,
  ],
  [
    'Precisely made',
    'Laser cutting gives each detail a crisp edge before hand finishing brings warmth back in.',
    Ruler,
  ],
  [
    'Layered depth',
    'Multiple wood layers create shadows, dimension, and a stronger sense of craft.',
    Layers,
  ],
]

const process = [
  'Concept and artwork refinement',
  'Material selection and scale planning',
  'Laser cutting or engraving',
  'Assembly, finishing, and quality checks',
]

export default function About() {
  return (
    <main>
      <section className="container-luxe py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.16em] text-champagne">
              About the studio
            </div>
            <h1 className="editorial mt-3 text-5xl leading-none md:text-6xl">
              CRAFT, REFINED BY PRECISION.
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-black/60">
              Woodworks by Walé Williams creates contemporary wooden art, home
              decor, lighting, ornaments, and personalised pieces shaped by
              digital design and finished with a human hand.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-black/60">
              The studio is built around a simple belief: precision should not
              make objects feel cold. It should reveal texture, pattern, shadow,
              and the natural character of wood.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/shop" className="btn-gold">
                Shop pieces
              </Link>
              <Link
                href="/custom-work"
                className="inline-flex items-center gap-2 rounded-md border border-black/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.13em]"
              >
                Start custom work <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          <img
            src="https://res.cloudinary.com/dzn1k1z8r/image/upload/v1787887482/file_000000001bb481f4bf0a91315b6975dc_y06q5y.png"
            alt="Woodworks studio workshop"
            className="aspect-[1.15/1] w-full rounded-lg object-cover"
          />
        </div>
      </section>
      <section className="container-luxe py-6">
        <div className="grid gap-4 md:grid-cols-3">
          {values.map(([title, text, Icon]) => (
            <article
              key={title as string}
              className="rounded-lg border border-black/10 bg-white p-6"
            >
              <Icon className="text-champagne" size={22} />
              <h2 className="mt-5 text-sm font-semibold uppercase tracking-[0.14em]">
                {title as string}
              </h2>
              <p className="mt-3 text-sm leading-6 text-black/55">
                {text as string}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="container-luxe py-12 md:py-16">
        <div className="grid gap-8 border-t border-black/10 pt-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <div className="text-xs uppercase tracking-[0.16em] text-champagne">
              How we work
            </div>
            <h2 className="editorial mt-2 text-4xl leading-none">
              FROM IDEA TO FINISHED PIECE.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {process.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-lg bg-[#f1ede6] p-4 text-sm"
              >
                <Check className="mt-0.5 shrink-0 text-champagne" size={17} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <img
            src="/images/mockup/philosophy-laser.jpg"
            alt="Laser cutting detail"
            className="aspect-[1.2/1] w-full rounded-lg object-cover"
          />
          <img
            src="/images/mockup/philosophy-detail.jpg"
            alt="Wood finishing detail"
            className="aspect-[1.2/1] w-full rounded-lg object-cover"
          />
          <img
            src="/images/mockup/philosophy-workshop.jpg"
            alt="Workshop table"
            className="aspect-[1.2/1] w-full rounded-lg object-cover"
          />
        </div> */}
      </section>
      <section className="container-luxe pb-14">
        <div className="rounded-lg bg-black p-7 text-white md:flex md:items-center md:justify-between md:p-9">
          <div>
            <Phone className="text-champagne" size={22} />
            <h2 className="editorial mt-4 text-3xl">HAVE A PIECE IN MIND?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
              Commission a personalised plaque, decorative artwork, lighting
              piece, or a completely bespoke design.
            </p>
          </div>
          <Link href="/contact" className="btn-gold mt-6 md:mt-0">
            Contact us
          </Link>
        </div>
      </section>
    </main>
  )
}
