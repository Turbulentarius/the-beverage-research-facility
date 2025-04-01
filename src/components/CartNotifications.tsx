'use client'

import { useCart } from '@/context/CartContext'
import { useEffect, useState } from 'react'

export default function CartNotifications() {
  const { cartNotifications } = useCart()
  const [visibleNotifications, setVisibleNotifications] = useState<typeof cartNotifications>([])

  useEffect(() => {
    if (cartNotifications.length === 0) return
  
    const latest = cartNotifications[cartNotifications.length - 1]
  
    setVisibleNotifications([latest])
  
    const timer = setTimeout(() => {
      setVisibleNotifications([])
    }, 1500)
  
    return () => clearTimeout(timer)
  }, [cartNotifications])
  

  return (
    <div className='fixed top-4 right-4 z-50 space-y-2'>
      {visibleNotifications.map(n => (
        <div
          key={n.idDrink}
          className='bg-green-100 text-gray-800 border border-green-300 px-4 py-2 rounded shadow'
        >
          <div className='font-medium'>{n.msg} ({n.quantity})</div>
          <div className='text-xs text-gray-600 pt-2'>
            {n.timestamp.toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
