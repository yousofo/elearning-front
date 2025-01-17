import Image from "next/image";
import "./courses.css";
import CoursesComponent from "@/components/courses/CoursesComponent";

const Courses = () => {
  return (
    <main className="courses-page relative">
      {/* HERO start  */}
      <section className="back-shape hero h-screen min-h-[700px] -z-10 sm:h-auto md:min-h-[790px] lg:min-h-[850px] md:h-auto w-full !absolute left-0 top-0">
        <Image
          width={1400}
          height={0}
          priority
          className="w-full h-full overflow-visible absolute object-cover"
          src="/media/BackgroundHero_rect.png"
          alt=""
        />
        <Image
          width={1400}
          height={0}
          priority
          className="md:w-36 w-20 absolute top-[8vh]  md:top-[10vh] right-0 "
          src="/media/hero-rectangle.png"
          alt=""
        />
      </section>
      {/* HERO end */}
      {/* COURSES start */}
      <section className="relative flex flex-col gap-48 lg:gap-[24rem]  xl:gap-96 mt-[30vh] sm:mt-[25vh] container px-4 max-w-screen-xl py-6 md:py-10 mx-auto z-40">
        {/* SERACH FILTER start */}
        <CoursesComponent />
      </section>
      {/* COURSES end */}
    </main>
  );
};

export default Courses;
