"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ArticlesItem({ data }) {
  const [articleImg, setArticleImg] = useState(
    "/media/placeholders/abad-placeholder.png"
  );

  useEffect(() => {
    if (data.image) {
      setArticleImg(data.image);
    }
  }, [data.image]);
  return (
    <Link href={`/articles/${data?.token}`} className="h-full relative">
      <article className="h-full">
        <div className="article-wrapper overflow-hidden h-full flex flex-col gap-3 rounded-xl">
          <div className="img ">
            <div className="relative">
              <img
                loading="lazy"
                className={`h-full max-h-[188px] object-cover w-full`}
                src={articleImg}
                alt="article-image"
                onError={(event) => {
                  event.target.src = "/media/placeholders/abad-placeholder.png";
                }}
              />
              <span className="abosulute article-tag article-tag-yellow">
                القصص
              </span>
            </div>
          </div>
          <div className=" flex-1">
            <p>{data?.formattedDate}</p>
            <h3 className="max-h-20 overflow-auto">{data?.title}</h3>
          </div>
        </div>
      </article>
    </Link>
  );
}
