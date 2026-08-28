import { NextResponse } from 'next/server'
import { isAdminRequest, unauthorized } from '@/lib/admin-auth'
import { configureCloudinary, hasCloudinaryConfig } from '@/lib/cloudinary'

export const runtime = 'nodejs'

async function fileToDataUri(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer())
  return `data:${file.type};base64,${buffer.toString('base64')}`
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file')
  const folder = String(formData.get('folder') || 'woodworks/products')

  if (folder.includes('/products') && !isAdminRequest(request))
    return unauthorized()

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Upload a valid file.' }, { status: 400 })
  }

  if (!hasCloudinaryConfig()) {
    return NextResponse.json(
      {
        error:
          'File uploads are not configured yet. Add Cloudinary credentials.',
      },
      { status: 503 }
    )
  }

  const cloudinary = configureCloudinary()
  const result = await cloudinary.uploader.upload(await fileToDataUri(file), {
    folder,
    resource_type: 'auto',
  })

  return NextResponse.json({
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
  })
}
