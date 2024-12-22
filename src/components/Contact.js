import React from "react";
import AnimatedArrows from "./AnimatedArrows";
import { Mail } from "lucide-react";

export function Contact({ alert }) {
  return (
    <div className="flex flex-col gap-12">
      <AnimatedArrows
        content="CONTACT"
        className={
          "justify-center space-x-2 text-black text-2xl bg-white tracking-wider font-extrabold"
        }
      ></AnimatedArrows>
      <div className="flex justify-center text-white z-10 font-bold mb-12">
        <div className="flex flex-col justify-self-center py-2 gap-y-12 lg:gap-y-24 max-w-6xl grow text-gray-400 text-4xl lg:text-6xl text-center">
          <p className="text-white">{`(>ᴗ•)`}</p>
          <p>
            For collaboration or inquiries you can find me on GitHub, LinkedIn
            or via email!
          </p>
          <div className="flex space-x-6 lg:space-x-12 justify-center">
            {/* GitHub Icon */}
            <a
              href="https://github.com/RaduCot"
              target="_blank"
              rel="noreferrer"
              className="bg-black relative group text-2xl"
            >
              <img
                width="48"
                src="https://cdn.simpleicons.org/github/white"
                alt="GitHub"
                className="relative z-10"
              />
              <div className="z-10 absolute inset-0 bg-pink-600 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply"></div>
            </a>

            {/* LinkedIn Icon */}
            <a
              href="https://www.linkedin.com/in/radu-cotorceanu-7671bb26a/"
              target="_blank"
              rel="noreferrer"
              className="bg-black relative group text-2xl"
            >
              <img
                width="48"
                src="https://cdn.simpleicons.org/linkedin/white"
                alt="LinkedIn"
                className="relative z-10"
              />
              <div className="z-10 absolute inset-0 bg-pink-600 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply"></div>
            </a>

            {/* Email Icon */}
            <a
              href="#"
              className="bg-black text-white relative group text-2xl"
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText("r.cotorceanu@gmail.com");
                alert("Email address copied to clipboard!");
              }}
            >
              <Mail size={48} className="relative z-10" />
              <div className="z-10 absolute inset-0 bg-pink-600 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply"></div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
