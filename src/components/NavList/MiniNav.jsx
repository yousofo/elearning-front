"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { reset } from "../GlobalState/Features/navListSlice";
import {
  fetchCheckCourse,
  fetchCoursesWithTypes,
} from "@/helperFunctions/dataFetching";

//helper component
const MiniNavItem = ({ data }) => {
  const [innerList, setInnerList] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  function handleClick(e) {
    e.stopPropagation();
    setInnerList(!innerList);
  }

  async function handleCourseClicked(courseToken) {
    const result = await fetchCheckCourse(courseToken);
    dispatch(reset());

    if (result.courseExists) {
      router.push(`/courses/${result.courseToken}`);
    } else {
      router.push(`/courses/register/${result.courseToken}`);
    }
  }
  return (
    <li
      suppressHydrationWarning={true}
      className={`flex flex-col text-sm ${
        innerList ? " gap-2" : "gap-0"
      } w-full`}
      onClick={handleClick}
    >
      <div className={`flex justify-between w-full gap-2 `}>
        <span className="w-fit">{data.typeName}</span>
        <svg
          width="6"
          height="9"
          viewBox="0 0 6 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`angle-down  ${innerList ? "active" : ""}`}
        >
          <path
            d="M5 1L2 4.5L5 8"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <ul
        className={`${
          innerList ? "max-h-60" : "max-h-0"
        } overflow-y-auto transition-all font-light flex flex-col`}
      >
        {data.courses.map((e, i) => (
          <li key={i}>
            <div
              onClick={() => handleCourseClicked(e.courseToken)}
              className="text-start w-full block p-1.5 underline underline-offset-4 decoration-blue-700"
            >
              {e.courseName}
            </div>
          </li>
        ))}
      </ul>
    </li>
  );
};

//main component
const MiniNav = () => {
  const [outerList, setOuterList] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchCoursesWithTypes()
      .then((e) => setData(e))
      .catch((e) => console.log(e));
  }, []);
  return (
    <button
      suppressHydrationWarning={true}
      onClick={() => setOuterList(!outerList)}
      className={`flex flex-col  w-full ${outerList ? "gap-4" : "gap-0"}`}
    >
      <div className="flex justify-between items-center  w-full px-1">
        <span>الدورات</span>
        <svg
          width="6"
          height="9"
          viewBox="0 0 6 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`angle-down  ${outerList ? "active" : ""}`}
        >
          <path
            d="M5 1L2 4.5L5 8"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <ul
        className={`${
          outerList ? "max-h-96" : "max-h-0"
        } overflow-y-hidden transition-all flex flex-col gap-2 w-full px-1`}
      >
        {Array.isArray(data) &&
          data.map((e, i) => <MiniNavItem data={e} key={i} />)}
      </ul>
    </button>
  );
};

export default MiniNav;
