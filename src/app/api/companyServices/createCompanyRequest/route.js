import { noCacheHeaders } from '@/helperFunctions/dataFetching';
import fetch from 'node-fetch';

export const fetchCache = 'force-no-store';

export async function POST(request) {
  console.log("company services - create request")
  const formData = await request.formData()

  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/CompanySerives/create-company-request`, {
      method: "POST",
      body: formData
    })
    const result = await data.json()
    if (!data.ok) return new Response(JSON.stringify(result), { status: data.status })
    return new Response(JSON.stringify(result));

  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        ...noCacheHeaders
      }
    });
  }
}
