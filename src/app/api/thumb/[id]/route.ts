import { getImageByProductId } from "@/lib/thecocktaildbApi"
import { NextRequest, NextResponse } from "next/server"


{/*
Note.
            
I dislike proxying because it adds unnecessary overhead up front.
Instead of a single request for the image, we introduce three HTTP requests:
 - One for the proxy endpoint
 - One for the product details
 - One for the actual image (by our proxy at thumb/[id]/route.ts)

However, this overhead is mitigated by the following:
 - The Next.js <Image> component caches images locally
 - External image requests are only made once per size variant
 - If a CDN like Cloudflare is in front of the app, the proxy responses (e.g. /api/thumb/:id) will be cached at the edge
 - This means the image is effectively served as a static asset after the first request

In return, we gain full control over caching behavior, and the external API URL is completely hidden from the client.

*/}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const { buffer, contentType } = await getImageByProductId(id)
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, immutable, max-age=31536000", // Response will never change, don't revalidate (<Image> will obay this)
      },
    })
  } catch {
    return new NextResponse("Image not found", { status: 404 })
  }
}
