import React from "react";
import AnimatedArrows from "./AnimatedArrows";
import { motion } from "framer-motion";

export function About() {
  return (
    <div className="flex flex-col gap-12">
      <AnimatedArrows
        content="ABOUT ME"
        className={
          "justify-center space-x-2 text-black text-2xl bg-white tracking-wider font-extrabold"
        }
      ></AnimatedArrows>
      <div className="flex flex-col text-gray-400 text-justify tracking-wide gap-12">
        <motion.p
          className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{
            backgroundSize: "200%",
          }}
        >
          Hi!
        </motion.p>
        <p className="">
          I’m a frontend developer, web designer, graphic designer, and
          soundtrack composer who’s always refining my craft. Whether through
          elegant code, visually compelling designs or immersive soundscapes I
          strive to create experiences that resonate and inspire. My journey in
          these fields is guided by a simple belief:
        </p>
        <p className="text-white text-3xl">
          "Perfection is the continuous refinement of the soul."
        </p>
        <p className="">
          Art has been the driving force behind everything I do, shaping my path
          since childhood and inspiring me to keep creating, learning, and
          growing. I've always been captivated by the world of colors, sounds
          and forms, exploring art in every way I could — whether through
          drawing, music, or later, digital design. This passion has never
          faded; instead, it's evolved with me, pushing me to refine my craft
          and express myself through new mediums.
        </p>
        <p className="">
          ▸ Art isn’t just a passion; it’s my purpose and perspective, grounding
          and fueling my journey in every project I take on.
        </p>
      </div>
    </div>
  );
}
