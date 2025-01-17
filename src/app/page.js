import "./main.css";
import ReviewsSwiper from "@/components/home/swipers/ReviewsSwiper";
import "swiper/css";
import PartnersSwiper from "@/components/home/swipers/PartnersSwiper";
import HomeCourses from "@/components/home/courses/HomeCourses";
import SubscriptionWithEmail from "@/components/home/SubscriptionWithEmail/SubscriptionWithEmail";
import LatestArticles from "@/components/home/articles/LatestArticles";
import { fetchWithCheck } from "@/helperFunctions/dataFetching";
import dynamic from "next/dynamic";
import HomeHero from "@/components/home/hero/homeHero";
import Image from "next/image";

// export const fetchCache = "force-no-store";
const VideoSection = dynamic(
  () => import("@/components/home/videoSection/VideoSection"),
  {
    ssr: false, // This disables server-side rendering for this component
  }
);
export default async function Home() {
  const latestArticles = await fetchWithCheck(
    `${process.env.NEXT_PUBLIC_ROOT_URL}/api/articles/getLatestArticles`,
    null,
    []
  );
  const homeData = await fetchWithCheck(
    `${process.env.NEXT_PUBLIC_ROOT_URL}/api/GetDataHome/getDataHome`,
    null,
    null
  );

  return (
    <main className="home home-page">
      {/* img for search result */}
      <Image
        width={144}
        height={144}
        src="/icon.png"
        alt="learn with abad"
        className="hidden"
      />
      {/* HERO start  */}

      <HomeHero />
      {/* HERO end  */}
      {/* COURSES start */}
      <section className="courses-sec  mb-8">
        <img
          loading="lazy"
          className=""
          src="/media/Animation - 1717986646627.gif"
          alt=""
        />
        <HomeCourses />
      </section>
      {/* COURSES end   */}
      {/* PLAN start */}
      <section className="plan">
        <img
          loading="lazy"
          src="/media/Share Section.png"
          className=""
          alt=""
        />
        <div className="flex">
          <div className="cards-title">
            <div className="about text-center md:text-start text-white flex flex-col gap-4 pt-16">
              <img
                loading="lazy"
                className="absolute w-32 top-5 right-5 lg:right-10"
                src="/media/Animation - 1717986646627.gif"
                alt=""
              />
              <img
                loading="lazy"
                className="w-fit mx-auto md:mx-0"
                src="/media/ft-logo 3.png"
                alt=""
              />
              <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl !leading-[2.5rem]">
                <span className="inline-block">ماهي خطة </span><span className="text-abad-gold inline-block">اباد للتدريب؟</span>
              </h3>
              <p className="text-sm md:text-base noto">
                {homeData?.shortDescription}
              </p>
              <button className="bg-abad-gold mx-auto md:mx-0 w-fit text-black flex items-center gap-6 p-2 px-3 rounded-xl">
                <span className="font-bold">اعرف المزيد</span>
                <svg
                  className="text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
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
              </button>
            </div>
          </div>
          <div className="cards">
            <figure className="card">
              <Image
                width={210}
                height={0}
                src="/media/button website/Vector Smart Object-2.png"
                alt="learn with abad"
                className="w-36 md:!w-44 lg:!w-[210px]"
                
              />
            </figure>
            <figure className="card">
              <Image
                width={210}
                height={0}
                src="/media/button website/Vector Smart Object-1.png"
                alt="learn with abad"
                className="!w-36 md:!w-44 lg:!w-[210px]"
                
              />
            </figure>
            <figure className="card">
              <Image
                width={210}
                height={0}
                src="/media/button website/Vector Smart Object-3.png"
                alt="learn with abad"
                className="w-36 md:!w-44 lg:!w-[210px]"
                
              />
            </figure>
            <figure className="card">
              <Image
                width={210}
                height={0}
                src="/media/button website/Vector Smart Object.png"
                alt="learn with abad"
                className="w-36 md:!w-44 lg:!w-[210px]"
                
              />
            </figure>
          </div>
        </div>
      </section>
      {/* PLAN end */}
      {/* REVIEWS start */}
      <section className="reviews">
        <img loading="lazy" src="/media/Review Section.png" alt="" />
        <div>
          <h3>
            لماذا طلاب <span>اباد للتدريب</span>
            <br />
            <span>يحبون التعلم معنا؟</span>
          </h3>
          {/* Slider main container */}
          <div className="cards">
            <div className="swiper-wrapper cards-wrapper">
              <ReviewsSwiper />
            </div>
            <div className="swiper-btns">
              <div className="swiper1-btn reviewsBtn swiper1-prev">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={8}
                  height={14}
                  viewBox="0 0 8 14"
                  fill="none"
                >
                  <path
                    d="M1 0.999999L7 7L1 13"
                    stroke="white"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="swiper1-btn reviewsBtn swiper1-next">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={8}
                  height={14}
                  viewBox="0 0 8 14"
                  fill="none"
                >
                  <path
                    d="M7 13L1 7L7 1"
                    stroke="white"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* REVIEWS end */}
      {/* TRUST start */}
      <section className="relative p-8 md:p-14 overflow-hidden select-none">
        <VideoSection
          lVideoURL={homeData?.lVideoURL}
          titleVideo={homeData?.titleVideo}
        />
      </section>
      {/* TRUST end */}
      {/* PARTNERS start */}
      <section className="partners py-10 px-8">
        <h2 className="text-4xl text-center font-bold my-8 text-[#1E1E1E]">
          شركاء النجاح
        </h2>
        <div className="swiper2 container max-w-full lg:max-w-screen-lg w-full mx-auto">
          <PartnersSwiper />
        </div>
      </section>
      {/* PARTNERS end */}
      {/* ARTICLES start */}
      <section className="articles p-8 md:p-14">
        <h6 className="bg-[#F9F5F2] rounded-lg w-fit m-auto p-2">
          مدونة ومقالة
        </h6>
        <h2 className="text-2xl md:text-4xl text-center font-bold mx-auto my-7 w-fit text-[#1E1E1E]">
          ألقِ نظرة على أحدث المقالات
        </h2>
        <LatestArticles data={latestArticles} />
      </section>
      {/* ARTICLES end */}
      {/* CONTACT start */}
      <section className="contact w-full relative max-w-screen-lg mx-auto p-5 mb-10">
        <div className="container relative flex py-7 px-4 mx-auto md:p-10 gap-8 md:gap-[5%] flex-col md:flex-row rounded-xl overflow-hidden">
          <img
            loading="lazy"
            src="/media/Submit section.png"
            className="absolute left-0 top-0 w-full h-full object-cover -z-10"
            alt=""
          />
          <div className="info text-white md:w-[45%] text-center md:text-start noto">
            <h3 className="noto-bold text-2xl md:text-3xl mb-4">
              اشترك في نشرة اباد للتدريب
            </h3>
            <p className="noto-regular text-xs px-3 md:px-0 md:text-base">
              ومعهد شبكة آباد للتدريب من المعاهد الرائدة في تقديم الدورات
              التطويرية المتخصصة في تقنية المعلومات. معهد شبكة آباد للتدريب من
              المعاهد الرائدة في تقديم الدورات التطويرية المتخصصة في تقنية
              المعلومات.
            </p>
          </div>
          <SubscriptionWithEmail />
        </div>
      </section>
      {/* CONTACT end */}
    </main>
  );
}
