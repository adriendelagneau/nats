import React from 'react'
import MainGutterCard from './cards/MainGutterCard'
import { getArticles } from '@/actions/articlesActions'

const SingleGutter = async () => {
  const articles = await getArticles({ limit: 5 })
  return (
    <div className="w-[300px] min-h-screen hidden 2xl:inline-block bg-red-800">
  
  </div>
  )
}

export default SingleGutter