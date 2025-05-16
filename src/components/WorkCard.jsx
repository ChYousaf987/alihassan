"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FiDownload, FiGithub } from "react-icons/fi";
import { IoOpenOutline } from "react-icons/io5";

const WorkCard = ({ w, index, tabId }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const nextSlide = () => {
    setCurrentImage((prev) => (prev + 1) % (w.images?.length || 1));
  };

  const prevSlide = () => {
    setCurrentImage(
      (prev) => (prev - 1 + (w.images?.length || 1)) % (w.images?.length || 1)
    );
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  return (
    <>
      <div
        className="works-card group relative bg-cover bg-center rounded-lg overflow-hidden"
        style={{ backgroundImage: `url(${w.backgroundIMG})` }}
      >
        <div className="works-container absolute inset-0 bg-black/70 opacity-100 transition duration-300 p-4 text-white flex">
          <div>
            <div className="mid-work mt-8 mb-0">
              <p className="work-title text-lg font-semibold m-0 p-0">
                {w.title}
              </p>
              <p className="work-desc text-sm m-0 p-0">{w.desc}</p>
            </div>
            <div>
              {w.tech && (
                <div className="mb-4">
                  <div className="flex flex-wrap justify-center gap-2">
                    {w.tech.slice(0, 3).map((tech, idx) => (
                      <small
                        key={idx}
                        className="bg-gray-700 text-[10px] text-white px-2 py-1 rounded"
                      >
                        {tech}
                      </small>
                    ))}
                  </div>
                </div>
              )}
              <div className="top-work mt-2">
                <div className="right flex gap-2">
                  {w.gitlink && (
                    <a
                      className="work-git text-white"
                      href={w.gitlink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiGithub />
                    </a>
                  )}
                  <Link
                    href={`/portfolio/${w.id}`}
                    className="work-link text-white flex items-center"
                  >
                    <IoOpenOutline />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal logic remains unchanged */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full p-6 relative max-h-[90vh] overflow-y-auto shadow-lg">
            <button
              className="absolute top-[-3px] right-2 text-black text-2xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <div className="relative mb-4">
              <Image
                src={
                  w.images?.length > 0
                    ? w.images[currentImage]
                    : w.backgroundIMG
                }
                alt={`slide-${currentImage}`}
                width={600} // or your desired width
                height={256} // or your desired height to match aspect ratio (e.g., 64 * 4)
                className="rounded object-cover"
                unoptimized // optional, if external images aren't allowed in next.config.js
              />
              {w.images && w.images.length > 1 && (
                <>
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow"
                    onClick={prevSlide}
                  >
                    ←
                  </button>
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow"
                    onClick={nextSlide}
                  >
                    →
                  </button>
                </>
              )}
            </div>
            <h2 className="text-2xl font-bold mb-2">{w.title}</h2>
            <p className="text-gray-700 mb-4">{w.desc}</p>
            {w.tech && (
              <div className="mb-4">
                <h4 className="font-semibold mb-1">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {w.tech.map((tech, idx) => (
                    <small
                      key={idx}
                      className="bg-gray-200 text-sm text-black px-2 py-1 rounded"
                    >
                      {tech}
                    </small>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-4 mt-4">
              {w.gitlink && (
                <a
                  href={w.gitlink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View on GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkCard;
