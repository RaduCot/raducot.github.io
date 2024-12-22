import React, { useState } from "react";
import { SiAdobephotoshop, SiAdobeillustrator } from "react-icons/si";
import { PiFigmaLogoFill } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function Design({ className, loading, images }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={`flex flex-col gap-12 tracking-wide ${className}`}>
      <h2 className="py-2 bg-pink-600 text-start text-6xl tracking-widest font-extrabold">
        ▸GRAPHIC DESIGN
      </h2>
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
          <div className="absolute h-1/2 bottom-0 inset-x-0 bg-gradient-to-t from-black"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {images.map((src, index) => (
              <motion.div
                key={index}
                className="flex h-full relative group justify-center cursor-pointer aspect-square"
                onClick={() => openModal(src)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 1, delay: index * 0.1 }, // Apply stagger delay
                }}
              >
                <img
                  src={src}
                  alt={`Car graphic ${index + 1}`}
                  className="object-contain bg-black"
                />
                <div className="absolute inset-0 bg-pink-600 mix-blend-exclusion bg-opacity-0 hover:bg-opacity-50 transition duration-300 ease-in-out" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      <div className="flex gap-12 text-white text-4xl justify-center">
        <SiAdobephotoshop />
        <SiAdobeillustrator />
        <PiFigmaLogoFill />
      </div>
      <p className="text-gray-400 text-xl text-justify">
        In my graphic design work, I emphasize{" "}
        <span className="text-white">bold visuals</span> and{" "}
        <span className="text-white">dynamic composition</span>, as seen in my
        recent <span className="text-white font-bold italic">SLEEKFIT</span>{" "}
        brand project. This project, inspired by JDM culture, blends a sleek
        aesthetic with robust, high-energy design elements that mirror the
        adrenaline of street racing culture. Through carefully chosen
        typography,{" "}
        <span className="text-pink-500">vibrant color palettes</span>, and a
        strong focus on <span className="text-white">layout</span>, I created a{" "}
        <span className="text-white">visual identity</span> that feels both raw
        and refined, channeling the brand’s spirited character and resonating
        with its audience.
      </p>
      {/* Modal with Animation */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 backdrop-blur-sm"
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
                src={selectedImage}
                alt="Selected car graphic"
                className="object-contain max-w-full max-h-full"
              />
              <X
                onClick={closeModal}
                height={32}
                width={32}
                className="cursor-pointer absolute top-0 -right-12 text-white hover:text-pink-600 transition duration-300 ease-in-out"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
