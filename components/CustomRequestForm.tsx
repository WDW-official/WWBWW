'use client'

import { ImagePlus, Loader2, Send } from 'lucide-react'
import { useState } from 'react'
import { useToast } from './ToastProvider'

export default function CustomRequestForm() {
  const [files, setFiles] = useState<FileList | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { toast } = useToast()

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setLoading(true)
    setMessage('')
    const body = new FormData(form)
    if (files) {
      Array.from(files).forEach((file) => body.append('files', file))
    }

    const response = await fetch('/api/custom-requests', { method: 'POST', body })
    const data = await response.json()
    setLoading(false)

    if (!response.ok) {
      setMessage(data.error || 'Request could not be sent.')
      toast({ type: 'error', title: 'Request not sent', message: data.error || 'Please check the form and try again.' })
      return
    }

    form.reset()
    setFiles(null)
    setMessage('Your custom request has been received.')
    toast({ type: 'success', title: 'Request submitted', message: 'Your custom request has been received.' })
  }

  return (
    <form onSubmit={submit} className="mx-auto grid max-w-4xl gap-5 rounded-lg bg-white p-5 shadow-luxe md:grid-cols-2 md:p-8">
      <input required name="name" placeholder="Name" className="rounded-md border border-black/15 px-4 py-3 text-sm outline-none"/>
      <input required name="email" type="email" placeholder="Email" className="rounded-md border border-black/15 px-4 py-3 text-sm outline-none"/>
      <input name="phone" placeholder="Phone" className="rounded-md border border-black/15 px-4 py-3 text-sm outline-none"/>
      <input name="dimensions" placeholder="Desired dimensions" className="rounded-md border border-black/15 px-4 py-3 text-sm outline-none"/>
      <input name="material" placeholder="Material preference" className="rounded-md border border-black/15 px-4 py-3 text-sm outline-none"/>
      <input name="budget" placeholder="Budget" className="rounded-md border border-black/15 px-4 py-3 text-sm outline-none"/>
      <input name="requiredDate" type="date" className="rounded-md border border-black/15 px-4 py-3 text-sm outline-none"/>
      <label className="flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-black/25 px-4 py-3 text-sm text-black/55">
        <ImagePlus size={18}/>
        <span>{files?.length ? `${files.length} file selected` : 'Upload artwork or inspiration'}</span>
        <input type="file" multiple className="sr-only" onChange={(event) => setFiles(event.target.files)} />
      </label>
      <textarea required name="description" placeholder="Project description" className="min-h-36 rounded-md border border-black/15 px-4 py-3 text-sm outline-none md:col-span-2"/>
      {message && <p className="text-sm text-black/65 md:col-span-2">{message}</p>}
      <button disabled={loading} className="btn-gold gap-2 md:col-span-2 disabled:opacity-60">
        {loading ? <Loader2 className="animate-spin" size={16}/> : <Send size={16}/>}
        Request a quote
      </button>
    </form>
  )
}
