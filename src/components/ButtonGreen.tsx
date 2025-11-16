interface ButtonProps {
  title: string;
  onClick?: (e?: React.FormEvent) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const ButtonGreen: React.FC<ButtonProps> = ({ title, onClick, disabled = false, type = 'submit' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`text-white font-semibold text-center rounded-md
                 w-[278px] h-[38px] py-[9.6px] px-[30.73px]
                 lg:py-[15px] lg:px-[48px] lg:w-[214px] lg:h-[54px]
                 transition-colors duration-200
                 ${disabled 
                   ? 'bg-gray-400 cursor-not-allowed' 
                   : 'bg-[#387718] hover:bg-[#2f6113] cursor-pointer'
                 }`}
    >
      {title}
    </button>
  );
};

export default ButtonGreen;