export type Product = {
  id: string
  slug: string
  name: string
  subtitle: string
  description: string
  category: string
  price: number
  currency: string
  images: string[]
  status: 'active' | 'draft'
  stock: number
  materials?: string
  dimensions?: string
  createdAt?: string
  updatedAt?: string
}

export type CartItem = {
  productId: string
  slug: string
  name: string
  price: number
  currency: string
  image: string
  quantity: number
}

export type OrderItem = CartItem & {
  lineTotal: number
}

export type Order = {
  id: string
  reference: string
  email: string
  name: string
  phone?: string
  items: OrderItem[]
  amount: number
  currency: string
  status: 'pending' | 'paid' | 'processing' | 'completed' | 'failed'
  paystackAccessCode?: string
  paystackAuthorizationUrl?: string
  createdAt: string
  updatedAt: string
}
