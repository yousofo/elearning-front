"use client";
import React from "react";
import SignIn from "./signIn/SignIn";
import Register from "./register/Register";
import "./auth.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleResetAuth } from "@/components/GlobalState/Features/authSlice";
import ForgotPassword from "./forgotPassword/ForgotPassword";
import PasswordReassigned from "./passwordReassigned/PasswordReassigned";

const Authentication = () => {
  const isHidden = useSelector((e) => e.auth.isHidden);
  const isSignUp = useSelector((e) => e.auth.signUp);
  const isForgotPassword = useSelector((state) => state.auth.forgotPassword);
  const isSignIn = useSelector((state) => state.auth.signIn);
  const isPasswordReassigned = useSelector((state) => state.auth.newPassword);
  const dispatch = useDispatch();
  function handleAuthClose() {
    dispatch(toggleResetAuth());
  }
  return (
    <div
      onClick={handleAuthClose}
      className={`auth z-[999999] ${isHidden ? "hidden" : "flex"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: isSignUp ? "814px" : "fit-content",
          width: isSignUp ? "814px" : "fit-content",
        }}
        className={`auth-container relative `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#03133d"
          width="20px"
          height="20px"
          viewBox="0 0 256 256"
          className="absolute top-2 right-2 z-10 cursor-pointer"
          onClick={handleAuthClose}
        >
          <path d="M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z" />
        </svg>
        {isSignIn && <SignIn />}
        {isSignUp && <Register />}
        {isPasswordReassigned && <PasswordReassigned />}
        {isForgotPassword && <ForgotPassword />}
      </div>
    </div>
  );
};

export default Authentication;
