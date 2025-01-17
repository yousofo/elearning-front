"use server";
import Hero from "@/components/shared/hero/Hero";
import { fetchWithCheck } from "@/helperFunctions/dataFetching";
import Link from "next/link";
// import React, { useEffect, useState } from "react";

const HomeHero = async () => {
  // const [openOffer, setOpenOffer] = useState(false);
  const openOffer = await fetchWithCheck(
    `${process.env.NEXT_PUBLIC_ROOT_URL}/api/ViewsNow/CheckOpenOffer`
  );
  console.log("openOffer");
  console.log(openOffer);

  // useEffect(() => {
  //   fetchWithCheck("/api/views/checkOpenOffer")
  //     .then((result) => {
  //       setOpenOffer(result);
  //       // setOpenOffer({
  //       //   isOpen: true,
  //       //   image: "/media/Iamge.png",
  //       // });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  return (
    <>
      <Hero>
        {/* {openOffer?.isOpen ? ( */}
        <a
          href=""
          className={`${
            openOffer?.isOpen ? "block" : "hidden"
          } w-full pt-20 md:pt-40`}
        >
          <img
            loading="lazy"
            className="mx-auto w-full"
            src={openOffer.image}
            alt=""
          />
        </a>
        {/* ) : ( */}
        <div className={`${openOffer?.isOpen ? "hidden" : "block"} flex flex-col gap-6 items-center`}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-[55px] xl:leading-[1.5] abad-font font-bold">
            <span>تعلم بكل سهولة مع</span>
            &nbsp;
            <span className="text-abad-gold whitespace-nowrap">
              اباد للتدريب
            </span>
          </h2>
          <h4 className="text-sm md:text-lg leading-[28px] md:leading-[2] max-w-[650px] abad-font">
            معهد شبكة آباد للتدريب من المعاهد الرائدة في تقديم الدورات التطويرية
            المتخصصة في تقنية المعلومات.
          </h4>
          <Link
            href="/courses"
            className="flex w-fit items-center bg-abad-gold py-2 px-4 gap-5 text-sm rounded-xl text-black"
          >
            <span className="font-medium abad-font">ابدأ التعلم</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              className=" rotate-180"
            >
              <path
                d="M19 12H5"
                stroke="black"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 5L5 12L12 19"
                stroke="black"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
        {/* )} */}
      </Hero>
    </>
  );
};

export default HomeHero;
