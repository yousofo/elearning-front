"use client";
import { useForm } from "react-hook-form";
import "./accordion.css";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toggleSignIn } from "@/components/GlobalState/Features/authSlice";
import {
  closeLoader,
  openLoader,
} from "@/components/GlobalState/Features/popUpsSlice";
import { cities } from "@/components/data/data";
import {
  handleAddToBasket,
  handleRegisterAttendanceCourse,
} from "@/helperFunctions/signedInActions";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AccordionForm = ({ form, token }) => {
  const { fetchRegisterCourseRequest } = form;
  const allCities = useMemo(() => cities, []);
  const user = useSelector((store) => store.userData.info);
  const [generalError, setGeneralError] = useState("");
  const dispatch = useDispatch();
  // react-hook-form
  const registerCourseForm = useForm();
  const { register, handleSubmit, formState, setError, reset } =
    registerCourseForm;
  let { errors } = formState;

  async function handleSubmitRegisterCourse(formData, e) {
    if (user) {
      setGeneralError("");
      dispatch(openLoader("قيد التسجيل"));
      const result = await fetchRegisterCourseRequest({
        tokenCourse: token,
        usserName: formData.registerCourseArabicName,
        usserEmail: formData.registerCourseEmail,
        userPhone: formData.registerCoursePhone,
        userCity: formData.registerCourseCity,
        nots: "string",
      });
      if (result.errors) {
        console.log("acc register result.errors");
        console.log(result.errors);
      } else if (result?.message) {
        // triggerToast(result?.message);
        toast.success(result?.message);
      } else {
        if (result.error) {
          setGeneralError(result.error);
        } else {
          setGeneralError(result);
        }
      }
    } else {
      dispatch(toggleSignIn());
    }

    dispatch(closeLoader(""));
  }

  return (
    <form
      method="POST"
      onSubmit={handleSubmit(handleSubmitRegisterCourse)}
      action=""
      noValidate
      className="register-course-request flex flex-col gap-4 py-6 px-4 md:p-5"
      id="registerCourseForm"
    >
      {/* name arabic ! */}
      <div className="input">
        <label htmlFor="">الاسم الرباعي بالعربي*</label>
        <input
          type="text"
          name=""
          id="registerCourseArabicName"
          {...register("registerCourseArabicName", {
            required: "يجب كتابة الاسم الرباعي بالعربي",
          })}
          placeholder="اكتب اسمك رباعي"
        />
        <p className="input-error">
          {errors.registerCourseArabicName?.message}
        </p>
      </div>

      {/* email !*/}
      <div className="input">
        <label htmlFor="">عنوان البريد الإلكتروني*</label>
        <input
          type="email"
          name=""
          id="registerCourseEmail"
          {...register("registerCourseEmail", {
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: "يرجي كتابة عنوان بريد صحيح",
            },
            required: "يجب كتابة عنوان البريد الإلكتروني",
          })}
          placeholder="أدخل بريدك الإلكتروني"
        />
        <p className="input-error">{errors.registerCourseEmail?.message}</p>
      </div>

      {/* phone */}
      <div className="input">
        <label htmlFor="">الهاتف</label>
        <input
          type="text"
          name=""
          id="registerCoursePhone"
          {...register("registerCoursePhone", {
            required: "يجب كتابة رقم الهاتف",
          })}
          placeholder="اكتب الهاتف"
        />
        <p className="input-error">{errors.registerCoursePhone?.message}</p>
      </div>

      {/* city  ! */}
      <div className="select">
        <label htmlFor="registerCourseCity">المدينة*</label>
        <div className="select relative">
          <select
            id="registerCourseCity"
            className="focus:outline-none"
            {...register("registerCourseCity", {
              required: "يجب اختيار المدينة",
            })}
          >
            <option value="" style={{ display: "none" }}>
              اختر المدينة
            </option>
            {allCities.map((e, i) => (
              <option key={i} value={e.Arabic}>
                {e.Arabic}
              </option>
            ))}
            <option value="غير ذلك">غير ذلك</option>
          </select>
        </div>
        <p className="input-error">{errors.city?.message}</p>
      </div>

      {/* details !*/}
      <div className="input md:col-span-2">
        <label htmlFor="details">تفاصيل الطلب*</label>
        <div className="select relative">
          <textarea
            name=""
            id="details"
            className="w-full focus:outline-none !p-0 !border-0"
            {...register("details", {
              required: "يجب كتابة تفاصيل الطلب*",
            })}
          ></textarea>
        </div>
        <p className="input-error">{errors.details?.message}</p>
      </div>

      {/* general error */}
      <p
        style={{ display: generalError ? "block" : "none" }}
        className={`input-error`}
      >
        {generalError}
      </p>
      {/* submit */}
      <button
        className="py-3 w-full sm:w-fit ms-auto mt-1 smmt-4 px-6 md:py-4 md:px-8 text-white rounded-lg md:rounded-[10px] font-bold text-[11px] sm:text-sm md:text-base"
        style={{
          background:
            "linear-gradient(83.79deg, #1B45B4 3.25%, #1C2792 96.85%)",
          letterSpacing: "0.5px",
        }}
        type="submit"
      >
        تسجيل في الدورة
      </button>
    </form>
  );
};

