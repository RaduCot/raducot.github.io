import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import AnimatedBetas from "./AnimatedBetas";

export function Contact({ alert }) {
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");

  const copyToClipboard = (text) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
      } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
      }
      document.body.removeChild(textArea);
    }
  };

  // Initialize emailjs with your user ID (use your public key)
  useEffect(() => {
    emailjs.init("8p-rMamm5IdzgWy8F"); // Add your public user key here
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      from_email: senderEmail,
      message: `From: ${senderEmail}\n\n${message}`,
    };

    emailjs.send("service_twcu72b", "template_x64s3dm", templateParams).then(
      function (response) {
        alert("Message sent successfully!");
        setSenderEmail(""); // Clear inputs after success
        setMessage("");
      },
      function (err) {
        alert("Failed to send message. Please try again later.");
        console.error("Failed to send message:", err);
      }
    );
  };

  return (
    <div className="flex flex-col gap-12">
      <div
        className={
          "flex flex-row text-xl lg:text-2xl pr-8 tracking-wider font-extrabold"
        }
      >
        <div className="w-full">
          <AnimatedBetas
            numBetas={10}
            minWidth={60}
            maxWidth={0}
            speed={0.5}
            skew={-60}
            color="bg-stone-200"
          />
        </div>
        <div className="text-stone-900 w-fit text-right whitespace-nowrap bg-stone-200 px-8">
          CONTACT
        </div>
      </div>
      <div className="flex justify-center text-stone-200 z-10 mb-12 text-xl lg:px-0 px-8">
        <div className="flex flex-col justify-self-center lg:gap-12 gap-6 grow text-neutral-400 text-center max-w-3xl">
          <div className="flex flex-row flex-wrap justify-center gap-4 text-rose-500 font-bold lg:text-4xl text-3xl">
            <p> Hey there!</p>
            <span>( ´ ▽ ` )ﾉ</span>
          </div>
          <p className="font-normal lg:text-lg text-base">
            For collaboration or inquiries you can find me on GitHub, LinkedIn
            or via email!
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap gap-8 lg:gap-12 text-stone-200 text-xl justify-center self-center">
            {/* GitHub Icon */}
            <a
              href="https://github.com/RaduCot"
              target="_blank"
              rel="noreferrer"
              className="bg-stone-900 relative group text-2xl cursor-pointer"
            >
              <img
                src="https://cdn.simpleicons.org/github/e7e5e4"
                alt="GitHub"
                className="relative z-10 w-10 transition-opacity duration-300 ease-out group-hover:opacity-0"
              />
              <img
                src="https://cdn.simpleicons.org/github/f43f5e"
                alt="GitHub Hover"
                className="absolute top-0 left-0 z-0 w-10 transition-opacity duration-300 ease-out opacity-0 group-hover:opacity-100"
              />
            </a>

            {/* LinkedIn Icon */}
            <a
              href="https://www.linkedin.com/in/radu-cotorceanu-7671bb26a/"
              target="_blank"
              rel="noreferrer"
              className="bg-stone-900 relative group text-2xl cursor-pointer"
            >
              <img
                src="https://img.icons8.com/?size=100&id=8808&format=png&color=e7e5e4"
                alt="LinkedIn"
                className="relative z-10 w-10 transition-opacity duration-300 ease-out group-hover:opacity-0"
              />
              <img
                src="https://img.icons8.com/?size=100&id=8808&format=png&color=f43f5e"
                alt="GitHub Hover"
                className="absolute top-0 left-0 z-0 w-10 transition-opacity duration-300 ease-out opacity-0 group-hover:opacity-100"
              />
            </a>

            {/* Email Icon */}
            <div
              className="bg-stone-900 text-stone-200 relative group text-2xl cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                copyToClipboard("r.cotorceanu@gmail.com");
                alert("Email address copied to clipboard!");
              }}
            >
              <img
                src="https://cdn.simpleicons.org/gmail/e7e5e4"
                alt="Gmail"
                className="relative z-10 w-10 transition-opacity duration-300 ease-out group-hover:opacity-0"
              />
              <img
                src="https://cdn.simpleicons.org/gmail/f43f5e"
                alt="Gmail Hover"
                className="absolute top-0 left-0 z-0 w-10 transition-opacity duration-300 ease-out opacity-0 group-hover:opacity-100"
              />
            </div>
          </div>

          <p className="lg:text-lg text-base">
            Or you can simply fill out the form below and I'll get back to you:
          </p>

          {/* Contact Form */}
          <form
            onSubmit={sendEmail}
            className="flex flex-col gap-4 items-center w-full font-normal lg:text-xl text-base"
          >
            {/* Email Input */}
            <input
              type="email"
              placeholder="Your Email"
              value={senderEmail}
              id="email"
              name="email"
              onChange={(e) => setSenderEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border-2 border-neutral-600 bg-stone-900 text-stone-200 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-stone-200"
            />
            {/* Message Input */}
            <textarea
              placeholder="Your Message"
              value={message}
              id="message"
              name="message"
              onChange={(e) => setMessage(e.target.value)}
              required
              rows="5"
              className="w-full px-4 py-2 border-2 border-neutral-600 bg-stone-900 text-stone-200 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-stone-200"
            />
            {/* Submit Button */}
            <button
              type="submit"
              className="lg:text-2xl text-xl px-6 py-2 border-4 border-stone-200 text-stone-200 font-bold lg:hover:bg-stone-200 lg:hover:text-rose-600 transition duration-300 ease-out"
            >
              Send Mail
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
