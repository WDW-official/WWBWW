'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function ProductGallery({
  images,
  name,
}: {
  images: string[]
  name: string
}) {
  const gallery = images.length ? images : ['/images/mockup/product-tree.jpg']
  const [selected, setSelected] = useState(0)

  function move(direction: 1 | -1) {
    setSelected(
      (current) => (current + direction + gallery.length) % gallery.length
    )
  }

  return (
    <section className="grid gap-4">
      <div className="relative overflow-hidden rounded-lg bg-[#eee7de]">
        <img
          src={gallery[selected]}
          alt={name}
          className="aspect-[1/1.08] w-full object-cover md:aspect-[1.08/1]"
        />
        {gallery.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => move(-1)}
              className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => move(1)}
              className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {gallery.length > 1 && (
        <div className="max-w-full overflow-hidden">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {gallery.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setSelected(index)}
                aria-label={`View image ${index + 1}`}
                className={`shrink-0 overflow-hidden rounded-md border bg-[#eee7de] ${selected === index ? 'border-black' : 'border-black/10'}`}
              >
                <img
                  src={image}
                  alt={`${name} thumbnail ${index + 1}`}
                  className="h-20 w-20 object-cover sm:h-24 sm:w-24"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
