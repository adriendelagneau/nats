import { createCat, createSub, getCategories } from '@/actions/categoryActions'
import React from 'react'
import Header from './Header'
import { createArticle } from '@/actions/articlesActions'

const Navigation = async () => {
  
  const category = await getCategories()


    

  
    return (
      <div><Header cat={category } /></div>
  )
}

export default Navigation