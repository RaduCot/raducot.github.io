import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const BetasAnimationContext = createContext();

export function useBetasAnimation() {
  return useContext(BetasAnimationContext);
}

export function BetasAnimationProvider({
  numBetas = 10,
  maxWidth = 10,
  minWidth = 100,
  speed = 1,
  children,
}) {
  const [betas, setBetas] = useState([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  // Detect if on phone (simple check, can be improved)
  const isPhone = typeof window !== "undefined" && window.innerWidth <= 600;

  // Adjust values for phone
  const phoneMaxWidth = isPhone ? maxWidth / 2 : maxWidth;
  const phoneMinWidth = isPhone ? minWidth / 2 : minWidth;
  const phoneNumBetas = isPhone ? Math.floor(numBetas / 2) + 1 : numBetas;

  // Only one ResizeObserver and animation loop for all consumers

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const handleResize = (entries) => {
      for (let entry of entries) {
        setContainerWidth(Math.max(1, entry.contentRect.width));
      }
    };

    const resizeObserver = new window.ResizeObserver(handleResize);
    resizeObserver.observe(node);

    setContainerWidth(Math.max(1, node.offsetWidth));

    return () => resizeObserver.disconnect();
  }, []);

   useEffect(() => {
    if (!containerWidth) return;
    let lastId = phoneNumBetas;
    const spacing = containerWidth / phoneNumBetas;
    let lastTimestamp = Date.now();
    let intervalId = null;
    let paused = false;

    setBetas(
      Array.from({ length: phoneNumBetas }, (_, index) => ({
        id: index,
        distanceFromRight: index * spacing,
      }))
    );

    const updateBetas = () => {
      if (paused) return;
      const now = Date.now();
      const deltaTime = (now - lastTimestamp) / 1000;
      lastTimestamp = now;

      const getBetaWidth = (distanceFromRight) =>
        phoneMaxWidth +
        (phoneMinWidth - phoneMaxWidth) * (distanceFromRight / containerWidth);

      setBetas((prevBetas) => {
        const distanceIncrease = speed * deltaTime * 60;
        const newBetas = prevBetas
          .map((beta) => ({
            ...beta,
            distanceFromRight: beta.distanceFromRight + distanceIncrease,
          }))
          .filter(
            (beta) =>
              containerWidth -
                beta.distanceFromRight +
                getBetaWidth(beta.distanceFromRight) >
              0
          );

        if (
          newBetas.length === 0 ||
          newBetas[newBetas.length - 1].distanceFromRight >= spacing
        ) {
          newBetas.push({ id: lastId++, distanceFromRight: 0 });
        }

        return newBetas;
      });
    };

    const handleVisibilityChange = () => {
      paused = document.hidden;
      if (!paused) {
        // Reset timestamp to avoid jump after tab is visible again
        lastTimestamp = Date.now();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    intervalId = setInterval(updateBetas, 1000 / 60);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [containerWidth, phoneNumBetas, speed, phoneMinWidth, phoneMaxWidth]);


  return (
    <BetasAnimationContext.Provider
      value={{
        betas,
        containerWidth,
        containerRef,
        maxWidth: phoneMaxWidth,
        minWidth: phoneMinWidth,
      }}
    >
      {children}
    </BetasAnimationContext.Provider>
  );
}
