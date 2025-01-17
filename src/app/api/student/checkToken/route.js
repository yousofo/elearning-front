import { fetchWithCheck, noCacheHeaders } from "@/helperFunctions/dataFetching";

export async function GET(request) {
  console.log("student check token");

  const requestURL = new URL(request.url);

  const token = requestURL.searchParams.get("token");

  try {
    const data = await fetchWithCheck(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/Student/checkToken?token=${token}`
    );

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        ...noCacheHeaders,
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
      ...noCacheHeaders,
    });
  }
}
