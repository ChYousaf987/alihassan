"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FiGithub } from "react-icons/fi";

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
    const handleKey = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };
    if (showModal) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  return (
    <>
      <div className="relative bg-gray-800 shadow-md overflow-hidden flex flex-col items-center w-full mx-auto transition hover:scale-[1.01] rounded-2xl md:max-w-[29%]">
        <Link href={`/portfolio/${w.id}`} className="hover:text-gray-300">
          <div
            className="relative md:mt-4 w-full max-w-[550px] h-[250px] cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <Image
              src={w.backgroundIMG}
              alt={w.title}
              fill
              className="object-contain"
              unoptimized
            />
          </div>

          <div className="text-center mt-4 mb-2 p-2">
            <h3 className="text-lg font-semibold text-white">{w.title}</h3>
            <p className="text-gray-400 text-sm">{w.desc}</p>
          </div>
        </Link>
        <div className="flex items-center justify-between gap-3 w-full px-4 p-4">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.apple.com/app-store/"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Download_on_the_App_Store_RGB_blk.svg/2560px-Download_on_the_App_Store_RGB_blk.svg.png"
              width={100}
              alt="Download on App Store"
            />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://play.google.com/store/games?hl=en&pli=1"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
              width={100}
              alt="Download on Play Store"
            />
          </a>
        </div>
      </div>

      {/* Modal */}
    </>
  );
};

export default WorkCard;
