import { fetchWithCheck, noCacheHeaders } from "@/helperFunctions/dataFetching";

export async function POST(request) {
  try {
    const requestData = await request.json();

    const data = await fetchWithCheck(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/Subscriptions/subscribe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    return new Response(JSON.stringify(data), {
      headers: {
        ...noCacheHeaders,
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        ...noCacheHeaders,
      },
    });
  }
}
