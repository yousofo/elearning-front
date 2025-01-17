"use client";
import React, { useEffect, useRef, useState } from "react";
import "./basket.css";
import { useDispatch, useSelector } from "react-redux";
import // toggleUpdateBasket,
// toggleUpdateBasketCount,
"@/components/GlobalState/Features/authSlice";
import { fetchUserBasket } from "@/components/GlobalState/Features/userData";
import { useParams, useRouter } from "next/navigation";
import { fetchWithCheck } from "@/helperFunctions/dataFetching";
import {
  closeLoader,
  openLoader,
  toggleSelectPaymentOptions,
} from "@/components/GlobalState/Features/popUpsSlice";
import Hero from "@/components/shared/hero/Hero";
import {
  handleValidateToken,
  isUserSignedIn,
} from "@/helperFunctions/signedInActions";
import { toast } from "react-toastify";
import { handlePayment } from "@/helperFunctions/payment";
import { checkDiscount } from "@/helperFunctions/payment";
import Link from "next/link";
import DiscountAccordion from "@/components/basket/discountAccordion/DiscountAccordion";
import BasketItem from "@/components/basket/basketItem/BasketItem";
import PaymentMethod from "@/components/basket/paymentMethod/PaymentMethod";

const Basket = () => {
  // all basket data
  const userBasket = useSelector((store) => store.userData.basket.data);
  const dispatch = useDispatch();
  const [toggleReFetch, setToggleReFetch] = useState(false);
  const agreeTerms = useRef(null);
  const [selected, setSelected] = useState(null);
  const discountCode = useRef(null);
  const currentCourseToken = useSelector(
    (store) => store.popUps.currentCourseToken
  );

  const userInfo = useSelector((store) => store.userData.info);
  console.log("user token", userInfo?.token);
  console.log(userBasket);
  const [codeDiscount, setCodeDiscount] = useState(0);
  const [discount, setDiscount] = useState(0);

  const router = useRouter();
  console.log(userBasket);
  async function handleFetchBasket() {
    dispatch(openLoader(""));

    await dispatch(fetchUserBasket()).unwrap();

    dispatch(closeLoader());
  }
  const allPaymentOptions = [
    {
      image: "/media/logos/payment/tamara.png",
      name: "Tamara",
      text: "ادفع باستخدام تمارا",
    },
    {
      image: "/media/logos/payment/master-card.png",
      name: "Mastercard",
      text: "الدفع المباشر عن طريق ماستر كارد",
    },
    {
      image: "/media/logos/payment/apple-pay.png",
      name: "Apple Pay",
      text: "ادفع عن طريق آبل باي ",
    },
    {
      image: "/media/logos/payment/mada-pay.jpg",
      name: "mada Pay",
      text: "الدفع المباشر عن طريق مدي",
    },
    {
      image: "/media/logos/payment/tabby-pay.png",
      name: "Tabby",
      text: "قسّمها على 4. بدون أي فوائد، أو رسوم",
    },
  ];

  //calculate all courses prices in basket
  let accumulatedBasketPrice = userBasket?.reduce((pre, cur) => {
    return +pre + +cur.coursePrice;
  }, 0);

  //calculate courses general discount
  let discountedBasketPrice = parseFloat(
    (
      accumulatedBasketPrice -
      (discount * accumulatedBasketPrice) / 100
    ).toFixed(2)
  );

  //calculate code discount
  let priceAfterCode = parseFloat(
    (
      discountedBasketPrice -
      (codeDiscount * discountedBasketPrice) / 100
    ).toFixed(2)
  );

  //calculate tax
  let addedValueTax = parseFloat((priceAfterCode * 0.15).toFixed(2));

  let finalPrice = priceAfterCode + addedValueTax;
  async function handleBasketPayment() {
    if (userBasket.length === 0) {
      toast.error("لا يوجد دورات في السلة");
      return;
    }
    if (!agreeTerms.current) {
      toast.error("يجب عليك الموافقة على الشروط");
      return;
    }

    await handlePayment(
      selected,
      userBasket,
      null,
      currentCourseToken,
      userInfo?.token,
      discountCode,
      router
    );

    return;
  }

  useEffect(() => {
    if (isUserSignedIn()) {
      handleFetchBasket();
    } else {
      router.replace("/");
      return;
    }
    // fetch discount
    fetchWithCheck(
      `/api/views/compareCourses?courseNumber=${userBasket.length}`,
      null,
      0
    ).then((result) => {
      setDiscount(result.discount);
      if (result.discount > 0) {
        toast.success(`تم تخفيض السعر بنسبة ${result.discount}%`);
      }
    });

    handleValidateToken().then((e) => {
      if (!e) {
        router.replace("/");
        return;
      }
    });
  }, [toggleReFetch]);

  return (
    <main className="pb-10 sm:pb-24 relative">
      {/* HERO start  */}
      <Hero>
        <h2 className="text-2xl font-medium md:text-4xl lg:text-5xl xl:text-6xl max-w-72 sm:max-w-fit">
          <span className="text-abad-gold whitespace-nowrap my-3 block">
            السلة
          </span>
          <p className="text-sm md:text-2xl font-normal leading-loose md:leading-10 lg:leading-[48px]">
            معهد شبكة آباد للتدريب من المعاهد الرائدة في تقديم الدورات التطويرية
            المتخصصة في تقنية المعلومات.
          </p>
        </h2>
      </Hero>
      {/* HERO end  */}
      {/* main content start */}
      <section className="basket relative z-[100] max-w-screen-xl mx-auto px-4 flex flex-col gap-3 sm:gap-4 -mt-40 sm:mt-0">
        {/* content & summary */}
        <div className="flex flex-col md:flex-row w-full gap-4">
          {/* basket contents & discount*/}
          <div className="order-2 md:order-1 flex flex-col flex-1 gap-4">
            {/* contents */}
            <div className="md:flex  flex-1  drop-shadow-abad  items-center justify-center overflow-y-auto relative">
              {userBasket.length > 0 ? (
                <div className="self-start md:absolute w-full md:h-full md:overflow-y-auto md:max-h-full sm:p-10 sm:py-2">
                  <table className="text-[#212529] ">
                    <thead className="hidden md:table-header-group w-full py-4 item-title justify-between">
                      <tr className="w-full flex sm:table-row">
                        <th>
                          <span>الصورة</span>
                        </th>
                        <th>
                          <span>اسم الدورة</span>
                        </th>
                        <th>
                          <span>السعر</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="flex flex-col gap-2 sm:table-row-group">
                      {userBasket?.map((e, i) => (
                        <BasketItem
                          reFetchBasket={setToggleReFetch}
                          data={e}
                          userToken={userInfo?.token}
                          key={i}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center text-[#212529] ">
                  لا يوجد دورات في السلة
                </div>
              )}
            </div>
            {/* discount */}
            <div className=" bg-white rounded  drop-shadow-abad w-full">
              <DiscountAccordion
                discountCode={discountCode}
                checkDiscount={() => checkDiscount(userBasket, discountCode)}
                setCodeDiscount={setCodeDiscount}
              />
            </div>
          </div>
          {/* basket summary & payment options */}
          <div className="order-1 md:order-2 flex-1 flex flex-col gap-3 md:gap-4">
            {/* summary */}
            <div className="px-4 py-2 bg-white rounded sm:p-6 sm:py-2 drop-shadow-abad">
              <table className="text-[#212529]">
                {/* <thead className="item-title">
                  <tr>
                    <th>
                      <span>المنتج</span>
                    </th>
                    <th>
                      <span style={{ paddingInlineStart: "0px" }}>المجموع</span>
                    </th>
                  </tr>
                </thead> */}
                <tbody>
                  <tr>
                    <td>المجموع</td>
                    <td className="!text-center">
                      {accumulatedBasketPrice} ريال
                    </td>
                  </tr>
                  {discount > 0 && (
                    <tr>
                      <td>قيمة الخصم</td>
                      <td className="!text-center">
                        - {discount * accumulatedBasketPrice} ريال
                      </td>
                    </tr>
                  )}
                  {codeDiscount > 0 && (
                    <tr>
                      <td>قيمة كود الخصم</td>
                      <td className="!text-center">
                        - {(codeDiscount / 100) * accumulatedBasketPrice} ريال
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td>ضريبة القيمة المضافة</td>
                    <td className="!text-center">+ {addedValueTax} ريال</td>
                  </tr>

                  <tr>
                    <td>الإجمالي</td>
                    <td className="!text-center">{finalPrice} ريال</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* payment options */}
            <div className="flex flex-col gap-1 px-4 py-2 bg-white rounded sm:p-6 sm:py-2 drop-shadow-abad">
              {allPaymentOptions.map((paymentOption, index) => (
                <PaymentMethod
                  setSelected={setSelected}
                  key={index}
                  paymentOption={paymentOption}
                />
              ))}
            </div>
          </div>
        </div>
        {/* terms & conditions */}
        <div className="flex items-center gap-2 sm:p-6 py-3 px-4 drop-shadow-abad">
          <input
            onChange={(e) => (agreeTerms.current = e.target.checked)}
            type="checkbox"
            name="agreeTerms"
            id=""
          />
          <p className="text-[#212529]">
            لقد قرأتُ<Link href="/privacy"> الشروط والأحكام </Link>وأوافق عليها
            لهذا الموقع
          </p>
        </div>
        {/* total value */}
        <div className="purchase p-2.5 py-4 rounded-lg sm:p-10 drop-shadow-abad-2  bg-white flex gap-3 sm:gap-6 flex-wrap justify-between items-center font-bold">
          <h3 className="text-[#221638] md:text-xl">الاجمالي</h3>
          <h3 className="text-[#1B45B4] text-xs md:text-xl">
            <bdi>
              {finalPrice}
              &nbsp; ريال سعودي
            </bdi>
          </h3>
          <button
            className="w-full p-4 rounded-[10px] text-white text-xs sm:text-lg"
            onClick={handleBasketPayment}
          >
            شراء الان
          </button>
        </div>
      </section>
      {/* main content end */}
    </main>
  );
};

export default Basket;
