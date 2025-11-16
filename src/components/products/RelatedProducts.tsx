
import ProductCard from './ProductCard'
import products from '../../dummy-data/products'

const RelatedProducts = () => {
  const fruits = products.filter(product => product.category === 'fruits') 
  const vegetables = products.filter(product => product.category === 'vegetables')
  return (
    <div className='flex flex-col gap-4 lg:pl-4'>
      <h2 className='lg:pl-4 text-2xl text-green-700'>Related</h2>
      <div className='flex gap-4 overflow-scroll lg:pl-4'>
          {
            
            Array.from({ length: 10 }).map((_, index) => (
              <ProductCard product={products[index]} key={index} />
            ))
          }
      </div>
    
      <h2 className='lg:pl-4 text-2xl text-green-700'>Fruits</h2>
      <div className='flex gap-4 overflow-scroll lg:pl-4'>
          {
            fruits.map((product) => (
              <ProductCard key={product.id} product={product}/>
            ))
          }
      </div>

      <h2 className='lg:pl-4 text-2xl text-green-700'>Vegetables</h2>
      <div className='flex gap-4 overflow-scroll lg:pl-4'>
          {
            vegetables.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          }
      </div>
    </div>
  )
}

export default RelatedProducts
