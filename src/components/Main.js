import { Contact } from "./Contact";
import { About } from "./About";
import { Work } from "./Work";
import Header from "./Header";
import Footer from "./Footer";
//import ScrambleText from "./ScrambleText";

import { useState } from "react";
import useBackgroundAnimation from "../scripts/UseBackgroundAnimation";
import { motion } from "framer-motion";
import GridCross from "../assets/grid2.svg";

export default function Main() {
  const [activeTab, setActiveTab] = useState("music");
  const { bgX, bgY } = useBackgroundAnimation(true, 0, 1, 1, 1, 30, 1024);

  return (
    <div className="relative bg-stone-900 flex min-h-screen flex-col">
      <motion.div
        className="absolute inset-0 bg-[length:512] lg:bg-[length:1024px] bg-repeat bg-fixed opacity-20"
        style={{
          backgroundImage: `url(${GridCross})`,
          mixBlendMode: "normal",
          backgroundPositionX: bgX,
          backgroundPositionY: bgY,
        }}
      />
      <Header bgX={bgX} bgY={bgY} />
      <div className="relative flex flex-col text-stone-200 text-xl font-sans items-center">
        <main className="relative w-full max-w-6xl flex flex-col lg:px-16">
          <div
            className="absolute inset-0 bg-stone-900"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, transparent 100%)",
            }}
          ></div>
          <div className="flex flex-col gap-16 relative z-10">
            <About />

            {/* Test
            <div className="flex max-w-3xl self-center p-16 justify-center items-center bg-black">
              <ScrambleText
                text="Evervault balances flexibility and security extremely well. They've built clean and thoughtful abstractions over advanced security foundations, and the product just works. We barely have to think about it."
                refreshRate={0}
                duration={3000}
              />
            </div>
             */}

            <Work setActiveTab={setActiveTab} activeTab={activeTab} />

            <Contact alert={alert} />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
