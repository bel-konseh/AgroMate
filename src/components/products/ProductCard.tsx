import type { Product } from "../../types"; // adjust to correct path

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const image = product.images?.[0] || "/src/assets/images/waterleaf.png";

  return (
    <div className='flex flex-col w-[108px] min-w-[108px] md:w-[169px] md:min-w-[169px] border border-green-500/50 items-center justify-center-safe rounded-md bg-white/80 drop-shadow-2xl p-1.5 lg:h-[242px]'>

      <img
        src={image}
        alt={product.name}
        className='w-[100px] lg:w-[169px] h-[100px] lg:h-[159px] object-cover'
      />

      <h4 className='text-[8px] md:text-[16px] font-semibold mt-2'>
        {product.name}
      </h4>

      <p className="text-[12px] font-light">
        {product.price} {product.currency}/Pack
      </p>

      <button className='bg-[#387718] w-full text-white pt-[5px] pb-[5px] px-[8px] text-[12px] rounded-sm'>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
