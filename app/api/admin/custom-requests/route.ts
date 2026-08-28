import { NextResponse } from 'next/server'
import { isAdminRequest, unauthorized } from '@/lib/admin-auth'
import { getDb } from '@/lib/mongodb'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  if (!isAdminRequest(request)) return unauthorized()

  const db = await getDb()
  const requests = await db
    .collection('customRequests')
    .find()
    .sort({ createdAt: -1 })
    .limit(30)
    .toArray()
  return NextResponse.json({
    requests: requests.map((customRequest) => ({
      ...customRequest,
      id: customRequest._id.toString(),
      _id: undefined,
    })),
  })
}
