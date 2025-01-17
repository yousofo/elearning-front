import Image from "next/image";
import React from "react";

const Hero = ({ children }) => {
  return (
    <section className="relative  flex justify-center items-center sm:mb-10 md:mb-16 lg:mb-20 xl:mb-28">
      <div className="intro sm:h-auto max-w-screen-lg w-full h-screen min-h-[600px] mt-16 flex flex-col  gap-6 text-center items-center justify-center text-white px-6">
        {children}
      </div>
      <div className="back-shape w-full h-full absolute top-0 left-0 -z-50">
        {/* img for search result */}
        <Image
          src="/icon.png"
          width={485}
          height={0}
          alt="learn with abad"
          className="hidden"
          priority
        />
        <Image
          width={1400}
          height={0}
          className="first w-full h-full object-cover overflow-visible"
          src="/media/BackgroundHero_rect.png"
          alt=""
          priority
        />
        <Image
          width={200}
          height={0}
          className="second w-20 absolute top-[8vh] right-0"
          src="/media/hero-rectangle.png"
          alt=""
          priority
        />
      </div>
    </section>
  );
};

export default Hero;
