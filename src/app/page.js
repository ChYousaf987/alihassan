import AboutSection from "@/components/AboutSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/NavBar";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Work from "@/components/Work";
import Image from "next/image";

export default function Home() {
  const WhatsappNumber = "+923000000000";

  return (
    <main className="flex flex-col relative bg-[#ffffff] text-black">
      {/* Background Image with overlay */}

      {/* Page Content */}
      <div className="relative z-10 container mx-auto ">
        {/* Navbar & Hero */}
        <Navbar />
        <HeroSection />

        {/* About & Work */}
        <AboutSection />

        {/* Skills & Services */}
        <Skills />
        <Work />
        {/* <Services /> */}

        {/* Blog */}
        <BlogSection />

        {/* Contact */}
        <ContactSection />
      </div>

      {/* WhatsApp Floating Button */}
      <div className="relative group z-50">
        <a
          href={`https://wa.me/${WhatsappNumber.replace(/\s/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 p-2 bg-green-500 text-white rounded-full shadow-lg transition-transform hover:scale-110"
          aria-label="Chat with us on WhatsApp"
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            width={40}
            height={40}
            className="w-10 h-10"
          />
        </a>

        {/* Live Chat Tooltip */}
        <span className="fixed bottom-6 right-[-120px] opacity-0 group-hover:opacity-100 group-hover:right-20 z-40 text-white text-sm bg-green-500 p-2 rounded-md shadow-lg transition-all duration-500 ease-out transform">
          Live Chat
        </span>
      </div>
    </main>
  );
}
