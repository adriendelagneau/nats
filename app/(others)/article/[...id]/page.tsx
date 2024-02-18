import { getArticleById } from '@/actions/articlesActions'
import SingleGutter from '@/components/SingleGutter'
import SingleCard from '@/components/cards/SingleCard'
import React from 'react'

const SinglePage = async ({ params: { id } }: { params: { id: string } }) => {

    const article = await getArticleById(id)


  
 
  return (
    <div className='w-full   mx-auto mt-24'>
      
      <SingleCard />
      <SingleGutter />
    </div>
  )
}

export default SinglePage


