'use client'

import { Edit3, Loader2, Plus, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { formatMoney } from '@/lib/demo-products'
import type { Product } from '@/lib/types'
import AdminProductForm from './AdminProductForm'
import DataTable, { type DataTableColumn } from './DataTable'
import { useToast } from './ToastProvider'

export default function AdminProductsPanel({
  adminKey,
  onChanged,
}: {
  adminKey?: string
  onChanged?: () => void
}) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const { toast } = useToast()

  const headers = useMemo(
    () => (adminKey ? { 'x-admin-key': adminKey } : undefined),
    [adminKey]
  )

  useEffect(() => {
    loadProducts()
  }, [adminKey])

  async function loadProducts() {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/products', { headers })
      const data = await response.json()

      if (!response.ok) {
        toast({
          type: 'error',
          title: 'Products not loaded',
          message: data.error || 'Please try again.',
        })
        return
      }

      setProducts(data.products || [])
    } catch (error) {
      toast({
        type: 'error',
        title: 'Products not loaded',
        message: error instanceof Error ? error.message : 'Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  function openCreateModal() {
    setEditingProduct(null)
    setModalOpen(true)
  }

  function openEditModal(product: Product) {
    setEditingProduct(product)
    setModalOpen(true)
  }

  async function productSaved() {
    setModalOpen(false)
    setEditingProduct(null)
    await loadProducts()
    onChanged?.()
  }

  const columns: DataTableColumn<Product>[] = [
    {
      key: 'product',
      header: 'Product',
      render: (product) => (
        <div className="flex min-w-[260px] items-center gap-3">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-14 w-14 rounded-md object-cover"
          />
          <div>
            <div className="text-sm font-semibold">{product.name}</div>
            <div className="mt-1 text-xs text-black/50">{product.subtitle}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Collection',
      render: (product) => (
        <div className="text-sm">
          <div>{product.category}</div>
          {product.subCollection && (
            <div className="mt-1 text-xs text-black/45">
              {product.subCollection}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'price',
      header: 'Price',
      render: (product) => (
        <span className="text-sm font-semibold">
          {formatMoney(product.price, product.currency)}
        </span>
      ),
    },
    {
      key: 'stock',
      header: 'Stock',
      render: (product) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${product.stock > 0 ? 'bg-[#f1ede6] text-black' : 'bg-red-50 text-red-700'}`}
        >
          {product.stock} left
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (product) => (
        <span
          className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.12em] ${product.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-black/5 text-black/55'}`}
        >
          {product.status}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      className: 'text-right',
      render: (product) => (
        <button
          onClick={() => openEditModal(product)}
          className="inline-flex items-center gap-2 rounded-md border border-black/15 px-3 py-2 text-xs uppercase tracking-[0.12em]"
        >
          <Edit3 size={14} />
          Edit
        </button>
      ),
    },
  ]

  return (
    <section className="grid gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">
            Products
          </h2>
          <p className="mt-1 text-sm text-black/55">
            View inventory, stock remaining, status, and edit products.
          </p>
        </div>
        <button onClick={openCreateModal} className="btn-gold gap-2">
          <Plus size={16} />
          Add product
        </button>
      </div>

      {loading ? (
        <div className="inline-flex items-center gap-2 text-sm text-black/55">
          <Loader2 className="animate-spin" size={16} />
          Loading products...
        </div>
      ) : (
        <DataTable
          columns={columns}
          rows={products}
          getRowKey={(product) => product.id}
          emptyText="No products yet."
        />
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-[80] grid place-items-center p-4">
          <button
            aria-label="Close product modal overlay"
            onClick={() => setModalOpen(false)}
            className="absolute inset-0 bg-black/45"
          />
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-5 shadow-luxe md:p-7">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.15em] text-champagne">
                  {editingProduct ? 'Edit product' : 'Add product'}
                </div>
                <h3 className="editorial mt-2 text-3xl leading-none">
                  {editingProduct ? editingProduct.name : 'NEW PRODUCT'}
                </h3>
              </div>
              <button
                aria-label="Close product modal"
                onClick={() => setModalOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-black/15"
              >
                <X size={17} />
              </button>
            </div>
            <AdminProductForm
              adminKey={adminKey}
              product={editingProduct}
              onSaved={productSaved}
              onCancel={() => setModalOpen(false)}
            />
          </div>
        </div>
      )}
    </section>
  )
}
