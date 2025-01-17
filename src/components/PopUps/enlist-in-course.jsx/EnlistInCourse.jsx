"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeLoader,
  openLoader,
  resetPopUps,
} from "@/components/GlobalState/Features/popUpsSlice";
import { fetchRegisterAttendanceCourse } from "@/helperFunctions/dataFetching";
import { getUserInfoFromStore } from "@/helperFunctions/signedInActions";
import { toast } from "react-toastify";

const EnlistInCourse = () => {
  const currentCourseToken = useSelector(
    (store) => store.popUps.currentCourseToken
  );
  const dispatch = useDispatch();
  console.log("currentCourseToken");
  console.log(currentCourseToken);
  async function handleClick() {
    // dispatch(resetPopUps());
    dispatch(openLoader(""));
    const user = getUserInfoFromStore();
    console.log(user);
    const result = await fetchRegisterAttendanceCourse({
      courseToken: currentCourseToken,
      userToken: user.token,
    });
    console.log(result);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    dispatch(closeLoader());
  }
  return (
    <div className={`flex flex-col gap-7 md:gap-10 `}>
      <div className="flex flex-col gap-3">
        <h2 className="text-[22px] sm:text-3xl font-bold text-[#03133D]">
          ستبدأ الدورة قريباً و سيتم إشعارك بالموعد
        </h2>
        <p className="text-xs sm:text-lg text-[#68718B]">
          هل انت متأكد أنك تريد التسجيل في هذه الدورة؟
        </p>
      </div>
      {/* <form action="" className="flex flex-col gap-4">
        <div className="input">
          <label htmlFor="">الاسم*</label>
          <input type="email" name="" placeholder="اكتب اسمك رباعي" id="" />
        </div>
        <div className="input">
          <label htmlFor="">عنوان البريد الإلكتروني*</label>
          <input
            type="email"
            name=""
            placeholder="أدخل بريدك الإلكتروني"
            id=""
          />
        </div>
        <div className="input">
          <label htmlFor="">الهاتف</label>
          <input type="email" name="" placeholder="اكتب الهاتف" id="" />
        </div>
        <div className="input">
          <label htmlFor="">المدينة*</label>
          <input type="email" name="" placeholder="" id="" />
        </div>
        <div className="input">
          <label htmlFor="">هل لديك استفسار؟</label>
          <textarea
            type="email"
            name=""
            placeholder="اكتب استفسارك"
            id=""
          ></textarea>
        </div>
      </form> */}
      <button
        onClick={handleClick}
        className="login text-white font-bold"
        type="submit"
      >
        تسجيل في الدورة
      </button>
    </div>
  );
};

export default EnlistInCourse;
