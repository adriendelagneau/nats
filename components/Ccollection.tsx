'use client'

import { IGetArticlesResponse } from '@/types'
import React from 'react'
import MainCard from './cards/MainCard'

const Ccollection = ({ data } : IGetArticlesResponse) => {

  return (
      <div>
          
          {data?.map((a, i) => (
           <MainCard key={i} article={a} />
          ))}
  </div>
  )
}

export default Ccollection