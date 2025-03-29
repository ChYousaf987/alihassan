"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TiThMenuOutline } from "react-icons/ti";
import { ImCross } from "react-icons/im";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Me", path: "#about" },
    { name: "Skills", path: "#skills" },
    { name: "Portfolio", path: "#portfolio" },
    { name: "Blogs", path: "#blogs" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/50 backdrop-blur-md shadow-md" : "bg-transparent"
      } p-2`}
    >
      <div className="flex justify-between items-center w-full container mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <img
              src="/assets/aktechtbg.png"
              alt="Logo"
              className="h-16 rotate-logo"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-grow justify-center font-bold items-center font-sans text-xl space-x-6">
          {navItems.map((link, index) => (
            <Link href={link.path || "#"} key={index} className="flex items-center">
              <span
                className={`ml-2 font-semibold text-md transition duration-300 ${
                  pathname === link.path ? "text-white" : "text-white"
                }`}
              >
                {link.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Contact Button */}
        <div className="hidden md:flex items-center">
          <Link href="#contact">
            <button className="rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold font-sans py-2 px-4 transition duration-300">
              Contact Us
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="block md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <ImCross className="text-yellow-600 text-2xl" />
            ) : (
              <TiThMenuOutline className="text-yellow-600 text-2xl" />
            )}
          </button>
        </div>

        {/* Mobile Sidebar Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button onClick={toggleMenu} aria-label="Close menu">
              <ImCross className="text-yellow-600 text-2xl" />
            </button>
          </div>

          <div className="flex flex-col space-y-6 p-4">
            {navItems.map((link, index) => (
              <Link
                href={link.path || "#"}
                key={index}
                className="flex items-center"
                onClick={toggleMenu}
              >
                <span
                  className={`font-light text-xl ${
                    pathname === link.path ? "text-yellow-600" : "text-gray-800"
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            ))}

            <Link href="/contact">
              <button className="rounded-md bg-gradient-to-r from-yellow-600 to-yellow-600 text-white font-semibold py-2 px-4 border-2 border-yellow-600 hover:bg-gradient-to-r hover:from-yellow-600 hover:to-yellow-600 transition duration-300">
                Contact
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
