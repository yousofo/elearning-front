"use client";
import React, { useEffect, useRef } from "react";
import "./change-password.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Hero from "@/components/shared/hero/Hero";
import {
  closeLoader,
  openLoader,
} from "@/components/GlobalState/Features/popUpsSlice";
import { toast } from "react-toastify";
import { handleValidateToken } from "@/helperFunctions/signedInActions";
import { useRouter } from "next/navigation";

async function fetchUpdatePassword(data, token) {
  try {
    const result = await fetch(`/api/student/updatePassword/${token}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const resultData = await result.json();
    return resultData;
  } catch (error) {
    console.log(error);
  }
}

const ChangePassword = () => {
  const userJson = useSelector((store) => store.userData.info);
  let oldPassword = useRef(null);
  let newPassword = useRef(null);
  let confirmNewPassword = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter()

  async function handleSubmit(e) {
    dispatch(openLoader("جاري التحديث"));
    e.preventDefault();
    const result = await fetchUpdatePassword(
      {
        oldPassword: oldPassword.current.value,
        password: newPassword.current.value,
        confirmPassword: confirmNewPassword.current.value,
      },
      userJson.token
    );
    if (result.message) {
      toast.success(result.message);
    } else {
      for (var message of Object.values(result.errors)) {
        toast.error(...message);
      }
    }
    console.log(result);
    dispatch(closeLoader(""));
  }

  useEffect(() => {
    if(!isUserSignedIn()){
      router.replace("/")
      return;
    }
    handleValidateToken().then((e) => {
      if (!e) {
        router.replace("/");
        return;
      }
    });
  }, []);
  return (
    <main className="pb-10 sm:pb-24 relative">
      {/* HERO start  */}
      <Hero>
        <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl xl:text-6xl max-w-60 sm:max-w-fit">
          <span className="text-abad-gold whitespace-nowrap">الملف</span>
          &nbsp;
          <span>الشخصي</span>
        </h2>
      </Hero>
      {/* HERO end  */}
      {/* main content start */}
      <section className="profile flex flex-col gap-8 max-w-screen-xl mx-auto px-4 sm:mb-10 md:mb-16 lg:mb-20 xl:mb-24">
        <form
          action=""
          id="updatePasswordForm"
          className="flex flex-wrap gap-4"
          onSubmit={handleSubmit}
        >
          <div className="input w-full flex-auto">
            <label htmlFor="">الرقم السري القديم</label>
            <input
              type="password"
              ref={oldPassword}
              name=""
              placeholder="اكتب الرقم السري القديم"
              id=""
            />
          </div>
          <div className="input flex-1">
            <label htmlFor="">الرقم السري الجديد</label>
            <input
              ref={newPassword}
              type="password"
              name=""
              placeholder="اكتب الرقم السري الجديد"
              id=""
            />
          </div>
          <div className="input flex-1">
            <label htmlFor="">إعادة الرقم السري الجديد*</label>
            <input
              type="password"
              ref={confirmNewPassword}
              name=""
              placeholder="اكتب الرقم السري الجديد"
              id=""
            />
          </div>
        </form>
        <div className="btns">
          <Link href="/profile" className="text-[#8D8181]">
            رجوع
          </Link>
          <button
            form="updatePasswordForm"
            className="bg-abad-gold text-[#282828]"
            type="submit"
          >
            حفظ التغييرات
          </button>
        </div>
      </section>
      {/* main content end */}
    </main>
  );
};

export default ChangePassword;
