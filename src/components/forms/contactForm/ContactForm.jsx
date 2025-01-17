"use client";
import {
  closeLoader,
  openLoader,
} from "@/components/GlobalState/Features/popUpsSlice";
import { fetchContactUsRequest } from "@/helperFunctions/dataFetching";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const ContactForm = () => {
  const dispatch = useDispatch();

  //form validation
  const [generalError, setGeneralError] = useState("");
  // react-hook-form
  const signUpForm = useForm();
  const {
    register,
    handleSubmit,
    control,
    formState,
    setError,
    reset,
    trigger,
  } = signUpForm;
  let { errors, isSubmitted } = formState;

  async function handleSubmitSignUp(formData, e) {
    setGeneralError("");
    dispatch(openLoader("جاري التسجيل"));

    const result = await fetchContactUsRequest({
      fullName: formData.contactName,
      email: formData.contactEmail,
      mobileNumber: formData.contactPhone,
      requestType: formData.contactRequestType,
      message: formData.contactMessage,
    });

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
      setGeneralError(result.error);
    }

    dispatch(closeLoader());
  }
  return (
    <form
      className="flex-1"
      method="POST"
      onSubmit={handleSubmit(handleSubmitSignUp)}
      action=""
      noValidate
      id="contactForm"
    >
      {/* name arabic ! */}
      <div className="input">
        <label htmlFor="contactName">الاسم الرباعي بالعربي*</label>
        <input
          type="text"
          name=""
          id="contactName"
          {...register("contactName", {
            required: "يجب كتابة الاسم الرباعي بالعربي",
          })}
          placeholder="اكتب اسمك بالكامل"
        />
        <p className="input-error">{errors.contactName?.message}</p>
      </div>

      {/* email !*/}
      <div className="input">
        <label htmlFor="contactEmail">عنوان البريد الإلكتروني*</label>
        <input
          type="email"
          name=""
          id="contactEmail"
          {...register("contactEmail", {
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: "يرجي كتابة عنوان بريد صحيح",
            },
            required: "يجب كتابة عنوان البريد الإلكتروني",
          })}
          placeholder="اكتب البريد الالكتروني"
        />
        <p className="input-error">{errors.contactEmail?.message}</p>
      </div>

      {/* phone */}
      <div className="input">
        <label htmlFor="contactPhone">الهاتف</label>
        <input
          type="text"
          name=""
          id="contactPhone"
          {...register("contactPhone", {
            required: "يجب كتابة رقم الهاتف",
          })}
          placeholder="رقم الجوال"
        />
        <p className="input-error">{errors.contactPhone?.message}</p>
      </div>

      {/* request type ! */}
      <div className="input">
        <label htmlFor="contactRequestType">نوع الطلب</label>
        <input
          type="text"
          name=""
          id="contactRequestType"
          {...register("contactRequestType", {
            required: "يجب كتابة نوع الطلب",
          })}
          placeholder="اكتب نوع الطلب"
        />
        <p className="input-error">{errors.contactRequestType?.message}</p>
      </div>

      {/* contact message*/}
      <div className="input">
        <label htmlFor="contactMessage">الرسالة</label>
        <textarea
          type="text"
          name=""
          id="contactMessage"
          {...register("contactMessage", {
            required: "يجب كتابة الرسالة",
          })}
          placeholder="اكتب رسالتك هنا .."
        ></textarea>
        <p className="input-error">{errors.contactMessage?.message}</p>
      </div>

      <input
        type="submit"
        value="ارسال"
        form="contactForm"
        className="py-3 px-6 rounded-2xl bg-[#FDB614] text-[#282828] font-medium w-fit ms-auto cursor-pointer"
      />
    </form>
  );
};

export default ContactForm;
