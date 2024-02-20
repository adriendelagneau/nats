import { getArticles } from '@/actions/articlesActions'
import { getCategories, getCategoryByName } from '@/actions/categoryActions'
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
    <div className='pt-48'>

      <h1 className='text-6xl'>
        <Link href={`?category=${searchParams.category}`}>
        {searchParams.category}
        
        </Link>
      </h1>
      <ul className='flex gap-3 my-6'>
      {categories.sub.map((subcategory: TSubcategory, i: number) => (
        <li key={i} className={`capitalize text-lg ${searchParams.subcategory === subcategory.name && "underline"}`}>
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