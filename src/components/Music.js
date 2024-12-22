import React, { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { Play, Pause, Volume2, Disc3 } from "lucide-react";
import { motion } from "framer-motion";

export function Music({ className, loading, audioTracks }) {
  const [activeTrackIndex, setActiveTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioTracks.length > 0) {
      setActiveTrackIndex(0);
    }
  }, [audioTracks]);

  const handleTrackSelect = (index) => {
    setActiveTrackIndex(index);
    setIsPlaying(false);
  };

  return (
    <div className={`flex flex-col gap-12 ${className}`}>
      <h2 className="py-2 bg-pink-600 text-start text-6xl tracking-widest font-extrabold">
        ▸MUSIC COMPOSITION
      </h2>
      {loading ? (
        <div className="flex flex-col gap-8 animate-pulse">
          <div className="flex w-full relative">
            <div className="flex flex-row items-center gap-4 w-full">
              <div className="p-7 rounded-full bg-neutral-800"></div>
              <div className="relative grow h-36 bg-neutral-800 text-sm"></div>
              <div className="flex gap-2 flex-col justify-center items-center h-full">
                <span className="w-2 h-full bg-neutral-800"></span>
                <span className="p-4 bg-neutral-800 rounded-full"></span>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="relative">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex flex-row grow p-2">
                  <span className="w-1/2 bg-neutral-800 h-8 rounded-full" />
                </div>
              ))}
              <div className="absolute h-full bottom-0 inset-x-0 bg-gradient-to-t from-black"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {activeTrackIndex !== null && (
            <AudioPlayer
              src={audioTracks[activeTrackIndex].url}
              name={audioTracks[activeTrackIndex].name}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          )}
          <div className="flex flex-col">
            {audioTracks.map((track, index) => (
              <motion.div
                key={index}
                className={`overflow-hidden flex flex-row grow cursor-pointer transition duration-300 ease-in-out text-gray-400 text-xl text-left border-b p-2 ${
                  activeTrackIndex === index
                    ? "text-pink-500 border-pink-500 bg-gradient-to-r from-gray-800"
                    : "hover:text-white border-gray-400 hover:border-white"
                }`}
                onClick={() => handleTrackSelect(index)}
                initial={{ x: -50, opacity: 0 }} // Start off-screen to the left
                animate={{ x: 0, opacity: 1 }} // Slide into position
                transition={{
                  x: { duration: 0.1, delay: 0.4 + index * 0.1 }, // Slide delay based on index
                  opacity: { duration: 0.5, delay: 0.4 + index * 0.1 }, // Fade delay based on index
                }}
              >
                <div>{track.name}</div>

                <motion.div
                  className="ml-auto"
                  initial={{ x: 48 }}
                  animate={{ x: activeTrackIndex === index ? 0 : 48 }}
                  exit={{ x: 48 }}
                  transition={{ duration: 0.3 }}
                >
                  <Disc3
                    height={24}
                    width={24}
                    className={
                      activeTrackIndex === index && isPlaying
                        ? "animate-spin"
                        : ""
                    }
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      <div className="flex gap-12 text-white text-4xl justify-center">
        <img
          src="https://img.icons8.com/?size=100&id=IDLlkG5VGOjL&format=png&color=ffffff"
          alt="Fl Studio"
          className="w-12 h-12"
        />
        <img
          src="https://img.icons8.com/?size=100&id=37307&format=png&color=ffffff"
          alt="Audacity"
          className="w-12 h-12"
        />
      </div>
    </div>
  );
}

const AudioPlayer = ({ src, isPlaying, setIsPlaying }) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const hoverRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0); // Current time of the track
  const [duration, setDuration] = useState(0); // Total duration of the track
  const [hovered, setHovered] = useState(false); // Hover state
  const [value, setValue] = useState(100); // Volume state

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.floor(seconds) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);
    return `${minutes}:${paddedSeconds}`;
  };

  useEffect(() => {
    // Initialize WaveSurfer instance only once
    if (!wavesurferRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#687280",
        progressColor: "#ff3366",
        cursorColor: "#fff",
        barWidth: 2,
        height: 150,
        responsive: true,
      });
      wavesurferRef.current = wavesurfer;

      // Event listeners for WaveSurfer
      wavesurfer.on("ready", () => {
        setDuration(wavesurfer.getDuration());
      });

      wavesurfer.on("audioprocess", () => {
        setCurrentTime(wavesurfer.getCurrentTime());
      });

      wavesurfer.on("finish", () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
    }

    // Update source when it changes
    if (wavesurferRef.current) {
      wavesurferRef.current.load(src);
    }

    return () => {
      // No need to destroy; WaveSurfer instance will persist
    };
  }, [src, setIsPlaying]); // The effect runs only when `src` changes

  //Volume control
  useEffect(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(value / 100);
    }
  }, [value]);

  useEffect(() => {
    // Reset isPlaying and currentTime when the track changes
    setIsPlaying(false);
    setCurrentTime(0);

    // Move the seeker to the beginning when the track changes
    if (wavesurferRef.current) {
      wavesurferRef.current.seekTo(0);
    }
  }, [src, setIsPlaying]);

  // Change hover width based on cursor position
  useEffect(() => {
    if (waveformRef.current) {
      const waveformElement = waveformRef.current;
      const handleMouseMove = (e) => {
        const { left, width } = waveformElement.getBoundingClientRect();
        const hoverWidth = Math.min(
          Math.max(0, e.clientX - left),
          width
        ).toFixed(2);
        hoverRef.current.style.width = `${hoverWidth}px`;
      };

      waveformElement.addEventListener("mousemove", handleMouseMove);

      return () => {
        if (waveformElement) {
          waveformElement.removeEventListener("mousemove", handleMouseMove);
        }
      };
    }
  }, []);

  // Adjust hover state based on mouse enter/leave
  useEffect(() => {
    if (wavesurferRef.current) {
      const waveformElement = waveformRef.current;
      const handleMouseEnter = () => setHovered(true);
      const handleMouseLeave = () => setHovered(false);

      waveformElement.addEventListener("mouseenter", handleMouseEnter);
      waveformElement.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        if (waveformElement) {
          waveformElement.removeEventListener("mouseenter", handleMouseEnter);
          waveformElement.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    }
  }, []);

  const togglePlay = () => {
    if (wavesurferRef.current) {
      if (isPlaying) {
        wavesurferRef.current.pause();
      } else {
        wavesurferRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      className="flex flex-row items-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <button
        onClick={togglePlay}
        className="p-3 rounded-full bg-pink-600 hover:bg-white hover:text-pink-600 transition duration-300 ease-in-out"
      >
        {isPlaying ? (
          <Pause height={32} width={32} className="cursor-pointer" />
        ) : (
          <Play height={32} width={32} className="cursor-pointer" />
        )}
      </button>
      <div ref={waveformRef} className="relative w-full text-white text-sm">
        <div
          ref={hoverRef}
          className={`absolute inset-0 bottom-0 left-0 z-10 mix-blend-overlay bg-white transition-opacity duration-300 ease-out ${
            hovered ? "opacity-50" : "opacity-0"
          }`}
        />
        <div className="absolute bottom-0 left-0 text-left">
          {formatTime(currentTime)}
        </div>
        <div className="absolute bottom-0 right-0 text-right">
          {formatTime(duration)}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <span className="">
          {/* vertical volume slider */}
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            orient="vertical"
            className="w-1 accent-pink-600 cursor-pointer"
            style={{
              writingMode: "vertical-lr",
              direction: "rtl",
            }}
            onChange={(e) => setValue(e.target.value)}
          />
        </span>
        <Volume2 height={20} width={20} className="mb-1" />
      </div>
    </motion.div>
  );
};
