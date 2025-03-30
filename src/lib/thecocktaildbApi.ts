export async function getDrinks() {
  const res = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic", {
    next: { revalidate: 3600 } // Let's avoid spamming the API
  })
  return res.json()
}

export async function getDrinkById(id: string) {
  const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
  const data = await res.json()
  return data.drinks?.[0] ?? null
}
export async function getImageByProductId(id: string): Promise<{
  buffer: ArrayBuffer
  contentType: string
}> {
  const drink = await getDrinkById(id)

  if (!drink || !drink.strDrinkThumb) {
    throw new Error("Drink or image not found")
  }

  const res = await fetch(drink.strDrinkThumb)

  if (!res.ok) {
    throw new Error(`Failed to fetch image for ID ${id}`)
  }

  const contentType = res.headers.get("content-type") || "image/jpeg"
  const buffer = await res.arrayBuffer()

  return {
    buffer,
    contentType,
  }
}
