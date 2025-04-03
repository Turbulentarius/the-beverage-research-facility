'use client'

// Solution: I moved the handling of notifications to this separate CartNotificationsContext, and additionally added a
//           (fresh.length === prev.length) optimization to
//           avoid triggering constant re-evaluation of consumer components (users of CartNotificationsContext) elsewhere.
//           E.g., React doesn't even have to do virtual DOM diffing unless a notification is added.
//
// This should theoretically result in less battery drain on users' devices.
// The added if() optimization replaces a more expensive virtual DOM diff with a single, simple if statement.

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from 'react'

interface CartNotificationsContextType {
  cartNotifications: CartNotification[]
  addNotification: (notification: CartNotification) => void
}

interface CartNotification {
  notificationId: string
  idDrink: string
  msg: string
  timestamp: Date
}

const CartNotificationsContext = createContext<
  CartNotificationsContextType | undefined
>(undefined)

export const useCartNotifications = (): CartNotificationsContextType => {
  const context = useContext(CartNotificationsContext)
  if (!context) {
    throw new Error('useCart must be used within a CartNotificationsProvider')
  }
  return context
}

interface CartNotificationsProviderProps {
  children: ReactNode
}

export const CartNotificationsProvider = ({
  children
}: CartNotificationsProviderProps) => {
  const [cartNotifications, setCartNotifications] = useState<
    CartNotification[]
  >([])

  const addNotification = (notification: CartNotification) => {
    setCartNotifications(prev => [...prev, notification])
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      setCartNotifications(prev => {
        const fresh = prev.filter(
          n => now - new Date(n.timestamp).getTime() < 2500
        )

        // Check if the previous CartNotifications array changed length
        // Note. This is needed to avoid re-rendering in consumers of the CartNotificationsContext
        if (fresh.length === prev.length) {
          return prev // avoid triggering re-render
        }
        return fresh
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  // The children is fetched from the layout.tsx, so it's extremely convoluted.
  return (
    <CartNotificationsContext.Provider
      value={{
        cartNotifications,
        addNotification
      }}
    >
      {children}
    </CartNotificationsContext.Provider>
  )
}
