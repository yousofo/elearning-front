import { fetchWithCheck, noCacheHeaders } from "@/helperFunctions/dataFetching";

export const fetchCache = "force-no-store";

export async function POST(request) {
  console.log("check discount");
  const requestData = await request.formData();

  try {
    const data =
      await fetchWithCheck(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/ViewsNow/CheckDiscount`,{
        method: "POST",
        body: requestData,
      });

    return new Response(JSON.stringify(data), {
      headers: {
        ...noCacheHeaders,
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        ...noCacheHeaders,
      },
    });
  }
}
