import type { Metadata } from 'next'
import { CartProvider } from '@/context/CartContext'
import ChaoticLogo from '@/assets/chaotic-beverage-research-logo.svg'
import CartButton from '@/components/CartButton'
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
            <header className='w-full max-w-[70rem] min-w-[400px] mx-auto flex items-end h-40 my-4 p-4 bg-amber-300 rounded-sm text-gray-950'>
              <div className='siteLogo h-full w-40'>
                <ChaoticLogo />
              </div>
              <div>
                <div
                  className={`${headFont.className} text-2xl 2xl:text-4xl px-4`}
                >
                  {metadata.title}
                </div>
                <div className='px-4'>{metadata.description}</div>
              </div>
              <div>
                <CartButton />
              </div>
            </header>
            <main className='w-full max-w-[70rem] min-w-[400px] mx-auto'>
              {children}
            </main>
          </div>
          <Cart />
        </CartProvider>
      </body>
    </html>
  )
}
