
import { NavLink } from "react-router-dom"
const Header = () => {
  return (
    <div className=" flex justify-around items-center">
      <div className=" text-green-800 font-bold text-3xl">
            Agromate
      </div>
      <ul className="flex justify-..............around gap-10">
        <li><NavLink to={'/'} className={({isActive})=>(isActive? "text-green-500 font-bold":"")}>Home</NavLink></li>
        <li> <NavLink to={'/shop'} className={({isActive})=>(isActive? "text-green-500 font-bold":"")}>Shop</NavLink></li>
        <li><NavLink to={'/about'} className={({isActive})=>(isActive? "text-green-500 font-bold":"")}>About</NavLink></li>
        <li><NavLink to={'/contact'} className={({isActive})=>(isActive? "text-green-500 font-bold":"")}>Contact Us</NavLink></li>
      </ul>
    </div>
  )
}

export default Header
