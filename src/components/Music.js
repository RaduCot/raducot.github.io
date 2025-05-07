import { AudioPlayer } from "./AudioPlayer";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Disc3 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import WaveSurfer from "wavesurfer.js";
import Hover from "wavesurfer.js/dist/plugins/hover.esm.js";
import etherid from "../portfolio/audio_desc/etherid.jpg";
import Cookies from "js-cookie";
import Marquee from "./Marquee";
import disc from "../assets/disc.png";

export function Music({ className, loading, audioTracks = [] }) {
  const [discHovered, setDiscHovered] = useState(false);

  const [activeTrackIndex, setActiveTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isFirstLoadRef = useRef(true);
  const [isLoading, setIsLoading] = useState(true);

  const audioPlayerRef = useRef(); // Ref for AudioPlayer

  //Check if we are on desktop or mobile
  const isMobile = window.innerWidth < 1024;

  useEffect(() => {
    if (audioTracks.length > 0) {
      setActiveTrackIndex(0); // Set the first track as the active one
    }
  }, [audioTracks]);

  const sortedAudioTracks = useMemo(() => {
    return [...audioTracks].sort((a, b) => a.name.localeCompare(b.name));
  }, [audioTracks]);

  const handleTrackSelect = (index) => {
    setIsLoading(true);
    setActiveTrackIndex(index);
    if (wavesurferRef.current) {
      wavesurferRef.current.load(sortedAudioTracks[index].base64);
      wavesurferRef.current.on("ready", () => {
        wavesurferRef.current.play();
        setIsPlaying(true);

        // Trigger animation when the track is ready
        if (audioPlayerRef.current) {
          audioPlayerRef.current.triggerAnimation();
        }
      });
    }
  };

  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const volumeRef = useRef(100);
  const [volumeDisplay, setVolumeDisplay] = useState(100);
  const [duration, setDuration] = useState(0);

  const src =
    activeTrackIndex !== null
      ? sortedAudioTracks[activeTrackIndex].base64
      : null;

  useEffect(() => {
    if (waveformRef.current && !wavesurferRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#525252",
        progressColor: "#e11d48",
        cursorColor: "#fff",
        height: isMobile ? 64 : 124,
        responsive: true,
        fillParent: true,
        normalize: true,
        cursorWidth: 2,
        plugins: [
          Hover.create({
            lineColor: "#fff",
            lineWidth: 2,
            labelBackground: "#000",
            labelColor: "#fff",
            labelSize: "14px",
          }),
        ],
      });

      wavesurferRef.current.on("ready", () => {
        setIsLoading(false);
        setDuration(wavesurferRef.current.getDuration());
        wavesurferRef.current.setVolume(volumeRef.current / 100);
        if (src && !isFirstLoadRef.current) {
          wavesurferRef.current.play();
          setIsPlaying(true);
        }
        isFirstLoadRef.current = false;
        if (audioPlayerRef.current) {
          audioPlayerRef.current.triggerAnimation();
        }
      });
      wavesurferRef.current.on("audioprocess", () => {
        setCurrentTime(wavesurferRef.current.getCurrentTime());
      });
      wavesurferRef.current.on("finish", () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
      wavesurferRef.current.on("seeking", (progress) => {
        setCurrentTime(progress);
      });
    }

    if (wavesurferRef.current && src) {
      wavesurferRef.current.load(src);
    }

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.unAll();
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    };
  }, [src, isMobile]);

  const handleVolumeChange = (newValue) => {
    volumeRef.current = newValue;
    setVolumeDisplay(newValue);
    Cookies.set("volume", newValue, {
      expires: 7,
      sameSite: "None",
      secure: true,
    });
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(newValue / 100);
    }
  };

  useEffect(() => {
    const savedVolume = Cookies.get("volume");
    if (savedVolume) {
      const volume = parseInt(savedVolume, 10);
      volumeRef.current = volume;
      setVolumeDisplay(volume);
      if (wavesurferRef.current) {
        wavesurferRef.current.setVolume(volume / 100);
      }
    }
  }, []);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);

    if (wavesurferRef.current) {
      wavesurferRef.current.seekTo(0);
    }
  }, [src]);

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
    <div className={`flex flex-col lg:gap-12 gap-6 ${className}`}>
      {loading ? (
        <div className="flex flex-col gap-8 animate-pulse">
          {/* Loading Placeholder */}
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            // Fade in animation
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-8 lg:px-0 px-8"
          >
            {activeTrackIndex !== null && (
              <AudioPlayer
                ref={audioPlayerRef} // Pass the ref to AudioPlayer
                wavesurferRef={wavesurferRef}
                trackName={sortedAudioTracks[activeTrackIndex].name}
                togglePlay={togglePlay}
                isPlaying={isPlaying}
                waveformRef={waveformRef}
                currentTime={currentTime}
                setCurrentTime={setCurrentTime}
                duration={duration}
                volumeValue={volumeDisplay}
                setVolumeValue={handleVolumeChange}
                isLoading={isLoading}
              />
            )}
            <div className="overflow-hidden flex flex-col gap-1">
              {sortedAudioTracks.map((track, index) => (
                <motion.div
                  key={index}
                  onClick={() => {
                    if (activeTrackIndex !== index) {
                      handleTrackSelect(index);
                    }
                  }}
                  initial={{ opacity: 0, x: "-100%", paddingLeft: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{
                    paddingLeft: activeTrackIndex !== index ? "1%" : "0%",
                  }}
                  transition={{
                    x: {
                      duration: 0.5,
                      delay: 0.4 + index * 0.1,
                      ease: [0.83, 0, 0.17, 1],
                    },
                    opacity: {
                      duration: 0.5,
                      delay: 0.4 + index * 0.1,
                      ease: [0.83, 0, 0.17, 1],
                    },
                    paddingLeft: {
                      duration: 0.3,
                      ease: [0, 0.55, 0.45, 1],
                    },
                  }}
                >
                  <div
                    className={`overflow-hidden flex flex-row grow cursor-pointer transition duration-300 ease-out text-neutral-600 lg:text-lg text-sm text-left p-2 pr-4 ${
                      activeTrackIndex === index
                        ? "bg-rose-600 text-stone-200 font-bold"
                        : "lg:hover:text-rose-600 lg:hover:bg-stone-300 bg-stone-200 lg:font-semibold"
                    }`}
                    style={{ borderRadius: "0px 9999px 9999px 0px" }}
                  >
                    <motion.div
                      className="flex items-center overflow-hidden mr-4"
                      initial={{ x: -16 }}
                      animate={{ x: activeTrackIndex === index ? 8 : -16 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <motion.span
                        className="inline-block align-middle mr-2"
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        animate={{
                          opacity: activeTrackIndex === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        ♫&#xFE0E;
                      </motion.span>
                      <div className="relative overflow-hidden whitespace-nowrap">
                        {activeTrackIndex === index ? (
                          <div className="w-full" key={track.name}>
                            <Marquee
                              speed={60}
                              direction="left"
                              autoFill={true}
                              activateOnOverflow={true}
                              children={track.name}
                              delimiter={"\u00A0\u00A0☆\u00A0\u00A0"}
                            />
                          </div>
                        ) : (
                          // Inactive: Show regular span for overflow detection
                          <span className="block overflow-hidden text-ellipsis">
                            {track.name}
                          </span>
                        )}
                      </div>
                    </motion.div>

                    <motion.div
                      className="ml-auto flex items-center"
                      initial={{ x: 48, opacity: 0 }}
                      animate={{
                        x: activeTrackIndex === index ? 0 : 48,
                        opacity: activeTrackIndex === index ? 1 : 0,
                      }}
                      exit={{ x: 48, opacity: 0 }}
                      transition={{
                        x: { duration: 0.3, ease: "circOut" },
                        opacity: { duration: 0.3, ease: "easeOut" },
                      }}
                    >
                      <Disc3
                        height={20}
                        width={20}
                        className={
                          activeTrackIndex === index && isPlaying
                            ? "animate-spin z-20"
                            : "z-20"
                        }
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      <div className="flex flex-wrap gap-8 lg:gap-12 text-stone-200 lg:text-4xl text-2xl justify-center self-center lg:px-0 px-8">
        <img
          src="https://img.icons8.com/?size=100&id=IDLlkG5VGOjL&format=png&color=e7e5e4"
          alt="Fl Studio"
          className="lg:w-12 lg:h-12 w-8 h-8"
          title="Fl Studio"
        />
        <img
          src="https://img.icons8.com/?size=100&id=37307&format=png&color=e7e5e4"
          alt="Audacity"
          className="lg:w-12 lg:h-12 w-8 h-8"
          title="Audacity"
        />
      </div>

      <p className="text-neutral-400 text-justify max-w-3xl self-center lg:text-lg text-base lg:px-0 px-8">
        I’m all about versatility in music! I can dive into any genre and make
        it work for the context. My playlist above is full of examples that show
        just how adaptable I can be and I’m always up for exploring new sounds
        and styles. From groovy basslines to sweeping cinematic scores, I love
        experimenting with different musical vibes and pushing creative
        boundaries. No matter the mood, I focus on creating tracks that fit
        perfectly and stand out. Oh, and I’m also a guitarist!
      </p>

      <a
        href="https://www.youtube.com/watch?v=tzEkIpGa5bA"
        className="relative self-center max-w-sm lg:px-0 px-8"
        target="_blank"
        rel="noreferrer"
      >
        <motion.div
          onHoverStart={() => setDiscHovered(true)}
          onHoverEnd={() => setDiscHovered(false)}
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ duration: 0.1, type: "spring", stiffness: 300 }}
          className="relative z-20"
        >
          {/* Disc */}
          <motion.img
            src={disc}
            alt="Disc"
            className="absolute inset-0 z-10 pointer-events-none"
            animate={{ x: discHovered ? "25%" : "0%" }}
            transition={{ duration: 0.3, ease: [0.83, 0, 0.17, 1] }}
          />

          {/* Etherid */}
          <img
            src={etherid}
            alt="Etherid /// ALPHA"
            className="relative z-20"
          />
        </motion.div>
      </a>
      <p className="text-neutral-400 text-justify max-w-3xl self-center lg:text-lg text-base lg:px-0 px-8">
        The track{" "}
        <span className="text-stone-200 font-bold">Etherid /// ALPHA </span>
        won the <span className="text-rose-500">Masterpiece Award</span> at the{" "}
        <a
          href="https://act.hoyoverse.com/zzz/event/e20240706-dripfest-hczagt/index.html"
          className="text-rose-500 hover:text-blue-500 transition duration-300 ease-out"
          target="_blank"
          rel="noreferrer"
        >
          2024 Zenless Zone Zero DripFest Event
        </a>
        . This original{" "}
        <span className="text-stone-200">Jazz DnB combat theme </span>
        captures the urban vibe of the game with its{" "}
        <span className="text-stone-200">grungy textures</span> and{" "}
        <span className="text-stone-200">high-energy sound design</span>. The
        track features <span className="text-stone-200">reece bass</span>,
        intricate <span className="text-stone-200">amen breaks</span>, and a
        soulful <span className="text-stone-200">jazzy Rhodes section</span>,
        building up tension and delivering powerful drops, all enhanced by
        occasional <span className="text-stone-200">choppy ad-lib vocals</span>.
        This piece showcases my knack for blending complex musical elements into
        engaging and action-packed compositions that resonate with the context's
        vibe. You can also find it on{" "}
        <a
          href="https://www.youtube.com/watch?v=tzEkIpGa5bA"
          className="text-rose-500 hover:text-blue-500 transition duration-300 ease-out"
          target="_blank"
          rel="noreferrer"
        >
          YouTube
        </a>
        !
      </p>
    </div>
  );
}
