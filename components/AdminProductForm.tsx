'use client'

import { ImagePlus, Loader2, Upload, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Product } from '@/lib/types'
import { useToast } from './ToastProvider'

export default function AdminProductForm({ adminKey, product, onSaved, onCancel }: { adminKey?: string; product?: Product | null; onSaved?: (product: Product) => void; onCancel?: () => void }) {
  const [images, setImages] = useState<string[]>(product?.images || [])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const { toast } = useToast()
  const editing = Boolean(product)

  useEffect(() => {
    setImages(product?.images || [])
    setMessage('')
  }, [product])

  async function uploadImage(file: File) {
    const body = new FormData()
    body.append('file', file)
    body.append('folder', 'woodworks/products')
    setUploading(true)
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: adminKey ? { 'x-admin-key': adminKey } : undefined,
        body,
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Image upload failed')
      setImages((current) => [...current, data.url])
      toast({ type: 'success', title: 'Image uploaded', message: 'The product image is ready.' })
    } finally {
      setUploading(false)
    }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setSaving(true)
    setMessage('')
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())
    let data: { error?: string; product?: Product }

    try {
      const response = await fetch(editing ? `/api/admin/products/${product?.id}` : '/api/products', {
        method: editing ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(adminKey ? { 'x-admin-key': adminKey } : {}),
        },
        body: JSON.stringify({ ...payload, images }),
      })
      data = await response.json()

      if (!response.ok) {
        setMessage(data.error || 'Product could not be saved.')
        toast({ type: 'error', title: editing ? 'Product not updated' : 'Product not saved', message: data.error || 'Please check the product details.' })
        return
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Product could not be saved.'
      setMessage(errorMessage)
      toast({ type: 'error', title: editing ? 'Product not updated' : 'Product not saved', message: errorMessage })
      return
    } finally {
      setSaving(false)
    }

    if (!data.product) return

    setImages([])
    form.reset()
    setMessage(`Product ${editing ? 'updated' : 'saved'}: ${data.product.name}`)
    toast({ type: 'success', title: editing ? 'Product updated' : 'Product uploaded', message: `${data.product.name} is now in the catalogue.` })
    onSaved?.(data.product)
  }

  return (
    <form onSubmit={submit} className="grid gap-5 md:grid-cols-2">
      <input required name="name" defaultValue={product?.name || ''} placeholder="Product name" className="rounded-md border border-black/15 px-4 py-3 text-sm outline-none" />
      <input required name="price" type="number" min="1" step="1" defaultValue={product ? product.price / 100 : ''} placeholder="Price in NGN" className="rounded-md border border-black/15 px-4 py-3 text-sm outline-none" />
      <input name="subtitle" defaultValue={product?.subtitle || ''} placeholder="Short subtitle" className="rounded-md border border-black/15 px-4 py-3 text-sm outline-none" />
      <input name="category" defaultValue={product?.category || ''} placeholder="Category" className="rounded-md border border-black/15 px-4 py-3 text-sm outline-none" />
      <input name="stock" type="number" min="0" defaultValue={product?.stock ?? ''} placeholder="Stock" className="rounded-md border border-black/15 px-4 py-3 text-sm outline-none" />
      <select name="status" defaultValue={product?.status || 'active'} className="rounded-md border border-black/15 bg-white px-4 py-3 text-sm outline-none">
        <option value="active">Active</option>
        <option value="draft">Draft</option>
      </select>
      <input name="materials" defaultValue={product?.materials || ''} placeholder="Materials" className="rounded-md border border-black/15 px-4 py-3 text-sm outline-none" />
      <input name="dimensions" defaultValue={product?.dimensions || ''} placeholder="Dimensions" className="rounded-md border border-black/15 px-4 py-3 text-sm outline-none" />
      <textarea required name="description" defaultValue={product?.description || ''} placeholder="Product description" className="min-h-32 rounded-md border border-black/15 px-4 py-3 text-sm outline-none md:col-span-2" />
      <label className="grid min-h-36 cursor-pointer place-items-center rounded-lg border border-dashed border-black/25 bg-[#fbfaf7] p-6 text-center md:col-span-2">
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) uploadImage(file).catch((error) => {
              setMessage(error.message)
              toast({ type: 'error', title: 'Image upload failed', message: error.message })
            })
          }}
        />
        <span className="grid justify-items-center gap-2 text-sm text-black/55">
          {uploading ? <Loader2 className="animate-spin" /> : <ImagePlus />}
          Upload product image
        </span>
      </label>
      {images.length > 0 && <div className="grid grid-cols-3 gap-3 md:col-span-2">{images.map((image)=><div key={image} className="relative"><img src={image} alt="Uploaded product" className="aspect-square w-full rounded-md object-cover"/><button type="button" aria-label="Remove image" onClick={() => setImages((current) => current.filter((item) => item !== image))} className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/90 shadow-sm"><X size={14}/></button></div>)}</div>}
      {message && <p className="text-sm text-black/65 md:col-span-2">{message}</p>}
      <div className="flex flex-col gap-3 md:col-span-2 md:flex-row">
        {onCancel && <button type="button" onClick={onCancel} className="inline-flex min-h-11 items-center justify-center rounded-md border border-black/15 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em]">Cancel</button>}
        <button disabled={saving || uploading} className="btn-gold flex-1 gap-2 disabled:opacity-60">
          {saving ? <Loader2 className="animate-spin" size={16}/> : <Upload size={16}/>}
          {editing ? 'Update product' : 'Save product'}
        </button>
      </div>
    </form>
  )
}
