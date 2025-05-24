"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Portfolios = ({ w, onClose }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="min-h-screen bg-[#0D1224] text-white font-montserrat px-4 md:px-8 py-12 max-w-6xl mx-auto">
      

      {/* Header Image */}
      <motion.div
        className="w-full mb-8 rounded-xl overflow-hidden shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src={
            w.images && w.images.length > 0
              ? w.images[currentImage]
              : w.backgroundIMG
          }
          alt={`Portfolio Banner - ${w.title}`}
          width={1200}
          height={600}
          className="object-cover w-full h-auto"
          unoptimized
        />
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-4xl font-extrabold mb-4 leading-tight"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {w.title}
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-gray-300 text-lg mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {w.desc}
      </motion.p>

      {/* Technologies Used */}
      {w.tech?.length > 0 && (
        <motion.section
          className="mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-3">🧪 Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {w.tech.map((tech, idx) => (
              <span
                key={idx}
                className="bg-blue-600 text-sm px-4 py-2 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.section>
      )}

      {/* Project Links */}
      <motion.section
        className="mb-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold mb-3">🔗 Project Links</h2>
        <div className="flex flex-col gap-4">
          {w.gitlink && (
            <a
              href={w.gitlink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-lg underline"
            >
              View on GitHub
            </a>
          )}
          {w.site && (
            <a
              href={w.site}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-lg underline"
            >
              Visit Live Site
            </a>
          )}
          {!w.gitlink && !w.site && (
            <p className="text-gray-400">No links available.</p>
          )}
        </div>
      </motion.section>

      {/* Optional: Gallery Thumbnails */}
      {w.images?.length > 1 && (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {w.images.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt={`Gallery ${idx}`}
              width={400}
              height={250}
              onClick={() => setCurrentImage(idx)}
              className={`rounded cursor-pointer transition-transform hover:scale-105 border-2 ${
                idx === currentImage ? "border-blue-500" : "border-transparent"
              }`}
              unoptimized
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Portfolios;
