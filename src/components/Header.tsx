
// import { NavLink } from "react-router-dom"
// import ButtonGreen from "./ButtonGreen"
// const Header = () => {
//   return (
//     <div className=" flex justify-around items-center md:p-4">
//       <div className=" text-green-800 font-bold text-3xl">
//             Agromate
//       </div>
//       <ul className="flex flex-col  justify-around gap-10">
//         <li><NavLink to={'/'} className={({isActive})=>(isActive? "text-green-500 font-bold":"")}>Home</NavLink></li>
//         <li> <NavLink to={'/shop'} className={({isActive})=>(isActive? "text-green-500 font-bold":"")}>Shop</NavLink></li>
//         <li><NavLink to={'/about'} className={({isActive})=>(isActive? "text-green-500 font-bold":"")}>About</NavLink></li>
//         <li><NavLink to={'/contact'} className={({isActive})=>(isActive? "text-green-500 font-bold":"")}>Contact Us</NavLink></li>
//       </ul>
//       <ButtonGreen title="Register Now" />
//     </div>
//   )
// }

// export default Header


import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ButtonGreen from "./ButtonGreen";

const Header = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {pathname} = useLocation();
  
  if(pathname.toLowerCase().includes("dashboard")) return null;

  

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="bg-white shadow-sm border-b h-16 md:h-20  fixed top-0 w-full z-50">
      {/* Main Header */}
      <div className="flex justify-between items-center p-4 md:px-8">
        {/* Logo */}
        <div className="text-green-800 font-bold text-2xl md:text-3xl">
          Agromate
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `hover:text-green-600 transition-colors ${
                      isActive ? "text-green-500 font-bold" : "text-gray-700"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Register Button */}
        <div className="hidden md:block">
          <ButtonGreen title="Register Now" />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-6 space-y-6">
            {/* Mobile Navigation Links */}
            <nav>
              <ul className="space-y-4 text-center">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `block py-2 text-lg hover:text-green-600 transition-colors ${
                          isActive ? "text-green-500 font-bold" : "text-gray-700"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Divider */}
            <hr className="border-gray-200" />

            {/* Mobile Register Button */}
            <div className="p-2 flex items-center justify-center w-full">
              <ButtonGreen title="Register Now"  />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;