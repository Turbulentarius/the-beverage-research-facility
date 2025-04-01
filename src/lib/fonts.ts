// More about fonts: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
import { Griffy, Open_Sans } from 'next/font/google'
export const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700']
})

export const headFont = Griffy({
  subsets: ['latin'],
  weight: '400'
})