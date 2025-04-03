'use client'

import React, { useEffect, useRef } from 'react'
import { useCart } from '@/context/CartContext'
import CartIsEmptyMsg from '@/components/CartIsEmptyMsg'
import ChaoticLogo from '@/assets/chaotic-beverage-research-logo.svg'
import { headFont, openSans } from '@/lib/fonts'
import ClearCartButton from '@/components/ClearCartButton'
import CloseCartButton from '@/components/CloseCartButton'
import Link from 'next/link'

const Cart = () => {
  // Access cart state in isCartOpen, cartItems contains the individual objects
  const { isCartOpen, toggleCart, clearCart, cartItems } = useCart()

  const cartRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
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
    } else {
      document.body.style.overflow = ''
    }

    // Cleanup event listeners when cart is closed
    return () => {
      document.removeEventListener('mousedown', () => {})
      document.removeEventListener('keydown', () => {})
    }
  }, [isCartOpen, toggleCart])

  // Don't render if cart is closed
  if (!isCartOpen) return

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
    <div className='absolute w-screen min-h-screen z-2 top-0 left-0 flex items-center justify-center backdrop-blur-xs'>
      <div
        ref={cartRef}
        className='bg-white shadow-lg px-2 z-3 py-1 w-full max-w-[70rem] max-h-screen rounded-sm'
      >
        <div className='h-28'>
          <div className='h-28 w-28 mx-auto'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6 h-full w-full'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
              />
            </svg>
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
        <ul className='space-y-2 overflow-y-scroll max-h-96'>
          {cartItems.map((item, index) => (
            <li
              key={index}
              className='border-b border-gray-300 pb-1 grid grid-flow-row-dense grid-cols-2'
            >
              <div className='col-end-2'>
                <div className='font-semibold'>
                  {item.strDrink}{' '}
                  <span className='text-sm'>x {item.quantity}</span>
                </div>
              </div>
              <div className='text-right'>
                <div>
                  {(item.price.gross * item.quantity).toFixed(2)}{' '}
                  {item.price.currency}
                </div>
                {item.price.gross !== item.price.gross * item.quantity ? (
                  <div>
                    {item.price.gross.toFixed(2)} {item.price.currency}{' '}
                    <span className='text-sm'>/ unit</span>
                  </div>
                ) : (
                  ' '
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className='w-56 grid grid-flow-row'>
          <h2 className='text-gray-950 text-xl mt-2 bg-amber-300 rounded-sm p-2'>
            Total:
          </h2>
          <div className='flex justify-between pt-2'>
            <span></span>
            <span className='text-red-500'>
              {currency} {grossTotal.toFixed(2)}
            </span>
          </div>
          <div className='flex justify-between pt-2'>
            <span>Excluding VAT</span>
            <span>{netTotal.toFixed(2)}</span>
          </div>
          <div className='flex justify-between pt-2 text-sm'>
            <span>VAT {vat}%</span>
            <span>{(grossTotal - netTotal).toFixed(2)}</span>
          </div>
          <div className='pt-4'>
            {cartItems.length > 0 ? (
              <Link
                href={`/checkout`}
                className='text-white bg-green-500 hover:bg-green-400 my-2 cursor-pointer font-medium rounded-sm text-sm px-2 py-1 text-center inline-flex items-center me-2'
                onClick={toggleCart}
              >
                Checkout
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='size-6 inline-block'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3'
                  />
                </svg>
              </Link>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className='flex flex-wrap justify-center'>
          <div>
            <ClearCartButton />
          </div>
          <div>
            <CloseCartButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
