"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { TiThMenuOutline } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import Image from "next/image";
// import DarkModes from "../components/DarkModes";

const sections = [
  { name: "Home", path: "#home", id: "home" },
  { name: "About Me", path: "#about", id: "about" },
  { name: "Skills", path: "#skills", id: "skills" },
  { name: "Portfolio", path: "#portfolio", id: "portfolio" },
  { name: "Blogs", path: "#blogs", id: "blogs" },
];

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const router = useRouter();
  const observerRef = useRef(null);

  const handleHashClick = (e, hash) => {
    e.preventDefault();
    setIsOpen(false);

    const sectionId = hash.replace("#", "");

    if (pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setActiveSection(sectionId);
      }
      window.history.pushState(null, null, hash);
    } else {
      router.push("/" + hash); // Client-side navigation
    }
  };

  // IntersectionObserver for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY < 50) setActiveSection("home");
    });

    observerRef.current = observer;
    return () => observer.disconnect();
  }, []);

  // Handle hash scroll on initial load
  useEffect(() => {
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
  }, [pathname]);

  const isActive = (id) => activeSection === id;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/50 backdrop-blur-md shadow-md p-2">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
        <Link href="/#home" onClick={(e) => handleHashClick(e, "#home")}>
          <Image
            src="/assets/aktechtbg.png"
            alt="Logo"
            width={100} // or any pixel width you want
            height={100} // or corresponding height
            className="rotate-logo"
          />
        </Link>
        {/* <DarkModes darkMode={darkMode} setDarkMode={setDarkMode} /> */}

        <div className="hidden md:flex md:items-center text-xl space-x-6 font-montserrat">
          {sections.map(({ name, path, id }) => (
            <Link
              key={id}
              href={`/${path}`}
              onClick={(e) => handleHashClick(e, path)}
              className={`transition-colors ${
                isActive(id)
                  ? "text-yellow-400 font-semibold"
                  : "hover:text-yellow-300"
              }`}
            >
              {name}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={(e) => handleHashClick(e, "#contact")}
            className="rounded-full bg-gradient-to-r px-4 from-blue-500 via-purple-500 to-pink-500 text-white font-semibold py-2 hover:opacity-90 inline-block"
            // Optional: Add suppressHydrationWarning if third-party script persists
            // suppressHydrationWarning
          >
            Contact Us
          </Link>
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
            <Link
              href="/#contact"
              onClick={(e) => handleHashClick(e, "#contact")}
              className="rounded-md bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold py-2 px-4 inline-block"
              // Optional: Add suppressHydrationWarning if needed
              // suppressHydrationWarning
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
