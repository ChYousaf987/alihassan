"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FiGithub } from "react-icons/fi";
import { IoOpenOutline } from "react-icons/io5";
import { FaGooglePlay, FaAppStoreIos } from "react-icons/fa";

const WorkCard = ({ w }) => {
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
    document.body.style.overflow = showModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  return (
    <>
      <div className="relative bg-gray-800 shadow-md overflow-hidden flex flex-col items-center w-full max-w-[25%] mx-auto transition hover:scale-[1.01] rounded-2xl">
        <div className="relative w-[550px] h-[250px]">
          <Image
            src={w.backgroundIMG}
            alt={w.title}
            fill
            className="object-contain "
            unoptimized
          />
        </div>

        <div className="text-center mt-4 mb-2 p-2">
          <h3 className="text-lg font-semibold text-white">{w.title}</h3>
          <p className="text-gray-400 text-sm">{w.desc}</p>
        </div>

        

        <div className="flex justify-center gap-4 mb-2 text-white">
          {w.gitlink && (
            <a
              href={w.gitlink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <FiGithub size={18} />
            </a>
          )}
          <Link href={`/portfolio/${w.id}`} className="hover:text-gray-300">
            <IoOpenOutline size={18} />
          </Link>
        </div>

        <div className="flex items-end justify-between gap-3 mt-2">
          <a
            href={w.playstore}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white p-2 rounded-full transition"
            title="Google Play"
          >
            <FaGooglePlay size={20} />
          </a>

          <a
            href={w.appstore}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white p-2 rounded-full transition"
            title="App Store"
          >
            <FaAppStoreIos size={20} />
          </a>
        </div>
      </div>

      {/* Modal */}
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
                width={600}
                height={256}
                className="rounded object-cover"
                unoptimized
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
