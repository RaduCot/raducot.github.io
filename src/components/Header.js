import React from "react";
import { motion } from "framer-motion";
import profile from "../assets/profile.png";
import Logo from "./Logo";
import GridCross from "../assets/grid_cross2.svg";

export default function Header({ bgX, bgY }) {
  return (
    <header className="relative flex justify-center bg-black">
      <motion.div
        className="absolute inset-0 bg-[length:512] lg:bg-[length:1024px] bg-repeat bg-fixed opacity-20"
        style={{
          backgroundImage: `url(${GridCross})`,
          mixBlendMode: "normal",
          backgroundPositionX: bgX,
          backgroundPositionY: bgY,
        }}
      />
      <div className="relative flex grow justify-between gap-16 items-center max-w-6xl py-8 lg:px-16">
        <div className="flex flex-col items-center">
          <h1 className="w-full text-7xl tracking-wider text-start font-AngerpoiseLampshade bg-white text-transparent bg-clip-text">
            radu cotorceanu&nbsp;
            <Logo className="inline h-16 w-16 bg-clip-text text-transparent fill-red-600 z-10" />
          </h1>

          <motion.p className="w-full text-xl tracking-widest text-start text-gray-400">
            Frontend Developer | Graphic Designer | Music Composer
          </motion.p>
        </div>
        <img src={profile} alt="profile" className="h-64 rounded-full z-10" />
      </div>
    </header>
  );
}
