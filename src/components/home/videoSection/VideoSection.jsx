"use client";
import React, { useEffect, useRef, useState } from "react";

const VideoSection = ({ titleVideo, lVideoURL }) => {
  const videoRef = useRef(null);
  const defaultVideoURL = "/media/placeholders/Blank-Video-Placeholder.mp4";

  const [videoURL, setVideoURL] = useState(defaultVideoURL);
  const [videoState, setVideoState] = useState(false);

  useEffect(() => {
    setVideoURL(lVideoURL);
  }, [lVideoURL]);
  return (
    <>
      <img
        loading="lazy"
        src="/media/Trust company & Play section.png"
        className="absolute min-h-96 left-0 hidden md:block top-0 w-full object-cover -z-10"
        alt=""
      />
      <img
        loading="lazy"
        src="/media/Trust company & Play section-small.png"
        className="absolute min-h-96 left-0 top-0 block md:hidden w-full object-cover -z-10"
        alt=""
      />
      <div className="container flex flex-col items-center gap-14 mx-auto">
        <h2 className="font-bold max-w-[220px] text-2xl md:text-4xl text-center text-white md:max-w-2xl leading-normal">
          {titleVideo || (
            <span>
              اعرف اكثر عن
              <span className="text-abad-gold">اباد للتدريب</span> عن طريق
              مشاهدتك لهذا الفيديو!
            </span>
          )}
        </h2>
        <div className="video relative w-full max-w-[792px]">
          <video
            preload="none"
            ref={videoRef}
            onPlay={() => {
              setVideoState(true);
            }}
            onPause={() => {
              setVideoState(false);
            }}
            onEnded={() => {
              setVideoState(false);
            }}
            onError={() => {
              if (window) setVideoURL(defaultVideoURL);
            }}
            id="homeVideo"
            poster="/media/arab-work-laptop.png"
            className="w-full "
            loop
          >
            <source src={videoURL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <img
            loading="lazy"
            id="playHomeVideo"
            onClick={() => videoRef.current.play()}
            src="/media/media Icon.png"
            className={`${
              videoState && "hidden"
            } absolute w-8 md:w-fit cursor-pointer left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default VideoSection;
