import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isContactPage = location.pathname === "/contact";
  const isHomePage = location.pathname === "/";
  return (
    <nav
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 w-auto px-6 py-1 flex items-center justify-center
    ${isContactPage ? "bg-[#fff] text-black" : "bg-black/50 text-white"} 
    backdrop-blur-lg rounded-full flex items-center space-x-3 shadow-lg 
    border-[1px] ${
      isContactPage ? "border-gray-300" : "border-[#5b5b5b]"
    } z-50`}
    >
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="./photos/logo-nobg.png"
          alt="myaiclub logo"
          width={90}
          className={`min-w-[90px] ${isContactPage ? "invert" : ""}`}
        />
      </div>

      {/* Navigation Links */}
      <div className="flex text-lg font-inter font-normal">
        <Link
          to="/"
          className={` transition px-4 py-1 rounded-full ${
            isHomePage
              ? "bg-[#767676]/30 hover:text-gray-400"
              : "hover:text-gray-400"
          }`}
        >
          Home
        </Link>
        <Link
          to="/contact"
          className={` transition px-4 py-1 rounded-full ${
            isContactPage
              ? "bg-[#efefef] hover:text-gray-400"
              : "hover:text-gray-400"
          }`}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
