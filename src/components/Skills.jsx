"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHead from "./SectionHead";

const skillsData = {
  All: [
    {
      name: "HTML",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
      name: "CSS",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    {
      name: "JavaScript",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "Python",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "React",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Redux",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    },
    {
      name: "Bootstrap",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    },
    {
      name: "TailwindCSS",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "Django",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    },
    {
      name: "GitHub",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
    {
      name: "Figma",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    },
  ],
  Languages: [
    {
      name: "HTML",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
      name: "CSS",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    {
      name: "JavaScript",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "Python",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
  ],
  Frameworks: [
    {
      name: "React",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Redux",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    },
    {
      name: "Bootstrap",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    },
    {
      name: "TailwindCSS",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    },
  ],
  Tools: [
    {
      name: "GitHub",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
    {
      name: "Figma",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    },
    {
      name: "Django",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    },
  ],
};

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div
      id="skills"
      className="py-10 text-center flex flex-col items-center px-4 sm:px-6 md:px-8"
    >
      <SectionHead>Skill</SectionHead>

      {/* Categories Buttons */}
      <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 md:space-x-8 mb-6">
        {Object.keys(skillsData).map((category) => (
          <div
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 sm:px-4 md:px-6 py-2 text-sm sm:text-base md:text-lg font-semibold rounded-md transition-all duration-300 transform hover:scale-110 cursor-pointer ${
              selectedCategory === category
                ? "bg-[#004AAD] text-white border-b-2 border-purple-500"
                : "text-[#9ca4b0]"
            }`}
          >
            {category}
          </div>
        ))}
      </div>

      {/* Skills Grid */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full max-w-6xl"
      >
        {skillsData[selectedCategory].map((skill, index) => (
          <div
            key={index}
            className="flex-shrink-0 relative h-32 w-36 flex flex-col items-center justify-center rounded-lg shadow-lg border border-gray-800 hover:border-purple-700 hover:scale-110 transition-all duration-300"
          >
            <div className="absolute top-[-2px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-700 to-transparent"></div>
            <Image
              src={skill.img}
              alt={skill.name}
              width={48}
              height={48}
              className="mb-2"
              unoptimized // Optional: if using external untrusted sources
            />
            <span className="text-sm relative">{skill.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Skills;
