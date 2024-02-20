import { getArticles } from '@/actions/articlesActions'
import { GetArticlesParams } from '@/types'
import React from 'react'

const ArticlesPage = async ({ searchParams }: {searchParams: GetArticlesParams}) => {

  const res = await getArticles(searchParams)

  return (
    <div>
      <ul className='mt-48'>
        {res?.data?.map((a, i) => (
          <li key={i}>{a.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default ArticlesPage