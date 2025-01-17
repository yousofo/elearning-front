import { toggleSignIn } from "@/components/GlobalState/Features/authSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const PasswordReassigned = () => {
  const isPasswordReassigned = useSelector((state) => state.auth.newPassword);
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(toggleSignIn());
  }
  return (
    <div
      style={{
        display: isPasswordReassigned ? "flex" : "none",
      }}
      className={` password-reassigned`}
    >
      {/* success logo */}
      <div
        style={{
          background:
            "linear-gradient(83.79deg, #1B45B4 3.25%, #1C2792 96.85%)",
          borderRadius: "50%",
          padding: "1.5rem",
          width: "fit-content",
        }}
      >
        <svg
          width="81"
          height="81"
          viewBox="0 0 81 81"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.5 40.2165L29.2165 61.9331L72.7263 18.5"
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <h2>تم تعيين كلمة السر بنجاح</h2>
        <p>شكرا لثقتكم في اباد للتدريب</p>
      </div>
      {/* to sign up */}
      <button onClick={handleClick}>دخول</button>
    </div>
  );
};

export default PasswordReassigned;
