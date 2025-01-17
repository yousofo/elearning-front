"use client";
import "./homeCourses.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
// redux tool kit
import { useDispatch, useSelector } from "react-redux";
// import { setHomeCourses } from "../../GlobalState/Features/fetchedDataSlice";
import { toggleCards } from "../../GlobalState/Features/coursesFilterSlice";
// components
import CourseRow from "@/components/shared/tables/CourseRow";
import CourseCard from "@/components/shared/tables/CourseCard";
import { fetchWithCheck } from "@/helperFunctions/dataFetching";
import { handleNavigateToCourseDetails } from "@/helperFunctions/clientOnlyActions";
import { useRouter } from "next/navigation";

const HomeCourses = () => {
  const [data, setData] = useState([]);
  const [coursesCategories, setCoursesCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const isCards = useSelector((store) => store.coursesFilter.isCards);
  const dispatch = useDispatch();
  const [filteredCourses, setFilteredCourses] = useState(data);
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  const handleSearch = (event) => {
    console.log(event.target.value);
    const input = event.target.value.toLowerCase();
    setSearchInput(input);

    const filtered = data.filter((course) =>
      course.courseName.toLowerCase().includes(input)
    );

    setFilteredCourses(filtered);
  };

  useEffect(() => {
    fetchWithCheck("/api/categories/coursesCategories", {}, [])
      .then((e) => {
        setCoursesCategories(e);
      })
      .catch((e) => {
        console.log("home courses");
        console.log(e);
      });
    fetchWithCheck("/api/home/latest", {}, [])
      .then((e) => {
        setData(e);
        setFilteredCourses(e);
        // dispatch(setHomeCourses(e));
      })
      .catch((e) => {
        console.log("home courses");
        console.log(e);
      });
  }, []);

  function handleCoursesPreviewMode() {
    dispatch(toggleCards());
  }

  return (
    <div className="home-courses container min-h-[450px] py-2 mx-auto max-w-screen-lg flex flex-col px-1 gap-4 items-center bg-white rounded-xl">
      {/* courses preview mode options */}
      <div className="courses-preview-mode text-black flex px-2 justify-between items-center w-full">
        <h3 className="font-bold text-2xl text-[#1e1e1e] md:text-[40px]">
          دورات أباد للتدريب
        </h3>
        <ul className="flex gap-2 justify-center items-center">
          <li
            data-mode="rows"
            onClick={handleCoursesPreviewMode}
            className={`${
              !isCards && "active"
            } courses-preview-mode courses-preview-rows `}
          >
            <svg
              width={22}
              height={14}
              viewBox="0 0 22 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 1H15M9 9H15M9 5H21M9 13H21M3 5C1.89543 5 1 4.10457 1 3C1 1.89543 1.89543 1 3 1C4.10457 1 5 1.89543 5 3C5 4.10457 4.10457 5 3 5ZM3 13C1.89543 13 1 12.1046 1 11C1 9.89543 1.89543 9 3 9C4.10457 9 5 9.89543 5 11C5 12.1046 4.10457 13 3 13Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </li>
          <li
            onClick={handleCoursesPreviewMode}
            data-mode="cards"
            className={`${
              isCards && "active"
            } courses-preview-mode courses-preview-rows`}
          >
            <svg
              width={22}
              height={22}
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 3C1 1.89543 1.89543 1 3 1H7C8.10457 1 9 1.89543 9 3V7C9 8.10457 8.10457 9 7 9H3C1.89543 9 1 8.10457 1 7V3Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M13 3C13 1.89543 13.8954 1 15 1H19C20.1046 1 21 1.89543 21 3V7C21 8.10457 20.1046 9 19 9H15C13.8954 9 13 8.10457 13 7V3Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M1 15C1 13.8954 1.89543 13 3 13H7C8.10457 13 9 13.8954 9 15V19C9 20.1046 8.10457 21 7 21H3C1.89543 21 1 20.1046 1 19V15Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M13 15C13 13.8954 13.8954 13 15 13H19C20.1046 13 21 13.8954 21 15V19C21 20.1046 20.1046 21 19 21H15C13.8954 21 13 20.1046 13 19V15Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </li>
        </ul>
      </div>
      {/* main courses content */}
      <div className=" courses-contents ">
        {/* search and filter */}
        <div>
          {/* courses filter */}
          <nav className="courses-filter abad-drop-shadow  whitespace-nowrap">
            <ul className="overflow-x-auto lg:overflow-auto">
              <li
                className={activeCategory == "all" ? "active" : ""}
                onClick={() => setActiveCategory("all")}
                data-filter="all"
              >
                <button>
                  <span>الكل</span>
                </button>
              </li>
              {Array.isArray(coursesCategories) &&
                coursesCategories.map((e, i) => (
                  <li
                    onClick={() => setActiveCategory(e.code)}
                    key={i}
                    className={activeCategory == e.code ? "active" : ""}
                  >
                    <button>
                      <div>
                        <svg
                          width="36"
                          height="34"
                          viewBox="0 0 36 34"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.424316"
                            width="35.5189"
                            height="33.9999"
                            rx="17"
                            // fill="black"
                            fillOpacity="0.05"
                          />
                          <path
                            d="M27.8918 7.38114H27.5833C28.1714 6.42378 27.9542 5.13848 27.0105 4.43827C25.9936 3.68388 24.5486 3.92671 23.8389 4.9872L22.237 7.38119H8.47569C7.34456 7.38119 6.42432 8.30143 6.42432 9.43256V22.5478C6.42432 23.6789 7.34456 24.5991 8.47569 24.5991H16.4438L15.8418 27.1279H14.5424C13.6955 27.1279 13.0065 27.8168 13.0065 28.6636V28.9843H11.4046C11.1242 28.9843 10.8968 29.2117 10.8968 29.4921C10.8968 29.7725 11.1242 29.9999 11.4046 29.9999H24.9629C25.2434 29.9999 25.4707 29.7725 25.4707 29.4921C25.4707 29.2117 25.2434 28.9843 24.9629 28.9843H23.3611V28.6636C23.3611 27.8168 22.6721 27.1279 21.8252 27.1279H20.5258L19.9237 24.5991H27.8919C29.023 24.5991 29.9432 23.6789 29.9432 22.5478V19.6619V9.43251C29.9432 8.30138 29.023 7.38114 27.8918 7.38114ZM20.6159 16.3083C19.822 16.864 18.3346 16.1086 16.9141 16.8665C16.5676 15.0661 16.7861 13.3729 18.59 12.9991C18.8232 12.9505 19.0742 12.9285 19.2879 12.9328C19.8985 13.3858 20.516 13.844 21.1249 14.2958C21.3914 15.0711 21.2914 15.8354 20.6159 16.3083ZM21.1277 10.8652L22.5651 11.9317L21.4597 13.2795C21.0046 12.9418 20.6134 12.6516 20.1583 12.3139C20.2528 12.1727 21.0413 10.9943 21.1277 10.8652ZM24.683 5.55203C25.0676 4.97715 25.852 4.84339 26.4053 5.25395C26.9588 5.66456 27.058 6.45399 26.6194 6.98876C25.8412 7.93748 23.991 10.1932 23.2099 11.1456L21.6931 10.0202L24.683 5.55203ZM22.3454 28.6636V28.9843H14.0221V28.6636C14.0221 28.3768 14.2555 28.1435 14.5424 28.1435H21.8252C22.112 28.1435 22.3454 28.3768 22.3454 28.6636ZM19.4817 27.1279H16.8858L17.4878 24.5991H18.8797L19.4817 27.1279ZM28.9276 22.5478C28.9276 23.1189 28.463 23.5835 27.8919 23.5835C27.0858 23.5835 9.38206 23.5835 8.47574 23.5835C7.90461 23.5835 7.43997 23.1189 7.43997 22.5478V20.1697H8.89107C9.17153 20.1697 9.39887 19.9423 9.39887 19.6619C9.39887 19.3815 9.17153 19.1541 8.89107 19.1541H7.43987V9.43251C7.43987 8.86138 7.90451 8.39674 8.47564 8.39674H21.5574C21.0709 9.12376 19.6517 11.2448 19.2021 11.9165C18.207 11.9255 17.2134 12.2722 16.5631 13.0315C15.678 14.0646 15.5225 15.6879 16.1009 17.8563C16.1998 18.2271 16.6624 18.36 16.9424 18.0926C18.2554 16.8379 19.8907 18.2065 21.3552 17.0212C22.2491 16.2975 22.4607 15.1472 22.1236 14.0714C22.5792 13.5159 26.3213 8.9536 26.778 8.39674H27.8918C28.4629 8.39674 28.9275 8.86138 28.9275 9.43251V19.1541H12.9534C12.6729 19.1541 12.4456 19.3815 12.4456 19.6619C12.4456 19.9423 12.6729 20.1697 12.9534 20.1697H28.9276V22.5478Z"
                            // fill="#9891A3"
                          />
                          <path
                            d="M10.8242 19.164C10.5797 19.214 10.4159 19.4253 10.4159 19.6622C10.4159 19.9798 10.7063 20.2231 11.0227 20.1599C11.3039 20.1028 11.4752 19.8318 11.4214 19.5627C11.3648 19.2849 11.0954 19.1094 10.8242 19.164Z"
                            // fill="#9891A3"
                          />
                        </svg>
                      </div>
                      <span>{e.arabicName}</span>
                    </button>
                  </li>
                ))}
            </ul>
          </nav>
          {/* search courese */}
          <div className="search-courses abad-drop-shadow bukra-front placeholder:text-base text-base">
            <svg
              viewBox="0 0 33 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_584_3300)">
                <path
                  d="M20.6876 22.3218C20.1783 21.834 19.6826 21.3321 19.201 20.8168C18.7965 20.4057 18.5529 20.1066 18.5529 20.1066L15.5079 18.6526C16.7269 17.27 17.3998 15.4902 17.4001 13.6469C17.4001 9.45025 13.9854 6.03442 9.78764 6.03442C5.58991 6.03442 2.17517 9.45025 2.17517 13.6469C2.17517 17.8435 5.58991 21.2594 9.78764 21.2594C11.7049 21.2594 13.4525 20.5416 14.7934 19.3682L16.2474 22.4132C16.2474 22.4132 16.5464 22.6568 16.9575 23.0613C17.3784 23.4561 17.9319 23.9901 18.4626 24.548L19.9394 26.0617L20.5963 26.7643L22.9028 24.4577L22.2003 23.8008C21.7882 23.3963 21.2379 22.8591 20.6876 22.3218ZM9.78764 19.0844C6.78942 19.0844 4.35016 16.6451 4.35016 13.6469C4.35016 10.6487 6.78942 8.20942 9.78764 8.20942C12.7859 8.20942 15.2251 10.6487 15.2251 13.6469C15.2251 16.6451 12.7859 19.0844 9.78764 19.0844Z"
                  fill="#A1A1A1"
                />
              </g>
              <defs>
                <clipPath id="clip0_584_3300">
                  <rect
                    width="32"
                    height="32"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            <input
              value={searchInput}
              onChange={handleSearch}
              type="text"
              placeholder="ابحث عن اسم الدورة..."
            />
          </div>
        </div>
        {/* courses table ROWS MODE */}
        <table
          style={{ display: `${isCards ? "none" : "table"}` }}
          className={` courses-rows`}
        >
          <thead>
            <tr className="abad-shadow [&>th]:text-start [&>th]:whitespace-nowrap">
              <th>اسم الدورة</th>
              <th>تاريخ بداية الدورة</th>
              <th>وقت بداية الدورة</th>
              <th>الاجراءات</th>
            </tr>
          </thead>
          {/* rows data */}
          <tbody>
            {Array.isArray(data) &&
              (activeCategory == "all"
                ? filteredCourses.map((e, i) => (
                    <CourseRow data={e} key={i} index={i} />
                  ))
                : filteredCourses
                    ?.filter((e) => e.categoryId == activeCategory)
                    .map((e, i) => <CourseRow data={e} key={i} index={i} />))}
          </tbody>
        </table>
        {/* courses table CARDS MODE */}
        <div
          style={{ display: `${!isCards ? "none" : "grid"}` }}
          className={` courses-cards `}
        >
          {Array.isArray(data) &&
            (activeCategory == "all"
              ? filteredCourses.map((e, i) => (
                  // <Link
                  //   onClick={(ev) =>
                  //     handleNavigateToCourseDetails(ev, e.courseName, router)
                  //   }
                  //   key={i}
                  //   href={`/courses/${e.courseName}`}
                  // >
                    <CourseCard key={i} data={e} index={i} />
                  // {/* </Link> */}
                ))
              : filteredCourses
                  ?.filter((e) => e.categoryId == activeCategory)
                  .map((e, i) => (
                    // <Link
                    //   onClick={(ev) =>
                    //     handleNavigateToCourseDetails(ev, e.token, router)
                    //   }
                    //   key={i}
                    //   href={`/courses/${e.token}`}
                    // >
                      <CourseCard key={i}  data={e} index={i} />
                    // </Link>
                  )))}
        </div>
      </div>
      {/* link to all courses page */}
      <Link
        href="/courses"
        className="show-all text-black  border border-[#BFBFBF]"
      >
        <span className="">عرض الكل</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
          <path
            d="M19 12H5"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 5L5 12L12 19"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
};

export default HomeCourses;
