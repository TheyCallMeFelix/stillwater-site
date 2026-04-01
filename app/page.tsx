/* app/page.tsx */
'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'

type ColorKey = 'navy' | 'black' | 'white'

type Product = {
  name: string
  subtitle: string
  defaultColor: ColorKey
  colors: Partial<Record<ColorKey, string>>
  badge?: string
}

/**
 * 🔥 IMPORTANT:
 * Replace this with your BEST image:
 * - Long sleeve
 * - Hat
 * - Dock / water / city blend
 */
const heroImage = '/images/marketing-photos/cityhero2.png'


const products: Product[] = [
  {
    name: 'All-Day Performance Tee',
    subtitle: 'Lightweight, breathable, built for movement',
    defaultColor: 'white',
    badge: 'Core',
    colors: {
      white: '/products/performance-tee/white-front.png',
      black: '/products/performance-tee/black-front.png',
      navy: '/products/performance-tee/navy-front.png',
    },
  },
  {
    name: 'Core Tee',
    subtitle: 'Soft structure for everyday wear',
    defaultColor: 'navy',
    colors: {
      white: '/products/core-tee/white-front.png',
      black: '/products/core-tee/black-frontleft.png',
      navy: '/products/core-tee/navy-front.png',
    },
  },
  {
    name: 'Long Sleeve',
    subtitle: 'Clean layer for early mornings & late evenings',
    defaultColor: 'white',
    badge: 'Recommended',
    colors: {
      white: '/products/long-sleeve/white-front.png',
      black: '/products/long-sleeve/black-front.png',
      navy: '/products/long-sleeve/navy-front.png',
    },
  },
  {
    name: 'Wave Cap',
    subtitle: 'Signature mark, everyday fit',
    defaultColor: 'navy',
    colors: {
      black: '/products/hat/black-front.png',
      navy: '/products/hat/navy-front.png',
      white: '/products/hat/white-front.png',
    },
  },
]

const colorMeta: Record<ColorKey, { label: string; swatchClass: string; ringClass?: string }> = {
  navy: { label: 'Navy', swatchClass: 'bg-[#203a67]' },
  black: { label: 'Black', swatchClass: 'bg-[#111111]' },
  white: {
    label: 'White',
    swatchClass: 'bg-white',
    ringClass: 'ring-1 ring-inset ring-neutral-300',
  },
}

function ProductCard({ product }: { product: Product }) {
  const availableColors = useMemo(
    () => Object.keys(product.colors) as ColorKey[],
    [product.colors]
  )

  const [selectedColor, setSelectedColor] = useState<ColorKey>(product.defaultColor)

  const activeImage =
    product.colors[selectedColor] || product.colors[product.defaultColor] || ''

  const activeLabel =
    colorMeta[selectedColor]?.label || colorMeta[product.defaultColor]?.label

  return (
    <div className="group overflow-hidden rounded-3xl border border-neutral-200 bg-[#fafaf8] transition hover:shadow-md">
      <div className="relative aspect-4/5 overflow-hidden bg-[#f2f2ef]">
        {activeImage ? (
          <Image
            src={activeImage}
            alt={`${product.name} in ${activeLabel}`}
            fill
            className="object-cover p-4 transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-400">
            Add render
          </div>
        )}

        {product.badge && (
          <div className="absolute left-4 top-4 rounded-full border border-neutral-200 bg-white/90 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-neutral-600">
            {product.badge}
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-base font-medium">{product.name}</h3>
        <p className="mt-1 text-sm text-neutral-500">{product.subtitle}</p>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
            {activeLabel}
          </p>

          <div className="flex gap-2">
            {availableColors.map((color) => {
              const meta = colorMeta[color]
              const isActive = selectedColor === color

              return (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`h-5 w-5 rounded-full ${meta.swatchClass} ${
                    meta.ringClass ?? ''
                  } ${
                    isActive
                      ? 'scale-110 ring-2 ring-black ring-offset-2'
                      : 'hover:scale-105'
                  }`}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f6f6f4] text-[#111111]">

      {/* HERO */}
      <section>
        <div className="mx-auto grid min-h-[88vh] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-neutral-500">
              Stillwater Co.
            </p>

            <h1 className="text-5xl font-semibold leading-[0.92] tracking-[-0.055em] sm:text-6xl md:text-7xl">
              Made to move through your day
              <br />
              and whatever comes next.
            </h1>

            <p className="mt-6 max-w-lg text-lg text-neutral-600">
              Clean, minimal pieces designed for everyday wear — from work, to water, 
              to wherever you end up next.
            </p>

            <form className="mt-10 flex max-w-md gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-12 flex-1 rounded-md border border-neutral-200 px-4 text-sm"
              />
              <button className="h-12 rounded-md bg-black px-6 text-white text-sm">
                Join drop
              </button>
            </form>

            <p className="mt-3 text-sm text-neutral-500">No spam. Just the drop.</p>
          </div>

          <div className="relative">
            <div className="aspect-4/5 overflow-hidden rounded-4xl bg-[#ececeb]">
              <Image
                src={heroImage}
                alt="Stillwater hero"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-2xl font-semibold mb-10">
            First drop essentials
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.name} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-4xl font-semibold tracking-tight">
              Everyday wear, built differently.
            </h2>

            <p className="mt-6 text-lg text-neutral-600 max-w-lg">
              It&apos;s Not gear. Not streetwear.
              <br /><br />
              Just clean pieces that move with you.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="px-4 py-2 border rounded-full">Minimal</span>
              <span className="px-4 py-2 border rounded-full">Versatile</span>
              <span className="px-4 py-2 border rounded-full">Lightweight</span>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-neutral-200 text-center py-20">
        <h2 className="text-3xl font-semibold">
          First drop launching soon.
        </h2>

        <form className="mt-8 flex justify-center gap-3">
          <input
            placeholder="Email address"
            className="h-12 px-4 border rounded-md"
          />
          <button className="h-12 px-6 bg-black text-white rounded-md">
            Notify me
          </button>
        </form>
      </section>

    </main>
  )
}