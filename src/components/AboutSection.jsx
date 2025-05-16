"use client";

import { useEffect, useRef } from "react";
import PcModelCanvas from "./canvas/PcModelCanvas";
import SectionHead from "./SectionHead";
import { motion, useAnimation, useInView } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa"; // Importing React Icons

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const animationControl = useAnimation();

  useEffect(() => {
    if (isInView) {
      animationControl.start("visible");
    }
  }, [isInView, animationControl]);

  return (
    <section
      id="about"
      className="text-[#9ca4b0] scroll-mt-[80px] relative bg-[#] pt-4 font-montserrat min-h-[60vh] px-4 md:px-8"
    >
      <SectionHead>About Me</SectionHead>

      <div className="flex flex-col-reverse lg:flex-row items-center gap-8">
        {/* Left Side - 3D Model or Image (Reduced Size) */}
        <div className="w-full lg:w-[50%] h-[50vh] flex justify-center">
          <PcModelCanvas />
        </div>

        {/* Right Side - Text Section (Increased Width) */}
        <motion.div
          ref={ref}
          variants={{
            hidden: { opacity: 0, x: "100%" },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate={animationControl}
          transition={{
            duration: 0.5,
            x: { type: "spring", stiffness: 100, damping: 10 },
          }}
          className="w-full lg:w-[50%] md:text-[1.35rem] text-justify"
        >
          <div className="font-openSans text-[#9ca4b0]">
            I specialize in mobile app development using React Native, Node.js,
            and Firebase to build high-performance, user-friendly applications.
          </div>

          <div className="mt-4 font-openSans text-[#9ca4b0]">
            My tech stack includes Redux Toolkit, TypeScript, Stripe, and
            MongoDB, with a passion for learning new technologies.
          </div>

          <div className="mt-4 font-openSans text-[#9ca4b0]">
            Outside of coding, I enjoy exploring app trends, watching tech
            content, and solving Rubik’s cubes and Sudoku.
          </div>

          {/* Social Media Links */}
          <div className="mt-6 flex gap-4 text-2xl">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              className="hover:scale-110 transition duration-300"
            >
              <FaGithub className="text-[#9ca4b0]" />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              className="hover:scale-110 transition duration-300"
            >
              <FaLinkedin className="text-[#9ca4b0]" />
            </a>
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              className="hover:scale-110 transition duration-300"
            >
              <FaTwitter className="text-[#9ca4b0]" />
            </a>
            <a
              href="https://facebook.com/yourusername"
              target="_blank"
              className="hover:scale-110 transition duration-300"
            >
              <FaFacebook className="text-[#9ca4b0]" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
