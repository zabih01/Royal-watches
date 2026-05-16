import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10 my-10 text-sm border-t pt-10">
        <div>
          <Link
            className="text-2xl font-serif font-bold tracking-wide text-gray-800 hover:text-black transition"
            to="/"
          >
            SHAMI WATCH
          </Link>
          <p className="text-gray-600 mt-4 max-w-xs text-sm leading-relaxed">
            Royal Watch offers premium timepieces crafted with precision and
            elegance. Experience timeless style with our exclusive collection.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+92 3209830990</li>
            <li>zabihullahmehsood@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2026@ Shamiwatch.com - All right reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
