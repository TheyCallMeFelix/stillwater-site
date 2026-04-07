/* app/printful-test/page.tsx */
'use client'

import { useState } from 'react'

type ApiResponse = {
  ok: boolean
  message?: string
  mode?: string
  orderId?: string | number
  create?: unknown
  confirm?: unknown
  details?: unknown
}

const PRODUCTS = [
  { label: 'Signature Tee', value: 'signature-tee' },
  { label: 'Performance Tee', value: 'performance-tee' },
  { label: 'Signature Long Sleeve', value: 'long-sleeve' },
  { label: 'Signature Rope Cap', value: 'rope-cap' },
]

const COLORS_BY_PRODUCT: Record<string, { label: string; value: string }[]> = {
  'signature-tee': [
    { label: 'Black', value: 'black' },
    { label: 'Navy', value: 'navy' },
    { label: 'White', value: 'white' },
  ],
  'performance-tee': [
    { label: 'Black', value: 'black' },
    { label: 'Navy', value: 'navy' },
    { label: 'White', value: 'white' },
  ],
  'long-sleeve': [
    { label: 'Black Heather', value: 'black-heather' },
    { label: 'White', value: 'white' },
  ],
  'rope-cap': [
    { label: 'Black / White', value: 'black-white' },
    { label: 'Light Blue / White', value: 'light-blue-white' },
    { label: 'White / Black', value: 'white-black' },
  ],
}

const SIZES_BY_PRODUCT: Record<string, { label: string; value: string }[]> = {
  'signature-tee': [
    { label: 'XS', value: 'xs' },
    { label: 'S', value: 's' },
    { label: 'M', value: 'm' },
    { label: 'L', value: 'l' },
    { label: 'XL', value: 'xl' },
    { label: '2XL', value: '2xl' },
  ],
  'performance-tee': [
    { label: 'S', value: 's' },
    { label: 'M', value: 'm' },
    { label: 'L', value: 'l' },
    { label: 'XL', value: 'xl' },
    { label: '2XL', value: '2xl' },
  ],
  'long-sleeve': [
    { label: 'XS', value: 'xs' },
    { label: 'S', value: 's' },
    { label: 'M', value: 'm' },
    { label: 'L', value: 'l' },
    { label: 'XL', value: 'xl' },
    { label: '2XL', value: '2xl' },
  ],
  'rope-cap': [{ label: 'One Size', value: 'one-size' }],
}

export default function PrintfulTestPage() {
  const [product, setProduct] = useState('signature-tee')
  const [color, setColor] = useState('black')
  const [size, setSize] = useState('m')
  const [quantity, setQuantity] = useState(1)
  const [confirm, setConfirm] = useState(false)

  const [name, setName] = useState('Phillip Segura')
  const [address1, setAddress1] = useState('123 Main St')
  const [address2, setAddress2] = useState('')
  const [city, setCity] = useState('St. John')
  const [stateCode, setStateCode] = useState('IN')
  const [zip, setZip] = useState('46373')
  const [countryCode, setCountryCode] = useState('US')
  const [email, setEmail] = useState('test@example.com')
  const [phone, setPhone] = useState('')

  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<ApiResponse | null>(null)

  const availableColors = COLORS_BY_PRODUCT[product] ?? []
  const availableSizes = SIZES_BY_PRODUCT[product] ?? []

  async function submitOrder() {
    setLoading(true)
    setResponse(null)

    try {
      const res = await fetch('/api/printful/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          external_id: `stillwater-test-${Date.now()}`,
          confirm,
          recipient: {
            name,
            address1,
            address2: address2 || undefined,
            city,
            state_code: stateCode,
            country_code: countryCode,
            zip,
            email,
            phone: phone || undefined,
          },
          order_items: [
            {
              product,
              color,
              size,
              quantity,
            },
          ],
        }),
      })

      const data = (await res.json()) as ApiResponse
      setResponse(data)
    } catch (error) {
      setResponse({
        ok: false,
        message: error instanceof Error ? error.message : 'Unexpected error',
      })
    } finally {
      setLoading(false)
    }
  }

  function handleProductChange(nextProduct: string) {
    setProduct(nextProduct)
    const nextColors = COLORS_BY_PRODUCT[nextProduct] ?? []
    const nextSizes = SIZES_BY_PRODUCT[nextProduct] ?? []
    setColor(nextColors[0]?.value ?? '')
    setSize(nextSizes[0]?.value ?? '')
  }

  return (
    <main className="min-h-screen bg-[#f6f6f4] px-6 py-12 text-[#111111]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
            Stillwater Co.
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Printful test order
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-neutral-600">
            Temporary internal page to test your Printful draft and confirmed
            order flow against your synced variant map.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-neutral-200 bg-white p-6">
            <h2 className="text-lg font-medium">Product</h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm text-neutral-600">
                  Product
                </span>
                <select
                  value={product}
                  onChange={(e) => handleProductChange(e.target.value)}
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm outline-none"
                >
                  {PRODUCTS.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-neutral-600">
                  Color
                </span>
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm outline-none"
                >
                  {availableColors.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-neutral-600">
                  Size
                </span>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm outline-none"
                >
                  {availableSizes.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-neutral-600">
                  Quantity
                </span>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value) || 1))
                  }
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm outline-none"
                />
              </label>
            </div>

            <label className="mt-5 flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm">
              <input
                type="checkbox"
                checked={confirm}
                onChange={(e) => setConfirm(e.target.checked)}
              />
              <span>
                Confirm order immediately
                <span className="ml-2 text-neutral-500">
                  (leave off for safer draft testing)
                </span>
              </span>
            </label>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6">
            <h2 className="text-lg font-medium">Recipient</h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm text-neutral-600">Name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm outline-none"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm text-neutral-600">
                  Address 1
                </span>
                <input
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm outline-none"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm text-neutral-600">
                  Address 2
                </span>
                <input
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-neutral-600">City</span>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-neutral-600">
                  State
                </span>
                <input
                  value={stateCode}
                  onChange={(e) => setStateCode(e.target.value)}
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-neutral-600">ZIP</span>
                <input
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-neutral-600">
                  Country
                </span>
                <input
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-neutral-600">Email</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-neutral-600">Phone</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm outline-none"
                />
              </label>
            </div>
          </section>
        </div>

        <div className="mt-6 rounded-3xl border border-neutral-200 bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium">Submit test order</h2>
              <p className="mt-1 text-sm text-neutral-600">
                Start with a draft order first. Once that works, test confirmed
                orders.
              </p>
            </div>

            <button
              type="button"
              onClick={submitOrder}
              disabled={loading}
              className="h-11 rounded-xl bg-black px-5 text-sm text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Submitting…' : 'Send test order'}
            </button>
          </div>

          <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
              Request preview
            </p>
            <pre className="overflow-auto text-xs text-neutral-700">
{JSON.stringify(
  {
    external_id: 'stillwater-test-...',
    confirm,
    recipient: {
      name,
      address1,
      address2: address2 || undefined,
      city,
      state_code: stateCode,
      country_code: countryCode,
      zip,
      email,
      phone: phone || undefined,
    },
    order_items: [
      {
        product,
        color,
        size,
        quantity,
      },
    ],
  },
  null,
  2
)}
            </pre>
          </div>

          <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
              API response
            </p>
            <pre className="overflow-auto text-xs text-neutral-700">
{response ? JSON.stringify(response, null, 2) : 'No response yet.'}
            </pre>
          </div>
        </div>
      </div>
    </main>
  )
}