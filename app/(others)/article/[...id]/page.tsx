import { getArticleById } from '@/actions/articlesActions'
import { SinglePageProps } from '@/types'
import React from 'react'

const SinglePage = async ({ params: { id } }: { params: { id: string } }) => {

    const article = await getArticleById(id)


  
 
  return (
    <div className='w-full   mx-auto mt-24'>
      
      <h1>{article?.category.name}</h1>
          <div>{article?.title}</div>
    </div>
  )
}

export default SinglePage


