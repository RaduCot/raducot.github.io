const ArtistPortfolio = {
  id: 2,
  title: "Fullstack Artist Portfolio Showcase",
  description:
    "Fullstack portfolio project that captures the essence of the ArtStation grid style to deliver a professional gallery-style display. Built with React and NestJS.",
  live_link: null,
  github_link: "https://github.com/RaduCot/fullstack-portfolio",
  image: (
    <img
      src="https://media.contra.com/image/upload/ar_1.333,c_fill,f_avif,h_366,q_auto:good,w_488/zepzl37dl6uwtdy0dfph"
      alt="Artist Portfolio"
      className=""
      style={{ aspectRatio: "4/3" }}
    />
  ),
  content: (
    <>
      <div className="flex flex-col justify-center max-w-3xl gap-4 text-start mb-8 text-neutral-600">
        <div className="h-[1px] bg-neutral-400 w-full"></div>
        <h1 className="lg:text-2xl text-lg font-bold text-stone-900">{"/// OVERVIEW"}</h1>
        <p>
          This <strong>fullstack</strong> portfolio project captures the essence
          of the <em>ArtStation </em>grid style to deliver a professional and
          visually striking gallery-style display. Built with a{" "}
          <strong>NestJS</strong> backend and <strong>React</strong> frontend,
          it uses <strong>PostgreSQL </strong>for secure and structured data
          handling, <strong>Framer Motion</strong> for fluid animations, and a{" "}
          <strong>modular </strong>component structure to support future updates
          seamlessly.
        </p>
        <p>
          Each project showcase is visually engaging and optimized for user
          interaction, making it perfect for <strong>creatives</strong>,{" "}
          <strong>photographers</strong>, or <strong>designers </strong>looking
          to highlight their work in a refined digital gallery.
        </p>
        <img
          src="https://media.contra.com/image/upload/w_800,q_auto:best/telgszfgf9ykviwurqm8.avif"
          alt="Fullstack Artist Portfolio Showcase"
          className="w-full h-auto"
        />
        <p>
          <strong>NOTE:</strong> All demo works used in this project belong to{" "}
          <strong>Sergey Vasnev</strong>. You can find him on{" "}
          <a
            href="https://sergey_vasnev.artstation.com/"
            rel="noreferrer"
            target="_blank"
          >
            <u>ArtStation</u>
          </a>
          .
        </p>
        <h1 className="lg:text-2xl text-lg font-bold text-stone-900">
          {"/// NOTABLE FEATURES"}
        </h1>
        <ul className="list-disc pl-4">
          <li>
            <strong className="text-stone-900">Grid Layout:</strong> Visually
            engaging gallery display to showcase projects elegantly.
          </li>
          <li>
            <strong className="text-stone-900">NestJS Backend:</strong> Efficient
            and structured server architecture for managing portfolio data.
          </li>
          <li>
            <strong className="text-stone-900">PostgreSQL Database:</strong> Secure
            storage for works and details, supporting efficient querying.
          </li>
          <li>
            <strong className="text-stone-900">Modular Components:</strong> Scalable
            React component structure for easy maintenance and updates.
          </li>
          <li>
            <strong className="text-stone-900">Smooth Animations:</strong> Uses
            framer-motion to create engaging and responsive transitions.
          </li>
          <li>
            <strong className="text-stone-900">Axios Integration:</strong> Seamless
            API calls between frontend and backend for data retrieval.
          </li>
          <li>
            <strong className="text-stone-900">TailwindCSS Styling:</strong> Modern
            and responsive design for all devices with utility-first CSS.
          </li>
          <li>
            <strong className="text-stone-900">CRUD Testing:</strong> Built-in test
            suite for validating backend functionality.
          </li>
        </ul>
        <h1 className="lg:text-2xl text-lg font-bold text-stone-900">
          {"/// KEY FUNCTIONALITIES"}
        </h1>
        <ul className="list-disc pl-4">
          <li>
            <strong className="text-stone-900">Role preview:</strong> View the
            contents of the page from the user's perspective or the
            administrator's.
          </li>
          <li>
            <strong className="text-stone-900">Populate Portfolio:</strong> Load
            initial dataset from SQL to showcase sample works on first setup.
          </li>
          <li>
            <strong className="text-stone-900">Add New Works:</strong> Easily add
            new project entries to the portfolio directly from the frontend
            interface.
          </li>
          <li>
            <strong className="text-stone-900">Remove Works:</strong> Delete
            outdated or unnecessary works from the portfolio with a simple
            action.
          </li>
          <li>
            <strong className="text-stone-900">Update Work Details:</strong> Edit
            details of any project, including title, description, and images, to
            keep the portfolio current.
          </li>
        </ul>
        <img
          src="https://media.contra.com/image/upload/w_800,q_auto:best/odolf31qj70g5urzzqup.avif"
          alt="Visitor View"
          className="w-full h-auto"
        />
        <h2 className="text-center">Visitor View</h2>
        <img
          src="https://media.contra.com/image/upload/w_800,q_auto:best/zepzl37dl6uwtdy0dfph.avif"
          alt="Admin View"
          className="w-full h-auto"
        />
        <h2 className="text-center">Admin View</h2>
        <img
          src="https://media.contra.com/image/upload/w_800,q_auto:best/hc70r85p3ucnxqr1nlr5.avif"
          alt="Work Details"
          className="w-full h-auto"
        />
        <h2 className="text-center">Work Details</h2>
        <img
          src="https://media.contra.com/image/upload/w_800,q_auto:best/tpb1mvq14drsnoux5emp.avif"
          alt="Work Add"
          className="w-full h-auto"
        />
        <h2 className="text-center">Work Add</h2>
        <img
          src="https://media.contra.com/image/upload/w_800,q_auto:best/mzupyoc063bhop6urwyx.avif"
          alt="Work Add"
          className="w-full h-auto"
        />
        <h2 className="text-center">Work Edit</h2>
      </div>
    </>
  ),
};

export default ArtistPortfolio;
