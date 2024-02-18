import Image from 'next/image'
import React from 'react'

const SliderCard = ({ productData }) => {
    console.log(productData)
  return (
      <div className='w-[320px] h-[280px]'>
          <Image src={productData.images[0].url} width={844} height={482} alt={productData.images[0].legend} />
          <p className='text-xl line-clamp-3 pt-3'>{ productData.title}</p>
    </div>
  )
}

export default SliderCard