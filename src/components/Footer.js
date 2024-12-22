import React from "react";
import emblem from "../assets/emblem.svg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-neutral-900 text-white py-4">
      <div className="relative text-sm container mx-auto px-4 text-center">
        <p className="">
          &copy; {currentYear}{" "}
          <img
            src={emblem}
            alt="emblem"
            className="h-[1em] inline-block mb-0.5"
          />{" "}
          Cotorceanu Radu | All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
