"use client";
import "./navlist.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  reset as toggleResetNavList,
  toggleNavList,
} from "../GlobalState/Features/navListSlice";
import {
  toggleResetAuth,
  toggleSignIn,
  toggleSignUp,
} from "../GlobalState/Features/authSlice";
import MiniNav from "./MiniNav";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import User from "./User";
import { toggleUpdateInfo } from "../GlobalState/Features/userData";

const NavList = () => {
  const active = useSelector((state) => state.navList.active);
  const userInfo = useSelector((store) => store.userData.info);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (active) {
      window.document.body.classList.add("no-scroll");
    } else {
      window.document.body.classList.remove("no-scroll");
    }
    const updateVhUnit = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setIsClient(true)
    // Initial update
    updateVhUnit();

    // Update on resize
    window.addEventListener("resize", updateVhUnit);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", updateVhUnit);
  }, []);
  function handleSignOut() {
    dispatch(toggleResetAuth());
    dispatch(toggleUpdateInfo(null))
    handleResetNavList();
    router.push("/");
  }
  function handleResetNavList() {
    dispatch(toggleResetNavList());
  }
  const dispatch = useDispatch();
  if(!isClient){
    return null
  }
  return (
    <div
      suppressHydrationWarning={true}
      className={` ${
        !active && " -translate-x-full "
      } transition-all fixed w-screen  h-screen navlist-sm-wrapper overflow-scroll bg-white z-[1000] `}
    >
      <div className="navlist-sm wrapper h-max min-full-height flex flex-col gap-7 py-6">
        <div className="flex justify-between items-center px-5">
          <img loading="lazy" src="/media/logos/NavListLogo.png" alt="" />
          <div
            onClick={() => dispatch(toggleNavList())}
            className="flex items-center gap-1"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_415_78451)">
                <path
                  d="M11.2767 1.87716C11.7818 1.87716 12.282 1.97665 12.7486 2.16994C13.2153 2.36324 13.6393 2.64655 13.9965 3.00371C14.3536 3.36086 14.6369 3.78487 14.8302 4.25152C15.0235 4.71817 15.123 5.21832 15.123 5.72341V11.2767C15.123 11.7818 15.0235 12.282 14.8302 12.7486C14.6369 13.2153 14.3536 13.6393 13.9965 13.9965C13.6393 14.3536 13.2153 14.6369 12.7486 14.8302C12.282 15.0235 11.7818 15.123 11.2767 15.123H5.72341C4.70333 15.123 3.72502 14.7178 3.00371 13.9965C2.28239 13.2751 1.87716 12.2968 1.87716 11.2767V5.72341C1.87716 4.70333 2.28239 3.72502 3.00371 3.00371C3.72502 2.28239 4.70333 1.87716 5.72341 1.87716H11.2767ZM8.50008 7.54383L6.63008 5.66675C6.4991 5.54527 6.32706 5.47777 6.14842 5.47777C5.96977 5.47777 5.79773 5.54527 5.66675 5.66675C5.54527 5.79773 5.47777 5.96977 5.47777 6.14842C5.47777 6.32706 5.54527 6.4991 5.66675 6.63008L7.56508 8.50008L5.66675 10.3701C5.54527 10.5011 5.47777 10.6731 5.47777 10.8517C5.47777 11.0304 5.54527 11.2024 5.66675 11.3334C5.79647 11.4489 5.9641 11.5127 6.13779 11.5127C6.31148 11.5127 6.47911 11.4489 6.60883 11.3334L8.50008 9.43508L10.3701 11.3334C10.5011 11.4549 10.6731 11.5224 10.8517 11.5224C11.0304 11.5224 11.2024 11.4549 11.3334 11.3334C11.4489 11.2037 11.5127 11.0361 11.5127 10.8624C11.5127 10.6887 11.4489 10.5211 11.3334 10.3913L9.43508 8.50008L11.3334 6.63008C11.4549 6.4991 11.5224 6.32706 11.5224 6.14842C11.5224 5.96977 11.4549 5.79773 11.3334 5.66675C11.2037 5.55125 11.0361 5.48743 10.8624 5.48743C10.6887 5.48743 10.5211 5.55125 10.3913 5.66675L8.50008 7.56508M11.2767 0.885498H5.72341C4.44032 0.885498 3.20978 1.39521 2.30249 2.30249C1.39521 3.20978 0.885498 4.44032 0.885498 5.72341V11.2767C0.885498 12.5598 1.39521 13.7904 2.30249 14.6977C3.20978 15.605 4.44032 16.1147 5.72341 16.1147H11.2767C12.5598 16.1147 13.7904 15.605 14.6977 14.6977C15.605 13.7904 16.1147 12.5598 16.1147 11.2767V5.72341C16.1147 4.44032 15.605 3.20978 14.6977 2.30249C13.7904 1.39521 12.5598 0.885498 11.2767 0.885498Z"
                  fill="#F22222"
                />
              </g>
              <defs>
                <clipPath id="clip0_415_78451">
                  <rect width="17" height="17" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className="text-[#FF2F2F] text-xs font-light">اغلاق</span>
          </div>
        </div>
        <ul className="text-[#424242]">
          {userInfo && (
            <li>
              <User />
            </li>
          )}
          <li className="font-[700]">
            <Link onClick={handleResetNavList} href="/">
              الرئيسية
            </Link>
          </li>
          <li>
            <MiniNav />
          </li>
          <li>
            <Link onClick={handleResetNavList} href="/articles">
              المقالات
            </Link>
          </li>
          <li>
            <Link onClick={handleResetNavList} href="/partners">
              الشركاء
            </Link>
          </li>
          <li>
            <Link onClick={handleResetNavList} href="/contact">
              تواصل معنا
            </Link>
          </li>
        </ul>
        {userInfo ? (
          <button
            suppressHydrationWarning={true}
            className="mt-auto px-5 flex gap-1 w-fit items-center"
            onClick={handleSignOut}
          >
            <svg
              width="22"
              height="18"
              viewBox="0 0 22 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 7L12.7071 8.29289C12.3166 8.68342 12.3166 9.31658 12.7071 9.70711L14 11M13 9L21 9M5 17C2.79086 17 1 15.2091 1 13V5C1 2.79086 2.79086 1 5 1M5 17C7.20914 17 9 15.2091 9 13V5C9 2.79086 7.20914 1 5 1M5 17H13C15.2091 17 17 15.2091 17 13M5 1H13C15.2091 1 17 2.79086 17 5"
                stroke="#28303F"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span>تسجيل خروج</span>
          </button>
        ) : (
          <div
            suppressHydrationWarning={true}
            className="navlist-auth mt-auto px-5 flex justify-center gap-2"
          >
            <button
              suppressHydrationWarning={true}
              onClick={() => dispatch(toggleSignIn())}
              className="text-white"
            >
              تسجل دخول
            </button>
            <button
              suppressHydrationWarning={true}
              onClick={() => dispatch(toggleSignUp())}
              className="text-[#7F7F7F]"
            >
              تسجيل جديد
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavList;
