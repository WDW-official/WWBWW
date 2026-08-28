'use client'

import { Box, ClipboardList, CreditCard, LayoutDashboard, Loader2, LogOut, PackagePlus, Search, Sparkles, Upload, type LucideIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { formatMoney } from '@/lib/demo-products'
import type { Order } from '@/lib/types'
import AdminProductsPanel from './AdminProductsPanel'
import DataTable, { type DataTableColumn } from './DataTable'

type CustomRequest = {
  id: string
  name: string
  email: string
  description: string
  budget?: string
  status?: string
  createdAt?: string
  uploads?: { url: string; originalName: string }[]
}

type Summary = {
  stats: {
    products: number
    orders: number
    pendingOrders: number
    customRequests: number
    revenue: number
    currency: string
  }
  latestOrders: Order[]
}

const statuses = ['pending', 'paid', 'processing', 'completed', 'failed']
const tabs: { key: 'overview' | 'orders' | 'products' | 'custom'; icon: LucideIcon; label: string }[] = [
  { key: 'overview', icon: LayoutDashboard, label: 'Overview' },
  { key: 'orders', icon: ClipboardList, label: 'Orders' },
  { key: 'products', icon: PackagePlus, label: 'Products' },
  { key: 'custom', icon: Upload, label: 'Custom' },
]

export default function AdminDashboard() {
  const [adminKey, setAdminKey] = useState('')
  const [loginKey, setLoginKey] = useState('')
  const [summary, setSummary] = useState<Summary | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [requests, setRequests] = useState<CustomRequest[]>([])
  const [active, setActive] = useState<'overview' | 'orders' | 'products' | 'custom'>('overview')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const headers = useMemo(() => (adminKey ? { 'x-admin-key': adminKey } : undefined), [adminKey])

  useEffect(() => {
    const stored = window.localStorage.getItem('woodworks-admin-key')
    if (stored) {
      setAdminKey(stored)
      setLoginKey(stored)
    }
  }, [])

  useEffect(() => {
    if (!adminKey) return
    loadAdminData()
  }, [adminKey])

  async function loadAdminData() {
    setLoading(true)
    setMessage('')
    const [summaryResponse, ordersResponse, requestsResponse] = await Promise.all([
      fetch('/api/admin/summary', { headers }),
      fetch('/api/admin/orders', { headers }),
      fetch('/api/admin/custom-requests', { headers }),
    ])

    if ([summaryResponse, ordersResponse, requestsResponse].some((response) => response.status === 401)) {
      logout()
      setMessage('Admin key is incorrect.')
      setLoading(false)
      return
    }

    const [summaryData, ordersData, requestsData] = await Promise.all([
      summaryResponse.json(),
      ordersResponse.json(),
      requestsResponse.json(),
    ])
    setSummary(summaryData)
    setOrders(ordersData.orders || [])
    setRequests(requestsData.requests || [])
    setLoading(false)
  }

  function login(event: React.FormEvent) {
    event.preventDefault()
    window.localStorage.setItem('woodworks-admin-key', loginKey)
    setAdminKey(loginKey)
  }

  function logout() {
    window.localStorage.removeItem('woodworks-admin-key')
    setAdminKey('')
    setSummary(null)
    setOrders([])
    setRequests([])
  }

  async function updateStatus(reference: string, status: string) {
    await fetch(`/api/admin/orders/${encodeURIComponent(reference)}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(headers || {}),
      },
      body: JSON.stringify({ status }),
    })
    await loadAdminData()
  }

  if (!adminKey) {
    return (
      <main className="container-luxe grid min-h-[70vh] place-items-center py-12">
        <form onSubmit={login} className="w-full max-w-md rounded-lg border border-black/10 bg-white p-6 shadow-luxe">
          <div className="text-xs uppercase tracking-[0.15em] text-champagne">Admin login</div>
          <h1 className="editorial mt-2 text-4xl leading-none">WOODWORKS HQ</h1>
          <p className="mt-4 text-sm leading-6 text-black/60">Enter the admin key from `.env.local` to manage products, orders, and custom enquiries.</p>
          <input
            required
            type="password"
            value={loginKey}
            onChange={(event) => setLoginKey(event.target.value)}
            placeholder="Admin key"
            className="mt-6 w-full rounded-md border border-black/15 px-4 py-3 text-sm outline-none"
          />
          {message && <p className="mt-3 text-sm text-red-700">{message}</p>}
          <button className="btn-gold mt-4 w-full">Login</button>
        </form>
      </main>
    )
  }

  const cards: { label: string; value: string | number; icon: LucideIcon }[] = [
    { label: 'Revenue', value: summary ? formatMoney(summary.stats.revenue, summary.stats.currency) : '...', icon: CreditCard },
    { label: 'Orders', value: summary?.stats.orders ?? '...', icon: ClipboardList },
    { label: 'Pending', value: summary?.stats.pendingOrders ?? '...', icon: Search },
    { label: 'Products', value: summary?.stats.products ?? '...', icon: Box },
    { label: 'Custom Requests', value: summary?.stats.customRequests ?? '...', icon: Sparkles },
  ]

  return (
    <main className="container-luxe py-8 md:py-12">
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.15em] text-champagne">Admin system</div>
          <h1 className="editorial mt-2 text-4xl leading-none md:text-6xl">DASHBOARD</h1>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`inline-flex items-center gap-2 rounded-md border px-4 py-2 text-xs uppercase tracking-[0.12em] ${
                active === key ? 'border-black bg-black text-white' : 'border-black/15 bg-white'
              }`}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
          <button onClick={logout} className="inline-flex items-center gap-2 rounded-md border border-black/15 bg-white px-4 py-2 text-xs uppercase tracking-[0.12em]"><LogOut size={15}/>Logout</button>
        </div>
      </div>

      {loading && <div className="mb-4 inline-flex items-center gap-2 text-sm text-black/55"><Loader2 className="animate-spin" size={16}/>Loading admin data...</div>}

      {(active === 'overview' || active === 'orders') && (
        <section className="grid gap-4">
          {active === 'overview' && <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">{cards.map(({ label, value, icon: Icon }) => <div key={label} className="rounded-lg border border-black/10 bg-white p-4 shadow-sm md:p-5"><Icon size={20} className="text-champagne"/><div className="mt-4 text-[10px] uppercase tracking-[0.14em] text-black/45 md:text-xs">{label}</div><div className="mt-2 break-words text-xl font-semibold md:text-2xl">{value}</div></div>)}</div>}
          <OrderTable orders={active === 'overview' ? orders.slice(0, 6) : orders} onStatusChange={updateStatus} />
        </section>
      )}

      {active === 'products' && <AdminProductsPanel adminKey={adminKey} onChanged={loadAdminData} />}

      {active === 'custom' && (
        <section className="grid gap-4">
          {requests.map((request) => (
            <article key={request.id} className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="font-semibold">{request.name}</h2>
                  <p className="mt-1 text-sm text-black/55">{request.email}</p>
                </div>
                <span className="w-fit rounded-full bg-[#f1ede6] px-3 py-1 text-xs uppercase tracking-[0.12em]">{request.status || 'new'}</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-black/65">{request.description}</p>
              {request.budget && <p className="mt-3 text-sm font-medium">Budget: {request.budget}</p>}
              {request.uploads && request.uploads.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{request.uploads.map((upload)=><a key={upload.url} href={upload.url} target="_blank" className="rounded-md border border-black/15 px-3 py-2 text-xs uppercase tracking-[0.12em]">View file</a>)}</div>}
            </article>
          ))}
          {requests.length === 0 && <EmptyState text="No custom requests yet." />}
        </section>
      )}
    </main>
  )
}

function OrderTable({ orders, onStatusChange }: { orders: Order[]; onStatusChange: (reference: string, status: string) => void }) {
  const columns: DataTableColumn<Order>[] = [
    {
      key: 'order',
      header: 'Order',
      render: (order) => <div className="min-w-[190px]"><div className="text-sm font-semibold">{order.reference}</div><div className="mt-1 text-xs text-black/50">{order.items.length} item(s)</div></div>,
    },
    {
      key: 'customer',
      header: 'Customer',
      render: (order) => <div className="min-w-[210px]"><div className="text-sm">{order.name}</div><div className="mt-1 text-xs text-black/50">{order.email}</div></div>,
    },
    {
      key: 'total',
      header: 'Total',
      render: (order) => <span className="text-sm font-semibold">{formatMoney(order.amount, order.currency)}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (order) => <select value={order.status} onChange={(event)=>onStatusChange(order.reference, event.target.value)} className="rounded-md border border-black/15 bg-white px-3 py-2 text-sm outline-none">
        {statuses.map((status)=><option key={status} value={status}>{status}</option>)}
      </select>,
    },
  ]

  return <DataTable columns={columns} rows={orders} getRowKey={(order) => order.reference} emptyText="No orders yet." />
}

function EmptyState({ text }: { text: string }) {
  return <div className="rounded-lg border border-dashed border-black/15 bg-white p-8 text-center text-sm text-black/55">{text}</div>
}
