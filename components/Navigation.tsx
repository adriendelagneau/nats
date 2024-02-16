import { createCat, createSub, getCategories } from '@/actions/categoryActions'
import React from 'react'
import Header from './Header'

const Navigation = async () => {
  
  const category = await getCategories()

  // await createSub()
 // await createCat()
    

  
    return (
      <div><Header cat={category } /></div>
  )
}

export default Navigation