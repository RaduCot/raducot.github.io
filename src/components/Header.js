import React from "react";
import { motion } from "framer-motion";
//import profile from "../assets/profile.png";
import Logo from "./Logo";
import GridCross from "../assets/grid_cross2.svg";

export default function Header({ bgX, bgY }) {
  return (
    <header className="relative flex justify-center">
      <div
        className="absolute inset-0 bg-stone-900"
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, transparent 100%)",
        }}
      />
      <motion.div
        className="absolute inset-0 bg-[length:512] lg:bg-[length:1024px] bg-repeat bg-fixed opacity-20"
        style={{
          backgroundImage: `url(${GridCross})`,
          mixBlendMode: "normal",
          backgroundPositionX: bgX,
          backgroundPositionY: bgY,
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div className="relative flex grow gap-16 items-center max-w-6xl py-8 lg:px-16 h-64 justify-center lg:px-0 px-8">
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col lg:flex-row justify-center items-center w-full">
            <h1 className="w-full lg:text-7xl text-4xl tracking-wider text-center lg:text-start font-AngerpoiseLampshade text-stone-200">
              radu cotorceanu
            </h1>
            <Logo className="w-12 h-12 lg:h-20 lg:w-20 text-transparent fill-rose-600 z-10" />
          </div>
          <div className="w-full lg:text-xl text-sm tracking-widest text-neutral-400">
            <span className="block text-center md:text-justify">
              Music Composer | Graphic Designer | Frontend Developer
            </span>
          </div>
        </div>
        {/*<img src={profile} alt="profile" className="h-64 rounded-full z-10" />*/}
      </div>
    </header>
  );
}
