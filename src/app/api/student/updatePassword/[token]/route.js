import { fetchWithCheck, noCacheHeaders } from "@/helperFunctions/dataFetching";

export async function POST(request, { params }) {
  console.log("register");

  try {
    const requestData = await request.json();

    const data = await fetchWithCheck(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/Student/update-password/${params.token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...noCacheHeaders,
        },
        body: JSON.stringify(requestData),
      }
    );

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 402,
      headers: { "Content-Type": "application/json" },
    });
  }
}
