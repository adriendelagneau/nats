import { getArticleBySlug } from '@/actions/articlesActions'
import SingleGutter from '@/components/SingleGutter'
import SingleCard from '@/components/cards/SingleCard'
import React from 'react'

const SinglePage = async ({ params: { slug } }: { params: { slug: string } }) => {

  const article = await getArticleBySlug(slug)


  return (
    <div className='w-full   min-h-[200vh] mx-auto mt-24'>
        <h1 className='text-4xl leading-snug font-large  xl:leading-[1.2]  xl:text-5xl  font-PontanoSans lg:my-0 my-12 line-clamp-2'>{ article.title}</h1>
      <div className="flex mx-auto h-auto gap-6 relative mt-12">


        <div className='flex-grow mx-3'>
          <SingleCard article={ article} />
        </div>

        <div className="h-screen sticky top-24 mx-3">
          <SingleGutter />
        </div>

      </div>
    </div>
  )
}

export default SinglePage


