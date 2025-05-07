import React, { useState, useEffect, useRef } from "react";

const AnimatedBetas = ({
  numBetas = 10,
  minWidth = 10,
  maxWidth = 100,
  speed = 1,
  skew = -45,
  color = "bg-stone-100",
}) => {
  const [betas, setBetas] = useState([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);
  const animationRef = useRef();

  // Update container width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      setContainerWidth(containerRef.current?.offsetWidth || 1);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Initialize betas when containerWidth changes
  useEffect(() => {
    if (!containerWidth) return;
    const spacing = containerWidth / numBetas;
    const initialBetas = Array.from({ length: numBetas }, (_, index) => {
      const distanceFromRight = index * spacing;
      const width =
        minWidth + (maxWidth - minWidth) * (distanceFromRight / containerWidth);
      const x = containerWidth - distanceFromRight - width;
      return {
        id: index,
        x,
      };
    });
    setBetas(initialBetas);
  }, [containerWidth, numBetas, minWidth, maxWidth]);

  // Animate betas
  useEffect(() => {
    if (!containerWidth) return;
    let lastId = numBetas;

    const spacing = containerWidth / numBetas;

    const animate = () => {
      setBetas((prevBetas) => {
        const newBetas = prevBetas
          .map((beta) => ({ ...beta, x: beta.x - speed }))
          .filter((beta) => beta.x + maxWidth > 0);
    
        // Find the rightmost beta's x and its distance from the right
        let rightmostBeta = null;
        if (newBetas.length > 0) {
          rightmostBeta = newBetas.reduce((a, b) => (a.x > b.x ? a : b));
        }
    
        // Only add a new beta if there's enough space
        if (
          !rightmostBeta ||
          containerWidth - (rightmostBeta.x + getBetaWidth(rightmostBeta.x)) >= spacing
        ) {
          // The new beta should be placed so its right edge aligns with the container's right edge
          const distanceFromRight = 0;
          const width =
            minWidth +
            (maxWidth - minWidth) * (distanceFromRight / containerWidth);
          const x = containerWidth - width;
          newBetas.push({ id: lastId++, x });
        }
    
        return newBetas;
      });
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Helper to get width based on x position
    function getBetaWidth(x) {
      const distanceFromRight = Math.max(0, containerWidth - x);
      return minWidth + (maxWidth - minWidth) * (distanceFromRight / containerWidth);
    }

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [containerWidth, numBetas, speed, maxWidth, minWidth]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden h-full w-full flex items-center`}
      style={{
        maskImage:
          "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, transparent 100%)",
      }}
    >
      {/* Animated betas */}
      {betas.map((beta) => {
        const distanceFromRight = Math.max(0, containerWidth - beta.x);
        const width =
          minWidth +
          (maxWidth - minWidth) * (distanceFromRight / containerWidth);

        return (
          <div
            key={beta.id}
            className="absolute top-0 bottom-0"
            style={{ left: 0 }}
          >
            <div
              className={`absolute transition-all duration-100 ease-linear ${color}`}
              style={{
                width: `${width}px`,
                height: "100%",
                transform: `translateX(${beta.x}px) skewX(${skew}deg)`,
              }}
            />
          </div>
        );
      })}

      {/* Static tail at the right edge */}
      <div
        className={`absolute right-0 bottom-0 h-full transition-all duration-100 ease-linear ${color}`}
        style={{
          width: `${minWidth *2}px`,
          transform: `skewX(${skew}deg)`,
          right: `-${minWidth}px`,
          top: 0,
        }}
      />
    </div>
  );
};

export default AnimatedBetas;
