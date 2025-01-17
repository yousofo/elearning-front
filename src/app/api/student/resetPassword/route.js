import { fetchWithCheck } from "@/helperFunctions/dataFetching";

export async function GET(request) {
  console.log("reset pass")

  try {
    const { searchParams } = new URL(request.url);
    const mail = searchParams.get('mail');

    const data = await fetchWithCheck(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/Student/checkEmail?mail=${mail}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}