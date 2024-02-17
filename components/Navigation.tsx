import { getCategories } from '@/actions/categoryActions'
import React from 'react'
import Header from './Header'


const Navigation = async () => {
  
  const category = await getCategories()


    

  
    return (
      <div><Header cat={category } /></div>
  )
}

export default Navigation