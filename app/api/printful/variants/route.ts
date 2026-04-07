/* app/api/printful/variants/route.ts */
import { NextRequest, NextResponse } from 'next/server'

const PRINTFUL_API = 'https://api.printful.com'

type PrintfulVariant = {
  id?: number
  external_id?: string
  name?: string
  synced?: boolean
  variant_id?: number
  retail_price?: string
  sku?: string
  product?: {
    id?: number
    external_id?: string
    name?: string
  }
  files?: Array<{
    id?: number
    type?: string
    hash?: string
    url?: string
    filename?: string
    mime_type?: string
    size?: number
    width?: number
    height?: number
    dpi?: number
    status?: string
    created?: number
    thumbnail_url?: string
    preview_url?: string
    visible?: boolean
  }>
  options?: Array<{
    id?: string
    value?: string
  }>
}

type PrintfulProductVariantsResponse = {
  code?: number
  result?: {
    sync_product?: {
      id?: number
      external_id?: string
      name?: string
    }
    sync_variants?: PrintfulVariant[]
  }
  error?: {
    reason?: string
    message?: string
  }
}

function normalizeText(value: string | undefined | null) {
  return (value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
}

function inferColorAndSize(name: string) {
  const lowered = name.toLowerCase()

  let color = ''
  let size = ''

  const parts = name.split('/').map((p) => p.trim())

  if (parts.length >= 3) {
    color = normalizeText(parts[1])
    size = normalizeText(parts[2])
  } else {
    const knownColors = ['black', 'white', 'navy']
    const knownSizes = ['xs', 's', 'm', 'l', 'xl', '2xl', 'one-size']

    const words = lowered
      .replace(/,/g, ' ')
      .split(/\s+/)
      .map((w) => w.trim())
      .filter(Boolean)

    const foundColor = knownColors.find((c) => words.includes(c))
    const foundSize = knownSizes.find((s) => words.includes(s))

    color = foundColor || ''
    size = foundSize || ''
  }

  return { color, size }
}

export async function GET(req: NextRequest) {
  const apiKey = process.env.PRINTFUL_API_KEY
  const storeId = process.env.PRINTFUL_STORE_ID
  const productId = req.nextUrl.searchParams.get('productId')

  if (!apiKey) {
    return NextResponse.json(
      { ok: false, message: 'Missing PRINTFUL_API_KEY' },
      { status: 500 }
    )
  }

  if (!storeId) {
    return NextResponse.json(
      { ok: false, message: 'Missing PRINTFUL_STORE_ID' },
      { status: 500 }
    )
  }

  if (!productId) {
    return NextResponse.json(
      { ok: false, message: 'Missing productId query param' },
      { status: 400 }
    )
  }

  try {
    const res = await fetch(`${PRINTFUL_API}/store/products/${productId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'X-PF-Store-Id': storeId,
      },
      cache: 'no-store',
    })

    const data = (await res.json()) as PrintfulProductVariantsResponse

    if (!res.ok) {
      return NextResponse.json(
        {
          ok: false,
          message: data?.error?.message || 'Failed to fetch Printful variants',
          details: data,
        },
        { status: res.status }
      )
    }

    const syncProduct = data?.result?.sync_product
    const syncVariants = data?.result?.sync_variants || []

    const variants = syncVariants.map((variant) => {
      const variantName = variant.name || ''
      const { color, size } = inferColorAndSize(variantName)

      return {
        syncVariantId: variant.id ?? null,
        printfulVariantId: variant.variant_id ?? null,
        externalId: variant.external_id ?? null,
        name: variantName,
        retailPrice: variant.retail_price ?? null,
        sku: variant.sku ?? null,
        synced: variant.synced ?? null,
        color,
        size,
      }
    })

    return NextResponse.json({
      ok: true,
      product: {
        id: syncProduct?.id ?? null,
        externalId: syncProduct?.external_id ?? null,
        name: syncProduct?.name ?? null,
      },
      count: variants.length,
      variants,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unexpected server error'

    return NextResponse.json(
      { ok: false, message },
      { status: 500 }
    )
  }
}