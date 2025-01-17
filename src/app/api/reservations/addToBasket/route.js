import { fetchWithCheck,noCacheHeaders } from "@/helperFunctions/dataFetching";

export async function POST(request) {
  try {
    const url = new URL(request.url)
    const tokenStudent = url.searchParams.get("tokenStudent")
    const tokenCourse = url.searchParams.get("tokenCourse")

    const data = await fetchWithCheck(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/Reservations/AddToBasket?tokenCourse=${tokenCourse}&tokenStudent=${tokenStudent}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return new Response(JSON.stringify(data), {
      headers: {
        ...noCacheHeaders
      },
    });

  } catch (error) {
    console.log("error adding to basket")

    return new Response(JSON.stringify(error), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}