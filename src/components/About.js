import React from "react";
import AnimatedArrows from "./AnimatedArrows";
import AnimatedBetas from "./AnimatedBetas";

export function About() {
  return (
    <div className="flex flex-col gap-12">
      <div
        className={
          "flex flex-row text-xl lg:text-2xl pr-8 tracking-wider font-extrabold"
        }
      >
        <div className="w-full">
          <AnimatedBetas
            numBetas={10}
            minWidth={60}
            maxWidth={0}
            speed={0.5}
            skew={-60}
            color="bg-stone-200"
          />
        </div>
        <div className="text-stone-900 w-fit text-right whitespace-nowrap bg-stone-200 px-8">
          ABOUT ME
        </div>
      </div>
      <div className="flex flex-col text-neutral-400 text-justify lg:gap-12 gap-6 max-w-3xl self-center lg:px-0 px-8">
        <p className="text-stone-200 font-bold lg:text-4xl text-3xl">
          Welcome!
        </p>
        <p className="lg:text-lg text-base">
          I’m a soundtrack composer, web designer, graphic designer and frontend
          developer. I love what I do and I'm always striving to improve my
          skills. My journey across these fields is driven by a simple belief:
        </p>

        <p className="text-stone-200 text-start lg:text-2xl text-xl">
          "Perfection is the continuous refinement of the soul."
        </p>
      </div>
    </div>
  );
}
