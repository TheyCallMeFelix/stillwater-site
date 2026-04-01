import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Stillwater Co.',
  description: 'Minimal by nature.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}