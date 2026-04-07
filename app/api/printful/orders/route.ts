import { NextRequest, NextResponse } from 'next/server'
import { getVariant } from '@/lib/printful/variant-map'

const PRINTFUL_API_BASE = 'https://api.printful.com'

type Recipient = {
  name: string
  address1: string
  address2?: string
  city: string
  state_code?: string
  country_code: string
  zip: string
  email?: string
  phone?: string
}

type OrderItemInput = {
  product: string
  color: string
  size: string
  quantity: number
  external_id?: string
}

type CreateOrderBody = {
  external_id?: string
  recipient: Recipient
  order_items: OrderItemInput[]
}

function jsonError(message: string, status = 400, details?: unknown) {
  return NextResponse.json(
    { ok: false, message, details: details ?? null },
    { status }
  )
}

async function printfulFetch<T>(
  path: string,
  init?: RequestInit
): Promise<{ ok: boolean; status: number; data: T }> {
  const apiKey = process.env.PRINTFUL_API_KEY

  if (!apiKey) {
    throw new Error('Missing PRINTFUL_API_KEY')
  }

  const headers = new Headers(init?.headers || {})
  headers.set('Authorization', `Bearer ${apiKey}`)
  headers.set('Content-Type', 'application/json')

  const res = await fetch(`${PRINTFUL_API_BASE}${path}`, {
    ...init,
    headers,
    cache: 'no-store',
  })

  const data = await res.json()
  return { ok: res.ok, status: res.status, data }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CreateOrderBody
    const storeId = process.env.PRINTFUL_STORE_ID

    if (!storeId) {
      return jsonError('Missing PRINTFUL_STORE_ID', 500)
    }

    if (!body?.recipient) {
      return jsonError('Missing recipient')
    }

    if (!Array.isArray(body.order_items) || body.order_items.length === 0) {
      return jsonError('At least one order item is required')
    }

    const mappedItems = body.order_items.map((item) => {
      if (!item.product || !item.color || !item.size || !item.quantity) {
        throw new Error(
          'Each order item needs product, color, size, and quantity'
        )
      }

      const variant = getVariant(item.product, item.color, item.size)

      return {
        sync_variant_id: variant.syncVariantId,
        quantity: item.quantity,
        retail_price: variant.retailPrice.toFixed(2),
        external_id: item.external_id,
      }
    })

    const createPayload = {
      external_id: body.external_id,
      store_id: Number(storeId),
      recipient: body.recipient,
      items: mappedItems,
    }

    const created = await printfulFetch('/orders', {
      method: 'POST',
      body: JSON.stringify(createPayload),
    })

    if (!created.ok) {
      return jsonError(
        'Failed to create Printful order',
        created.status,
        created.data
      )
    }

    return NextResponse.json({
      ok: true,
      order: created.data,
    })
  } catch (error) {
    return jsonError(
      error instanceof Error ? error.message : 'Unexpected server error',
      500
    )
  }
}