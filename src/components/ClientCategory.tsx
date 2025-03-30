"use client"

// This is a client-only component. Unfortunately, it only works on the client by default.
// However, it still demonstrates how I can dynamically fetch data from my internal API endpoint.
// This approach avoids exposing the external API directly to the browser.


import { useEffect, useState } from "react"

export default function ClientCategory() {
  const [category, setCategory] = useState(null)

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then(setCategory)
  }, [])

  return (
    <pre>{JSON.stringify(category, null, 2)}</pre>
  )
}
