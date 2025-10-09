import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, Paintbrush, Music } from "lucide-react";
import TabContent from "./TabContent";
import { MovingRectangle } from "./MovingRectangle";

export function Work({ setActiveTab, activeTab }) {
  const [highlightStyle, setHighlightStyle] = useState({});
  const buttonRefs = useRef([]);

  const updateHighlight = (index) => {
    const button = buttonRefs.current[index];
    if (button) {
      const { offsetLeft, offsetWidth } = button;
      setHighlightStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  };

  useEffect(() => {
    // Initialize highlight on the first element or current active tab
    const initialIndex = ["music", "design", "development"].indexOf(activeTab);
    if (initialIndex !== -1) {
      updateHighlight(initialIndex);
    }

    const handleResize = () => {
      if (initialIndex !== -1) {
        updateHighlight(initialIndex);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeTab]);

  return (
    <div className="flex flex-col gap-12">

<div className="flex flex-row text-xl lg:text-2xl tracking-wider font-extrabold">
        <div className="w-full">
          <MovingRectangle
            iterations={7}
            duration={10}
            startWidth={60}
            skewAngle={45}
            flipX={true}
          />
        </div>
        <div className="text-stone-900 w-fit whitespace-nowrap bg-stone-200 ">
          MY WORK
        </div>
        <div className="w-full">
          <MovingRectangle
            iterations={7}
            duration={10}
            startWidth={60}
            skewAngle={-45}
            flipX={false}
          />
        </div>
      </div>


      <div className="">
        <div className="relative grid grid-cols-3 overflow-hidden">
          {/* Animated highlight span */}
          <motion.span
            className="absolute top-0 left-0 h-full bg-stone-200"
            animate={highlightStyle}
            //easeout transition
            transition={{ duration: 0.3, ease: "circOut" }}
          />
          {["music", "design", "development"].map((tab, index) => (
            <button
              key={tab}
              ref={(el) => (buttonRefs.current[index] = el)}
              onClick={() => {
                setActiveTab(tab);
                updateHighlight(index);
              }}
              className={`flex justify-center py-3 px-4 text-center font-semibold transition duration-100 ease-out z-10 ${
                activeTab === tab
                  ? "text-stone-900"
                  : "text-neutral-400 lg:hover:text-stone-200 lg:hover:bg-stone-800"
              }`}
            >
              {tab === "music" && <Music className="md:mr-2 h-full" />}
              {tab === "design" && <Paintbrush className="md:mr-2 h-full" />}
              {tab === "development" && <Code className="md:mr-2 h-full" />}
              <motion.div
                className="overflow-hidden text-clip hidden md:block w-6 pb-0.5"
                initial={{ width: "auto" }}
                animate={{ width: activeTab === tab ? "0%" : "auto" }}
                transition={{ duration: 0.3, ease: [0.83, 0, 0.17, 1] }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.div>
            </button>
          ))}
        </div>
        <div className="overflow-hidden flex flex-row justify-between bg-stone-200 text-stone-900 px-6 py-4 lg:py-6 tracking-widest font-extrabold mb-4">
          <motion.h2
            className="text-start lg:text-6xl text-3xl"
            key={activeTab} // This ensures the animation runs when activeTab changes
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
          >
            ▸{activeTab.toUpperCase()}
          </motion.h2>
        </div>
        <TabContent title={activeTab} />

        <div className="flex grow mt-12 justify-center self-center w-full lg:px-0 px-8">
          <div className="relative outline-dashed outline-1 lg:outline-2 lg:px-0 px-8 py-2 text-center lg:text-lg text-base text-stone-200 self-center w-full max-w-3xl ">
            Note: All sections will be updated soon with more projects. Stay
            tuned!
          </div>
        </div>
      </div>
    </div>
  );
}
