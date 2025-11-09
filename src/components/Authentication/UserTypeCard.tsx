import type React from "react"


interface UserTypeCardProps{
    userType: string,
    thumbnail: string,
    userTypeState: string,
    setUserTypeState:(userType:string)=>void
    
}
const UserTypeCard:React.FC<UserTypeCardProps> = ({userType, thumbnail, userTypeState, setUserTypeState}) => {
  return (
    <div className={`flex flex-col w-[108px] border  ${userType==userTypeState?"border-green-500/90 border-2":"border-gray-700/50"}  items-center justify-center-safe rounded-md bg-white/80 drop-shadow-2xl`} onClick={()=>setUserTypeState(userType)}>
                {/* <img src="/src/assets/icons/farmer.png" alt="" className='h-[100px] object-cover' /> */}
                <img src={thumbnail} alt="" className='w-[100px] max-h-[100px] object-cover' />
                <h4 className='text-green-800'>{userType}</h4>
            </div>
  )
}

export default UserTypeCard
