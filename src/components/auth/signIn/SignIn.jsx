"use client";
import {
  addSignInError,
  toggleForgotPassword,
  toggleSignUp,
  toggleSignedIn,
} from "@/components/GlobalState/Features/authSlice";
import { reset } from "@/components/GlobalState/Features/navListSlice";
import {
  closeLoader,
  openLoader,
} from "@/components/GlobalState/Features/popUpsSlice";
import { toggleUpdateInfo } from "@/components/GlobalState/Features/userData";
import { fetchSignIn } from "@/helperFunctions/auth";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//
//
const SignIn = () => {
  const [remember, setRemember] = useState(false);

  const email = useRef();
  const password = useRef();

  const error = useSelector((state) => state.auth.signInError);
  const dispatch = useDispatch();

  function handleForgotPassword(e) {
    e.preventDefault();
    dispatch(toggleForgotPassword());
  }
  //
  async function handleSignIn(e) {
    e.preventDefault();
    dispatch(openLoader(""));

    const result = await fetchSignIn({
      email: email.current.value,
      password: password.current.value,
    });
    if (result.token) {
      console.log(result);
      dispatch(toggleUpdateInfo(result));

      // save user data if remember me is chekced
      // dispatch(toggleSignedIn({ userData: result, days: 30 }));
      if (remember && typeof window != undefined) {
        dispatch(toggleSignedIn({ userData: result, days: 30 }));
      } else {
        dispatch(toggleSignedIn({ userData: result, days: 0 }));
      }

      dispatch(reset());
    } else {
      if (result.message) {
        dispatch(addSignInError(result.message));
      } else {
        dispatch(addSignInError(result.join("*")));
      }
    }

    dispatch(closeLoader(""));
  }

  return (
    <div className={`auth-signin`}>
      <div>
        <h2>
          <span>تسجيل الدخول إلى</span>
          &nbsp;
          <span>آباد</span>
        </h2>
        <p>املأ بريدك الإلكتروني وكلمة المرور لتسجيل الدخول</p>
      </div>
      <form action="">
        <div className="input">
          <label htmlFor="">عنوان البريد الإلكتروني</label>
          <input
            tabIndex={1}
            ref={email}
            type="email"
            name=""
            required
            placeholder="أدخل بريدك الإلكتروني"
          />
        </div>
        <div className="input">
          <label htmlFor="">كلمة المرور</label>
          <input
            tabIndex={2}
            ref={password}
            required
            type="password"
            name=""
            placeholder="أدخل كلمة المرور"
          />
        </div>
        <div>
          <div>
            <input
              type="checkbox"
              name="rememberMe"
              value={remember}
              onChange={(e) => setRemember(e.target.value)}
              id="rememberMe"
            />
            <label htmlFor="rememberMe" style={{ color: "#68718B]" }}>
              تذكرني
            </label>
          </div>
          <span
            className="forgot-password cursor-pointer"
            tabIndex={4}
            onClick={handleForgotPassword}
          >
            نسيت كلمة السر؟
          </span>
        </div>
        <button
          className="login-btn"
          tabIndex={3}
          type="submit"
          onClick={handleSignIn}
        >
          تسجيل الدخول
        </button>
      </form>
      <div>
        <span style={{ display: error ? "inline" : "none" }}>
          {error.split("*").map((e, i) => (
            <p key={i}>{e}</p>
          ))}
        </span>
        <p>
          <span style={{ color: "#68718B" }}>ليس لديك حساب؟</span>
          &nbsp;
          {/* to sign up */}
          <button
            onClick={() => dispatch(toggleSignUp())}
            style={{ color: "#133491" }}
          >
            سجل الان
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
