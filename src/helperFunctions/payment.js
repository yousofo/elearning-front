import { toast } from "react-toastify";
import { fetchWithCheck } from "./dataFetching";
import { store } from "@/components/GlobalState/store";
import { closeLoader, openLoader } from "@/components/GlobalState/Features/popUpsSlice";

export async function checkDiscount(userBasket, discountCode) {
  const formDataForDiscount = new FormData();
  let coursesLength;

  if (window.location.pathname == "/basket") {
    coursesLength = userBasket.length;
  } else {
    coursesLength = 1;
  }
  
  formDataForDiscount.append("discountCode", discountCode.current.value);
  formDataForDiscount.append("numberOfCourses", coursesLength);

  try {
    const result = await fetchWithCheck(`/api/views/checkDiscount`, {
      method: "POST",
      body: formDataForDiscount,
    });
    console.log(result)
    if (result.isDiscountApplicable) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    return result
  } catch (error) {
    console.log(error);
  }
}


export async function handlePayment(selected,userBasket,token,currentCourseToken,TokenStudent,discountCode,router) {
  console.log(
    userBasket
  )
  if (!selected) {
    toast.error("يرجى تحديد طريقة الدفع");
    return;
  }

  store.dispatch(openLoader("جاري الدفع"));

  let tokenCoursesList;

  if (window.location.pathname == "/basket") {
    tokenCoursesList = userBasket.map(e=>e.coursesSchedulestoken);
  } else {
    tokenCoursesList = [token || currentCourseToken];
  }

  console.log({
    tokenCoursesList,
    TokenStudent,
    IsTamar: selected == "Tamara",
    IsTabby: selected == "Tabby",
    DiscountCode: discountCode.current.value,
  });

  try {
    const result = await fetchWithCheck(
      `/api/reservations/payWithoutSaveData`,
      {
        method: "POST",
        body: JSON.stringify({
          tokenCoursesList,
          TokenStudent,
          IsTamar: selected == "Tamara",
          IsTabby: selected == "Tabby",
          DiscountCode: discountCode.current.value,
        }),
      }
    );
    console.log(result);
    toast.success(result.message);

    router.push(result.redirect_url);
  } catch (error) {
    toast.error(error.error);
    console.log(error);
  } finally {
    store.dispatch(closeLoader());
  }
}
