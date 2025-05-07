import { useState, useRef } from "react";

const ASCII = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const scrambleText = (text) => {
  return text
    .split("")
    .map((char) => (/\w/.test(char) ? ASCII[Math.floor(Math.random() * ASCII.length)] : char))
    .join("");
};

// Ease-out function (quadratic timing for smoother slow-down
const easeOutQuad = (t) => 1 - (1 - t) * (1 - t); // Ensures proper easing

const ScrambleText = ({ text, refreshRate = 50, duration = 2000 }) => {
  const [displayText, setDisplayText] = useState(scrambleText(text));
  const [isAnimating, setIsAnimating] = useState(false);
  const indexRef = useRef(0);
  const startTimeRef = useRef(null);

  const startAnimation = () => {
    setIsAnimating(true);
    setDisplayText(scrambleText(text));
    indexRef.current = 0;
    startTimeRef.current = performance.now();

    const totalCharacters = text.length; // Keep all characters, including spaces

    const animate = () => {
      const elapsedTime = performance.now() - startTimeRef.current;
      const progress = Math.min(elapsedTime / duration, 1); // Normalize progress (0 to 1)
      const easedProgress = easeOutQuad(progress); // Apply ease-out

      // Ensure the last character is fully revealed at the end
      const newIndex = Math.floor(easedProgress * totalCharacters);

      if (newIndex > indexRef.current) {
        indexRef.current = newIndex;
        setDisplayText((prev) =>
          prev
            .split("")
            .map((char, i) => (i < indexRef.current ? text[i] : scrambleText(text[i])))
            .join("")
        );
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="font-mono cursor-pointer select-none" onClick={startAnimation}>
      {displayText.split("").map((char, i) => (
        <span
          key={i}
          className={i < indexRef.current ? "text-stone-200" : "text-neutral-800"}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default ScrambleText;
