import { getDrinkById } from '@/lib/thecocktaildbApi'
import Image from 'next/image'
import Link from 'next/link'

export default async function DrinkDetailPage ({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const drink = await getDrinkById(id);

  return (
    <>
      <Link
        href='/'
        className='text-sm text-blue-600 hover:underline mb-4 inline-block'
      >
        ← Back to Drinks
      </Link>
      <h1 className='text-2xl font-bold mb-4'>{drink.strDrink}</h1>
      <div className='flex flex-wrap gap-4'>
        <div className='w-1/2'>
          <p>{drink.strInstructions}</p>
        </div>
        <div className='w-1/3'>
          <Image
            className='w-full max-w-[20rem] aspect-square mx-auto mt-4 mb-2 rounded-sm border-1 border-solid border-stone-100'
            width={220}
            height={220}
            src={`/api/thumb/${drink.idDrink}`}
            alt={drink.strDrink}
          />
        </div>
      </div>
    </>
  )
}
