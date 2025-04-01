'use client'

import React, { useEffect, useRef } from 'react'
import { useCart } from '@/context/CartContext'
import ChaoticLogo from '@/assets/chaotic-beverage-research-logo.svg'
import { headFont, openSans } from '@/lib/fonts';

const Cart = () => {
  const { isCartOpen, toggleCart } = useCart() // Access cart state

  const cartRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (isCartOpen) {
      document.addEventListener('mousedown', (event: MouseEvent) => {
        // If someone clicks outside the cart, close it
        console.log(event.target)
        if (
          cartRef.current &&
          !cartRef.current.contains(event.target as Node)
        ) {
          toggleCart()
        } else {
          return null
        }
      })

      document.addEventListener('keydown', (event: KeyboardEvent) => {
        // Close the cart if ESC is pressed
        if (event.key === 'Escape') {
          toggleCart()
        }
      })
    }

    // Cleanup event listeners when cart is closed
    return () => {
      document.removeEventListener('mousedown', () => {})
      document.removeEventListener('keydown', () => {})
    }
  }, [isCartOpen, toggleCart])

  // Don't render if cart is closed
  if (!isCartOpen) return null

  return (
    <div className='fixed w-screen h-screen z-2 top-0 left-0 flex items-center justify-center'>
      <div
        ref={cartRef}
        className='bg-white shadow-lg px-2 z-3 py-1 w-full max-w-[70rem] h-full rounded-sm'
      >
        <div className='h-28'>
          <div className='siteLogo h-full w-40 mx-auto'>
            <ChaoticLogo />
          </div>
        </div>
        <div className='inline-flex items-center justify-center w-full'>
          <hr className='w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700' />
          <h2 className={`${headFont.className} absolute px-3 text-2xl text-gray-900 -translate-x-1/2 bg-amber-300 left-1/2 rounded-sm`}>Cart</h2>
        </div>
        
      </div>
    </div>
  )
}

export default Cart
