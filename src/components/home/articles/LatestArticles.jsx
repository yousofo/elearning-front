"use client";
import ArticlesItem from "@/components/shared/article/ArticlesItem";

const LatestArticles = ({ data }) => {
  return (
    <div className="container lg:max-w-screen-lg mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-[1.5%] sm:pb-[6%] pt-10">
      {Array.isArray(data) &&
        data?.map((article, i) => <ArticlesItem key={i} data={article} />)}
    </div>
  );
};

export default LatestArticles;
