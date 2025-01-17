"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
// redux tool kit
import { useDispatch, useSelector } from "react-redux";
import { toggleCards } from "../GlobalState/Features/coursesFilterSlice";
// components
import CourseCard from "../shared/tables/CourseCard";
import MultiRangeSlider from "./dualSwiper/MultiRangeSlider";
import SeachFilter from "./serachFilter/SeachFilter";
//react-table
import {
  useGlobalFilter,
  // usePagination,
  useSortBy,
  useTable,
} from "react-table";
//helper functions
import {
  fetchCourses,
  fetchCoursesCategories,
} from "@/helperFunctions/dataFetching";
// filter functions
import { filteredDataFn, priceFilterFn, sortedDataFn } from "./filterLogic";
import { handleValidateToken } from "@/helperFunctions/signedInActions";
import { useColumns } from "./columns";
import { useRouter } from "next/navigation";
import { handleNavigateToCourseDetails } from "@/helperFunctions/clientOnlyActions";

// main component
const CoursesComponent = () => {
  const allCatRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  //global state
  const isCards = useSelector((store) => store.coursesFilter.isCards);

  //filtering
  const [data, setData] = useState([]);
  const [coursesCategories, setCoursesCategories] = useState([]); //filter options from api
  const [activeCategory, setActiveCategory] = useState(["all"]); //current selected filter options
  const [isCourseOnline, setIsCourseOnline] = useState("");
  const [isCourseHadaf, setIsCourseHadaf] = useState(false);
  const [minMax, setMinMax] = useState({ min: 0, max: 15000 }); //price filter state
  const [sortOrder, setSortOrder] = useState("latest"); // or 'newest'

  const { columns } = useColumns();

  const tableColumns = useMemo(() => columns, []);

  //1st filter based on categories + attendance + hadaf
  const filteredData = useMemo(() => {
    return filteredDataFn(data, {
      activeCategory,
      isCourseOnline,
      isCourseHadaf,
    });
  }, [activeCategory, data.length, isCourseHadaf, isCourseOnline]);

  //2nd filter based on price after first filter
  const priceFilter = useMemo(() => {
    return priceFilterFn(filteredData, minMax);
  }, [minMax.min, minMax.max, filteredData, isCourseOnline]);

  //3rd filter latest | newest
  const sortedData = useMemo(() => {
    return sortedDataFn(priceFilter, sortOrder);
  }, [priceFilter, sortOrder]);

  console.log(sortedData);

  // initialize react table
  const tableInstance = useTable(
    { columns: tableColumns, data: sortedData },
    useGlobalFilter,
    useSortBy
    // usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    setGlobalFilter,
    headerGroups,
    rows,
    // page,
    // nextPage,
    // previousPage,
    // canPreviousPage,
    // canNextPage,
    // gotoPage,
    // pageCount,
    state,
    // setPageSize,
  } = tableInstance;
  const { globalFilter } = state;

  function handleCoursesPreviewMode() {
    dispatch(toggleCards());
  }
  function handleResetFilter() {
    setActiveCategory(["all"]);
    setIsCourseOnline("");
    setIsCourseHadaf(false);
    setMinMax({ min: 0, max: 15000 });
  }
  // update checked filter categories
  function handleChecked(event, code) {
    if (event.target.checked == true) {
      setActiveCategory((pre) => [...pre, code]);
    } else {
      setActiveCategory((pre) => pre.filter((ele) => ele != code));
    }
  }

  useEffect(() => {
    // auto select 'ALL' category on initial render
    allCatRef.current.checked = true;

    fetchCoursesCategories()
      .then((e) => {
        setCoursesCategories(e);
      })
      .catch((error) => {
        console.log("courses filter");
        console.log(error);
      });
    fetchCourses()
      .then((result) => {
        const monthCourses = [];
        Object.entries(result).forEach(([key, value]) => {
          const monthHeader = {
            token: "",
            courseName: "header",
            startDate: value.courses[0].startDate,
            isOnlineId: 0,
            isOnline: "",
            hadaf: null,
            categoryId: 0,
            categoryName: "",
            price: 0,
            imageUrl: "",
            summaryAr: "",
            summary: null,
            goalsAr: null,
            targetAr: null,
            detailsAr: null,
            testAr: null,
            numberOfweeks: 0,
            numberOfHours: 0,
            trainerLanguage: null,
            formattedTimeStart: "",
            formattedTimeEnd: "",
            openCourses: null,
            month: value.month,
          };
          monthCourses.push(...value.courses, monthHeader);
        });
        setData(monthCourses);
        // setPageSize(6);
      })
      .catch((error) => {
        console.log("courses filter");
        console.log(error);
      });

    handleValidateToken().then((e) => {
      if (!e) {
        router.replace("/");
        return;
      }
    });
  }, []);

  const handleSliderChange = useCallback(({ min, max }) => {
    setMinMax({ min, max });
  }, []);
  return (
    <>
      {/* SERACH FILTER start */}
      <SeachFilter
        hiden={true}
        searchFilter={globalFilter}
        setSearchFilter={setGlobalFilter}
      />
      <div className="flex flex-col gap-8 lg:gap-4 lg:flex-row">
        {/* side filter */}
        <form className="search-filter bg-white h-fit w-full lg:w-max mx-auto abad-shadow p-5 flex flex-col gap-4 rounded-lg">
          <div className="flex items-center justify-between gap-12 pb-3 border-b border-b-[#D8D1E2]">
            <h3 className="font-bold">تصفية</h3>
            <button
              type="reset"
              onClick={handleResetFilter}
              className="text-xs font-bold"
            >
              إعادة تعيين التصفية
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-24 lg:gap-4 lg:flex-col ">
            <div className="flex flex-col gap-[10px]">
              <h4 className="font-bold text-xs ">الفئة</h4>
              <div
                className={`courses-form-filter ${
                  activeCategory.includes("all") ? "active" : ""
                }`}
              >
                <input
                  onClick={(ev) => handleChecked(ev, "all")}
                  type="checkbox"
                  name="filterAll"
                  defaultChecked={true}
                  id="filterAll"
                  ref={allCatRef}
                />
                <label htmlFor="filterAll">الكل</label>
              </div>
              {coursesCategories.map((e, i) => (
                <div
                  key={i}
                  className={`courses-form-filter ${
                    activeCategory == e.code ? "active" : ""
                  }`}
                >
                  <input
                    onClick={(ev) => handleChecked(ev, e.code)}
                    type="checkbox"
                    name=""
                    id={`${e.arabicName}`}
                  />
                  <label htmlFor={`${e.arabicName}`}>{e.arabicName}</label>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <div className="max-w-64">
                <h4 className="font-bold text-xs">السعر</h4>
                <MultiRangeSlider
                  min={0}
                  max={15000}
                  onChange={handleSliderChange}
                />
              </div>
              <div className="flex flex-col gap-[10px] [&>div]:flex [&>div]:items-center [&>div]:gap-1">
                <h4 className="font-bold text-xs ">الحضور</h4>
                <div>
                  <input
                    onClick={(ev) => setIsCourseOnline("attendance")}
                    type="radio"
                    name="isOnline"
                    id="filterAttendence"
                  />
                  <label htmlFor="filterAttendence">حضوري</label>
                </div>
                <div>
                  <input
                    onClick={(ev) => setIsCourseOnline("online")}
                    type="radio"
                    name="isOnline"
                    id="filterOnline"
                  />
                  <label htmlFor="filterOnline">اونلاين</label>
                </div>
              </div>
              <div className="flex flex-col gap-[10px]">
                <h4 className="font-bold text-xs ">شهادات مدعومة</h4>
                <div className="flex items-center gap-1">
                  <input
                    onClick={(ev) =>
                      setIsCourseHadaf(ev.target.checked ? "hadaf" : "")
                    }
                    type="checkbox"
                    name=""
                    id="filterGoal"
                  />
                  <label htmlFor="filterGoal">هدف</label>
                </div>
              </div>
            </div>
          </div>
        </form>
        {/* SERACH FILTER end */}
        <div className="flex flex-1 flex-col items-center gap-8 courses">
          {/* courses preview options */}
          <div className="flex px-6 items-center w-full gap-8 courses-preview-mode">
            <div className="flex flex-col md:flex-row flex-1 justify-between lg:items-center">
              <h4 className="md:text-lg font-bold text-[#9891A3]">
                <span>عرض</span>
                &nbsp;
                <span>:</span>
                &nbsp;
                <span>{sortedData.length}</span>
                &nbsp;
                <span>نتيجة</span>
              </h4>
              <div className="flex items-center">
                <h4 className="text-xs md:text-lg font-bold text-[#9891A3]">
                  ترتيب حسب :
                </h4>
                <select
                  className="text-[#151318] text-xs md:text-base font-bold w-auto"
                  name=""
                  id=""
                  onChange={(e) => {
                    setSortOrder(e.target.value);
                  }}
                >
                  <option value="latest">الأحدث</option>
                  <option value="oldest">الأقدم</option>
                </select>
              </div>
            </div>
            <ul>
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

          {/* courses table ROWS MODE */}
          <table
            {...getTableProps()}
            style={{ display: `${isCards ? "none" : "table"}` }}
            className="courses-rows w-full"
          >
            <thead className="abad-shadow rounded-lg hidden md:table-header-group">
              {headerGroups.map((headerGroup, i) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  key={i}
                  className="[&>th]:whitespace-nowrap"
                >
                  {headerGroup.headers.map((column, i) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="text-start bg-abad-cyan !text-white"
                      key={i}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className={`shadow rounded-lg ${
                      row.original.month &&
                      "[&>td]:!py-4 flex md:table-row w-full"
                    }`}
                    key={i}
                  >
                    {row.cells.map((cell, i) => {
                      return (
                        <td {...cell.getCellProps()} key={i}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* courses table CARDS MODE */}
          <div
            style={{ display: `${!isCards ? "none" : "grid"}` }}
            className="courses-cards"
          >
            {rows.map((row,i) => {
              prepareRow(row);
              return (
                // <Link
                //   key={row.id}
                //   href={`/courses/${row.original.token}/$`}
                //   onClick={(ev) =>
                //     handleNavigateToCourseDetails(
                //       ev,
                //       row.original.courseName,
                //       router
                //     )
                //   }
                // >
                  <CourseCard key={i} data={row.original} />
                // </Link>
              );
            })}
          </div>
          {/* TABLE PAGINATION */}
          {/* <div className="flex gap-1 courses-paginaion">
            <button className="next" onClick={nextPage} disabled={!canNextPage}>
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.29303 11.707L0.586032 5.99997L6.29303 0.292969L7.70703 1.70697L3.41403 5.99997L7.70703 10.293L6.29303 11.707Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <button onClick={() => gotoPage(0)}>1</button>
            <span>...</span>
            <button onClick={() => gotoPage(pageCount - 1)}>{pageCount}</button>
            <button
              className="prev"
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.70697 11.707L7.41397 5.99997L1.70697 0.292969L0.292969 1.70697L4.58597 5.99997L0.292969 10.293L1.70697 11.707Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default CoursesComponent;
