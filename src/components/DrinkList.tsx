import Image from 'next/image'
import Link from 'next/link'
import { getDrinks } from '@/lib/thecocktaildbApi'

// Note. We chould also inline this, but it's just more readable like this
interface Drink {
  idDrink: string
  strDrink: string
  strDrinkThumb: string
}

export default async function DrinkList () {
  const category = await getDrinks()

  return (
    <ul className='grid grid-flow-cols grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
      {category.drinks.map((drink: Drink) => (
        <li key={drink.idDrink}>
          <div className="relative">
            <div className='absolute z-1 inset-0 flex items-center justify-center bg-white/50'>
              <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-gray-400 border-solid'></div>
            </div>
            <div className="relative z-2">
            <Image
              className='w-full aspect-square mx-auto mt-4 mb-2 rounded-sm border-1 border-solid border-stone-100'
              width={220}
              height={220}
              src={`/api/thumb/${drink.idDrink}`}
              alt={drink.strDrink}
            />
            </div>
          </div>
          <div className='drop-shadow-xs'>
            <Link href={`/details/${drink.idDrink}`}>{drink.strDrink}</Link>
          </div>
        </li>
      ))}
    </ul>
  )
}
