import React from "react";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black text-stone-200 py-2 ">
      <div className="flex justify-center relative text-sm container mx-auto px-4 text-center max-w-3xl px-8">
        <div className="flex flex-wrap flex-row items-center gap-1 justify-center">
          &copy; {currentYear}
          <Logo className="inline-block h-7 w-7 lg:h-8 lg:w-8 text-transparent fill-rose-600" />
          <div>Cotorceanu Radu | All Rights Reserved</div>
        </div>
      </div>
    </footer>
  );
}
