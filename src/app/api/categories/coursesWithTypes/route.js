import { fetchWithCheck,noCacheHeaders } from "@/helperFunctions/dataFetching";

export const fetchCache = 'force-no-store';

export async function GET(request) {
  try {
    const data = await fetchWithCheck(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/Category/GetAllCoursesWithType`)

    console.log("GetAllCoursesWithType ")

    return new Response(JSON.stringify(data),{
      headers: {
        "Content-Type": "application/json",
        ...noCacheHeaders
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
}
