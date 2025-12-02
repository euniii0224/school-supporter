'use client'

import Navbar from '@/components/navbar'
import './globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="font-sans bg-white text-gray-700">
        <Navbar />
        {/* Navbar 높이만큼 padding */}
        <main className="pt-20">{children}</main>
      </body>
    </html>
  )
}
