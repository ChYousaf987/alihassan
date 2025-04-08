"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimationControls, useMotionValue } from "framer-motion";

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
  const [duplicatedSkills, setDuplicatedSkills] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const controls = useAnimationControls();
  const containerRef = useRef(null);
  const x = useMotionValue(0);

  useEffect(() => {
    const skills = skillsData[selectedCategory];
    const duplicated = [...skills, ...skills, ...skills];
    setDuplicatedSkills(duplicated);

    if (!isHovering) {
      startAnimation();
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (isHovering) {
      controls.stop();
    } else {
      const currentX = x.get();
      startAnimation(currentX);
    }
  }, [isHovering]);

  const startAnimation = (startFrom = 0) => {
    const skills = skillsData[selectedCategory];
    const itemCount = skills.length;
    const itemWidth = 112;
    const containerWidth = containerRef.current?.clientWidth || 0;
    const visibleItems = Math.ceil(containerWidth / itemWidth);
    const moveDistance = itemCount * itemWidth;

    // Optimize duration based on visible items
    const baseDuration = 15;
    const duration = Math.max(
      baseDuration,
      baseDuration * (visibleItems / 4)
    );

    controls.start({
      x: [startFrom, -moveDistance],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: duration,
        ease: "linear",
      }
    });
  };

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
            className={`px-4 md:px-6 py-2 text-lg font-semibold rounded-md transition-all duration-300 ${selectedCategory === category ? "bg-blue-500 text-white" : "text-gray-400"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Marquee Container */}
      <div className="w-full overflow-hidden min-h-[145px] pt-4" ref={containerRef}>
        <motion.div
          className="flex"
          animate={controls}
          style={{ x }}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          {duplicatedSkills.map((skill, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-4 relative w-28 h-28 flex flex-col items-center justify-center bg-gray-900 rounded-lg shadow-lg border-2 border-gray-800 hover:border-purple-700 hover:scale-105 transition-all duration-300"
            >
              <div className="absolute top-[-2px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-700 to-transparent"></div>
              <img src={skill.img} alt={skill.name} className="w-12 h-12 mb-2 relative" />
              <span className="text-sm relative">{skill.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;