import { useState, useEffect, useRef } from "react";
import { useMotionValue, useAnimationFrame, useTime } from "framer-motion";

function lerp(start, end, t) {
  return start + (end - start) * t;
}

export default function useBackgroundAnimation(
  enabled = true,
  scrollMultX = 1,
  scrollMultY = 1,
  cursorMultX = 1,
  cursorMultY = 1,
  speed = 150, //150
  tileSize = 1024
) {
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isMobile) {
      return;
    }
    const updateCursorPosition = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", updateCursorPosition);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
    };
  }, [isMobile]);

  const bgX = useMotionValue(0);
  const bgY = useMotionValue(0);
  const time = useTime();

  const smoothedX = useRef(0);
  const smoothedY = useRef(0);
  const lerpSpeed = 0.1;

  useAnimationFrame(() => {
    if (!enabled) {
      return;
    }

    smoothedX.current = lerp(smoothedX.current, cursorPosition.x, lerpSpeed);
    smoothedY.current = lerp(smoothedY.current, cursorPosition.y, lerpSpeed);

    const scrollAnimX = (time.get() * scrollMultX * speed * 0.001) % tileSize;
    const scrollAnimY = (time.get() * scrollMultY * speed * 0.001) % tileSize;

    bgX.set(scrollAnimX + smoothedX.current * 0.05 * cursorMultX);
    bgY.set(scrollAnimY + smoothedY.current * 0.05 * cursorMultY);
  });
  return { bgX, bgY };
}
