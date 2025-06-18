"use client";

import { useEffect, useRef } from "react";
import PcModelCanvas from "./canvas/PcModelCanvas";
import SectionHead from "./SectionHead";
import { motion, useAnimation, useInView } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

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
      className="text-white scroll-mt-[80px] mb-9 relative bg-[#0D1224] pt-4 font-montserrat min-h-[60vh] px-4 md:px-8"
    >
      {/* Background */}
      <div
        className="absolute top-0 left-0 w-full h-full min-h-screen z-0 bg-no-repeat bg-cover bg-center bg-blend-overlay"
        style={{
          backgroundImage: `url('https://abusaid.netlify.app/hero.svg')`,
        }}
      ></div>

      <SectionHead>About Me</SectionHead>

      <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center gap-8">
        {/* 3D Model */}
        <div className="w-full lg:w-[50%] h-[50vh] flex justify-center">
          <PcModelCanvas />
        </div>

        {/* About Text */}
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
          <p className="font-openSans text-[#9ca4b0]">
            I specialize in mobile app development using React Native, Node.js,
            and Firebase to build high-performance, user-friendly applications.
          </p>
          <p className="mt-4 font-openSans text-[#9ca4b0]">
            My tech stack includes Redux Toolkit, TypeScript, Stripe, and
            MongoDB, with a passion for learning new technologies.
          </p>
          <p className="mt-4 font-openSans text-[#9ca4b0]">
            Outside of coding, I enjoy exploring app trends, watching tech
            content, and solving Rubik’s cubes and Sudoku.
          </p>

          {/* Social Icons */}
          <div className="mt-6 flex gap-4 text-2xl">
            <a
              href="https://github.com/AliHassan5927"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition duration-300"
            >
              <FaGithub size={30} className="text-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/ali-hassan-react-native/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition duration-300"
            >
              <FaLinkedin size={30} className="text-[#0077B5]" />
            </a>
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition duration-300"
            >
              <FaTwitter size={30} className="text-[#1DA1F2]" />
            </a>
            <a
              href="https://facebook.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition duration-300"
            >
              <FaFacebook size={30} className="text-[#1877F2]" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
