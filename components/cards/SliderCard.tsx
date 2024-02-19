import { TImage} from '@/types';
import Image from 'next/image'
import React from 'react'



const SliderCard = ({ images, title }: {images: TImage[], title: string}) => {

  return (
      <div className='w-[320px] h-[280px]'>
          <Image src={images[0].url} width={844} height={482} alt={images[0].legend} />
          <p className='text-xl line-clamp-3'>{ title}</p>
    </div>
  )
}

export default SliderCard