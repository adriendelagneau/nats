import { getArticles } from '@/actions/articlesActions'
import React from 'react'
import MainGutterCard from './cards/MainGutterCard'

const MainGutter = async () => {

  const articles = await getArticles({ limit: 4 })
  
  console.log({ articles: articles })
  
  return (
    <div className="w-[250px] min-h-screen hidden 2xl:inline-block">
      <p className='capitalize text-2xl font-semibold pb-8'>last pucications</p>
      <ul>
        {articles.data?.map((a, i) => (
          <div key={i}>
            <MainGutterCard key={i} article={a} />
            <div className="w-[90%] h-[1px] mx-auto bg-slate-300 my-4"></div>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default MainGutter