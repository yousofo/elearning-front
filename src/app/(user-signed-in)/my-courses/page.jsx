"use client";
import React, { useEffect, useState } from "react";
import "./my-courses.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  closeLoader,
  openLoader,
  togglePaymentConfirmation,
} from "@/components/GlobalState/Features/popUpsSlice";
import { fetchWithCheck } from "@/helperFunctions/dataFetching";
import Hero from "@/components/shared/hero/Hero";
import { fetchCheckToken } from "@/helperFunctions/auth";
import { handleValidateToken, isUserSignedIn } from "@/helperFunctions/signedInActions";

async function FetchStudentCourses(token) {
  try {
    const data = await fetchWithCheck(
      `/api/student/studentCourses/${token}`,
      null,
      []
    );
    return data;
  } catch (e) {
    console.log("student courses");
    console.log(e);
  }
}
const MyCourses = () => {
  const userInfo = useSelector((store) => store.userData.info);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  let router = useRouter();
  console.log(data)
  useEffect(() => {
    dispatch(openLoader(""));
    const url = new URL(window?.location);

    switch (url.searchParams.get("status")) {
      case "success":
        dispatch(
          togglePaymentConfirmation({
            text: "تم الشراء بنجاح",
            status: "success",
          })
        );
        break;
      case "failure":
        dispatch(
          togglePaymentConfirmation({
            text: url.searchParams.get("error") || "حدث خطأ في عملية الشراء",
            status: "failure",
          })
        );
        break;
      case "failed":
        dispatch(
          togglePaymentConfirmation({
            text: url.searchParams.get("error") || "حدث خطأ في عملية الشراء",
            status: "failed",
          })
        );
        break;
      default:
        break;
    }

    if (!isUserSignedIn()) {
      router.replace("/");
      return;
    } else {
      FetchStudentCourses(userInfo.token)
        .then((e) => {
          console.log("fetched");
          console.log(e);
          setData(e);
        })
        .catch((e) => console.log(e))
        .finally(() => dispatch(closeLoader()));
    }

    handleValidateToken().then((e) => {
      if (!e) {
        router.replace("/");
        return;
      }
    });
  }, []);

  return (
    <main className="pb-10 sm:pb-24">
      {/* HERO start  */}
      <Hero>
        <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl xl:text-6xl max-w-60 sm:max-w-fit">
          <span className="text-abad-gold whitespace-nowrap">دوراتي</span>
        </h2>
      </Hero>
      {/* HERO end  */}
      {/* main content start */}
      <section className="my-courses flex flex-col gap-4 sm:gap-6 max-w-screen-xl mx-auto px-4">
        {data.length > 0 ? (
          data.map((e, i) => (
            <div className="course" key={i}>
              <div className="info">
                <img
                  className="max-w-20 md:max-w-fit"
                  src="/media/placeholders/my-courses-item.png"
                  alt=""
                />
                <div className="details">
                  <div className="flex gap-2 flex-col sm:flex-row">
                    <h4
                      className="text-[#3F3E43] text-sm sm:text-lg font-bold order-3 md:order-1"
                      dir="rtl"
                    >
                      <bdi>{e.courseName}</bdi>
                    </h4>
                    <div className="flex items-center order-2">
                      <div className="flex items-center gap-0.5">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mb-1"
                        >
                          <path
                            d="M7.5 13.125C10.6066 13.125 13.125 10.6066 13.125 7.5C13.125 4.3934 10.6066 1.875 7.5 1.875C4.3934 1.875 1.875 4.3934 1.875 7.5C1.875 10.6066 4.3934 13.125 7.5 13.125Z"
                            fill="#008000"
                          />
                        </svg>
                        <span className="text-[#008000] text-[10px] md:text-base">
                          أونلاين
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 items-center">
                    <svg
                      width="19"
                      height="18"
                      className="w-[14px] sm:w-[19px] h-[13px] sm:h-[18px]"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.40625 9.00008C1.40625 4.74289 5.02995 1.29175 9.5 1.29175C13.9701 1.29175 17.5937 4.74289 17.5937 9.00008C17.5937 13.2573 13.9701 16.7084 9.5 16.7084C5.02995 16.7084 1.40625 13.2573 1.40625 9.00008ZM9.5 0.041748C4.30507 0.041748 0.09375 4.05253 0.09375 9.00008C0.09375 13.9476 4.30507 17.9584 9.5 17.9584C14.6949 17.9584 18.9062 13.9476 18.9062 9.00008C18.9062 4.05253 14.6949 0.041748 9.5 0.041748ZM9.49858 3.37506C9.13615 3.37506 8.84233 3.65488 8.84233 4.00006V7.45455C8.20099 7.70179 7.74858 8.30061 7.74858 9.00006C7.74858 9.92054 8.53208 10.6667 9.49858 10.6667C10.4651 10.6667 11.2486 9.92054 11.2486 9.00006C11.2486 8.30061 10.7962 7.70179 10.1548 7.45455V4.00006C10.1548 3.65488 9.86102 3.37506 9.49858 3.37506Z"
                        fill="#F178B6"
                      />
                    </svg>
                    <h5 className="text-[#3F3E43] flex items-center gap-1 text-xs sm:text-lg">
                      <span>{e.schedule}</span>
                      <span>-</span>
                      <span>{e.periodDays}</span>
                    </h5>
                  </div>
                  <p
                    className="text-[#8A8394] text-xs"
                    dangerouslySetInnerHTML={{ __html: e.summary }}
                  />
                </div>
              </div>
              <Link
                href={`/my-courses/${e.token}`}
                className="bg-abad-gold py-3 px-6 text-[11px] md:text-base font-medium rounded-2xl w-full text-center sm:w-max h-fit"
              >
                الدخول الي الدورة
              </Link>
            </div>
          ))
        ) : (
          <div className="flex justify-center flex-col items-center gap-4">
            <img
              className="w-36 h-36"
              src="/media/placeholders/sad-user.png"
              alt=""
            />
            <p className="text-gray-600">لا توجد لديك دورات</p>
          </div>
        )}
      </section>
      {/* main content end */}
    </main>
  );
};

export default MyCourses;
