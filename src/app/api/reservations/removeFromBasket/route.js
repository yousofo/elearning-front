import { fetchWithCheck,noCacheHeaders } from "@/helperFunctions/dataFetching";

export async function DELETE(request) {
  try {
    const url = new URL(request.url)
    const tokenBasket = url.searchParams.get("tokenBasket")
    
    const data = await fetchWithCheck(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/Reservations/RemoveFromBasket?tokenBasket=${tokenBasket}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        ...noCacheHeaders
      }
    })


    return new Response(JSON.stringify(data), {
      headers: {
        ...noCacheHeaders
      }
    });

  } catch (error) {
    return new Response(JSON.stringify(error), {
      headers: {
       ...noCacheHeaders
      }
    })
  }
}