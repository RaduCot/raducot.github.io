import cursorsvg from "../assets/cursor.svg";
import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const cursorRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const move = (e) => {
    const x = isTouch ? e.touches[0]?.clientX || 0 : e.clientX;
    const y = isTouch ? e.touches[0]?.clientY || 0 : e.clientY;

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', move);
    document.addEventListener('touchmove', move);

    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('touchmove', move);
    };
  }, [move]);

  const handleButtonHover = (hovered) => {
    if (buttonHovered !== hovered) {
      setButtonHovered(hovered);
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div
        id="cursor-border"
        ref={cursorRef}
        className="absolute"
      >
        <img
          src={cursorsvg}
          alt="cursor"
          className="w-4 h-auto"
          style={{
            opacity: buttonHovered ? 0.5 : 1,
          }}
        />
      </div>
    </div>
  );
}

export default Cursor;
