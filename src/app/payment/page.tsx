'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const excuses = [
  'The last intern to open it is still vibrating.',
  'The fridge started hissing when we approached.',
  "Access requires clearance level 'Sippy Cup Ultra', which you do not have.",
  'We lost the key in an incident involving temporal mustard.',
  'Opening the fridge triggers the summoning of Brenda. We don’t talk about Brenda.',
  'A mysterious fog began leaking out. We’ll wait, thanks.',
  'The imp union has forbidden unscheduled openings.',
  'It’s currently being used to chill an unstable potion.',
  'The fridge demanded tribute. We’re negotiating.',
  'Management insists it’s just a broom closet. It isn’t.'
]

export default function ForbiddenFridgePage () {
  const [excuse, setExcuse] = useState<string>('')

  useEffect(() => {
    const i = Math.floor(Math.random() * excuses.length)
    setExcuse(excuses[i])
  }, [])

  return (
    <>
      <Link
        href='/'
        className='text-l text-blue-600 hover:underline mb-4 inline-block'
      >
        ← Drinks
      </Link>
      <div className='min-h-screen justify-center text-center p-10 bg-gray-50'>
        <h1 className='text-5xl font-extrabold mb-4'>🚫 Access Denied</h1>
        <h2 className='text-2xl font-semibold mb-2'>
          The Forbidden Fridge cannot be opened.
        </h2>
        <p className='text-lg text-gray-700 italic'>{excuse}</p>

        <button
          onClick={() =>
            setExcuse(excuses[Math.floor(Math.random() * excuses.length)])
          }
          className='mt-6 px-5 py-2 rounded-lg bg-black text-white hover:bg-gray-800 cursor-pointer'
        >
          Attempt to open anyway
        </button>
      </div>
    </>
  )
}
