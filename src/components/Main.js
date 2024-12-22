import { Contact } from "./Contact";
import { About } from "./About";
import { Work } from "./Work";
import Header from "./Header";
import Footer from "./Footer";

import { useState } from "react";
import useBackgroundAnimation from "./UseBackgroundAnimation";
import { motion } from "framer-motion";
import GridCross from "../assets/grid2.svg";

export default function Main() {
  const [activeTab, setActiveTab] = useState("frontend");
  const { bgX, bgY } = useBackgroundAnimation(true, 0, 1, 1, 1, 30, 1024);

  return (
    <div className="relative bg-black flex min-h-screen flex-col">
      <Header bgX={bgX} bgY={bgY} />
      <div className="relative flex flex-col text-white text-xl font-sans items-center px-8">
        <motion.div
          className="absolute inset-0 bg-[length:512] lg:bg-[length:1024px] bg-repeat bg-fixed opacity-20"
          style={{
            backgroundImage: `url(${GridCross})`,
            mixBlendMode: "normal",
            backgroundPositionX: bgX,
            backgroundPositionY: bgY,
          }}
        />
        <main className="relative max-w-6xl flex flex-col bg-black lg:px-16">
          <div className="flex flex-col gap-16">
            <Work setActiveTab={setActiveTab} activeTab={activeTab} />
            <About />
            <Contact alert={alert} />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
