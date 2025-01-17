"use client";
import { useEffect, useRef, useState } from "react";
import "./course.css";

import Accordion from "@/components/shared/Accordion/Accordion";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import Link from "next/link";
import {
  closeLoader,
  openLoader,
} from "@/components/GlobalState/Features/popUpsSlice";
import { fetchWithCheck } from "@/helperFunctions/dataFetching";
import { handleValidateToken } from "@/helperFunctions/signedInActions";

async function fetchCourseDetails(token) {
  try {
    const courseDetails = await fetchWithCheck(
      `/api/reservations/getCourseDetailsByToken?token=${token}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(courseDetails);
    return courseDetails;
  } catch (e) {
    console.log(e);
  }
}

async function fetchRegisterCourseRequest(data) {
  try {
    console.log(data);
    const courseDetails = await fetch(`/api/reservations/registerRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
      },
      body: JSON.stringify(data),
    });
    const result = await courseDetails.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

const Register = ({ params }) => {
  const defaultCourseImg = "/media/course/course-image.png";
  const [imgLoaded, setImgLoaded] = useState(false);
  const shimmerLoader = useRef(null);
  const [fetched, setFetched] = useState(false);

  const [courseImg, setCourseImg] = useState("");
  const [courseInfo, setCourseInfo] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(openLoader(""));
    fetchCourseDetails(params.token)
      .then((courseData) => {
        if (courseData.error) {
          router.replace("/courses");
          return;
        }
        setCourseInfo(courseData);
        setCourseImg(courseData.imageUrl);
      })
      .catch((e) => {
        console.log(e);
        router.replace("/courses");
        return;
      })
      .finally(() => {
        setFetched(true);
        dispatch(closeLoader());
      });
        handleValidateToken().then((e) => {
          if (!e) {
            router.replace("/");
            return;
          }
        });
  }, []);
  return (
    <main className="pb-10 relative">
      <div className="hero relative">
        {/* BACKGROUND IMG start*/}
        <div className="back-shape h-dvh md:min-h-[600px] md:h-auto overflow-hidden w-full absolute -z-10">
          <img
            className="w-full h-full md:h-auto object-cover md:min-h-[600px]"
            src="/media/BackgroundHero_rect.png"
            alt=""
          />
          <img
            className="md:w-36 w-20 absolute top-[8vh]  md:top-[10vh] right-0 "
            src="/media/hero-rectangle.png"
            alt=""
          />
        </div>
        {/* BACKGROUND IMG end*/}
        <div className="container px-4 flex flex-col md:flex-row justify-between gap-16 course-details pt-44 md:pt-56 m-auto max-w-screen-xl">
          {/* COURSE CONTENT start */}
          <section className="h-fit flex flex-col gap-60 flex-1">
            <div className="flex  flex-col gap-6">
              <h6 className="flex flex-wrap items-center text-[#A8A8A8] font-bold text-xs md:text-sm">
                <Link href="/">الرئيسية</Link>
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.125 8.625L9.375 12L13.125 15.375"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <Link href="/courses">الدورات التدريبية</Link>
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.125 8.625L9.375 12L13.125 15.375"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-white   font-medium w-full sm:w-fit py-1.5">
                  {courseInfo.courseName}
                </p>
              </h6>
              <div className="flex flex-col items-start">
                <h2
                  className="md:text-2xl text-[#F9F9F9] font-medium pb-2 w-fit"
                  style={{ unicodeBidi: "bidi-override" }}
                >
                  <bdi>{courseInfo.courseName}</bdi>
                </h2>
                <h3
                  className="text-[#E0E0E0] max-w-lg leading-relaxed text-sm md:text-base"
                  dangerouslySetInnerHTML={{ __html: courseInfo.summaryAr }}
                />
              </div>
              <div>
                <p className="noto text-[#E0E0E0]">
                  تم إنشاؤها بواسطة اباد للتدريب
                </p>
                <div className="flex text-[#E0E0E0] noto">
                  <span className="">4.8 (122)</span>
                  <div className="flex">
                    <svg
                      width={20}
                      height={21}
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.6875 8.10938C18.6092 7.86327 18.4585 7.64654 18.2549 7.48761C18.0514 7.32868 17.8046 7.23496 17.5468 7.21875L12.9062 6.89844L11.1875 2.5625C11.0936 2.32375 10.9303 2.11867 10.7185 1.97382C10.5068 1.82896 10.2565 1.75099 9.99997 1.75C9.74344 1.75099 9.49311 1.82896 9.28139 1.97382C9.06968 2.11867 8.90632 2.32375 8.81247 2.5625L7.06247 6.92188L2.45309 7.21875C2.19567 7.23601 1.94936 7.33012 1.74601 7.4889C1.54266 7.64768 1.39163 7.86383 1.31247 8.10938C1.23117 8.35869 1.22642 8.62664 1.29883 8.87868C1.37124 9.13072 1.51749 9.35529 1.71872 9.52344L5.26559 12.5234L4.2109 16.6719C4.13793 16.9525 4.15107 17.2486 4.24859 17.5217C4.34612 17.7948 4.52354 18.0322 4.75778 18.2031C4.98515 18.3663 5.25604 18.4579 5.53578 18.4663C5.81552 18.4746 6.0914 18.3993 6.32809 18.25L9.99216 15.9297H10.0078L13.9531 18.4219C14.1555 18.5534 14.3914 18.6239 14.6328 18.625C14.8299 18.6235 15.0239 18.5767 15.2001 18.4884C15.3763 18.4002 15.5299 18.2727 15.6491 18.1157C15.7683 17.9588 15.85 17.7766 15.8878 17.5832C15.9256 17.3898 15.9185 17.1903 15.8672 17L14.75 12.4609L18.2812 9.52344C18.4824 9.35529 18.6287 9.13072 18.7011 8.87868C18.7735 8.62664 18.7688 8.35869 18.6875 8.10938Z"
                        fill="#FFC761"
                      />
                    </svg>
                    <svg
                      width={20}
                      height={21}
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.6875 8.10938C18.6092 7.86327 18.4585 7.64654 18.2549 7.48761C18.0514 7.32868 17.8046 7.23496 17.5468 7.21875L12.9062 6.89844L11.1875 2.5625C11.0936 2.32375 10.9303 2.11867 10.7185 1.97382C10.5068 1.82896 10.2565 1.75099 9.99997 1.75C9.74344 1.75099 9.49311 1.82896 9.28139 1.97382C9.06968 2.11867 8.90632 2.32375 8.81247 2.5625L7.06247 6.92188L2.45309 7.21875C2.19567 7.23601 1.94936 7.33012 1.74601 7.4889C1.54266 7.64768 1.39163 7.86383 1.31247 8.10938C1.23117 8.35869 1.22642 8.62664 1.29883 8.87868C1.37124 9.13072 1.51749 9.35529 1.71872 9.52344L5.26559 12.5234L4.2109 16.6719C4.13793 16.9525 4.15107 17.2486 4.24859 17.5217C4.34612 17.7948 4.52354 18.0322 4.75778 18.2031C4.98515 18.3663 5.25604 18.4579 5.53578 18.4663C5.81552 18.4746 6.0914 18.3993 6.32809 18.25L9.99216 15.9297H10.0078L13.9531 18.4219C14.1555 18.5534 14.3914 18.6239 14.6328 18.625C14.8299 18.6235 15.0239 18.5767 15.2001 18.4884C15.3763 18.4002 15.5299 18.2727 15.6491 18.1157C15.7683 17.9588 15.85 17.7766 15.8878 17.5832C15.9256 17.3898 15.9185 17.1903 15.8672 17L14.75 12.4609L18.2812 9.52344C18.4824 9.35529 18.6287 9.13072 18.7011 8.87868C18.7735 8.62664 18.7688 8.35869 18.6875 8.10938Z"
                        fill="#FFC761"
                      />
                    </svg>
                    <svg
                      width={20}
                      height={21}
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.6875 8.10938C18.6092 7.86327 18.4585 7.64654 18.2549 7.48761C18.0514 7.32868 17.8046 7.23496 17.5468 7.21875L12.9062 6.89844L11.1875 2.5625C11.0936 2.32375 10.9303 2.11867 10.7185 1.97382C10.5068 1.82896 10.2565 1.75099 9.99997 1.75C9.74344 1.75099 9.49311 1.82896 9.28139 1.97382C9.06968 2.11867 8.90632 2.32375 8.81247 2.5625L7.06247 6.92188L2.45309 7.21875C2.19567 7.23601 1.94936 7.33012 1.74601 7.4889C1.54266 7.64768 1.39163 7.86383 1.31247 8.10938C1.23117 8.35869 1.22642 8.62664 1.29883 8.87868C1.37124 9.13072 1.51749 9.35529 1.71872 9.52344L5.26559 12.5234L4.2109 16.6719C4.13793 16.9525 4.15107 17.2486 4.24859 17.5217C4.34612 17.7948 4.52354 18.0322 4.75778 18.2031C4.98515 18.3663 5.25604 18.4579 5.53578 18.4663C5.81552 18.4746 6.0914 18.3993 6.32809 18.25L9.99216 15.9297H10.0078L13.9531 18.4219C14.1555 18.5534 14.3914 18.6239 14.6328 18.625C14.8299 18.6235 15.0239 18.5767 15.2001 18.4884C15.3763 18.4002 15.5299 18.2727 15.6491 18.1157C15.7683 17.9588 15.85 17.7766 15.8878 17.5832C15.9256 17.3898 15.9185 17.1903 15.8672 17L14.75 12.4609L18.2812 9.52344C18.4824 9.35529 18.6287 9.13072 18.7011 8.87868C18.7735 8.62664 18.7688 8.35869 18.6875 8.10938Z"
                        fill="#FFC761"
                      />
                    </svg>
                    <svg
                      width={20}
                      height={21}
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.6875 8.10938C18.6092 7.86327 18.4585 7.64654 18.2549 7.48761C18.0514 7.32868 17.8046 7.23496 17.5468 7.21875L12.9062 6.89844L11.1875 2.5625C11.0936 2.32375 10.9303 2.11867 10.7185 1.97382C10.5068 1.82896 10.2565 1.75099 9.99997 1.75C9.74344 1.75099 9.49311 1.82896 9.28139 1.97382C9.06968 2.11867 8.90632 2.32375 8.81247 2.5625L7.06247 6.92188L2.45309 7.21875C2.19567 7.23601 1.94936 7.33012 1.74601 7.4889C1.54266 7.64768 1.39163 7.86383 1.31247 8.10938C1.23117 8.35869 1.22642 8.62664 1.29883 8.87868C1.37124 9.13072 1.51749 9.35529 1.71872 9.52344L5.26559 12.5234L4.2109 16.6719C4.13793 16.9525 4.15107 17.2486 4.24859 17.5217C4.34612 17.7948 4.52354 18.0322 4.75778 18.2031C4.98515 18.3663 5.25604 18.4579 5.53578 18.4663C5.81552 18.4746 6.0914 18.3993 6.32809 18.25L9.99216 15.9297H10.0078L13.9531 18.4219C14.1555 18.5534 14.3914 18.6239 14.6328 18.625C14.8299 18.6235 15.0239 18.5767 15.2001 18.4884C15.3763 18.4002 15.5299 18.2727 15.6491 18.1157C15.7683 17.9588 15.85 17.7766 15.8878 17.5832C15.9256 17.3898 15.9185 17.1903 15.8672 17L14.75 12.4609L18.2812 9.52344C18.4824 9.35529 18.6287 9.13072 18.7011 8.87868C18.7735 8.62664 18.7688 8.35869 18.6875 8.10938Z"
                        fill="#FFC761"
                      />
                    </svg>
                    <svg
                      width={20}
                      height={21}
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.6875 8.10938C18.6092 7.86327 18.4585 7.64654 18.2549 7.48761C18.0514 7.32868 17.8046 7.23496 17.5468 7.21875L12.9062 6.89844L11.1875 2.5625C11.0936 2.32375 10.9303 2.11867 10.7185 1.97382C10.5068 1.82896 10.2565 1.75099 9.99997 1.75C9.74344 1.75099 9.49311 1.82896 9.28139 1.97382C9.06968 2.11867 8.90632 2.32375 8.81247 2.5625L7.06247 6.92188L2.45309 7.21875C2.19567 7.23601 1.94936 7.33012 1.74601 7.4889C1.54266 7.64768 1.39163 7.86383 1.31247 8.10938C1.23117 8.35869 1.22642 8.62664 1.29883 8.87868C1.37124 9.13072 1.51749 9.35529 1.71872 9.52344L5.26559 12.5234L4.2109 16.6719C4.13793 16.9525 4.15107 17.2486 4.24859 17.5217C4.34612 17.7948 4.52354 18.0322 4.75778 18.2031C4.98515 18.3663 5.25604 18.4579 5.53578 18.4663C5.81552 18.4746 6.0914 18.3993 6.32809 18.25L9.99216 15.9297H10.0078L13.9531 18.4219C14.1555 18.5534 14.3914 18.6239 14.6328 18.625C14.8299 18.6235 15.0239 18.5767 15.2001 18.4884C15.3763 18.4002 15.5299 18.2727 15.6491 18.1157C15.7683 17.9588 15.85 17.7766 15.8878 17.5832C15.9256 17.3898 15.9185 17.1903 15.8672 17L14.75 12.4609L18.2812 9.52344C18.4824 9.35529 18.6287 9.13072 18.7011 8.87868C18.7735 8.62664 18.7688 8.35869 18.6875 8.10938Z"
                        fill="#FFC761"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* accordions for large screens */}
            <div className="accordion !hidden md:!flex">
              <Accordion
                title="التسجيل في الدورة"
                form={{
                  fetchRegisterCourseRequest,
                }}
                token={courseInfo.token}
                active={true}
              />

              <Accordion title="تفاصيل الاختبارات" data={courseInfo.testAr} />

              <Accordion title="مهارات وكفاءات" data={courseInfo.testAr} />

              <Accordion
                title="من يحتاج هذة الدورة"
                data={courseInfo.targetAr}
              />

              <Accordion title="اهداف الدورة" data={courseInfo.goalsAr} />
            </div>
          </section>
          {/* COURSE CONTENT end */}
          {/* COURSE CARD start */}
          <figure className="p-5  mx-auto md:p-6 text-[#252525] bg-white shadow rounded-xl relative md:rounded-2xl w-full max-w-[373px] h-fit">
            <div
              className={`shimmer-effect ${
                fetched ? "hidden" : ""
              } w-full h-full absolute top-0 left-0`}
            >
              <div className="w-full h-full"></div>
            </div>
            <div
              className={`shimmer-effect ${imgLoaded ? "hidden" : ""}`}
              ref={shimmerLoader}
            >
              <div className="w-full h-72"></div>
            </div>
            <img
              src={courseImg}
              alt=""
              className={`mx-auto mb-2 ${imgLoaded ? "" : "hidden"} md:mb-4`}
              onLoad={() => {
                console.log("loaded");
                setImgLoaded(true);
              }}
              onError={() => {
                setImgLoaded(true);
                setCourseImg(defaultCourseImg);
                dispatch(closeLoader());
              }}
            />
            <figcaption className="flex flex-col gap-6">
              <h2
                className="w-fit font-medium text-[29px] md:text-[32px]"
                dir="rtl"
              >
                <span>{courseInfo.price}</span>
                &nbsp;
                <span>ريال سعودي</span>
              </h2>
              <div className="flex flex-col gap-4">
                <div className="course-description flex flex-col gap-4 pt-2 border-t border-t-[##E0E0E0] text-[#252525]">
                  <h4 className="text-xl font-medium">وصف الدورة</h4>

                  {courseInfo?.summaryAr && (
                    <p
                      dangerouslySetInnerHTML={{ __html: courseInfo.summaryAr }}
                    />
                  )}
                </div>
                <div className="course-card-details flex flex-col gap-6 text-[#252525]">
                  <h4 className="text-xl font-medium">تفاصيل الدورة</h4>
                  <ul className="flex flex-col gap-6">
                    <li
                      className={`${
                        !courseInfo.numberOfHours && "hidden"
                      } flex items-center gap-2`}
                    >
                      <img className="" src="/media/course/Users.png" alt="" />
                      <span>
                        <span>عدد الساعات للانتهاء</span>
                        &nbsp;
                        <span>: {courseInfo.numberOfHours}</span>
                      </span>
                    </li>
                    <li
                      className={`${
                        !courseInfo.numberOfHours && "hidden"
                      } flex items-center gap-2`}
                    >
                      <img className="" src="/media/course/Users.png" alt="" />
                      <span>
                        <span>عدد الاسابيع للانتهاء</span>
                        &nbsp;
                        <span>: {courseInfo.numberOfweeks}</span>
                      </span>
                    </li>
                    <li
                      className={`${
                        !courseInfo.trainerLanguage && "hidden "
                      } flex items-center gap-2`}
                    >
                      <img className="" src="/media/course/Users.png" alt="" />
                      <span>{courseInfo.trainerLanguage}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <img className="" src="/media/course/Users.png" alt="" />
                      <span>Figma</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <img className="" src="/media/course/Users.png" alt="" />
                      <span>الوصول الكامل مدى الحياة</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <img className="" src="/media/course/Users.png" alt="" />
                      <span>شهادة الإنجاز</span>
                    </li>
                  </ul>
                </div>
              </div>
            </figcaption>
          </figure>
          {/* COURSE CARD end */}
          {/* ACCORDIONS start SMALL SCREEEN */}
          <div className="accordion md:!hidden">
            <Accordion
              title="التسجيل في الدورة"
              form={{
                fetchRegisterCourseRequest,
              }}
              token={courseInfo.token}
              active={true}
            />

            <Accordion title="تفاصيل الاختبارات" data={courseInfo.testAr} />

            <Accordion title="مهارات وكفاءات" data={courseInfo.testAr} />

            <Accordion title="من يحتاج هذة الدورة" data={courseInfo.targetAr} />

            <Accordion title="اهداف الدورة" data={courseInfo.goalsAr} />
          </div>
          {/* ACCORDIONS end */}
        </div>
      </div>
    </main>
  );
};

export default Register;
