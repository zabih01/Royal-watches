import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ setToken }) => {
  return (
    <>
      <div className="flex items-center py-4 px-[4%] justify-between">
        <Link
          className="text-2xl font-serif font-bold tracking-wide text-gray-800 hover:text-black transition"
          to="/"
        >
          SHAMI WATCH
        </Link>
        <button
          onClick={() => setToken("")}
          className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Navbar;
