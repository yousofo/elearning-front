import React from 'react'
import "./articles.css"
import ArticlesFilteringWrapper from '@/components/articles/ArticlesFilteringWrapper'
import Hero from '@/components/shared/hero/Hero'

const Articles = () => {

  return (
    <main className='relative'>
      {/* HERO start  */}
      <Hero>
        <h2 className="text-2xl font-medium md:text-4xl lg:text-5xl xl:text-6xl max-w-72 sm:max-w-fit">
          <span className="text-abad-gold whitespace-nowrap my-3 block">
            المقالات
          </span>
          <p className="text-sm md:text-2xl max-w-2xl font-normal leading-loose md:leading-[2]">
            معهد شبكة آباد للتدريب من المعاهد الرائدة في تقديم الدورات التطويرية
            المتخصصة في تقنية المعلومات.
          </p>
        </h2>
      </Hero>

      {/* HERO end  */}
      {/* main secion start */}
      <section className="p-8 w-full max-w-screen-lg mx-auto h-auto  ">
        <ArticlesFilteringWrapper />
      </section>
    </main>
  )
}

export default Articles