import { getDrinks } from "@/lib/thecocktaildbApi"
import { NextResponse } from "next/server"

export async function GET() {
  const data = await getDrinks()
  return NextResponse.json(data)
}
