"use client";
import "./loader.css";
import React from "react";
import { useSelector } from "react-redux";

const Loader = () => {
  // const { active } = useSelector((state) => state.popUps.loader);
  const active = false
  return (
    <div
      className={`${
        !active && "hidden"
      } fixed z-[9999999] w-screen h-screen left-0 top-0 bg-black bg-opacity-0 pointer-events-none`}
    >
      <div className="absolute z-10 pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Loader;
