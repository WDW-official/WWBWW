import { NextResponse } from 'next/server'

export function isAdminRequest(request: Request) {
  const adminKey = process.env.ADMIN_API_KEY
  if (!adminKey) return true
  return request.headers.get('x-admin-key') === adminKey
}

export function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
