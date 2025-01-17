import { fetchWithCheck, noCacheHeaders } from "@/helperFunctions/dataFetching";

export const fetchCache = "force-no-store";

export async function GET(request) {
  console.log("course by name");
  try {
    const url = new URL(request.url);
    const courseName = url.searchParams.get("courseName");
    const data = await fetchWithCheck(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/Home/getByName?courseName=${courseName}`
    );

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        ...noCacheHeaders,
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 402,
      headers: { "Content-Type": "application/json" },
    });
  }
}
