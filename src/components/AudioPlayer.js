import React, { forwardRef, useImperativeHandle } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { Play, Pause } from "lucide-react";
import Marquee from "./Marquee";
import LoadingWave from "./LoadingWave";

export const AudioPlayer = forwardRef(function AudioPlayer(
  {
    wavesurferRef,
    trackName,
    togglePlay,
    isPlaying,
    waveformRef,
    currentTime,
    setCurrentTime,
    duration,
    volumeValue,
    setVolumeValue,
    isLoading,
  },
  ref
) {
  const controls = useAnimation();

  // Expose the animation trigger function via the ref
  useImperativeHandle(ref, () => ({
    triggerAnimation: () => {
      const DELAY = 300;
      controls.set({ opacity: 0 }); // Instant reset to opacity 0
      controls.start({
        opacity: 1,
        transition: { duration: DELAY * 0.001, ease: "easeOut" },
      });
      setTimeout(() => DELAY);
    },
  }));

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.floor(seconds) % 60;
    return `${minutes}:${`0${secondsRemainder}`.slice(-2)}`;
  };

  return (
    <>
      <div className="flex flex-row items-center gap-8 mt-4 mb-2">
        <motion.button
          onClick={togglePlay}
          className={`hidden border-4 lg:block p-4 rounded-full text-stone-200 ${
            !isLoading
              ? "hover:bg-stone-200 hover:text-rose-600 cursor-pointer"
              : "cursor-not-allowed"
          }  transition duration-300 ease-out`}
          disabled={isLoading}
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.1, type: "spring", stiffness: 800 }}
        >
          {isPlaying ? (
            <Pause height={32} width={32} />
          ) : (
            <Play height={32} width={32} />
          )}
        </motion.button>
        <div className="relative w-full">
          <motion.div
            className="relative w-full text-stone-200 text-sm"
            ref={waveformRef}
            initial={{ opacity: 0 }}
            animate={controls}
            exit={{ opacity: 0 }}
          >
            {/* Time Display */}
            <div className="absolute -bottom-6 left-0 text-left select-none z-10 bg-stone-900">
              {formatTime(currentTime)}
            </div>
            <div className="absolute -bottom-6 right-0 text-right select-none z-10 bg-stone-900">
              {formatTime(duration)}
            </div>
          </motion.div>
          {isLoading && (
            <AnimatePresence>
              <motion.div
                className="absolute inset-0 w-full flex z-20 animate-pulse"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <LoadingWave />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        <div className="hidden lg:block flex flex-col justify-center items-center">
          <input
            title="Volume Control"
            type="range"
            min="0"
            max="100"
            value={volumeValue}
            orient="vertical"
            className="w-1 h-[124px] accent-rose-600 cursor-pointer"
            style={{
              writingMode: "vertical-lr",
              direction: "rtl",
            }}
            onChange={(e) => setVolumeValue(parseInt(e.target.value, 10))}
          />
        </div>
      </div>
      {/* Mobile controls, hidden on desktop: a bar below with fixed positioning */}
      <AnimatePresence>
        <motion.div
          className="flex flex-row items-center gap-4 lg:hidden fixed inset-x-0 bottom-0 bg-stone-200 px-4 py-2 z-50"
          style={{
            boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.2)",
          }}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <button
            onClick={togglePlay}
            className="p-3 text-rose-500 rounded-full bg-stone-200 border-rose-500 border-4 transition duration-300 ease-out"
            disabled={isLoading}
          >
            {isPlaying ? (
              <Pause height={32} width={32} className="cursor-pointer" />
            ) : (
              <Play height={32} width={32} className="cursor-pointer" />
            )}
          </button>
          <div className="flex flex-col gap-0.5 h-full w-full justify-between">
            <div className="w-full text-sm text-stone-900 font-bold pointer-events-none">
              <Marquee
                key={trackName}
                speed={60}
                direction="left"
                autoFill={true}
                activateOnOverflow={true}
                children={trackName}
                delimiter={"\u00A0\u00A0☆\u00A0\u00A0"}
              />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={
                isNaN(currentTime) || isNaN(duration) || duration === 0
                  ? "0"
                  : (currentTime / duration) * 100
              }
              className="w-full accent-rose-600"
              onChange={(e) => {
                const newTime = (e.target.value / 100) * duration;
                setCurrentTime(newTime);
                wavesurferRef.current.seekTo(newTime / duration);
              }}
              disabled={isLoading}
            />
            <div className="flex flex-row justify-between w-full text-sm text-stone-900 pointer-events-none">
              <div>{formatTime(currentTime)}</div>
              <div>{formatTime(duration)}</div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
});
