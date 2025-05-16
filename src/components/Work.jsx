"use client";
import React from "react";
import "../styles/Works.css";
import { motion } from "framer-motion";
import { ReactData } from "../data/WorkData.jsx";
import WorkCard from "./WorkCard.jsx";
import SectionHead from "./SectionHead";

const Work = () => {
  const fade = {
    opacity: 1,
    transition: {
      duration: 1.4,
    },
  };

  return (
    <section
      id="portfolio" // Changed from id="about" to id="portfolio" for clarity
      className="text- scroll-mt-[80px] relative  font-montserrat min-h-[60vh] px-4 md:px-8"
    >
      
      <div className="works" id="portfolio">
        <div className="container my-6 py-8">
          <SectionHead>Portfolio</SectionHead>
          <motion.div
            className="works-box"
            initial={{ opacity: 0 }}
            whileInView={fade}
          >
            {ReactData.map((w, index) => (
              <WorkCard w={w} index={index} key={index} tabId="react" />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Work;
