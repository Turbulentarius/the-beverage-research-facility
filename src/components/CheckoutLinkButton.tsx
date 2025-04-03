'use client'

import React from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { usePathname } from 'next/navigation'

export default function CheckoutLinkButton () {
  const { cartItems, isCartOpen, toggleCart } = useCart()
  if (cartItems.length < 1) return null

  const pathname = usePathname()
  if (pathname === '/checkout') {
    return
  }

  return (
    <Link
      href={`/checkout`}
      className='text-white bg-green-500 hover:bg-green-400 mb-4 cursor-pointer font-medium rounded-sm text-sm px-2 py-1 text-center inline-flex items-center leading-none align-middle'
      onClick={isCartOpen ? toggleCart : () => null}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='size-6'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='m4.5 12.75 6 6 9-13.5'
        />
      </svg>
      Checkout
    </Link>
  )
}
