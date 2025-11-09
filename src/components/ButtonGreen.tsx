
interface ButtonProps {
  title: string;
  onClick?: () => void; 
}

const ButtonGreen: React.FC<ButtonProps> = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#387718] text-white font-semibold text-center rounded-md
                 w-[278px] h-[38px] py-[9.6px] px-[30.73px]
                 lg:py-[15px] lg:px-[48px] lg:w-[214px] lg:h-[54px]
                 hover:bg-[#2f6113] transition-colors duration-200
                 cursor-pointer"
    >
      {title}
    </button>
  );
};

export default ButtonGreen;
