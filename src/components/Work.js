import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedArrows from "./AnimatedArrows";
import { Code, Paintbrush, Music } from "lucide-react";
import TabContent from "./TabContent";

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
    const initialIndex = ["frontend", "design", "music"].indexOf(activeTab);
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
      <AnimatedArrows
        content="MY WORK"
        className={
          "justify-center space-x-2 text-black text-2xl bg-white tracking-wider font-bold font-extrabold"
        }
      ></AnimatedArrows>
      <p className="text-gray-400 text-justify tracking-wide">
        I specialize in three main areas: frontend development, graphic design,
        and music composition. Each of these fields allows me to express my
        creativity in unique ways, combining technical skills with artistic
        vision to create experiences that captivate and inspire. Here’s a brief
        overview of each area:
      </p>
      <div>
        <div className="relative grid grid-cols-3 gap-0.5 overflow-hidden">
          {/* Animated highlight span */}
          <motion.span
            className="absolute mix-blend-lighten z-50 top-0 left-0 h-full bg-pink-600"
            animate={highlightStyle}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          {["frontend", "design", "music"].map((tab, index) => (
            <button
              key={tab}
              ref={(el) => (buttonRefs.current[index] = el)}
              onClick={() => {
                setActiveTab(tab);
                updateHighlight(index);
              }}
              className={`py-2 px-4 bg-gray-800 text-center transition duration-300 ease-in-out z-10 ${
                activeTab === tab
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {tab === "frontend" && <Code className="inline mr-2" />}
              {tab === "design" && <Paintbrush className="inline mr-2" />}
              {tab === "music" && <Music className="inline mr-2" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <TabContent title={activeTab} />
      </div>
    </div>
  );
}