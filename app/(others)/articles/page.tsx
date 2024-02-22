import { getArticles } from '@/actions/articlesActions'
import {  getCategoryByName } from '@/actions/categoryActions'
import Ccollection from '@/components/Ccollection'
import InfinitScroll from '@/components/InfiniteScroll'
import { GetArticlesParams, IGetArticlesResponse, TSubcategory } from '@/types'
import Link from 'next/link'
import React from 'react'

const ArticlesPage = async ({ searchParams }: {searchParams: GetArticlesParams}) => {

  const res = await getArticles(searchParams)

  const categoryParams = searchParams.category ? searchParams.category : ""
  const categories = await getCategoryByName(categoryParams)



  return (
    <div className='pt-24'>

      <h1 className='text-6xl w-full text-center capitalize'>
        <Link href={`?category=${searchParams.category}`}>
        {searchParams.category}
        
        </Link>
      </h1>
      <ul className='flex gap-3 mt-6 w-full justify-center mb-24'>
      {categories.sub.map((subcategory: TSubcategory, i: number) => (
        <li key={i} className={`capitalize text-xl ${searchParams.subcategory === subcategory.name && "underline"}`}>
          <Link href={`?category=${searchParams.category}&subcategory=${subcategory.name}`}>
          {subcategory.name}
          </Link>
          </li>
        ))}
      </ul>
      <Ccollection {...res} />
      <InfinitScroll {...res} />
    </div>
  )
}

export default ArticlesPage