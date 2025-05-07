import React from "react";
import { FaReact, FaCss3Alt, FaAngular } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiFramer } from "react-icons/si";

import { SiteProjects } from "./SiteProjects";

export function Development({ className }) {
  return (
    <div
      className={`flex flex-wrap flex-col lg:gap-12 gap-6 lg:px-0 px-8 ${className}`}
    >
      <SiteProjects />

      <div className="flex flex-wrap gap-8 lg:gap-12 text-stone-200 lg:text-4xl text-2xl justify-center self-center lg:px-0 px-8">
        <FaReact title="React" />
        <FaAngular title="Angular" />
        <IoLogoJavascript title="JavaScript" />
        <FaCss3Alt title="CSS3" />
        <RiTailwindCssFill title="Tailwind CSS" />
        <SiFramer title="Framer Motion" />
      </div>

      <p className="text-neutral-400 text-justify max-w-3xl self-center lg:text-lg text-base">
        I am passionate about frontend development and enjoy bringing my designs
        to life on the web. With a background in fullstack development, I have
        a solid understanding of how everything fits together, which helps me
        create seamless user experiences. I enjoy working with the latest
        technologies and frameworks to build responsive, user-friendly
        interfaces that look great and perform well. Whether it’s crafting
        smooth animations or optimizing for different devices, I’m all about
        making the web a better place.
      </p>
    </div>
  );
}
