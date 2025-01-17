import { fetchWithCheck } from "@/helperFunctions/dataFetching";

export async function POST(request) {
  console.log("student login==============================")
  try {
    const requestData = await request.json();

    const data = await fetchWithCheck(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/Student/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData)
    });

    return new Response(JSON.stringify(data), {
      status: 200,
    });

  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
}