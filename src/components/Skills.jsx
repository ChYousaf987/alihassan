"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const skillsData = {
  All: [
    { name: "HTML", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Redux", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
    { name: "Bootstrap", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
    { name: "TailwindCSS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Django", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
    { name: "GitHub", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "Figma", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  ],
  Languages: [
    { name: "HTML", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  ],
  Frameworks: [
    { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Redux", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
    { name: "Bootstrap", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
    { name: "TailwindCSS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  ],
  Tools: [
    { name: "GitHub", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "Figma", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Django", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  ],
};

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div id="skills" className="py-10 text-center text-white flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="heading flex justify-center items-center text-center"
      >
        <h2 className="text-2xl font-semibold mb-6 relative inline-block before:content-[''] before:w-16 before:h-1 before:bg-purple-500 before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2">
          Skills
        </h2>
      </motion.div>

      {/* Categories Buttons */}
      <div className="flex flex-wrap justify-center space-x-4 md:space-x-8 mb-6">
        {Object.keys(skillsData).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 md:px-6 py-2 text-lg font-semibold rounded-md transition-all duration-300 ${
              selectedCategory === category ? "bg-blue-500 text-white" : "text-gray-400"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Skills Grid with Card Style */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 place-items-center px-4 md:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {skillsData[selectedCategory].slice(0, 12).map((skill, index) => (
          <div
            key={index}
            className="w-28 h-28 flex flex-col items-center justify-center border border-gray-300 bg-gray-900 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            <img src={skill.img} alt={skill.name} className="w-12 h-12 mb-2" />
            <span className="text-sm">{skill.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Skills;
