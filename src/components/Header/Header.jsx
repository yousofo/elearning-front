"use client";
import React, { useEffect, useState } from "react";
import "./header.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleResetAuth,
  toggleSignIn,
} from "../GlobalState/Features/authSlice";
import { toggleNavList } from "../GlobalState/Features/navListSlice";
import { toggleMiniNav } from "../GlobalState/Features/miniNavSlice";
import { toggleCoursesNav } from "../GlobalState/Features/coursesNavSlice";
import CoursesNav from "./coursesNav/CoursesNav";
import {
  fetchUserBasket,
  toggleUpdateInfo,
} from "../GlobalState/Features/userData";
import {
  fetchArticles,
  fetchHomeData,
  fetchLatestArticles,
} from "@/helperFunctions/dataFetching";
import { homeData } from "../GlobalState/Features/dataContentSlice";

const Header = () => {
  const [singedInState, setSingedInState] = useState(false);
  const dispatch = useDispatch();
  // auth
  const isMiniNav = useSelector((store) => store.miniNav.active);
  //userData
  const userInfo = useSelector((store) => store.userData.info);
  const userBasket = useSelector((store) => store.userData.basket.data);
  const {
    phone,
    wahtsAppNumber: whatsAppNumber,
    email,
  } = useSelector((store) => store.dataContent.homeData);
  function handleMiniNav() {
    dispatch(toggleMiniNav());
  }
  function handleCoursesNav() {
    dispatch(toggleCoursesNav());
  }
  function handleSignOut() {
    dispatch(toggleResetAuth());
    dispatch(toggleUpdateInfo(null));
    setSingedInState(false);
  }
  function handleBasket(e) {
    e.stopPropagation();
  }

  useEffect(() => {
    if (userInfo) {
      setSingedInState(true);
      dispatch(fetchUserBasket(userInfo.token));
    }
    fetchHomeData()
      .then((e) => {
        dispatch(homeData(e));
      })
      .catch((err) => console.log(err));
  }, [userInfo?.token]);
  return (
    <header className="whitespace-nowrap main-header z-[100]">
      <div className="header-contact-bar noto">
        <a
          target="_blank"
          href={`mailto:${email}`}
          className="!hidden sm:!flex"
        >
          <p>{email}</p>
          <svg
            width="23"
            height="16"
            viewBox="0 0 23 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_798_5106)">
              <g clipPath="url(#clip1_798_5106)">
                <path
                  d="M1.76186 0.0458984H21.2383C21.5855 0.0458984 21.9009 0.188055 22.1294 0.416328C22.358 0.644959 22.5 0.960961 22.5 1.30776V14.6925C22.5 14.954 22.4193 15.1977 22.2814 15.3998C22.2561 15.4652 22.2168 15.5261 22.1629 15.5778C22.1269 15.6116 22.0873 15.6394 22.0454 15.6603C21.8261 15.8431 21.5443 15.9545 21.2383 15.9545H1.76186C1.41506 15.9545 1.09924 15.8125 0.870429 15.5839C0.642156 15.3554 0.5 15.04 0.5 14.6925V1.30776C0.5 0.960245 0.641798 0.644601 0.87025 0.416328C1.0987 0.187696 1.41435 0.0458984 1.76186 0.0458984ZM1.46788 14.1616L8.29352 7.31878L1.46788 1.75356V14.1616ZM9.0453 7.93162L2.00822 14.9864H20.9327L14.2077 7.9327L11.9907 9.82173C11.8168 9.97033 11.5565 9.97874 11.3724 9.82943L9.0453 7.93162ZM14.9437 7.30571L21.5321 14.2162V1.69269L14.9437 7.30571ZM2.08753 1.01378L11.6698 8.82681L20.8407 1.01378H2.08753Z"
                  fill="white"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_798_5106">
                <rect
                  width="22"
                  height="16"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
              <clipPath id="clip1_798_5106">
                <rect
                  width="22"
                  height="15.9084"
                  fill="white"
                  transform="translate(0.5 0.0458984)"
                />
              </clipPath>
            </defs>
          </svg>
        </a>
        <a className="me-4 sm:mx-8" target="_blank" href={`tel:${phone}`}>
          <p dir="ltr">{phone}</p>
          <svg
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_798_5088)">
              <g clipPath="url(#clip1_798_5088)">
                <g clipPath="url(#clip2_798_5088)">
                  <path
                    d="M7.10925 9.87395C7.91589 11.329 8.84558 12.7255 10.0526 13.999C11.2635 15.2802 12.7694 16.4462 14.7186 17.4423C14.8632 17.5126 14.9999 17.5126 15.1229 17.4638C15.3085 17.3935 15.4979 17.2392 15.6835 17.0536C15.828 16.9091 16.0077 16.6786 16.1952 16.4267C16.9452 15.4404 17.8729 14.2158 19.1835 14.829C19.2128 14.8427 19.2343 14.8583 19.2635 14.87L23.6346 17.3837C23.6483 17.3915 23.6639 17.4052 23.6757 17.413C24.2518 17.8095 24.4901 18.4208 24.496 19.1142C24.496 19.8193 24.2362 20.6122 23.8553 21.2822C23.3514 22.1669 22.6093 22.7529 21.7538 23.1396C20.9393 23.5146 20.0331 23.7157 19.162 23.8447C17.7948 24.0458 16.5135 23.9169 15.203 23.5146C13.9218 23.1181 12.6307 22.4638 11.2206 21.5927L11.1171 21.5263C10.4706 21.122 9.77136 20.6904 9.08582 20.1806C6.578 18.2861 4.02136 15.5497 2.35535 12.538C0.958863 10.0107 0.197144 7.28216 0.613159 4.68255C0.843628 3.25677 1.45496 1.95989 2.52136 1.10442C3.45105 0.354422 4.703 -0.055734 6.3241 0.0887973C6.50964 0.102469 6.67566 0.209891 6.76355 0.370047L9.56628 5.10833C9.97644 5.63958 10.0272 6.16692 9.80261 6.69427C9.61707 7.12591 9.24207 7.52434 8.73035 7.89544C8.57996 8.02434 8.40027 8.1552 8.21082 8.29192C7.58386 8.747 6.87097 9.27239 7.11511 9.88958L7.10925 9.87395Z"
                    fill="white"
                  />
                </g>
              </g>
            </g>
            <defs>
              <clipPath id="clip0_798_5088">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
              <clipPath id="clip1_798_5088">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
              <clipPath id="clip2_798_5088">
                <rect
                  width="24"
                  height="23.8809"
                  fill="white"
                  transform="translate(0.5 0.0595703)"
                />
              </clipPath>
            </defs>
          </svg>
        </a>
        <a
          target="_blank"
          href={`https://api.whatsapp.com/send/?phone=${whatsAppNumber}&text&type=phone_number&app_absent=0`}
        >
          <p dir="ltr">{whatsAppNumber}</p>
          <svg
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_798_5097)">
              <g clipPath="url(#clip1_798_5097)">
                <g clipPath="url(#clip2_798_5097)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.9581 3.48776C19.8567 2.37826 18.546 1.49861 17.1018 0.899888C15.6577 0.301165 14.1091 -0.00469986 12.5458 5.45879e-05C5.99226 5.45879e-05 0.658711 5.3346 0.658711 11.8921C0.658584 13.979 1.20767 16.0291 2.25082 17.8366L0.559204 24.0001L6.86394 22.3453C8.60646 23.2952 10.5591 23.7936 12.5438 23.7951C14.8965 23.7956 17.1966 23.0983 19.153 21.7916C21.1095 20.4848 22.6345 18.6272 23.5351 16.4537C24.4358 14.2802 24.6717 11.8884 24.213 9.58084C23.7543 7.27326 22.6215 5.15353 20.9581 3.48975V3.48776ZM12.5498 21.792C10.778 21.7912 9.03915 21.3134 7.51571 20.4089L7.15351 20.1929L3.41206 21.1731L4.40712 17.5262L4.17328 17.152C2.87662 15.0932 2.38457 12.6286 2.79128 10.2297C3.19799 7.83078 4.4749 5.66606 6.37771 4.14967C8.28052 2.63329 10.6756 1.87172 13.1048 2.01066C15.5339 2.14959 17.8266 3.17929 19.5441 4.90275C20.9275 6.28643 21.8695 8.04923 22.2512 9.96827C22.6328 11.8873 22.4369 13.8764 21.6881 15.6841C20.9394 17.4918 19.6715 19.0369 18.0447 20.1241C16.418 21.2113 14.5054 21.7917 12.5488 21.792H12.5498ZM17.9729 14.3827C17.6743 14.2325 16.2146 13.516 15.9439 13.4165C15.6733 13.317 15.4742 13.2663 15.2723 13.5668C15.0703 13.8673 14.5041 14.533 14.3309 14.733C14.1578 14.933 13.9836 14.9589 13.6891 14.8086C13.3946 14.6584 12.4323 14.3449 11.3009 13.332C10.6494 12.731 10.0895 12.0376 9.63918 11.2742C9.46505 10.9756 9.62028 10.8154 9.77153 10.6701C9.92278 10.5249 10.07 10.3239 10.2163 10.1497C10.34 9.99965 10.4406 9.83196 10.5148 9.6522C10.5543 9.57028 10.5728 9.47982 10.5687 9.38897C10.5645 9.29812 10.5378 9.20974 10.491 9.13178C10.4104 8.98252 9.81332 7.51977 9.5745 6.92373C9.33569 6.32768 9.08792 6.42619 8.90482 6.41226C8.72173 6.39833 8.53366 6.40331 8.33764 6.40331C8.18651 6.40685 8.03776 6.44166 7.90075 6.50554C7.76374 6.56942 7.64145 6.66098 7.54158 6.77447C7.27391 7.07 6.50472 7.79142 6.50472 9.25417C6.50472 10.7169 7.56845 12.1279 7.71771 12.3289C7.86697 12.5299 9.81332 15.5301 12.7985 16.8167C13.507 17.1212 14.0603 17.3043 14.4901 17.4456C15.0963 17.6284 15.7367 17.6682 16.3609 17.562C16.932 17.4784 18.1181 16.8445 18.3679 16.151C18.6177 15.4574 18.6167 14.8574 18.542 14.739C18.4674 14.6206 18.2744 14.534 17.9749 14.3817L17.9729 14.3827Z"
                    fill="white"
                  />
                </g>
              </g>
            </g>
            <defs>
              <clipPath id="clip0_798_5097">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
              <clipPath id="clip1_798_5097">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
              <clipPath id="clip2_798_5097">
                <rect
                  width="23.8816"
                  height="24"
                  fill="white"
                  transform="translate(0.559204)"
                />
              </clipPath>
            </defs>
          </svg>
        </a>
      </div>
      <nav className="">
        {/* abad logo */}
        <Link href="/">
          <img loading="lazy" src="/media/logos/abad-logo.png" alt="" />
        </Link>
        {/* nav links */}
        <ul className="nav-list cairo-font ">
          <li>
            <Link href="/">الرئيسية</Link>
          </li>
          <li onClick={handleCoursesNav} className={`p-2 py-4`}>
            <Link href="/courses">الدورات</Link>
            <img loading="lazy" src="/media/btns/angle-bottom.png" alt="" />
            <CoursesNav />
          </li>
          <li>
            <Link href="/articles">المقالات</Link>
          </li>
          <li>
            <Link href="/partners">الاعتمادات والشركاء</Link>
          </li>
          <li>
            <Link href="/contact">اتصل بنا</Link>
          </li>
        </ul>
        {/* user logged */}
        {/* log out btn */}
        {singedInState ? (
          <div
            className=" text-white user-mini-nav items-center gap-2 relative z-20  cursor-pointer hidden lg:flex"
            onClick={handleMiniNav}
            suppressHydrationWarning
          >
            <img
              loading="lazy"
              src="/media/placeholders/user-image.png"
              className="max-w-12"
              alt=""
            />
            <p>{userInfo?.arabicName}</p>
            <Link
              href="/basket"
              onClick={handleBasket}
              className="relative ms-3"
            >
              <svg
                viewBox="0 0 900 1000"
                fill="currentColor"
                height="2em"
                width="2em"
              >
                <path d="M150 850c0-26.667 10-50 30-70s43.333-30 70-30c28 0 51.667 10 71 30s29 43.333 29 70c0 28-9.667 51.667-29 71s-43 29-71 29c-26.667 0-50-9.667-70-29s-30-43-30-71m500 0c0-26.667 10-50 30-70s43.333-30 70-30c28 0 51.667 10 71 30s29 43.333 29 70c0 28-9.667 51.667-29 71s-43 29-71 29c-26.667 0-50-9.667-70-29s-30-43-30-71M328 614c-24 6.667-35.333 14.333-34 23 1.333 8.667 16 13 44 13h562v76c0 13.333-6.667 20-20 20H750 250h-24c-13.333 0-20-6.667-20-20v-76l-10-46-98-454H0V70c0-13.333 6.667-20 20-20h156c13.333 0 20 6.667 20 20v86h704v274c0 14.667-6 23.333-18 26L328 614"></path>
              </svg>
              <div className="absolute centered text-black pb-1 font-bold">
                {userBasket.length}
              </div>
            </Link>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.25 7.5L10 13.75L3.75 7.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <ul
              className={`absolute left-0 bottom-0  overflow-hidden z-10 translate-y-[calc(110%)] ${
                isMiniNav ? "max-h-40" : "max-h-0"
              } transition-all [&>li>a]:w-full`}
            >
              <li>
                <Link href="/my-courses">
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
                  <span>دوراتي</span>
                </Link>
              </li>
              <li>
                <Link href="/profile">
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
              <li onClick={handleSignOut}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 10L13.7071 11.2929C13.3166 11.6834 13.3166 12.3166 13.7071 12.7071L15 14M14 12L22 12M6 20C3.79086 20 2 18.2091 2 16V8C2 5.79086 3.79086 4 6 4M6 20C8.20914 20 10 18.2091 10 16V8C10 5.79086 8.20914 4 6 4M6 20H14C16.2091 20 18 18.2091 18 16M6 4H14C16.2091 4 18 5.79086 18 8"
                    stroke="#28303F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span>تسجيل خروج</span>
              </li>
            </ul>
          </div>
        ) : (
          <button
            suppressHydrationWarning
            onClick={() => dispatch(toggleSignIn())}
          >
            تسجيل الدخول
          </button>
        )}
        {/* small screens nav icon */}
        <svg
          onClick={() => dispatch(toggleNavList())}
          className="toggle-nav-list lg:hidden"
          xmlns="http://www.w3.org/2000/svg"
          width={33}
          viewBox="0 0 31 28"
          fill="none"
        >
          <rect
            x="0.318181"
            y="0.318181"
            width="29.9091"
            height="27.3636"
            rx="4.77272"
            stroke="white"
            strokeWidth="0.636362"
          />
          <path
            d="M24.1817 21.6363H6.36355C5.66062 21.6363 5.09082 21.0664 5.09082 20.3636C5.09082 19.6607 5.66062 19.0908 6.36355 19.0908H24.1817C24.8846 19.0908 25.4545 19.6607 25.4545 20.3636C25.4544 21.0664 24.8846 21.6363 24.1817 21.6363Z"
            fill="white"
          />
          <path
            d="M24.1817 15.2727H6.36355C5.66062 15.2727 5.09082 14.7029 5.09082 14C5.09082 13.2971 5.66062 12.7273 6.36355 12.7273H24.1817C24.8846 12.7273 25.4545 13.2971 25.4545 14C25.4545 14.703 24.8846 15.2727 24.1817 15.2727Z"
            fill="white"
          />
          <path
            d="M24.1817 8.90899H6.36355C5.66062 8.90899 5.09082 8.33919 5.09082 7.63626C5.09082 6.93332 5.66062 6.36353 6.36355 6.36353H24.1817C24.8846 6.36353 25.4545 6.93332 25.4545 7.63626C25.4545 8.33919 24.8846 8.90899 24.1817 8.90899Z"
            fill="white"
          />
        </svg>
      </nav>
    </header>
  );
};

export default Header;