const Accordion = ({
  title,
  data,
  table,
  active: starting,
  form,
  test,
  token,
  isOnline,
}) => {
  const [active, setActive] = useState(starting ? true : false);
  const router = useRouter();
  console.log(table);
  return (
    <div
      className={`accordion-item  ${active && "active"} ${
        !(data || table || form) && " !hidden "
      }`}
    >
      <button className="accordion-header" onClick={() => setActive(!active)}>
        <span className="text-sm md:text-lg font-medium text-[#252525]">
          {title}
        </span>
        <svg
          width={20}
          height={20}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.25 12.5L10 6.25L3.75 12.5"
            stroke="#1C1C1C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="accordion-content">
        <div className="wrapper !p-2 sm:p-4">
          {/* test table */}
          {test && (
            <table
              className="w-full flex sm:table"
              style={{ borderSpacing: "0 8px", borderCollapse: "separate" }}
            >
              <thead className="shadow-md abad-shadow hidden sm:table-header-group relative translate-y-1">
                <tr
                  className="bg-white"
                  style={{ boxShadow: "5px 4px 30px 0px #00000014" }}
                >
                  <th>تاريخ الدورة</th>
                  <th>وقت الدورة</th>
                  <th>سعر الدورة</th>
                  <th>الاجراءات</th>
                </tr>
              </thead>
              <tbody className="flex flex-col gap-2 sm:table-row-group w-full">
                {table?.map((e, i) => (
                  <tr
                    style={{ boxShadow: "5px 4px 30px 0px #00000014" }}
                    className="w-full p-2 [&>td]:p-0 sm:[&>td]:p-4 flex flex-col gap-3 sm:table-row bg-white"
                    key={i}
                  >
                    <td>
                      <div className="flex items-center gap-1 font-bold">
                        <span className="inline sm:hidden font-normal">
                          بداية الدورة :
                        </span>
                        <span className="flex gap-1 md:inline-block">
                          {/* <p>يوم الجمعة</p> */}
                          <p>{e?.startDate}</p>
                        </span>
                      </div>
                      {/* attendance status */}
                      <div className="text-[#0589F0] flex mt-1.5 md:mt-0 items-center gap-2.5 attendance-status font-bold">
                        <div className="flex items-center gap-1">
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.00033 8.33317C6.84127 8.33317 8.33366 6.84079 8.33366 4.99984C8.33366 3.15889 6.84127 1.6665 5.00033 1.6665C3.15938 1.6665 1.66699 3.15889 1.66699 4.99984C1.66699 6.84079 3.15938 8.33317 5.00033 8.33317Z"
                              fill="currentColor"
                            />
                          </svg>

                          <span>{isOnline ? "أونلاين" : "حضوري"}</span>
                        </div>
                        <div className="text-abad-cyan md:hidden">{e?.price} ريال</div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1 md:block">
                        <div className="font-medium md:font-bold">
                          {e?.formattedTimeStart}
                          {/* الجمعة و السبت */}
                        {/* </div>
                        <div className="font-medium md:mt-2"> */}
                          {/* من ٦مساء : الي ٨ مساء */}
                        </div>
                      </div>
                    </td>
                    <td className="text-sm hidden md:table-cell font-bold text-abad-cyan md:text-black">
                      {e?.price} ريال
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        {/* {isOnline ? ( */}
                        <Link
                          href="/basket"
                          className="register-btn w-fit text-center enlist !bg-[#F6F6F6] !text-abad-cyan font-bold flex items-center gap-1"
                          onClick={(ev) => {
                            ev.preventDefault();
                            handleAddToBasket(token, router);
                          }}
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_1522_11666)">
                              <path
                                d="M0.5 0.5C0.223858 0.5 0 0.723858 0 1C0 1.27614 0.223858 1.5 0.5 1.5H1.38965C1.46245 1.5 1.5334 1.52291 1.59245 1.56547C1.65151 1.60804 1.69568 1.66811 1.71869 1.73718L3.36719 6.68359C3.44039 6.90321 3.4497 7.13967 3.39355 7.36426L3.25781 7.9082C3.05864 8.70489 3.67879 9.5 4.5 9.5H10.5C10.7761 9.5 11 9.27614 11 9C11 8.72386 10.7761 8.5 10.5 8.5H4.5C4.30531 8.5 4.18032 8.34025 4.22754 8.15137L4.32991 7.74252C4.34725 7.67324 4.38725 7.61175 4.44355 7.56781C4.49984 7.52387 4.56921 7.5 4.64062 7.5H10C10.2153 7.50011 10.4065 7.36242 10.4746 7.1582L11.8076 3.1582C11.9156 2.83431 11.6744 2.49984 11.333 2.5H3.27734C3.20454 2.5 3.13359 2.47709 3.07453 2.43453C3.01548 2.39196 2.97131 2.33189 2.94829 2.26283L2.47461 0.841797C2.40648 0.637577 2.21529 0.499888 2 0.5H0.5ZM4 10C3.44772 10 3 10.4477 3 11C3 11.5523 3.44772 12 4 12C4.55228 12 5 11.5523 5 11C5 10.4477 4.55228 10 4 10ZM10 10C9.44771 10 9 10.4477 9 11C9 11.5523 9.44771 12 10 12C10.5523 12 11 11.5523 11 11C11 10.4477 10.5523 10 10 10Z"
                                fill="#2057B2"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_1522_11666">
                                <rect width="12" height="12" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <span>اضافة الي السلة</span>
                        </Link>
                        {/* ) : ( */}
                        <button
                          href="/"
                          className="w-fit  text-center enlist !bg-[#F6F6F6] !text-abad-cyan font-bold"
                          onClick={() => handleRegisterAttendanceCourse(token)}
                        >
                          <svg
                            //3a96b4a5-84c9-4a75-92da-82b99dcdafa2
                            xmlns="http://www.w3.org/2000/svg"
                            width={14}
                            height={11}
                            viewBox="0 0 14 11"
                            fill="currentColor"
                          >
                            <path d="M6.66667 7.33333H5.33333C4.23973 7.33292 3.16682 7.63143 2.23058 8.1966C1.29435 8.76178 0.530401 9.57211 0.0213343 10.54C0.00702532 10.3604 -9.15218e-05 10.1802 8.88408e-07 10C8.88408e-07 6.318 2.98467 3.33333 6.66667 3.33333V0L13.3333 5.33333L6.66667 10.6667V7.33333Z" />
                          </svg>
                          تسجيل
                        </button>
                        {/* )} */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {/* table */}
          {table && !test && (
            <table className="w-full flex sm:table">
              <thead className="shadow-md abad-shadow hidden sm:table-header-group">
                <tr>
                  <th>موعد الدورة</th>
                  <th>وقت الدورة</th>
                  <th>الاجراءات</th>
                </tr>
              </thead>
              <tbody className="flex flex-col gap-2 sm:table-row-group w-full">
                {table?.map((e, i) => (
                  <tr
                    style={{ boxShadow: "5px 4px 30px 0px #00000014" }}
                    className="shadow w-full p-2 [&>td]:p-0 sm:[&>td]:p-4 flex flex-col gap-2 sm:table-row"
                    key={i}
                  >
                    <td>
                      <div className="flex items-center gap-1">
                        <span className="inline sm:hidden">بداية الدورة :</span>
                        <span className="font-medium">{e?.startDate}</span>
                      </div>
                    </td>
                    <td>{e?.formattedTimeStart}</td>
                    <td>
                      {isOnline ? (
                        <Link
                          href="/basket"
                          className="register-btn text-center w-fit enlist sm:!bg-[#FDB614] sm:!text-black"
                          onClick={(ev) => {
                            ev.preventDefault();
                            handleAddToBasket(token, router);
                          }}
                        >
                          شراء الدورة
                        </Link>
                      ) : (
                        <button
                          href="/"
                          className="w-fit enlist sm:!bg-[#FDB614] sm:!text-black"
                          onClick={() => handleRegisterAttendanceCourse(token)}
                        >
                          <svg
                            //3a96b4a5-84c9-4a75-92da-82b99dcdafa2
                            xmlns="http://www.w3.org/2000/svg"
                            width={14}
                            height={11}
                            viewBox="0 0 14 11"
                            fill="currentColor"
                          >
                            <path d="M6.66667 7.33333H5.33333C4.23973 7.33292 3.16682 7.63143 2.23058 8.1966C1.29435 8.76178 0.530401 9.57211 0.0213343 10.54C0.00702532 10.3604 -9.15218e-05 10.1802 8.88408e-07 10C8.88408e-07 6.318 2.98467 3.33333 6.66667 3.33333V0L13.3333 5.33333L6.66667 10.6667V7.33333Z" />
                          </svg>
                          تسجيل
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {data && (
            <div
              className="handle-html-styles"
              dangerouslySetInnerHTML={{ __html: data }}
            />
          )}
          {form && <AccordionForm form={form} token={token} />}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
