'use client'

import { useCartNotifications } from '@/context/CartNotificationsContext'

export default function CartNotifications () {
  const { cartNotifications } = useCartNotifications()

  return (
    <div className='fixed top-4 right-4 z-50 space-y-2'>
      {cartNotifications.map(n => (
        <div
          key={`${n.idDrink}-${n.timestamp}`}
          className='bg-green-100 text-gray-800 border border-green-300 px-4 py-2 rounded shadow'
        >
          <div className='font-medium'>{n.msg}</div>
        </div>
      ))}
    </div>
  )
}
