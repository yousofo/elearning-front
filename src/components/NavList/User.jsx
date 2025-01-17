import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset as toggleResetNavList } from "../GlobalState/Features/navListSlice";

const User = () => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector((store) => store.userData.info);

  function handleCloseNavList() {
    dispatch(toggleResetNavList());
  }
  return (
    <div
      suppressHydrationWarning={true}
      className={`  items-center ${
        active ? "gap-2" : ""
      } relative z-20  cursor-pointer flex flex-col`}
      onClick={() => setActive(!active)}
    >
      <div className="flex items-center w-full gap-2">
        <img
          src="/media/placeholders/user-image.png"
          className="max-w-12"
          alt=""
        />
        <p>{userInfo.arabicName}</p>
        <svg
          width="6"
          height="9"
          viewBox="0 0 6 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`angle-down ms-auto ${active ? "active" : ""}`}
        >
          <path
            d="M5 1L2 4.5L5 8"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <ul
        className={`mini-nav [&>li>a]:flex [&>li>a]:py-3 [&>li>a]:text-sm [&>li>a]:items-center [&>li>a]:gap-1 [&>li>a]:w-full w-full overflow-hidden z-10 ${
          active ? " max-h-40 " : " max-h-0 "
        } transition-all`}
      >
        <li>
          <Link onClick={handleCloseNavList} href="/my-courses">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              version="1.1"
              id="Capa_1"
              width="24px"
              height="24px"
              viewBox="0 0 335.08 335.079"
              xmlSpace="preserve"
            >
              <g>
                <g>
                  <path d="M311.175,115.775c-1.355-10.186-1.546-27.73,7.915-33.621c0.169-0.108,0.295-0.264,0.443-0.398    c7.735-2.474,13.088-5.946,8.886-10.618l-114.102-34.38L29.56,62.445c0,0-21.157,3.024-19.267,35.894    c1.026,17.89,6.637,26.676,11.544,31l-15.161,4.569c-4.208,4.672,1.144,8.145,8.88,10.615c0.147,0.138,0.271,0.293,0.443,0.401    c9.455,5.896,9.273,23.438,7.913,33.626c-33.967,9.645-21.774,12.788-21.774,12.788l7.451,1.803    c-5.241,4.736-10.446,13.717-9.471,30.75c1.891,32.864,19.269,35.132,19.269,35.132l120.904,39.298l182.49-44.202    c0,0,12.197-3.148-21.779-12.794c-1.366-10.172-1.556-27.712,7.921-33.623c0.174-0.105,0.301-0.264,0.442-0.396    c7.736-2.474,13.084-5.943,8.881-10.615l-7.932-2.395c5.29-3.19,13.236-11.527,14.481-33.183    c0.859-14.896-3.027-23.62-7.525-28.756l15.678-3.794C332.949,128.569,345.146,125.421,311.175,115.775z M158.533,115.354    l30.688-6.307l103.708-21.312l15.451-3.178c-4.937,9.036-4.73,21.402-3.913,29.35c0.179,1.798,0.385,3.44,0.585,4.688    L288.14,122.8l-130.897,32.563L158.533,115.354z M26.71,147.337l15.449,3.178l99.597,20.474l8.701,1.782l0,0l0,0l26.093,5.363    l1.287,40.01L43.303,184.673l-13.263-3.296c0.195-1.25,0.401-2.89,0.588-4.693C31.44,168.742,31.651,156.373,26.71,147.337z     M20.708,96.757c-0.187-8.743,1.371-15.066,4.52-18.28c2.004-2.052,4.369-2.479,5.991-2.479c0.857,0,1.474,0.119,1.516,0.119    l79.607,25.953l39.717,12.949l-1.303,40.289L39.334,124.07l-5.88-1.647c-0.216-0.061-0.509-0.103-0.735-0.113    C32.26,122.277,21.244,121.263,20.708,96.757z M140.579,280.866L23.28,247.98c-0.217-0.063-0.507-0.105-0.733-0.116    c-0.467-0.031-11.488-1.044-12.021-25.544c-0.19-8.754,1.376-15.071,4.519-18.288c2.009-2.052,4.375-2.479,5.994-2.479    c0.859,0,1.474,0.115,1.519,0.115c0,0,0.005,0,0,0l119.316,38.908L140.579,280.866z M294.284,239.459    c0.185,1.804,0.391,3.443,0.591,4.693l-147.812,36.771l1.292-40.01l31.601-6.497l4.667,1.129l17.492-5.685l80.631-16.569    l15.457-3.18C293.261,219.146,293.466,231.517,294.284,239.459z M302.426,185.084c-0.269,0.006-0.538,0.042-0.791,0.122    l-11.148,3.121l-106.148,29.764l-1.298-40.289l34.826-11.359l84.327-27.501c0.011-0.005,4.436-0.988,7.684,2.315    c3.144,3.214,4.704,9.537,4.52,18.28C313.848,184.035,302.827,185.053,302.426,185.084z" />
                </g>
              </g>
            </svg>
            <span>دوراتي</span>
          </Link>
        </li>
        <li>
          <Link onClick={handleCloseNavList} href="/basket">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              height="24px"
              width="24px"
              version="1.1"
              id="Capa_1"
              viewBox="0 0 483.1 483.1"
              xmlSpace="preserve"
            >
              <g>
                <path d="M434.55,418.7l-27.8-313.3c-0.5-6.2-5.7-10.9-12-10.9h-58.6c-0.1-52.1-42.5-94.5-94.6-94.5s-94.5,42.4-94.6,94.5h-58.6   c-6.2,0-11.4,4.7-12,10.9l-27.8,313.3c0,0.4,0,0.7,0,1.1c0,34.9,32.1,63.3,71.5,63.3h243c39.4,0,71.5-28.4,71.5-63.3   C434.55,419.4,434.55,419.1,434.55,418.7z M241.55,24c38.9,0,70.5,31.6,70.6,70.5h-141.2C171.05,55.6,202.65,24,241.55,24z    M363.05,459h-243c-26,0-47.2-17.3-47.5-38.8l26.8-301.7h47.6v42.1c0,6.6,5.4,12,12,12s12-5.4,12-12v-42.1h141.2v42.1   c0,6.6,5.4,12,12,12s12-5.4,12-12v-42.1h47.6l26.8,301.8C410.25,441.7,389.05,459,363.05,459z" />
              </g>
            </svg>
            <span>السلة</span>
          </Link>
        </li>
        <li>
          <Link onClick={handleCloseNavList} href="/profile">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="12"
                cy="17.5"
                rx="7"
                ry="3.5"
                stroke="#28303F"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="7"
                r="4"
                stroke="#28303F"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <span>الملف الشخصي</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default User;
