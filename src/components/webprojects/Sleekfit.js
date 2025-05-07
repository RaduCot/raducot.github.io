const Sleekfit = {
  id: 1,
  title: "✧✦SLEEKFIT - JDM-Inspired Brand Showcase",
  description:
    "A sleek, one-page web experience crafted to highlight both frontend and design skills. Built with React and powered by Framer Motion and Swiper.",
  live_link: "https://raducot.github.io/react-sleekfit/",
  github_link: "https://github.com/RaduCot/react-sleekfit",
  image: (
    <>
      <video
        poster="https://media.contra.com/image/upload/ar_1.333,c_fill,f_avif,h_384,pg_1,q_auto:eco,w_512/wb8ryjeyxcejropodqwg"
        autoPlay={true}
        loop={true}
        playsInline={true}
        style={{ aspectRatio: "4/3" }}
      >
        <source
          src="https://res.cloudinary.com/contra/image/upload/ar_1.333,c_fill,f_webm,h_768,q_auto:best,w_1024/wb8ryjeyxcejropodqwg"
          type="video/webm"
        />
        <source
          src="https://res.cloudinary.com/contra/image/upload/ar_1.333,c_fill,f_mp4,h_768,q_auto:best,w_1024/wb8ryjeyxcejropodqwg"
          type="video/mp4"
        />
        Your browser does not support HTML video. Here is{" "}
        <a
          href="https://res.cloudinary.com/contra/image/upload/ar_1.333,c_fill,f_mp4,h_768,q_auto:best,w_1024/wb8ryjeyxcejropodqwg"
          rel="noreferrer"
          target="_blank"
        >
          a link to the video
        </a>{" "}
        instead.
      </video>
    </>
  ),
  content: (
    <>
      <div className="flex flex-col justify-center max-w-3xl gap-4 text-start mb-8 text-neutral-600">
        <div className="h-[1px] bg-neutral-400 w-full"></div>
        <h1 className="lg:text-2xl text-lg font-bold text-stone-900">{"/// OVERVIEW"}</h1>
        <p>
          A sleek, one-page web experience crafted to highlight both{" "}
          <strong>frontend </strong>and <strong>design </strong>skills. Built
          with <strong>React </strong>and powered by{" "}
          <strong>Framer Motion</strong> and <strong>Swiper</strong>,{" "}
          <em>SLEEKFIT </em>is an identity showcase for a fictional apparel
          brand inspired by Japanese Domestic Market (JDM) culture. The site
          features an intuitive layout with smooth animations that enhance user
          engagement, all while maintaining a snappy and responsive feel.
        </p>
        <img
          src="https://media.contra.com/image/upload/w_800,q_auto:best/ihvyr6tebxcccogxnhe7.avif"
          alt="Sleekfit"
          className="w-full h-auto"
        />
        <h1 className="lg:text-2xl text-lg font-bold text-stone-900">
          {"/// NOTABLE FEATURES"}
        </h1>
        <ul className="list-disc pl-4">
          <li>
            <span className="font-bold text-stone-900">
              React-based Single Page Design:
            </span>{" "}
            Built with React for smooth, efficient performance.
          </li>
          <li>
            <span className="font-bold text-stone-900">Mobile-First Design:</span>{" "}
            Fully responsive layout, ensuring an optimal experience across
            devices.
          </li>
          <li>
            <span className="font-bold text-stone-900">Snappy and fluid UX:</span>{" "}
            Fluid, dynamic transitions and animations for an engaging user
            experience.
          </li>
          <li>
            <span className="font-bold text-stone-900">
              Customizable Animations:
            </span>{" "}
            Ability to toggle animations for a more static or animated
            experience.
          </li>
          <li>
            <span className="font-bold text-stone-900">Modular Sections:</span>{" "}
            Coded with flexibility in mind; well-defined and easy to customize
            layout.
          </li>
          <li>
            <span className="font-bold text-stone-900">Bold Visual Theme:</span>{" "}
            Bold, sport-inspired design elements for a unique aesthetic.
          </li>
          <li>
            <span className="font-bold text-stone-900">
              Swiper-Integrated Gallery:
            </span>{" "}
            Interactive carousel displaying custom-made JDM-inspired apparel
            designs.
          </li>
        </ul>
        <h1 className="lg:text-2xl text-lg font-bold text-stone-900">{"/// KEY SECTIONS"}</h1>
        <ul className="list-disc pl-4">
          <li>
            <span className="font-bold text-stone-900">About:</span> Introduces the
            brand’s vision and connection to JDM themes.
          </li>
          <li>
            <span className="font-bold text-stone-900">Gallery:</span> A visually
            dynamic carousel showcasing custom apparel designs.
          </li>
          <li>
            <span className="font-bold text-stone-900">News:</span> The latest
            updates in the brand’s journey.
          </li>
          <li>
            <span className="font-bold text-stone-900">Contact:</span> Simple and
            direct ways to get in touch.
          </li>
        </ul>
        <img
          src="https://media.contra.com/image/upload/w_800,q_auto:best/lxikkby9oeiq9mylisk1.avif"
          alt="Sleekfit"
          className="w-full h-auto"
        />
        <h2 className="text-center">
          Marquee-style section top, with animations that reveal text based on
          viewport visibility
        </h2>
        <img
          src="https://media.contra.com/image/upload/w_800,q_auto:best/ehl05ltgwdiatcdwavhm.avif"
          alt="Sleekfit"
          className="w-full h-auto"
        />
        <h2 className="text-center">Navigation menu</h2>
        <img
          src="https://media.contra.com/image/upload/w_800,q_auto:best/euqdqkaltqyrrbzryjri.avif"
          alt="Sleekfit"
          className="w-full h-auto"
        />
        <h2 className="text-center">
          Carousel-style gallery made with Swiper
        </h2>
        <img
          src="https://media.contra.com/image/upload/w_800,q_auto:best/wq3pxb7xg89hfm13olja.avif"
          alt="Sleekfit"
          className="w-full h-auto"
        />
        <h2 className="text-center">Fully modular news section</h2>
      </div>
    </>
  ),
};

export default Sleekfit;
