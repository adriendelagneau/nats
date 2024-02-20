'use client'

import { IGetArticlesResponse } from '@/types'
import React from 'react'

const Ccollection = ({ data } : IGetArticlesResponse) => {

  return (
      <div>
          
          {data?.map((a, i) => (
              <div key={i} className='w-full h-64 bg-teal-700 mb-12 pt-24'>{a.title }</div>
          ))}
  </div>
  )
}

export default Ccollection