import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const posts = [
  {
    title: 'Behind the scenes: The laser cutting process',
    date: 'May 14, 2026',
    category: 'Workshop',
    image: '/images/mockup/journal-laser.jpg',
    excerpt:
      'A look at how digital artwork becomes clean wood layers, from file preparation to final cutting.',
  },
  {
    title: 'Design inspiration: Nature and geometry',
    date: 'Apr 28, 2026',
    category: 'Design',
    image: '/images/mockup/journal-tree.jpg',
    excerpt:
      'Why botanical forms, symmetry, and repeated pattern work so beautifully in laser-cut wood.',
  },
  {
    title: 'Interior installations: Adding warmth with wood',
    date: 'Apr 12, 2026',
    category: 'Interiors',
    image: '/images/mockup/journal-lamp.jpg',
    excerpt:
      'How layered wooden art, lighting, and wall pieces can soften modern rooms without feeling heavy.',
  },
  {
    title: 'Custom projects: Bespoke creations',
    date: 'Mar 30, 2026',
    category: 'Custom',
    image: '/images/mockup/journal-mandala.jpg',
    excerpt:
      'A guide to commissioning names, dates, symbols, and original artwork for meaningful spaces.',
  },
]

export default function Journal() {
  return (
    <main>
      <section className="container-luxe py-12 md:py-16">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.16em] text-champagne">
            Journal
          </div>
          <h1 className="editorial mt-3 text-5xl leading-none md:text-6xl">
            FROM SHEET TO STATEMENT PIECE.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-black/60">
            Workshop notes, design thinking, material stories, and the process
            behind precision-cut wooden art.
          </p>
        </div>
        <article className="mt-10 grid overflow-hidden rounded-lg border border-black/10 bg-white lg:grid-cols-[1.1fr_.9fr]">
          <img
            src={posts[0].image}
            alt={posts[0].title}
            className="h-full min-h-[300px] w-full object-cover"
          />
          <div className="p-6 md:p-8">
            <div className="text-[10px] uppercase tracking-[0.15em] text-champagne">
              {posts[0].category} - {posts[0].date}
            </div>
            <h2 className="editorial mt-4 text-4xl leading-none">
              {posts[0].title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-black/60">
              {posts[0].excerpt}
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]"
            >
              Ask about a project <ArrowRight size={14} />
            </Link>
          </div>
        </article>
      </section>
      <section className="container-luxe pb-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(1).map((post) => (
            <article
              key={post.title}
              className="overflow-hidden rounded-lg border border-black/10 bg-white"
            >
              <img
                src={post.image}
                alt={post.title}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="p-5">
                <div className="text-[10px] uppercase tracking-[0.15em] text-champagne">
                  {post.category} - {post.date}
                </div>
                <h2 className="mt-3 text-xl font-medium leading-tight">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-black/55">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
