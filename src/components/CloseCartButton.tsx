'use client'

import { useCart } from '@/context/CartContext'

export default function CloseCartButton () {
  const { toggleCart } = useCart()

  return (
    <>
      <button
        type='button'
        className='text-white bg-black hover:bg-gray-800 mb-4 cursor-pointer font-medium rounded-sm text-sm px-2 py-2 text-center inline-flex items-center me-2'
        onClick={toggleCart}
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
            d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
          />
        </svg>
        Close cart
      </button>
    </>
  )
}
