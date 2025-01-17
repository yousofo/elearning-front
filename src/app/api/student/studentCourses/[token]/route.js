import { fetchWithCheck } from "@/helperFunctions/dataFetching";

export async function GET(request, { params }) {
  try {
    const { token } = params;
    console.log(token)
    const data = await fetchWithCheck(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/Home/basic/${token}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.log("error register")
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}