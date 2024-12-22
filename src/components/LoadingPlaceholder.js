import React from "react";

export function LoadingPlaceholder() {
  return (
    <div className="flex items-center justify-center text-2xl text-white font-extrabold">
      <span className="animate-pulse">LOADING</span>
      <svg
        className="ml-2 animate-spin h-full w-8 text-pink-600"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
        ></circle>
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          d="M4 12a8 8 0 0 1 16 0"
        ></path>
      </svg>
    </div>
  );
}
