"use client";
import { fetchWithCheck } from "@/helperFunctions/dataFetching";
import React, { useRef } from "react";
import { toast } from "react-toastify";

async function fetchSubscripe(data) {
  const requestData = await fetchWithCheck(
    "/api/subscriptions/subscripe",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  return requestData;
}

const SubscriptionWithEmail = () => {
  let email = useRef();
  let name = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await fetchSubscripe({
        name: name.current.value,
        email: email.current.value,
      });
      toast.success(result);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="input-name input rounded-3xl px-3 flex items-center bg-[#D9D9D9] bg-opacity-20 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
              stroke="#E1E1E1"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
              stroke="#E1E1E1"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            placeholder=""
            className="focus:outline-none caret-white p-3.5 bg-transparent"
            type="text"
            name=""
            required
            ref={name}
            id=""
          />
          <span className="placeholder text-white">اسمك</span>
        </div>
        <div className="input-email input rounded-3xl px-3 flex items-center bg-[#D9D9D9] bg-opacity-20 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={22}
            viewBox="0 0 24 22"
            fill="none"
          >
            <path
              d="M4 3.66663H20C21.1 3.66663 22 4.49163 22 5.49996V16.5C22 17.5083 21.1 18.3333 20 18.3333H4C2.9 18.3333 2 17.5083 2 16.5V5.49996C2 4.49163 2.9 3.66663 4 3.66663Z"
              stroke="#E1E1E1"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 5.5L12 11.9167L2 5.5"
              stroke="#E1E1E1"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            placeholder=""
            className="focus:outline-none caret-white p-3.5 bg-transparent"
            type="email"
            name=""
            required
            ref={email}
            id=""
          />
          <span className="placeholder text-white">
            عنوان البريد الإلكتروني
          </span>
        </div>
        <button
          href="mailto:Info@abadnet.com.sa"
          className="bg-abad-gold rounded-xl py-2 font-bold px-7 md:w-fit"
          type="submit"
        >
          ارسال
        </button>
      </form>
    </>
  );
};

export default SubscriptionWithEmail;
