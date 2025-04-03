'use client'

import { useCart } from '@/context/CartContext'
import { useCartNotifications } from '@/context/CartNotificationsContext'
import { Drink } from '@/lib/types/Drink'

export default function BuyButton ({ drink }: { drink: Drink }) {
  const { addToCart, toggleCart } = useCart()
  const { addNotification } = useCartNotifications()

  // Add missing price. It's also missing on the API
  // so I just add this placeholder price to have something to test with
  drink.price = {
    currency: 'USD',
    gross: 0, // Including VAT
    net: priceFromId(drink.idDrink), // Excluding VAT
    vat: 25
  }
  // calculate gross (With VAT)
  drink.price.gross = drink.price.net * (drink.price.vat / 100 + 1)

  return (
    <>
      <div className='text-green-500'>
        {drink.price.gross} {drink.price.currency}
      </div>
      <button
        type='button'
        className='text-white bg-green-500 hover:bg-green-400 my-2 cursor-pointer font-medium rounded-sm text-sm p-2 text-center inline-flex items-center me-2 leading-none align-middle'
        onClick={() => {
          addToCart(drink)
          addNotification({
            notificationId: crypto.randomUUID(),
            msg: '+1 ' + ' ' + drink.strDrink,
            timestamp: new Date()
          })
        }}
      >
        <svg
          className='w-3.5 h-3.5 me-2'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 18 21'
        >
          <path d='M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z' />
        </svg>
        Buy
      </button>
    </>
  )
}

function priceFromId(id: string): number {
  const hash = [...id].reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return parseFloat(((hash % 12) + 10).toFixed(2)) // Between 10.00 and 21.99
}
