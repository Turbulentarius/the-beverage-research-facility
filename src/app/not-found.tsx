"use client"

import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function NotFound () {
  const pathname = usePathname()

  return (
    <>
      {' '}
      <Link
        href='/'
        className='text-l text-blue-600 hover:underline mb-4 inline-block'
      >
        ← Drinks
      </Link>
      <div className='p-10 text-center'>
        <h1 className='text-4xl font-bold'>
          404 – This page eludes all mortals
        </h1>
        <p className='mt-4'>
          Adventurer, your destination <code>{pathname}</code> lies elsewhere. Perhaps a mischievous imp
          moved it?
          <span className='block mt-2 text-sm text-gray-500 italic'>
            (Our legal team says the imp acted alone. We remain unconvinced.)
          </span>
        </p>
      </div>
    </>
  )
}
