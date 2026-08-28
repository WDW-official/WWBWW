import { NextResponse } from 'next/server'
import { configureCloudinary, hasCloudinaryConfig } from '@/lib/cloudinary'
import { getDb } from '@/lib/mongodb'

export const runtime = 'nodejs'

async function fileToDataUri(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer())
  return `data:${file.type};base64,${buffer.toString('base64')}`
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const description = String(formData.get('description') || '').trim()

  if (!name || !email || !description) {
    return NextResponse.json(
      { error: 'Name, email, and project description are required.' },
      { status: 400 }
    )
  }

  const files = formData
    .getAll('files')
    .filter((file): file is File => file instanceof File && file.size > 0)
  let uploads: { url: string; publicId: string; originalName: string }[] = []

  if (files.length > 0) {
    if (!hasCloudinaryConfig()) {
      return NextResponse.json(
        {
          error:
            'File uploads are not configured yet. Send the request without files or add Cloudinary credentials.',
        },
        { status: 503 }
      )
    }

    const cloudinary = configureCloudinary()
    uploads = await Promise.all(
      files.map(async (file) => {
        const result = await cloudinary.uploader.upload(
          await fileToDataUri(file),
          {
            folder: 'woodworks/custom-requests',
            resource_type: 'auto',
          }
        )
        return {
          url: result.secure_url,
          publicId: result.public_id,
          originalName: file.name,
        }
      })
    )
  }

  const now = new Date().toISOString()
  const db = await getDb()
  const result = await db.collection('customRequests').insertOne({
    name,
    email,
    phone: String(formData.get('phone') || ''),
    dimensions: String(formData.get('dimensions') || ''),
    material: String(formData.get('material') || ''),
    budget: String(formData.get('budget') || ''),
    requiredDate: String(formData.get('requiredDate') || ''),
    description,
    uploads,
    status: 'new',
    createdAt: now,
    updatedAt: now,
  })

  return NextResponse.json(
    { id: result.insertedId.toString(), uploads },
    { status: 201 }
  )
}
