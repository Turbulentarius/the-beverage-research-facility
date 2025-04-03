'use client'

import { useCart } from '@/context/CartContext'
import CartIsEmptyMsg from '@/components/CartIsEmptyMsg'
import Link from 'next/link'

export default function CheckoutPage () {
  const { cartItems, clearCart } = useCart()

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
    <>
      <Link
        href='/'
        className='text-l text-blue-600 hover:underline mb-4 inline-block'
      >
        ← Drinks
      </Link>
      <div className='mx-auto p-4 bg-white rounded shadow'>
        <h1 className='text-2xl font-semibold mb-4'>Checkout</h1>
        <CartIsEmptyMsg />
        <ul className='space-y-2 mb-4'>
          {cartItems.map(item => (
            <li
              key={item.idDrink}
              className='flex border-t border-gray-300 justify-between text-right'
            >
              <span>
                {item.strDrink} × {item.quantity}
              </span>
              <span>
                {(item.price.gross * item.quantity).toFixed(2)}
                {item.price.gross !== item.price.gross * item.quantity ? (
                  <span className='text-sm block'>
                    {item.price.gross.toFixed(2)} / unit
                  </span>
                ) : (
                  ''
                )}
              </span>
            </li>
          ))}
        </ul>
        <div className='flex justify-between border-t pt-2'>
          <span>Total</span>
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
        {cartItems.length > 0 ? (
          <Link
            href={`/payment`}
            className='text-white bg-green-500 hover:bg-green-400 my-2 cursor-pointer font-medium rounded-sm text-sm px-2 py-1 text-center inline-flex items-center me-2'
            onClick={clearCart}
          >
            Payment
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
    </>
  )
}
