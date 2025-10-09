import React, { useState, useEffect, useCallback } from "react";

export function MovingRectangle({
  iterations: initialIterations = 4,
  duration = 3,
  startWidth: initialStartWidth = 64,
  skewAngle = -45,
  flipX = false
}) {
  const [isMobile, setIsMobile] = useState(false);

  // Debounced resize handler
  const debouncedCheckMobile = useCallback(() => {
    let timeoutId;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth <= 768);
      }, 100); // 100ms debounce delay
    };
  }, []);

  useEffect(() => {
    const checkMobile = debouncedCheckMobile();
    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [debouncedCheckMobile]);

  // Override startWidth and iterations if on mobile
  let startWidth = initialStartWidth;
  let iterations = initialIterations;

  if (isMobile) {
    startWidth = initialStartWidth / 2;
    iterations = Math.max(initialIterations - 2, 1); // Avoid going below 1
  }
  const generateInitialRectangles = () => {
    const rectangles = [];
    const delayStep = duration / iterations;

    for (let i = 0; i < iterations; i++) {
      const delay = i * delayStep;
      // Calculate initial position based on delay
      const initialProgress = (delay / duration) * 100;
      const initialLeft = `${initialProgress}%`;
      const initialWidth = `${startWidth * (1 - initialProgress / 100)}px`;

      rectangles.push(
        <div key={`initial-${i}`} className="absolute inset-0 overflow-hidden">
          <div
            className="moving-rect initial"
            style={{
              left: initialLeft,
              width: initialWidth,
              animation: `
                moveRectangleOnce ${duration - delay}s ease-in forwards,
                shrinkRectangleOnce ${duration - delay}s ease-in forwards
              `,
              transform: `skew(${skewAngle}deg) translateZ(0)`,
              '--initial-left': initialLeft,
              '--initial-width': initialWidth,
              '--skew-angle': `${skewAngle}deg`
            }}
          />
        </div>
      );
    }
    return rectangles;
  };

  const generateContinuousRectangles = () => {
    const rectangles = [];
    const delayStep = duration / iterations;

    for (let i = 0; i < iterations; i++) {
      const delay = i * delayStep;
      rectangles.push(
        <div key={`continuous-${i}`} className="absolute inset-0 overflow-hidden">
          <div
            className="moving-rect continuous"
            style={{
              animation: `
                moveRectangle ${duration}s ease-in infinite ${delay}s,
                shrinkRectangle ${duration}s ease-in infinite ${delay}s
              `,
              width: `${startWidth}px`,
              transform: `skew(${skewAngle}deg) translateZ(0)`,
              '--skew-angle': `${skewAngle}deg`
            }}
          />
        </div>
      );
    }
    return rectangles;
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        maskImage: flipX
          ? "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, transparent 100%)"
          : "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, transparent 100%)",
        WebkitMaskImage: flipX
          ? "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, transparent 100%)"
          : "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, transparent 100%)"
      }}
    >
      <div
        className="relative w-full h-full"
        style={{
          transform: flipX ? 'scaleX(-1)' : 'none'
        }}
      >
        <style>
          {`
            @keyframes moveRectangle {
              0% {
                left: 0;
              }
              100% {
                left: 100%;
              }
            }
            @keyframes shrinkRectangle {
              0% {
                transform: skew(var(--skew-angle)) translateZ(0) scaleX(1);
              }
              100% {
                transform: skew(var(--skew-angle)) translateZ(0) scaleX(0);
              }
            }
            @keyframes moveRectangleOnce {
              0% {
                left: var(--initial-left);
              }
              100% {
                left: 100%;
              }
            }
            @keyframes shrinkRectangleOnce {
              0% {
                transform: skew(var(--skew-angle)) translateZ(0) scaleX(1);
              }
              100% {
                transform: skew(var(--skew-angle)) translateZ(0) scaleX(0);
              }
            }
            .moving-rect {
              position: absolute;
              top: 0;
              height: 100%;
              background-color: rgb(229 231 235);
              will-change: transform;
              backface-visibility: hidden;
              transform-origin: left;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              image-rendering: -webkit-optimize-contrast;
              image-rendering: crisp-edges;
              text-rendering: optimizeLegibility;
            }
          `}
        </style>
        {generateInitialRectangles()}
        {generateContinuousRectangles()}
        {/* Static skewed rectangle to mask spawn point */}
        <div
          className="absolute left-0 top-0 h-full moving-rect"
          style={{
            width: `${startWidth * 2}px`,
            left: `-${startWidth}px`,
            transform: `skew(${skewAngle}deg) translateZ(0)`
          }}
        />
      </div>
    </div>
  );
} 