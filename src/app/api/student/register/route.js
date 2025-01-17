import { fetchWithCheck } from "@/helperFunctions/dataFetching";

export const fetchCache = 'force-no-store';

export async function POST(request) {
  console.log("student register")
  try {

    const requestData = await request.json();
    const data = await fetchWithCheck(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/Student/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    },null,false);
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });


  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}