'use client'

import { useEffect, useState } from 'react'

const words = [
  { text: 'PRECISION.', color: 'text-[#9e7438]' },
  { text: 'WARMTH.', color: 'text-[#7b4f2f]' },
  { text: 'DETAIL.', color: 'text-[#3f4a38]' },
  { text: 'DEPTH.', color: 'text-[#8a6b45]' },
]

export default function HeroRotatingWord() {
  const [wordIndex, setWordIndex] = useState(0)
  const [letterCount, setLetterCount] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const word = words[wordIndex]

  useEffect(() => {
    const complete = letterCount === word.text.length
    const empty = letterCount === 0
    const delay = complete && !deleting ? 1400 : deleting ? 45 : 85

    const timeout = window.setTimeout(() => {
      if (complete && !deleting) {
        setDeleting(true)
        return
      }

      if (empty && deleting) {
        setDeleting(false)
        setWordIndex((current) => (current + 1) % words.length)
        return
      }

      setLetterCount((current) => current + (deleting ? -1 : 1))
    }, delay)

    return () => window.clearTimeout(timeout)
  }, [deleting, letterCount, word.text])

  return (
    <span className={`inline-block min-w-[7.5ch] ${word.color}`}>
      {word.text.slice(0, letterCount)}
      <span className="ml-1 inline-block animate-pulse text-black/45">|</span>
    </span>
  )
}
