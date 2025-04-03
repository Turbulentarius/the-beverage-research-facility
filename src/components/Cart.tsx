'use client'

import React, { useEffect, useRef } from 'react'
import { useCart } from '@/context/CartContext'
import CartIsEmptyMsg from '@/components/CartIsEmptyMsg'
import ChaoticLogo from '@/assets/chaotic-beverage-research-logo.svg'
import { headFont, openSans } from '@/lib/fonts'

const Cart = () => {
  // Access cart state in isCartOpen, cartItems contains the individual objects
  const { isCartOpen, toggleCart, cartItems } = useCart()

  const cartRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (isCartOpen) {
      document.addEventListener('mousedown', (event: MouseEvent) => {
        // If someone clicks outside the cart, close it
        // console.log(event.target)
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

  // Calculate total
  let grossTotal = 0
  let netTotal = 0
  let vat = 0
  let currency = ''
  if (cartItems.length > 0) {
    grossTotal = cartItems.reduce(
      (sum: number, item) => sum + item.price.gross * item.quantity,
      0
    )
    netTotal = cartItems.reduce(
      (sum: number, item) => sum + item.price.net * item.quantity,
      0
    )
    vat = cartItems[0].price.vat
    currency = cartItems[0].price.currency
  }

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
          <h2
            className={`${headFont.className} absolute px-3 text-2xl text-gray-900 -translate-x-1/2 bg-amber-300 left-1/2 rounded-sm`}
          >
            Cart
          </h2>
        </div>
        <CartIsEmptyMsg />
        <ul className='space-y-2'>
          {cartItems.map((item, index) => (
            <li
              key={index}
              className='border-b border-gray-300 pb-1 grid grid-flow-row-dense grid-cols-2'
            >
              <div className='col-end-2'>
                <div className='font-semibold'>{item.strDrink}</div>
                <div className='text-sm text-gray-700'>
                  Quantity: <b>{item.quantity}</b>
                </div>
              </div>
              <div className='text-right'>
                <div>
                  {item.price.gross} {item.price.currency}{' '}
                  <span className='text-sm'>/ unit</span>
                </div>
                <div>
                  {item.price.gross * item.quantity} {item.price.currency}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className='w-56 grid grid-flow-row text-red-500'>
          <h2 className='text-gray-950 text-xl mt-2 bg-amber-300 rounded-sm p-2'>Total:</h2>
          <div>
            {grossTotal} {currency}
          </div>
          <div className='text-gray-950 text-sm'>
            {netTotal} {currency} without VAT ({vat}%)
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
