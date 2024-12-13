'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { ReactNode, Suspense, useEffect, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import { WalletButton } from '../solana/solana-provider'

export function UiLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md flex justify-between items-center py-4 px-8 border-b-4 border-[#03455B]">
  {/* Logo Section */}
  <div className="flex items-center space-x-4">
    <img src="/images/DAOlingo.png" alt="DAOlingo Logo" className="h-12" />
    <span className="text-2xl font-bold text-[#03455B]"></span>
  </div>

  {/* Wallet Button */}
  <div className="flex items-center space-x-6">
    <WalletButton className="bg-[#03455B] text-white py-2 px-6 rounded-full hover:bg-[#022F42] transition-colors duration-300 shadow-md" />
  </div>
</nav>


      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      <Toaster position="top-right" />
    </div>
  )
}
