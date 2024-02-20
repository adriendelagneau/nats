import { TArticle } from '@/types'
import Image from 'next/image'
import React from 'react'

const SingleCard = ({ article }: { article: TArticle }) => {
  
  console.log(typeof (article.createdAt))
  
  let articleCreationDate  = new Date(article.createdAt)
  const formatter = new Intl.DateTimeFormat('fr-FR',{ dateStyle: 'long' });
  const formattedDate = formatter.format(articleCreationDate)


  return (
    <>
      
      <div className='flex gap-6 my-3 items-center'>
        <div className='w-12 h-12 rounded-full'><Image src={article.images[1].url} width={482} height={482} alt={article.images[0].legend} className='rounded-full'/></div>
        <div className='text-xl'>published by: {article.author}</div>
      </div>
        <p className='text-lg'>{formattedDate}</p>
    <div className='w-full rounded'>
        <Image src={article.images[0].url} width={908} height={519} alt={article.images[0].legend} />
        <p className='capitalize py-3 text-sm text-gray-800'>{article.images[0].legend}</p>
      </div>

      <ul>
        {article.content.map((c, i) => (
          <li key={i} className='my-9'>
           
              <p className='text-lg first-letter:text-3xl first-letter:pr-1' key={i}>{c}</p>    
          </li>
        ))}
      </ul>
    </>
  )
}

export default SingleCard