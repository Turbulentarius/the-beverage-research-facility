import type { Metadata } from 'next'
import { CartProvider } from '@/context/CartContext'
import ChaoticLogo from '@/assets/chaotic-beverage-research-logo.svg'
import CartButton from '@/components/CartButton'
import CartNotifications from '@/components/CartNotifications'
import Cart from '@/components/Cart';
import './globals.css'
import { headFont, openSans } from '@/lib/fonts';

export const metadata: Metadata & { title: string; description: string } = {
  title: 'The Chaotic Beverage Research Facility',
  description: "We don't make drinks; we summon them."
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${openSans.className} antialiased`}>
        <CartProvider>
          <div className='w-[90%] mx-auto'>
            <header className='w-full max-w-[70rem] min-w-[320px] h-56 sm:h-40 mx-auto sm:flex sm:items-end my-4 p-4 bg-amber-300 rounded-sm text-gray-950'>
              <div className='siteLogo h-[70%] lg:h-full float-left sm:float-none'>
                <ChaoticLogo />
              </div>
              <div className='pb-4 float-left sm:float-none'>
                <div
                  className={`${headFont.className} text-xl lg:text-4xl px-4`}
                >
                  {metadata.title}
                </div>
                <div className='sm:px-4'>{metadata.description}</div>
              </div>
              <div className='sm:ml-auto clear-both'>
                <CartButton />
              </div>
            </header>
            <main className='w-full max-w-[70rem] min-w-[320px] mx-auto'>
              {children}
            </main>
          </div>
          <Cart />
          <CartNotifications />
        </CartProvider>
      </body>
    </html>
  )
}
