import { MainCardProps } from '@/types'
import Image from 'next/image'
import React from 'react'

const MainCard: React.FC<MainCardProps> = ({ article }) => {

    console.log(article)
    return (
        <div className='max-w-screen-xl p-3 mx-auto flex flex-col lg:flex-row-reverse'>

            <div className='lg:w-1/2 rounded-sm'>
                <Image src={article.images[0].url} width={844} height={482} alt={article.images[0].legend} />
                <p className='capitalize py-3 text-sm text-gray-800'>{article.images[0].legend}</p>
            </div>

            <div className='lg:w-1/2 flex flex-col lg:justify-between pr-3'>
                <div className='text-4xl leading-snug font-large  xl:leading-[1.2]  xl:text-5xl  font-PontanoSans lg:my-0 my-12 line-clamp-2'>{article.title}</div>
                <div>
                    <div className='text-xl line-clamp-3'>{article.content}</div>
                    <p className='py-5'>written by: {article.author}</p>
                </div>
            </div>

        </div>
    )
}

export default MainCard