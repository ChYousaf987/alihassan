"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Portfolios = ({ w, tabId, onClose }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % (w.images?.length || 1));
  }, [w.images?.length]);

  const prevSlide = useCallback(() => {
    setCurrentImage(
      (prev) => (prev - 1 + (w.images?.length || 1)) % (w.images?.length || 1)
    );
  }, [w.images?.length]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, nextSlide, prevSlide]);

  return (
    <div className="min-h-screen bg-[#] text- font-montserrat">
      {/* Hero Section */}
      <motion.section
        className="relative h-[60vh] w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src={
            w.images && w.images.length > 0
              ? w.images[currentImage]
              : w.backgroundIMG
          }
          alt={`Portfolio ${w.title}`}
          layout="fill"
          objectFit="cover"
          className="brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{w.title}</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl">{w.desc}</p>
        </div>

        {w.images && w.images.length > 1 && (
          <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 md:px-8 transform -translate-y-1/2">
            <button
              className="bg-white/90 text-black p-2 rounded-full shadow-lg hover:bg-white"
              onClick={prevSlide}
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              className="bg-white/90 text-black p-2 rounded-full shadow-lg hover:bg-white"
              onClick={nextSlide}
              aria-label="Next image"
            >
              →
            </button>
          </div>
        )}

        <button
          className="absolute top-4 right-4 text-3xl text-white hover:text-gray-300"
          onClick={onClose}
          aria-label="Close portfolio"
        >
          ×
        </button>
      </motion.section>

      {/* Details Section */}
      <motion.section
        className="max-w-6xl mx-auto py-12 px-4 md:px-8 grid md:grid-cols-2 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Technologies */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {w.tech && w.tech.length > 0 ? (
              w.tech.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-[#004AAD] text-sm text-white px-4 py-2 rounded-lg shadow-md"
                >
                  {tech}
                </span>
              ))
            ) : (
              <p className="text-gray-400">No technologies listed.</p>
            )}
          </div>
        </div>

        {/* Project Links */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Project Links</h2>
          <div className="flex flex-col gap-4">
            {w.gitlink && (
              <a
                href={w.gitlink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-lg"
              >
                View on GitHub
              </a>
            )}
            {w.site && (
              <a
                href={w.site}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-lg"
              >
                Visit Site
              </a>
            )}
            {!w.gitlink && !w.site && (
              <p className="text-gray-400">No links available.</p>
            )}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Portfolios;
