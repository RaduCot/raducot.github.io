import React, { useState } from "react";
import { SiAdobephotoshop, SiAdobeillustrator } from "react-icons/si";
import { PiFigmaLogoFill } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
//import { LoadingPlaceholder } from "./LoadingPlaceholder";

export function Design({ className, loading, images }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={`flex flex-col lg:gap-12 gap-6 ${className}`}>
      {loading ? (
        <div className="relative">
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex h-full justify-center group aspect-square bg-neutral-800 animate-pulse"
              />
            ))}
          </div>
          <div className="absolute h-1/2 bottom-0 inset-x-0 bg-gradient-to-t from-stone-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:px-0 px-8">
          <AnimatePresence>
            {images.map((src, index) => (
              <motion.div
                key={index}
                className="flex h-full relative group justify-center cursor-pointer aspect-square"
                onClick={() => openModal(src)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  opacity: {
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeIn",
                  },
                  scale: {
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.83, 0, 0.17, 1],
                  },
                }}
              >
                <motion.div
                  className="bg-black justify-center items-center flex relative w-full h-full"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3, ease: [0, 0.55, 0.45, 1] }}
                >
                  <img
                    src={src.base64}
                    alt={src.name}
                    className="object-contain p-2"
                  />
                  <div className="absolute inset-0 bg-rose-600 mix-blend-exclusion bg-opacity-0 lg:hover:bg-opacity-50 transition duration-300 ease-out" />
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      <div className="flex flex-wrap gap-8 lg:gap-12 text-stone-200 lg:text-4xl text-2xl justify-center self-center lg:px-0 px-8">
        <SiAdobephotoshop title="Adobe Photoshop" />
        <SiAdobeillustrator title="Adobe Illustrator" />
        <PiFigmaLogoFill title="Figma" />
      </div>
      <p className="text-neutral-400 lg:text-lg text-base text-justify max-w-3xl self-center lg:px-0 px-8">
        {" "}
        In my graphic design work, I prioritize{" "}
        <span className="text-stone-200">bold visuals</span> and{" "}
        <span className="text-stone-200">dynamic layouts</span>. My approach
        revolves around creating designs that are both visually striking and
        conceptually strong, allowing each project to convey its unique story
        effectively.{" "}
      </p>{" "}
      <p className="text-neutral-400 lg:text-lg text-base text-justify max-w-3xl self-center lg:px-0 px-8">
        {" "}
        For my <span className="text-stone-200 font-bold italic">
          SLEEKFIT
        </span>{" "}
        brand project, inspired by JDM culture, I sought to blend a sleek
        aesthetic with high-energy elements that evoke the excitement of street
        racing. I used carefully chosen typography,{" "}
        <span className="text-rose-500">vibrant colors</span>, and a strong{" "}
        <span className="text-stone-200">layout</span> to craft a{" "}
        <span className="text-stone-200">visual identity</span> that feels
        simultaneously raw and refined.{" "}
      </p>
      {/* Modal with Animation */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-stone-900 bg-opacity-75 z-50 backdrop-blur-sm p-4"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="p-2 bg-black max-w-6xl relative max-h-full"
              onClick={(e) => e.stopPropagation()} // Prevent click on image from closing modal
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={selectedImage.base64}
                alt={selectedImage.name}
                className="object-contain max-w-full max-h-full"
              />
              <X
                onClick={closeModal}
                height={32}
                width={32}
                className="cursor-pointer absolute lg:top-0 lg:-right-12 -top-12 right-0 text-stone-200 lg:hover:text-rose-600 transition duration-300 ease-in-out"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
