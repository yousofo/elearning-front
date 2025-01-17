import { fetchWithCheck, noCacheHeaders } from "@/helperFunctions/dataFetching";

export const fetchCache = "force-no-store";

export async function GET(request) {
  console.log("courses categories");
  try {
    const data = await fetchWithCheck(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/Category/courses-types`
    );

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
