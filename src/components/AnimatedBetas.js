import React from "react";
import { useBetasAnimation } from "./BetasAnimationContext";

const AnimatedBetas = ({
  skew = -45,
  color = "bg-stone-100",
  flipX = false,
  attachRef = false,
}) => {
  const { betas, containerWidth, containerRef, maxWidth, minWidth } = useBetasAnimation();

  return (
    <div
      ref={attachRef ? containerRef : null}
      className="relative overflow-hidden h-full w-full flex items-center"
      style={{
        maskImage: flipX
          ? "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, transparent 100%)"
          : "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, transparent 100%)",
        WebkitMaskImage: flipX
          ? "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, transparent 100%)"
          : "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, transparent 100%)",
      }}
    >
      {betas.map((beta) => {
        // Restore the original width calculation:
        const width = Math.round(
          maxWidth +
            (minWidth - maxWidth) *
              (beta.distanceFromRight / containerWidth)
        );
        const x = containerWidth - beta.distanceFromRight - width;
        return (
          <div
            key={beta.id}
            className="absolute top-0 bottom-0"
            style={{
              left: flipX ? "auto" : 0,
              right: flipX ? 0 : "auto",
              transform: flipX ? `scaleX(-1)` : "none",
            }}
          >
            <div
              className={`absolute transition-all duration-100 ease-linear ${color}`}
              style={{
                width: `${width}px`,
                height: "100%",
                transform: `translateX(${x}px) skewX(${skew}deg)`,
              }}
            />
          </div>
        );
      })}

      <div
        className={`absolute ${
          flipX ? "left-0" : "right-0"
        } bottom-0 h-full transition-all duration-100 ease-linear ${color}`}
        style={{
          width: `${maxWidth * 2}px`,
          [flipX ? "left" : "right"]: `-${maxWidth}px`,
          top: 0,
          transform: `skewX(${flipX ? -skew : skew}deg)`,
        }}
      />
    </div>
  );
};

export default AnimatedBetas;