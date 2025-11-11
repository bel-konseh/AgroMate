
interface ProductCardProps {
  name?:string;
  price?:number;
  imageUrl?:string;
}

const ProductCard:React.FC<ProductCardProps> = ({name, price,imageUrl}) => {
  return (
    <div className='flex flex-col w-[108px] min-w-[108px] md:w-[169px] md:min-w-[169px] border border-green-500/50 items-center justify-center-safe rounded-md bg-white/80 drop-shadow-2xl p-1.5 lg:h-[242px]'>
        <img src={imageUrl? imageUrl:'/src/assets/images/waterleaf.png'} alt="" className='w-[100px] lg:w-[169px] h-[100px] lg:h-[159px] object-cover' />
        <h4 className=' text-[8px] md:text-[16px] font-semibold mt-2'>{name?name:"Njama"}</h4>
        <p className="text-[12px] font-light">{price?price:500} Frs/Pack</p>
        <button className='bg-[#387718] w-full text-white pt-[5px] pb-[5px] pr-[8px] pl-[8px] text-[12px] rounded-sm'>Add to Cart</button>
    </div>
  )
}

export default ProductCard
