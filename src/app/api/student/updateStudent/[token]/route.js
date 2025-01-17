import { fetchWithCheck } from "@/helperFunctions/dataFetching";

export async function POST(request, { params }) {
  console.log("update student");
  try {
    const { token } = params;
    const requestData = await request.json();

    const data = await fetchWithCheck(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/Student/update/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...noCacheHeaders,
        },
        body: JSON.stringify(requestData),
      }
    );
    return new Response(JSON.stringify(data));
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
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
