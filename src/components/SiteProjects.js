import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaGithub, FaGlobe } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export function SiteProjects() {
  const [openSites, setOpenSites] = useState([]);
  const [sites, setSites] = useState([]);
  const siteRefs = useRef([]);
  const [lastIndex, setLastIndex] = useState(null);

  const reversedSites = useMemo(() => sites.slice().reverse(), [sites]);

  const toggleSite = (index) => {
    setOpenSites((prevOpen) => {
      if (prevOpen.includes(index)) {
        setLastIndex(null);
        return [];
      } else {
        return [index];
      }
    });
  };

  const handleAnimationComplete = (index) => {
    if (lastIndex != null && lastIndex < index) {
      const elementPosition =
        siteRefs.current[index].getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    setLastIndex(index);
  };

  useEffect(() => {
    const fetchSites = () => {
      const siteFiles = require.context("./webprojects", false, /\.js$/);
      const importedSites = siteFiles
        .keys()
        .map((file) => siteFiles(file).default);

      setSites(importedSites);
    };

    fetchSites();
  }, []);

  return (
    <div className="w-full flex flex-col gap-4 tracking-normal overflow-hidden">
      <AnimatePresence>
        {reversedSites.map((site, reverseIndex) => {
          const index = sites.length - 1 - reverseIndex;
          const isOpen = openSites.includes(index);
          return (
            <motion.div
              key={index}
              className="relative bg-stone-200 flex flex-col text-stone-900 items-center justify-center px-4 py-2 lg:py-4 lg:px-8"
              ref={(el) => (siteRefs.current[index] = el)}
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                x: {
                  duration: 0.5,
                  delay: reverseIndex * 0.1,
                  ease: [0.83, 0, 0.17, 1],
                },
                opacity: {
                  duration: 0.5,
                  delay: reverseIndex * 0.1,
                  ease: [0.83, 0, 0.17, 1],
                },
              }}
            >
              <div className="flex flex-wrap lg:flex-nowrap w-full justify-center items-center lg:gap-8 gap-4">
                {site.image ? (
                  <div className="w-full lg:w-[30rem] lg:mb-0">
                    {site.image}
                  </div>
                ) : null}

                <div className="flex flex-col gap-2 text-start lg:text-lg text-sm w-full lg:w-auto">
                  {site.title ? (
                    <p className="lg:text-2xl text-lg font-bold">
                      {site.title}
                    </p>
                  ) : null}
                  {site.description ? (
                    <p className="text-neutral-600 text-justify">
                      {site.description}
                    </p>
                  ) : null}
                  {site.live_link ? (
                    <a
                      href={site.live_link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-start gap-2 cursor-pointer text-rose-600 hover:text-blue-500 transition duration-300 ease-out break-words w-fit"
                    >
                      <FaGlobe className="mt-1 flex-shrink-0" />
                      <span className="break-all text-sm lg:text-base">
                        {site.live_link}
                      </span>
                    </a>
                  ) : null}
                  {site.github_link ? (
                    <a
                      href={site.github_link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-start gap-2 cursor-pointer text-rose-600 hover:text-blue-500 transition duration-300 ease-out break-words w-fit"
                    >
                      <FaGithub className="mt-1 flex-shrink-0" />
                      <span className="break-all text-sm lg:text-base">
                        {site.github_link}
                      </span>
                    </a>
                  ) : null}
                </div>
                <motion.div
                  className="justify-center mb-2 lg:mb-0"
                  onClick={() => toggleSite(index)}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3, ease: [0, 0.55, 0.45, 1] }}
                >
                  <PlusMinusToggle isOpen={isOpen} />
                </motion.div>
              </div>

              {site.content ? (
                <motion.div
                  className="relative"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{
                    height: {
                      duration: 0.3,
                      delay: 0.0,
                      ease: [0.83, 0, 0.17, 1],
                    },
                    opacity: { duration: 0.3, delay: 0.3, ease: "easeOut" },
                  }}
                  onAnimationComplete={() =>
                    isOpen && handleAnimationComplete(reverseIndex)
                  }
                  style={{ overflow: isOpen ? "visible" : "hidden" }}
                >
                  <div className="mt-4 lg:mt-12 lg:text-lg text-sm">
                    {site.content}
                  </div>
                </motion.div>
              ) : null}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

const PlusMinusToggle = ({ isOpen }) => {
  return (
    <div className="cursor-pointer border-2 border-rose-600 p-2 rounded-full">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transition: "all 0.3s ease-in-out",
          transform: isOpen ? "rotate(0deg)" : "rotate(90deg)",
        }}
      >
        <rect
          x="11"
          y="4"
          width="2"
          height="16"
          fill={isOpen ? "transparent" : "#e11d48"}
          style={{
            transition: "all 0.3s ease-in-out",
          }}
        />
        <rect
          x="4"
          y="11"
          width="16"
          height="2"
          fill={isOpen ? "black" : "#e11d48"}
        />
      </svg>
    </div>
  );
};

export default SiteProjects;
