"use client";

import React, { useEffect, useState } from "react";
import "./privacy.css";
import Hero from "@/components/shared/hero/Hero";
import { fetchWithCheck } from "@/helperFunctions/dataFetching";
import { useDispatch } from "react-redux";
import {
  closeLoader,
  openLoader,
} from "@/components/GlobalState/Features/popUpsSlice";
const Privacy = () => {
  const [privacyData, setPrivacyData] = useState(null);
  const [current, setCurrent] = useState("يا هلا");
  const [activeSection, setActiveSection] = useState(1);
  const dispatch = useDispatch();

  const sections = [
    ["شروط الخدمة", "termsofService"],
    ["سياسة الخصوصية", "privacyPolicy"],
    ["سياسة الملكية الفكرية", "intellectualPropertyPolicy"],
    ["اتفاقية الخدمات الرئيسية", "mainServicesAgreement"],
    ["سياسة العروض الترويجية", "promotionsPolicy"],
  ];

  function handleClick(event, name) {
    setCurrent(privacyData[`${name}`]);
  }
  useEffect(() => {
    dispatch(openLoader(""));
    fetchWithCheck(`/api/home/privacyData`, null, null)
      .then((result) => {
        setCurrent(result?.termsofService ?? "");
        setPrivacyData(result);
      })
      .finally(() => dispatch(closeLoader()));
  }, []);
  return (
    <main>
      {/* HERO start  */}
      <Hero>
        <h2 className="text-2xl font-medium md:text-3xl lg:text-4xl xl:text-5xl max-w-60 sm:max-w-fit">
          <span className="text-abad-gold whitespace-nowrap"> الخصوصية</span>
          <span>والاستخدام</span>
        </h2>
      </Hero>
      {/* HERO end  */}
      <section className="flex flex-col md:flex-row  gap-16 w-full px-8 max-w-screen-xl -mt-8 sm:mt-10 md:mt-16 lg:mt-20 xl:mt-28 mx-auto mb-8">
        <nav
          className="flex flex-col p-6 gap-8 w-max h-fit mx-auto text-[#8A8394]"
          style={{ boxShadow: "5px 4px 25px 0px #00000014" }}
        >
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={(event) => {
                setActiveSection(index + 1);
                handleClick(event, section[1])
              }}
              className={`${
                activeSection === index + 1 ? "text-[#260E3F]" : ""
              } `}
            >
              {section[0]}
            </button>
          ))}
        </nav>
        <article className="flex-1 flex flex-col gap-8 text-[#151318] font-medium md:text-lg">
          <h2 className="font-bold text-2xl md:text-[42px]">شروط الخدمة</h2>
          <div dangerouslySetInnerHTML={{ __html: current }} />
        </article>
      </section>
    </main>
  );
};

export default Privacy;
