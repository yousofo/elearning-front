import { fetchWithCheck } from "@/helperFunctions/dataFetching";

export async function POST(request) {
  console.log("student - new password")

  try {
    const jsonData = await request.json()
    const data = await fetchWithCheck(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/Student/newPassword`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData)
    });

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.log("error register")
    return new Response(JSON.stringify(error), {
      status: 402,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}