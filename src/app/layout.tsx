import type { Metadata } from "next";
import "./globals.css";

import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-open-sans',
})

export const metadata: Metadata & { title: string; description: string } = {
  title: "The Chaotic Beverage Research Facility",
  description: "We don't make drinks; we summon them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} antialiased`}
      >
        <header className='w-screen max-w-[70rem] mx-auto'>
          <div>
          {metadata.title}
          </div>
        </header>
        <main className='w-screen max-w-[70rem] mx-auto'>
          {children}
        </main>
      </body>
    </html>
  );
}
