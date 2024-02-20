import { getArticles } from '@/actions/articlesActions'
import Ccollection from '@/components/Ccollection'
import InfinitScroll from '@/components/InfiniteScroll'
import { GetArticlesParams, IGetArticlesResponse } from '@/types'
import React from 'react'

const ArticlesPage = async ({ searchParams }: {searchParams: GetArticlesParams}) => {

  const res = await getArticles(searchParams)

  console.log(res)

  return (
    <div>
      <Ccollection {...res} />
      <InfinitScroll {...res} />
    </div>
  )
}

export default ArticlesPage