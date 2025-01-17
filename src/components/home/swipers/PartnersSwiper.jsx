"use client";
import React, { useEffect, useState } from "react";
//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { fetchWithCheck } from "@/helperFunctions/dataFetching";

const PartnersItem = ({ data }) => {
  const [hasImg, seHasImg] = useState(true);
  function handleImgError(e) {
    seHasImg(false);
  }
  useEffect(() => {
    seHasImg(true);
  }, [data.image]);
  return (
    <div>
      <img
        loading="lazy"
        className={`${!hasImg && "hidden"} max-h-12 max-w-72`}
        style={{ margin: "0 auto" }}
        src={data.image}
        alt=""
        onLoad={() => console.log("loaded")}
        onError={handleImgError}
      />
      <p className={`${hasImg && "hidden"} text-center`}>{data.name}</p>
    </div>
  );
};
const PartnersSwiper = () => {
  const [data, setData] = useState([]);

  console.log(data);
  let dataX2 = [...data, ...data];

  useEffect(() => {
    fetchWithCheck(`/api/partners`, null, [])
      .then((data) => {
        if (!Array.isArray(data)) {
          throw err;
        }
        setData(data);
      })
      .catch((err) => setData([]));
  }, []);
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={1}
      breakpoints={{
        640: {
          slidesPerView: 2,
          loop: data.length >= 4,
        },
        1024: {
          slidesPerView: 3,
          loop: data.length >= 6,
        },
      }}
      autoplay={{ delay: 1000 }}
    >
      {Array.isArray(dataX2) &&
        dataX2.map((e, i) => (
          <SwiperSlide key={"partnerCard-" + i}>
            <PartnersItem key={"partnerCard-" + i} data={e} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default PartnersSwiper;
