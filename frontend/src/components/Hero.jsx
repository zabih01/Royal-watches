import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="border border-gray-400 flex flex-col sm:flex-row items-center justify-between px-6 py-10 gap-8">
      {/* Left Side */}
      <div className="w-full sm:w-1/2 flex justify-center sm:justify-start">
        <div className="text-[#414141] space-y-4">
          {/* Bestseller line */}
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight">
            Latest Arrivals
          </h1>

          {/* Shop Now line */}
          <div className="flex items-center gap-2 cursor-pointer">
            <p className="font-semibold text-sm md:text-base uppercase">
              Shop Now
            </p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="w-full sm:w-1/2 flex justify-center">
        <img
          src={assets.hero_img}
          alt="hero"
          className="h-auto w-64 sm:h-80 sm:w-80 object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
