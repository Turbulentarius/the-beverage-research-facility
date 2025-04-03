'use client'

import React, { useEffect, useRef } from 'react'
import { useCart } from '@/context/CartContext'
import CartIsEmptyMsg from '@/components/CartIsEmptyMsg'
import ChaoticLogo from '@/assets/chaotic-beverage-research-logo.svg'
import { headFont, openSans } from '@/lib/fonts'

const Cart = () => {
  // Access cart state in isCartOpen, cartItems contains the individual objects
  const { isCartOpen, toggleCart, clearCart, cartItems } = useCart()

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
          <div className='siteLogo h-full w-fit mx-auto'>
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
          <h2 className='text-gray-950 text-xl mt-2 bg-amber-300 rounded-sm p-2'>
            Total:
          </h2>
          <div>
            {grossTotal} {currency}
          </div>
          <div className='text-gray-950 text-sm'>
            {netTotal} {currency} without VAT ({vat}%)
          </div>
          <div className="pt-4">
            <button
              type='button'
              className='text-white bg-black hover:bg-gray-800 mb-4 cursor-pointer font-medium rounded-sm text-sm px-2 py-2 text-center inline-flex items-center me-2'
              onClick={clearCart}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                />
              </svg>
              Clear cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
