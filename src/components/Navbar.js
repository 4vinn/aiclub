import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

let tabs = [
  { id: "home", label: "Home", to: "" },
  { id: "contact", label: "Contact", to: "/contact" },
];

function Navbar() {
  const location = useLocation();
  // const activeTab = tabs.find((tab) => tab.to === location.pathname)?.id || "home";
  const activeTab = location.pathname === "/" ? "home" : "contact";
  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 w-auto px-6 py-1 flex items-center justify-center bg-black/50 text-white backdrop-blur-lg rounded-full  space-x-3 shadow-lg border-[1px] border-[#5b5b5b] z-50">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="./photos/logo-nobg.png"
          alt="myaiclub logo"
          width={90}
          className="min-w-[90px]"
        />
      </div>

      {/* Navigation Links */}
      <div className="flex">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            to={tab.to}
            // onClick={() => setActiveTab(tab.id)}
            className={`${
              activeTab === tab.id ? "" : "hover:text-white/60"
            } relative rounded-full  px-4 py-1 text-lg font-inter font-normal text-white transition `}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 z-10 bg-[#767676]/40 mix-blend-difference rounded-full "
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {tab.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
