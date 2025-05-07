import React, { useEffect, useRef, useState } from "react";

const LoadingWave = () => {
  const containerRef = useRef(null);
  const [barCount, setBarCount] = useState(0);

  useEffect(() => {
    const calculateBars = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const barWidth = 24;
        const barMargin = 5;
        const totalBarWidth = barWidth + 2 * barMargin;
        const count = Math.floor(containerWidth / totalBarWidth);
        setBarCount(count);
      }
    };
  
    calculateBars();
    window.addEventListener("resize", calculateBars);
  
    return () => {
      window.removeEventListener("resize", calculateBars);
    };
  }, []);

  return (
    <div className="loading-wave" ref={containerRef}>
      {Array.from({ length: barCount }).map((_, index) => (
        <div
          key={index}
          className="loading-bar bg-neutral-600"
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default LoadingWave;
