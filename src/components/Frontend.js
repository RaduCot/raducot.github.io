import React from "react";

export function Frontend({className}) {
  return (
    <div className={`flex flex-col gap-12 ${className}`}>
      <h2 className="py-2 bg-pink-600 text-start text-6xl tracking-widest font-extrabold">
        ▸FRONTEND DEVELOPMENT
      </h2>
    </div>
  );
}
