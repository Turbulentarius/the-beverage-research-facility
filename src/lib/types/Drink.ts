import { ChaoticCurrency } from '@/lib/types/ChaoticCurrency'

export interface Drink {
  idDrink: string
  strDrink: string
  strDrinkThumb: string
  price: ChaoticCurrency
  quantity: number
}