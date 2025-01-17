"use client";
import React, { useEffect, useRef, useState } from "react";
import "./newPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleNewPassword } from "@/components/GlobalState/Features/authSlice";
import { useRouter } from "next/navigation";
import Hero from "@/components/shared/hero/Hero";
import { fetchWithCheck } from "@/helperFunctions/dataFetching";
import { toast } from "react-toastify";
import { closeLoader, openLoader } from "@/components/GlobalState/Features/popUpsSlice";
async function fetchNewPassword(data) {
  try {
    const result = await fetchWithCheck("/api/student/newPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const NewPassword = ({ params }) => {
  let password = useRef(null);
  let confirmPassword = useRef(null);
  const isSignedIn = useSelector((store) => store.auth.isSignedIn);
  const isPasswordReassigned = useSelector((state) => state.auth.newPassword);
  const router = useRouter();
  const token = params.resetPasswordToken;
  const [finished,setFinished]=useState(false);
  // if(isSignedIn) router.push("/")

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    dispatch(openLoader("جاري التحديث"));
    e.preventDefault();
    if (password.current.value == confirmPassword.current.value) {
      try {
        const result = await fetchNewPassword({
          token: token,
          password: password.current.value,
        });
        console.log(result);
        setFinished(true);
        dispatch(toggleNewPassword());
      } catch (error) {
        toast.error(error.error);
      }
    } else {
      toast.error("كلمة السر غير متطابقة");
    }
    dispatch(closeLoader());
  }

  useEffect(() => {
    if (isSignedIn) router.replace("/");
    
    if(finished && !isPasswordReassigned) router.replace("/");
  }, [isPasswordReassigned,finished]);
  return (
    <main className="pb-10">
      {/* HERO start  */}
      <Hero>
        <h2 className="text-2xl font-medium md:text-4xl lg:text-5xl xl:text-6xl sm:max-w-fit">
          <span className="text-abad-gold whitespace-nowrap">تعيين</span>
          &nbsp;
          <span>كلمة سر جديدة</span>
        </h2>
      </Hero>
      {/* HERO end  */}
      {/* main content start */}
      <form
        onSubmit={handleSubmit}
        className="newPassword w-full mx-auto px-4 max-w-screen-lg flex flex-wrap gap-4  "
        id=""
      >
        <div>
          <label htmlFor="newPasswordPass">الرقم السري الجديد*</label>
          <input
            type="password"
            ref={password}
            name=""
            placeholder="اكتب الرقم السري الجديد"
            id="newPasswordPass"
          />
        </div>
        <div>
          <label htmlFor="newPasswordRePass">إعادة الرقم السري الجديد*</label>
          <input
            type="password"
            ref={confirmPassword}
            name=""
            placeholder="اكتب الرقم السري الجديد"
            id="newPasswordRePass"
          />
        </div>
        <input
          type="submit"
          defaultValue="ارسال"
          className="py-3 cursor-pointer px-6 mt-4 md:mt-8 rounded-2xl bg-[#FDB614] text-[#282828] font-medium w-fit ms-auto"
        />
      </form>
      {/* main content end */}
    </main>
  );
};

export default NewPassword;
