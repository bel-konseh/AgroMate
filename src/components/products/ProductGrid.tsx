import { useState } from "react";
import  QuantitySelector from "./QuantitySelector";
const ProductGrid = () => {
const [quantity, setQuantity] = useState(1);
    return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Product Image */}
        <div className="lg:w-1/2">
          <div 
            className="bg-green-100 rounded-xl h-80 flex items-center justify-center"
            role="img"
            aria-label={'product.name'}
          >
            <img src="/src/assets/images/njama.png" className=' inset-0 w-full h-full object-cover' alt="" />
          </div>
        </div>
        
        {/* Product Details */}
        <div className="lg:w-1/2">
          <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
            {/* {'product.badge'} */}
          </span>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {'product.name'}
          </h1>
          
          <p className="text-lg text-gray-600 mb-4">
            {'Mami Petit Farmer'}
          </p>
          
          <div className="flex items-center gap-2 mb-4">
            {/* <StarRating rating={product.rating} /> */}
            <h1>Rating</h1>
            <span className="text-sm text-gray-500" aria-hidden="true">
              {'★'.repeat(5)}
            </span>
          </div>
          
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {'product.price'}
          </div>
          
          <div className="text-sm text-gray-500 mb-6">
            {'product.code'}
          </div>
          
          <div className='flex flex-col md:flex-row gap-4 items-center lg:gap-11'>
                <div className="flex items-center gap-4 ">
                <QuantitySelector
                quantity={quantity}
                onIncrement={()=>{setQuantity(quantity + 1)}}
                onDecrement={()=>{setQuantity(quantity > 1 ? quantity - 1 : 1)}}
                />
                </div>
            
                <div className="flex gap-2">
                <button
                
                className=" bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-4 rounded transition-colors focus:outline-none md:h-9"
                >
                Buy Now
                </button>
                <button
                
                className="flex-1 bg-white border border-green-600 text-green-600 hover:bg-green-50 font-semibold py-1.5 px-4 md:h-9 rounded-lg transition-colors"
                >
                Add to Cart
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductGrid
