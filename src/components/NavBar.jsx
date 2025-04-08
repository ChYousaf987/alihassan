"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TiThMenuOutline } from "react-icons/ti";
import { ImCross } from "react-icons/im";

const sections = [
  { name: "Home", path: "#home", id: "home" },
  { name: "About Me", path: "#about", id: "about" },
  { name: "Skills", path: "#skills", id: "skills" },
  { name: "Portfolio", path: "#portfolio", id: "portfolio" },
  { name: "Blogs", path: "#blogs", id: "blogs" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const observerRef = useRef(null);

  const handleHashClick = (e, hash) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (pathname === '/') {
      // On home page, just scroll to the section
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      // Update URL without page reload
      window.history.pushState(null, null, hash);
    } else {
      // On other pages, navigate to home page with hash
      window.location.href = `/${hash}`;
    }
  };

  // Handle intersection observer for active section highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY === 0) setActiveSection("home");
    });

    observerRef.current = observer;
    return () => observer.disconnect();
  }, []);

  // Handle hash navigation on page load and route changes
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash.replace("#", ""));
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            setActiveSection(hash.replace("#", ""));
          }
        }, 100);
      }
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, [pathname]);

  const isActive = (id) => activeSection === id;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md shadow-md p-2">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
        <Link href="/#home" onClick={(e) => handleHashClick(e, "#home")}>
          <img
            src="/assets/aktechtbg.png"
            alt="Logo"
            className="h-16 rotate-logo"
          />
        </Link>

        <div className="hidden md:flex md:items-center font-bold font-sans text-xl space-x-6 font-medium">
          {sections.map(({ name, path, id }) => (
            <Link
              key={id}
              href={`/${path}`}  // Ensure navigation to home page
              onClick={(e) => handleHashClick(e, path)}
              className={`font-bold font-sans text-xl transition-colors ${
                isActive(id)
                  ? "text-yellow-400 font-semibold"
                  : "text-white hover:text-yellow-300"
              }`}
            >
              {name}
            </Link>
          ))}
          <div className="hidden md:flex items-center">
            <Link href="/#contact">
              <button className="rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold font-sans py-2 px-4 transition duration-300 hover:opacity-90">
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(true)}>
            <TiThMenuOutline className="text-yellow-500 text-3xl" />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 w-64 h-screen z-50 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button onClick={() => setIsOpen(false)}>
              <ImCross className="text-yellow-600 text-2xl" />
            </button>
          </div>
          <div className="flex flex-col gap-4 px-6">
            {sections.map(({ name, path, id }) => (
              <Link
                key={id}
                href={`/${path}`}
                onClick={(e) => handleHashClick(e, path)}
                className={`text-lg ${
                  isActive(id) ? "text-yellow-600 font-bold" : "text-gray-800"
                }`}
              >
                {name}
              </Link>
            ))}
            <Link href="/#contact" onClick={(e) => handleHashClick(e, "#contact")}>
              <button className="rounded-md bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold py-2 px-4">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;