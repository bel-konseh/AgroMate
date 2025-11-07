

import React from 'react'
import ProductCard from './ProductCard'

const RelatedProducts = () => {
  return (
    <div className='flex gap-4 overflow-scroll lg:pl-4'>
          {
            Array.from({ length: 10 }).map((_, index) => (
              <ProductCard key={index} />
            ))
          }
      <ProductCard />
    </div>
  )
}

export default RelatedProducts
