/* app/api/printful/products/route.ts */
import { NextResponse } from 'next/server'

const PRINTFUL_API = 'https://api.printful.com'

type PrintfulProduct = {
  id?: number
  external_id?: string
  name?: string
  thumbnail_url?: string
  variants?: number
  synced?: number
}

type PrintfulSyncProductResponse = {
  code?: number
  result?: PrintfulProduct[]
  error?: { reason?: string; message?: string }
}

export async function GET() {
  const apiKey = process.env.PRINTFUL_API_KEY
  const storeId = process.env.PRINTFUL_STORE_ID

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

  try {
    const res = await fetch(`${PRINTFUL_API}/store/products`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'X-PF-Store-Id': storeId,
      },
      cache: 'no-store',
    })

    const data = (await res.json()) as PrintfulSyncProductResponse

    if (!res.ok) {
      return NextResponse.json(
        {
          ok: false,
          message: data?.error?.message || 'Failed to fetch Printful products',
          details: data,
        },
        { status: res.status }
      )
    }

    const products =
      (data?.result || []).map((item) => ({
        id: item.id ?? null,
        externalId: item.external_id ?? null,
        name: item.name ?? 'Untitled product',
        thumbnailUrl: item.thumbnail_url ?? null,
        variants: item.variants ?? 0,
        synced: item.synced ?? 0,
      })) || []

    return NextResponse.json({
      ok: true,
      count: products.length,
      products,
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