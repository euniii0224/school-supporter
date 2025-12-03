'use client'

import Navbar from '@/components/navbar'
import './globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { LibraryProvider } from './library/context/LibraryContext'
import type { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

config.autoAddCss = false

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="font-sans bg-white text-gray-700">
        <Navbar />

        {/* Navbar가 fixed일 때 가리는 문제 방지: Navbar 높이만큼 padding */}
        <main className="pt-20">
          <LibraryProvider>
            {children}
            <Toaster position="top-right" reverseOrder={false} />
          </LibraryProvider>
        </main>
      </body>
    </html>
  )
}
