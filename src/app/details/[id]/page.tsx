import { getDrinkById } from '@/lib/thecocktaildbApi'
import BuyButton from '@/components/BuyButton'
import Image from 'next/image'
import Link from 'next/link'

export default async function DrinkDetailPage ({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const drink = await getDrinkById(id)

  return (
    <>
      <Link
        href='/'
        className='text-l text-blue-600 hover:underline mb-4 inline-block'
      >
        ← Drinks
      </Link>
      <div className='flex flex-row-reverse gap-4'>
        <div className='bg-gray-100 rounded-sm px-4'>
          <h1 className='text-2xl font-bold mb-4'>{drink.strDrink}</h1>
          <Image
            className='w-full max-w-[20rem] aspect-square mt-4 my-4 rounded-sm border-1 border-solid border-stone-100'
            width={220}
            height={220}
            src={`/api/thumb/${drink.idDrink}`}
            alt={drink.strDrink}
          />
          <BuyButton drink={drink} />
        </div>
        <div className='w-full pt-8'>
          <p>{drink.strInstructions}</p>
        </div>
      </div>
    </>
  )
}
