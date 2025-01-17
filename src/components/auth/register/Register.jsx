"use client";
import { toggleSignIn, toggleSignedIn } from "@/components/GlobalState/Features/authSlice";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { cities, countries } from "@/components/data/data";
import { reset as reserNavList } from "@/components/GlobalState/Features/navListSlice";

import {
  closeLoader,
  openLoader,
} from "@/components/GlobalState/Features/popUpsSlice";
import { fetchRegisterUser, fetchSignIn } from "@/helperFunctions/auth";
import { toggleUpdateInfo } from "@/components/GlobalState/Features/userData";
import { toast } from "react-toastify";

const scrollToTop = (element) => {
  element.scrollIntoView({ behavior: "instant", block: "start" });
};

const Register = () => {
  const allCountries = useMemo(() => countries, []);
  const allCities = useMemo(() => cities, []);
  const [selectedCountry, setSelectedCountry] = useState("سعودي");
  const isSignUp = useSelector((e) => e.auth.signUp);
  const dispatch = useDispatch();
  let signUpContainer = useRef(null);
  const firstRender = useRef(true);

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

  const today = new Date();
  const tenYearsAgo = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
  const formattedMaxDate = tenYearsAgo.toISOString().split('T')[0]; // yyyy-mm-dd format
  function switchAuthMode(e) {
    e.preventDefault();
    dispatch(toggleSignIn());
  }
  console.log("rendered");
  async function handleSubmitSignUp(formData, e) {
    setGeneralError("");
    dispatch(openLoader("جاري التسجيل"));

    console.log(formData);
    const result = await fetchRegisterUser({
      ...formData,
      email: formData.signUpEmail,
      password: formData.signUpPassword,
      confirmPassword: formData.signUpConfirmPassword,
      // nationality: JSON.parse(formData.nationality.nationality_ar)
      // .nationality_ar,
    });
    console.log(result);
    if (result.errors) {
      scrollToTop(signUpContainer.current);
      console.log("errrrr");
      console.log(Object.entries(result.errors));
      Object.entries(result.errors).forEach(([key, value]) => {
        if (key == "$.birthDate") {
          setError("birthDate", { type: "manual", message: [...value] });
        } else if (key == "Password") {
          setError("signUpPassword", { type: "manual", message: [...value] });
        } else if (key == "Idnumber") {
          setError("idNumber", { type: "manual", message: [...value] });
        } else if (key == "ConfirmPassword") {
          setError("confirmPassword", { type: "manual", message: [...value] });
        } else {
          setError(`${key}`, { type: "manual", message: [...value] });
        }
      });
    } else if (result.message) {
      console.log(result);
      const signInResult = await fetchSignIn({
        email: formData.signUpEmail,
        password: formData.signUpPassword,
      });
      console.log(signInResult)
      dispatch(toggleUpdateInfo(signInResult));
      dispatch(toggleSignedIn({ userData: result, days: 30 }));
      toast(result.message)
      dispatch(reserNavList());
      // dispatch(toggleSignIn());
    } else {
      if (result.error) {
        setGeneralError(result.error);
      } else {
        console.log(result);
        // setGeneralError(result);
      }
    }
    console.log(errors);
    console.log(result);
    dispatch(closeLoader());
  }
  useEffect(() => {
    // Trigger validation when the selected country changes
    if (!firstRender.current) {
      trigger("idNumber");
      trigger("phone");
    } else {
      firstRender.current = false;
    }
  }, [selectedCountry, trigger]);
  return (
    <div
      style={{ display: isSignUp ? "flex" : "none" }}
      className={`auth-signup`}
      ref={signUpContainer}
    >
      <div>
        <h2>تسجيل حساب جديد</h2>
        <p>املأ بياناتك لتسجيل حساب جديد</p>
      </div>
      <form
        method="POST"
        onSubmit={handleSubmit(handleSubmitSignUp)}
        action=""
        noValidate
        id="signUpForm"
      >
        {/* name arabic ! arabicName*/}
        <div className="input">
          <label htmlFor="">الاسم الرباعي بالعربي*</label>
          <input
            type="text"
            name=""
            id="arabicName"
            {...register("arabicName", {
              required: "يجب كتابة الاسم الرباعي بالعربي",
            })}
            placeholder="اكتب اسمك رباعي"
          />
          <p className="input-error">{errors.arabicName?.message}</p>
        </div>

        {/* id ! idNumber*/}
        <div className="input">
          <label htmlFor="">رقم الهوية*</label>
          <input
            required
            type="text"
            name=""
            id="idNumber"
            {...register("idNumber", {
              required: "يجب كتابة رقم الهوية",
              validate: (value) => {
                if (selectedCountry === "سعودي") {
                  const tenDigitPattern = /^\d{10}$/; // Pattern for exactly 10 digits
                  return (
                    tenDigitPattern.test(value) ||
                    "يجب أن يكون رقم الهاتف مكون من 10 أرقام"
                  );
                } else {
                  return true;
                }
              },
            })}
            placeholder="ادخل رقم الهوية"
          />
          <p className="input-error">{errors.idNumber?.message}</p>
        </div>

        {/* nationality ! nationality*/}
        <div className="input nationality">
          <label htmlFor="nationality">الجنسية*</label>
          <div className="select relative">
            <Controller
              name="nationality"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  id="nationality"
                  value={selectedCountry}
                  // {...register("nationality", {
                  //   required: "يجب كتابة الجنسية",
                  // })}
                  onChange={(event) => {
                    field.onChange(event); // Update the value in the form
                    setSelectedCountry(event.target.value);
                  }}
                >
                  <option style={{ display: "none" }}>اختر الجنسية</option>
                  {allCountries.map((e, i) => (
                    <option key={i} value={e.nationality_ar}>
                      {e.nationality_ar}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
          <p className="input-error">{errors.nationality?.message}</p>
        </div>

        {/* email ! signUpEmail*/}
        <div className="input">
          <label htmlFor="">عنوان البريد الإلكتروني*</label>
          <input
            type="email"
            name=""
            id="signUpEmail"
            {...register("signUpEmail", {
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "يرجي كتابة عنوان بريد صحيح",
              },
              required: "يجب كتابة عنوان البريد الإلكتروني",
            })}
            placeholder="أدخل بريدك الإلكتروني"
          />
          <p className="input-error">{errors.signUpEmail?.message}</p>
        </div>

        {/* phone */}
        <div className="input">
          <label htmlFor="phone">الهاتف</label>
          <input
            type="text"
            name=""
            id="phone"
            {...register("phone", {
              required: "يجب كتابة رقم الهاتف",
              validate: (value) => {
                if (selectedCountry === "سعودي") {
                  const saudiPattern = /^5\d{8}$/;
                  return (
                    saudiPattern.test(value) ||
                    "يجب أن يكون رقم الهاتف بصيغة 5XX XXX XXX"
                  );
                } else {
                  // Validation for other countries or skip validation
                  return true;
                }
              },
            })}
            placeholder="اكتب الهاتف"
          />
          <p className="input-error">{errors.phone?.message}</p>
        </div>

        {/* birthDate */}
        <div className="input">
          <label htmlFor="birthDate">تاريخ الميلاد</label>
          <input
            type="date"
            name=""
            placeholder=""
            id="birthDate"
            className="w-full"
            {...register("birthDate", {
              required: "يجب ادخال تاريخ الميلاد",
            })}
            max={formattedMaxDate} // Set the max date to 16 years ago
          />
          <p className="input-error">{errors.birthDate?.message}</p>
        </div>

        {/* gender ! */}
        <div className="input">
          <label htmlFor="gender">الجنس*</label>
          <div className="select relative">
            <select
              name=""
              id="gender"
              {...register("gender", {
                required: "يجب اختيار الجنس",
              })}
            >
              <option value="" style={{ display: "none" }}>
                اختر الجنس
              </option>
              <option value="ذكر">ذكر</option>
              <option value="انثي">انثي</option>
            </select>
          </div>
          <p className="input-error">{errors.gender?.message}</p>
        </div>

        {/* educationsType */}
        <div className="input">
          <label htmlFor="">المؤهل العلمي</label>
          <input
            type="text"
            name=""
            id="educationsType"
            {...register("educationsType", {
              required: "يجب اختيار الؤهل العملي",
            })}
            placeholder="اكتب المؤهل التعليمي"
          />
          <p className="input-error">{errors.educationsType?.message}</p>
        </div>

        {/* city  ! */}
        <div className="input">
          <label htmlFor="signUpGender">المدينة*</label>
          {selectedCountry == "سعودي" ? (
            <div className="select relative">
              <select
                name=""
                {...register("city", {
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
          ) : (
            <div className="input">
              <input
                type="text"
                name=""
                id="city"
                {...register("city", {
                  required: "يجب اختيار المدينة",
                })}
                placeholder="اكتب المدينة"
              />
            </div>
          )}
          <p className="input-error">{errors.city?.message}</p>
        </div>

        {/* password ! signUpPassword*/}
        <div className="input">
          <label htmlFor="">كلمة المرور*</label>
          <input
            type="password"
            name=""
            {...register("signUpPassword", {
              required: "يجب كتابة كلمة المرور",
            })}
            placeholder="ادخل كلمة المرور"
          />
          <p className="input-error">{errors.signUpPassword?.message}</p>
        </div>

        {/* confirm password ! signUpConfirmPassword*/}
        <div className="input">
          <label htmlFor="">تأكيد كلمة المرور*</label>
          <input
            type="password"
            name=""
            {...register("signUpConfirmPassword", {
              required: "يجب تأكيد كلمة المرور",
            })}
            placeholder="تأكيد كلمة المرور*"
          />
          <p className="input-error">{errors.signUpConfirmPassword?.message}</p>
        </div>

        {/* general error */}
        <p
          style={{ display: generalError ? "block" : "none" }}
          className={`input-error`}
        >
          {generalError}
        </p>
      </form>
      <div>
        {/* sign up BUTTON */}
        <button
          className="signup-btn"
          form="signUpForm"
          onClick={() => {
            console.log("clicked");
            console.log(isSubmitted);
            reset(undefined, { keepDirtyValues: true });
            handleSubmit(handleSubmitSignUp);
          }}
        >
          تسجيل
        </button>
        <p>
          <span style={{ color: "#68718B" }}>لديك حساب؟</span>
          &nbsp;
          <button style={{ color: "#133491" }} onClick={switchAuthMode}>
            تسجيل دخول
          </button>
        </p>
      </div>
      {/* loader */}
    </div>
  );
};

export default Register;
