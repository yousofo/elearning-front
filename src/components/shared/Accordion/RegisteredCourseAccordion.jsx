"use client";
import "./accordion.css";
import React, { useState } from "react";
//

const RegisteredCourseAccordion = ({ title, data, children }) => {
  const [active, setActive] = useState(false);
  console.log(data);
  return (
    <div className={`accordion-item  ${active && "active"}`}>
      <button className="accordion-header" onClick={() => setActive(!active)}>
        <span className="text-sm md:text-lg font-medium text-[#252525]">
          {title}
        </span>
        <svg
          width={20}
          height={20}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.25 12.5L10 6.25L3.75 12.5"
            stroke="#1C1C1C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="accordion-content">
        <div className="wrapper !p-2 md:!px-4">
          <table
            className="w-full block md:table"
            style={{ borderSpacing: "0 8px", borderCollapse: "separate" }}
          >
            <thead className="hidden md:table-header-group shadow-md abad-shadow">
              <tr className="bg-[#1C40AF] [&>th]:p-4 [&>th]:text-start text-white">
                <th>اليوم</th>
                <th>الوقت</th>
                <th>
                  <span className="ps-3.5">الحالة</span>
                </th>
                <th>الاجراءات</th>
              </tr>
            </thead>
            <tbody className=" flex flex-col gap-2 md:table-row-group">
              {data?.map((e, i) => (
                <tr
                  className="shadow [&>td]:!font-medium [&>td]:p-0 md:[&>td]:p-4 p-3 md:p-0 [&>td]:block md:[&>td]:table-cell flex flex-col gap-1.5 md:table-row"
                  style={{ boxShadow: "5px 4px 30px 0px #00000014" }}
                  key={i}
                >
                  <td className="order-2">{e?.dayName}</td>
                  <td className="text-xs order-3">السادسة 6 مساءا</td>
                  <td className="text-xs !font-medium order-1">
                    <span className="text-[#1B45B4] bg-[#F3F3F3] py-1.5 px-3 rounded-lg">
                      تم التسجيل
                    </span>
                  </td>
                  <td className="w-full md:w-fit order-4">
                    <a
                      href=""
                      style={{
                        background:
                          "linear-gradient(83.79deg, #1B45B4 3.25%, #1C2792 96.85%)",
                        letterSpacing: "0.5px",
                      }}
                      className="text-white py-2 px-4 rounded w-full md:w-fit flex items-center justify-center gap-1 text-center"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.66667 9.33333H7.33333C6.23973 9.33292 5.16682 9.63143 4.23058 10.1966C3.29435 10.7618 2.5304 11.5721 2.02133 12.54C2.00703 12.3604 1.99991 12.1802 2 12C2 8.318 4.98467 5.33333 8.66667 5.33333V2L15.3333 7.33333L8.66667 12.6667V9.33333Z"
                          fill="white"
                        />
                      </svg>
                      <span>مشاهدة</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RegisteredCourseAccordion;
