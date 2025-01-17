import { fetchWithCheck, noCacheHeaders } from "@/helperFunctions/dataFetching";

export async function GET(request, { params }) {
  console.log("user course details");
  try {
    const { token } = params;
    const data = await fetchWithCheck(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/Home/details/${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...noCacheHeaders,
        },
      }
    );
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// if (response.headers.get("Content-Type").includes("application/json")) {
//   data = await response.json();
//   return new Response(JSON.stringify(data), {
//     status: response.ok ? 200 : 400,
//     headers: { "Content-Type": "application/json" },
//   });
// } else {
//   data = await response.text();
//   return new Response(data, {
//     status: response.ok ? 200 : 400,
//     headers: { "Content-Type": response.headers.get("Content-Type") },
//   });
// }
