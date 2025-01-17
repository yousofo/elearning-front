import { fetchWithCheck,noCacheHeaders } from "@/helperFunctions/dataFetching";

export async function POST(request) {
  console.log("Reservations / add-offline-course");

  try {
    const requestData = await request.json();
    console.log(requestData)
    const data = await fetchWithCheck(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/Reservations/add-offline-course?TokenCourse=${requestData.courseToken}&TokenStudent=${requestData.userToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    return new Response(JSON.stringify(data), {
      headers: {
        ...noCacheHeaders,
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
