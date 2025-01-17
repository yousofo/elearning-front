"use client";
import "./popUps.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPopUps } from "../GlobalState/Features/popUpsSlice";
import EnlistInCourse from "./enlist-in-course.jsx/EnlistInCourse";
import SelectPaymentOption from "./select-payment-options/SelectPaymentOption";
import PaymentConfirmation from "./payment-confirmation/PaymentConfirmation";

const PopUps = () => {
  const dispatch = useDispatch();
  const isHidden = useSelector((e) => e.popUps.isHidden);
  const paymentOptionState = useSelector((e) => e.popUps.selectPaymentOptions);
  const enlistInCourseState = useSelector((e) => e.popUps.EnlistInCourse);
  const paymentConfirmationState = useSelector(
    (e) => e.popUps.paymentConfirmation
  );

  function handleAuthClose() {
    dispatch(resetPopUps());
  }

  return (
    <div
      onClick={handleAuthClose}
      className={`${isHidden ? "hidden" : "flex"} auth popups z-[199]`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${
          paymentOptionState
            ? "!rounded-sm !p-0"
            : "!rounded-2xl py-7 px-6 md:py-12 md:px-10"
        } auth-container bg-white h-fit w-max max-w-[800px] relative`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={`${paymentOptionState ? "#FFFFFF" : "#03133d"}`}
          width="20px"
          height="20px"
          viewBox="0 0 256 256"
          className="absolute top-1 right-1 z-10 cursor-pointer"
          onClick={handleAuthClose}
        >
          <path d="M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z" />
        </svg>
        {enlistInCourseState && <EnlistInCourse />}
        {paymentOptionState && <SelectPaymentOption />}
        {paymentConfirmationState.active && <PaymentConfirmation />}
      </div>
    </div>
  );
};

export default PopUps;
