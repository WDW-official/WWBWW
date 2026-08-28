# Woodworks by Walé Williams — Next.js + Tailwind storefront

A premium responsive ecommerce frontend recreated from the approved Woodworks by Walé Williams mockup.

## Included pages
- `/` — full homepage
- `/shop` — MongoDB-backed product shop grid with demo fallback
- `/collections` — collection overview
- `/custom-work` — bespoke enquiry experience with Cloudinary uploads
- `/about` — brand story
- `/journal` — editorial content
- `/product/[slug]` — dynamic product detail page
- `/admin/products` — product upload admin
- `/order-tracking` — customer order tracking
- `/checkout/callback` — Paystack verification callback

## Exact mockup imagery
The folder `public/images/mockup/` contains local crops taken directly from the supplied/approved mockup and wired into the homepage, shop and collections pages. This includes the hero mandala, collection imagery, exploded mandala layers, product photography, bespoke plaque, workshop/process photography, journal thumbnails and social-gallery images.

The complete reference mockups are retained at:
- `public/images/reference-full.png`
- `public/images/reference-mobile.png`

## Run locally
```bash
npm install
npm run dev
```
Then open `http://localhost:3000`.

## Environment variables
Create `.env.local`:

```bash
MONGODB_URI="mongodb+srv://..."
MONGODB_DB="woodworks_wale"

CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

PAYSTACK_SECRET_KEY="sk_test_..."
PAYSTACK_CURRENCY="NGN"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Optional. If omitted, admin product creation is open in local/dev.
ADMIN_API_KEY="change-me"
```

## Commerce flow
Products and orders are stored in MongoDB. Product and custom-project images are uploaded to Cloudinary through server API routes. Cart checkout creates a pending order, initializes Paystack from the backend, and verifies the transaction from `/checkout/callback`.
