import React from "react";

export function LoadingPlaceholder({ color }) {
  return (
    <div className="flex items-center justify-center text-stone-200">
      <svg
        className={`animate-spin h-full size-10 text-${color}`}
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
