import React from "react";
import AnimatedArrows from "./AnimatedArrows";

export function About() {
  return (
    <div className="flex flex-col gap-12">
      <AnimatedArrows
        content="ABOUT ME"
        className={
          "justify-center space-x-2 text-stone-900 text-xl lg:text-2xl bg-stone-200 tracking-wider font-extrabold"
        }
      ></AnimatedArrows>
      <div className="flex flex-col text-neutral-400 text-justify lg:gap-12 gap-6 max-w-3xl self-center lg:px-0 px-8">
        <p className="text-stone-200 font-bold lg:text-4xl text-3xl">
          Welcome!
        </p>
        <p className="lg:text-lg text-base">
          I’m a soundtrack composer, web designer, graphic designer and
          frontend developer. I love what I do and I'm always striving
          to improve my skills. My journey across these fields is driven by a
          simple belief:
        </p>

        <p className="text-stone-200 text-start lg:text-2xl text-xl">
          "Perfection is the continuous refinement of the soul."
        </p>
      </div>
    </div>
  );
}
