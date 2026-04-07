// lib/printful/variant-map.ts

export type VariantKey = string

export type VariantMapValue = {
  syncVariantId: number
  retailPrice: number
  name: string
}

export const VARIANT_MAP: Record<VariantKey, VariantMapValue> = {
  // =========================
  // SIGNATURE TEE - BLACK
  // =========================
  'signature-tee:black:xs': { syncVariantId: 5253867490, retailPrice: 32, name: 'Stillwater Signature Tee' },
  'signature-tee:black:s': { syncVariantId: 5253867491, retailPrice: 32, name: 'Stillwater Signature Tee' },
  'signature-tee:black:m': { syncVariantId: 5253867492, retailPrice: 32, name: 'Stillwater Signature Tee' },
  'signature-tee:black:l': { syncVariantId: 5253867493, retailPrice: 32, name: 'Stillwater Signature Tee' },
  'signature-tee:black:xl': { syncVariantId: 5253867494, retailPrice: 32, name: 'Stillwater Signature Tee' },
  'signature-tee:black:2xl': { syncVariantId: 5253867495, retailPrice: 34, name: 'Stillwater Signature Tee' },

  // =========================
  // SIGNATURE TEE - NAVY
  // =========================
  'signature-tee:navy:xs': { syncVariantId: 5253867496, retailPrice: 32, name: 'Stillwater Signature Tee' },
  'signature-tee:navy:s': { syncVariantId: 5253867497, retailPrice: 32, name: 'Stillwater Signature Tee' },
  'signature-tee:navy:m': { syncVariantId: 5253867498, retailPrice: 32, name: 'Stillwater Signature Tee' },
  'signature-tee:navy:l': { syncVariantId: 5253867499, retailPrice: 32, name: 'Stillwater Signature Tee' },
  'signature-tee:navy:xl': { syncVariantId: 5253867500, retailPrice: 32, name: 'Stillwater Signature Tee' },
  'signature-tee:navy:2xl': { syncVariantId: 5253867501, retailPrice: 34, name: 'Stillwater Signature Tee' },

  // =========================
  // SIGNATURE TEE - WHITE
  // =========================
  'signature-tee:white:xs': { syncVariantId: 5253867502, retailPrice: 32, name: 'Stillwater Signature Tee' },
  'signature-tee:white:s': { syncVariantId: 5253867503, retailPrice: 32, name: 'Stillwater Signature Tee' },
  'signature-tee:white:m': { syncVariantId: 5253867504, retailPrice: 32, name: 'Stillwater Signature Tee' },
  'signature-tee:white:l': { syncVariantId: 5253867505, retailPrice: 32, name: 'Stillwater Signature Tee' },
  'signature-tee:white:xl': { syncVariantId: 5253867506, retailPrice: 32, name: 'Stillwater Signature Tee' },
  'signature-tee:white:2xl': { syncVariantId: 5253867507, retailPrice: 34, name: 'Stillwater Signature Tee' },

  // =========================
  // SIGNATURE LONG SLEEVE - BLACK HEATHER
  // =========================
  'long-sleeve:black-heather:xs': { syncVariantId: 5253867460, retailPrice: 34, name: 'Stillwater Signature Long Sleeve' },
  'long-sleeve:black-heather:s': { syncVariantId: 5253867461, retailPrice: 34, name: 'Stillwater Signature Long Sleeve' },
  'long-sleeve:black-heather:m': { syncVariantId: 5253867462, retailPrice: 34, name: 'Stillwater Signature Long Sleeve' },
  'long-sleeve:black-heather:l': { syncVariantId: 5253867463, retailPrice: 34, name: 'Stillwater Signature Long Sleeve' },
  'long-sleeve:black-heather:xl': { syncVariantId: 5253867464, retailPrice: 34, name: 'Stillwater Signature Long Sleeve' },
  'long-sleeve:black-heather:2xl': { syncVariantId: 5253867465, retailPrice: 36, name: 'Stillwater Signature Long Sleeve' },

  // =========================
  // SIGNATURE LONG SLEEVE - WHITE
  // =========================
  'long-sleeve:white:xs': { syncVariantId: 5253867466, retailPrice: 34, name: 'Stillwater Signature Long Sleeve' },
  'long-sleeve:white:s': { syncVariantId: 5253867467, retailPrice: 34, name: 'Stillwater Signature Long Sleeve' },
  'long-sleeve:white:m': { syncVariantId: 5253867468, retailPrice: 34, name: 'Stillwater Signature Long Sleeve' },
  'long-sleeve:white:l': { syncVariantId: 5253867469, retailPrice: 34, name: 'Stillwater Signature Long Sleeve' },
  'long-sleeve:white:xl': { syncVariantId: 5253867470, retailPrice: 34, name: 'Stillwater Signature Long Sleeve' },
  'long-sleeve:white:2xl': { syncVariantId: 5253867471, retailPrice: 36, name: 'Stillwater Signature Long Sleeve' },

  // =========================
  // PERFORMANCE TEE - BLACK
  // =========================
  'performance-tee:black:s': { syncVariantId: 5253867410, retailPrice: 32, name: 'Stillwater Performance Tee' },
  'performance-tee:black:m': { syncVariantId: 5253867411, retailPrice: 32, name: 'Stillwater Performance Tee' },
  'performance-tee:black:l': { syncVariantId: 5253867412, retailPrice: 32, name: 'Stillwater Performance Tee' },
  'performance-tee:black:xl': { syncVariantId: 5253867413, retailPrice: 32, name: 'Stillwater Performance Tee' },
  'performance-tee:black:2xl': { syncVariantId: 5253867414, retailPrice: 34, name: 'Stillwater Performance Tee' },

  // =========================
  // PERFORMANCE TEE - NAVY
  // =========================
  'performance-tee:navy:s': { syncVariantId: 5253867416, retailPrice: 32, name: 'Stillwater Performance Tee' },
  'performance-tee:navy:m': { syncVariantId: 5253867417, retailPrice: 32, name: 'Stillwater Performance Tee' },
  'performance-tee:navy:l': { syncVariantId: 5253867418, retailPrice: 32, name: 'Stillwater Performance Tee' },
  'performance-tee:navy:xl': { syncVariantId: 5253867419, retailPrice: 32, name: 'Stillwater Performance Tee' },
  'performance-tee:navy:2xl': { syncVariantId: 5253867420, retailPrice: 34, name: 'Stillwater Performance Tee' },

  // =========================
  // PERFORMANCE TEE - WHITE
  // =========================
  'performance-tee:white:s': { syncVariantId: 5253867421, retailPrice: 32, name: 'Stillwater Performance Tee' },
  'performance-tee:white:m': { syncVariantId: 5253867422, retailPrice: 32, name: 'Stillwater Performance Tee' },
  'performance-tee:white:l': { syncVariantId: 5253867423, retailPrice: 32, name: 'Stillwater Performance Tee' },
  'performance-tee:white:xl': { syncVariantId: 5253867424, retailPrice: 32, name: 'Stillwater Performance Tee' },
  'performance-tee:white:2xl': { syncVariantId: 5253867425, retailPrice: 34, name: 'Stillwater Performance Tee' },

  // =========================
  // ROPE CAP
  // NOTE: These reflect actual Printful variants
  // =========================
  'rope-cap:black-white:one-size': { syncVariantId: 5253867454, retailPrice: 32, name: 'Stillwater Signature Rope Cap' },
  'rope-cap:light-blue-white:one-size': { syncVariantId: 5253867455, retailPrice: 32, name: 'Stillwater Signature Rope Cap' },
  'rope-cap:white-black:one-size': { syncVariantId: 5253867456, retailPrice: 32, name: 'Stillwater Signature Rope Cap' },
}

export function buildVariantKey(product: string, color: string, size: string) {
  return `${product}:${color}:${size}`
}

export function getVariant(product: string, color: string, size: string) {
  const key = buildVariantKey(product, color, size)
  const variant = VARIANT_MAP[key]

  if (!variant) {
    throw new Error(`Variant not found: ${key}`)
  }

  return variant
}