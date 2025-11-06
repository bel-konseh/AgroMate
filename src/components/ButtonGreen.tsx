
interface ButtonProps{
    title:string
}

const ButtonGreen:React.FC<ButtonProps> = ({title}) => {
  return (
    <div className="bg-[#387718] text-white w-[278px] h-[38px] pt-[9.6px] pb-[9.6px] pl-[30.73px] pr-[30.73px] lg:pt-[15px] lg:pb-[15px] lg:pr-[48px] lg:pl-[48px] lg:w-[214px] lg:h-[54px]">
      <p>{title}</p>
    </div>
  )
}

export default ButtonGreen
