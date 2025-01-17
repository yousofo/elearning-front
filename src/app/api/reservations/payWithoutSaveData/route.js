import { fetchWithCheck,noCacheHeaders } from "@/helperFunctions/dataFetching";
export const fetchCache = "force-no-store";

export async function POST(request) {
  console.log("Pay Without Save Data ");

  const requestData = await request.json();
  const dataToSend = new FormData();
  dataToSend.append("tokenCoursesList", requestData.tokenCoursesList);
  dataToSend.append("TokenStudent", requestData.TokenStudent);
  dataToSend.append("IsTamar", requestData.IsTamar);
  dataToSend.append("IsTabby", requestData.IsTabby);
  dataToSend.append("DiscountCode", requestData.DiscountCode);
  
  try {
    const responseData = await fetchWithCheck(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/Reservations/PayWithoutSaveData`,
      {
        method: "POST",
        body: dataToSend,
      }
    );
    
    return new Response(JSON.stringify(responseData), {
      headers: {
        ...noCacheHeaders,
      },
    });
  } catch (error) {
    console.log("==============================");
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        ...noCacheHeaders,
      },
    });
  }
}
