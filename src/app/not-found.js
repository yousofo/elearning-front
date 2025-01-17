import React from "react";

const NotFound = () => {
  return (
    <main>
      {/* HERO start  */}
      <section className="hero h-dvh md:min-h-[600px] md:h-auto relative">
        <div className="intro text-center absolute flex flex-col items-center h-full justify-center gap-5 md:gap-7 text-white w-full max-w-full px-4">
          <div className="text-2xl text-center font-medium md:text-4xl lg:text-5xl xl:text-6xl max-w-72 sm:max-w-fit">
            <h2 className="text-center mb-4">
              <span>تعلم بكل سهولة مع</span>
              &nbsp;
              <span className="text-abad-gold">اباد للتدريب</span>
            </h2>
            <p className="text-sm md:text-2xl max-w-2xl w-full mx-auto font-normal leading-loose md:leading-[2]">
              معهد شبكة آباد للتدريب من المعاهد الرائدة في تقديم الدورات
              التطويرية المتخصصة في تقنية المعلومات.
            </p>
          </div>
        </div>
        <div className="back-shape overflow-hidden w-full relative -z-10 h-full md:h-auto">
          <img
            className="w-full h-full md:h-auto object-cover md:min-h-[600px]"
            src="/media/BackgroundHero_rect.png"
            alt=""
          />
          <img
            className="md:w-36 w-20 absolute top-[8vh] md:top-[10vh] right-0"
            src="/media/hero-rectangle.png"
            alt=""
          />
        </div>
      </section>
      {/* HERO end  */}
      {/* main secion start */}
      <section className="p-8 w-full max-w-screen-lg mx-auto h-auto">
        {/* ARTICLES start */}
        <div className=" text-center relative mx-auto   sm:pb-[5%] pt-10 ">
          الصفحة غير موجودة
        </div>
        {/* ARTICLES end */}
      </section>
    </main>
  );
};

export default NotFound;
