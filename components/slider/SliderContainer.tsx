import { getArticles } from '@/actions/articlesActions'
import React from 'react'
import Slideer from './Slideer'

const SliderContainer = async () => {
   const articles =  await getArticles({limit: 15})
  return (
      <div>
          <Slideer articles={articles.data} />
    </div>
  )
}

export default SliderContainer