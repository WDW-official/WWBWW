'use client'

import Link from 'next/link'
import { Loader2, MessageSquare, Send } from 'lucide-react'
import { useState } from 'react'
import { useToast } from './ToastProvider'

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const body = new FormData()
    body.append('name', String(formData.get('name') || ''))
    body.append('email', String(formData.get('email') || ''))
    body.append('phone', String(formData.get('phone') || ''))
    body.append('description', `${formData.get('type')}: ${formData.get('description')}`)

    setLoading(true)
    const response = await fetch('/api/custom-requests', { method: 'POST', body })
    const data = await response.json()
    setLoading(false)

    if (!response.ok) {
      toast({ type: 'error', title: 'Enquiry not sent', message: data.error || 'Please try again.' })
      return
    }

    form.reset()
    toast({ type: 'success', title: 'Enquiry sent', message: 'Thanks. We will get back to you shortly.' })
  }

  return (
    <form onSubmit={submit} className="rounded-lg border border-black/10 bg-white p-5 shadow-sm md:p-7">
      <div className="mb-6 flex items-center gap-3"><MessageSquare className="text-champagne" size={22}/><h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Project enquiry</h2></div>
      <div className="grid gap-4 md:grid-cols-2">
        <input required name="name" placeholder="Your name" className="rounded-md border border-black/15 px-4 py-3 text-sm outline-none"/>
        <input required name="email" type="email" placeholder="Email address" className="rounded-md border border-black/15 px-4 py-3 text-sm outline-none"/>
        <input name="phone" placeholder="Phone number" className="rounded-md border border-black/15 px-4 py-3 text-sm outline-none"/>
        <select name="type" className="rounded-md border border-black/15 bg-white px-4 py-3 text-sm outline-none">
          <option>Custom artwork</option>
          <option>Product question</option>
          <option>Personalised plaque</option>
          <option>Lighting</option>
          <option>Other</option>
        </select>
        <textarea required name="description" placeholder="Tell us what you have in mind" className="min-h-36 rounded-md border border-black/15 px-4 py-3 text-sm outline-none md:col-span-2"/>
        <button disabled={loading} className="btn-gold gap-2 md:col-span-2 disabled:opacity-60">
          {loading ? <Loader2 className="animate-spin" size={16}/> : <Send size={16}/>}
          Send enquiry
        </button>
      </div>
      <p className="mt-4 text-xs leading-5 text-black/45">Prefer a guided request? Use the custom work form for dimensions, materials, budget, and reference uploads.</p>
      <Link href="/custom-work" className="mt-3 inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-champagne">Open custom work form</Link>
    </form>
  )
}
