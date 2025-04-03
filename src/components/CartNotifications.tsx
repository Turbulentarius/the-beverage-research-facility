'use client'

import { useCartNotifications } from '@/context/CartNotificationsContext'

export default function CartNotifications () {
  const { cartNotifications } = useCartNotifications()

  return (
    <div className='fixed bottom-4 left-0 z-50 space-y-2 w-screen flex justify-center'>
      {cartNotifications.map(n => (
        <div
          key={`${n.notificationId}`}
          className='bg-green-100 text-gray-800 border border-green-300 px-4 py-2 rounded shadow'
        >
          <div className='font-medium'>{n.msg}</div>
        </div>
      ))}
    </div>
  )
}
