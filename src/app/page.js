import AboutSection from '@/components/AboutSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import HeroSection from '@/components/HeroSection';
import Navbar from "../components/NavBar"; // ✅ Correct
import Services from '../components/Services';
import Skills from '../components/Skills';
import Work from '../components/Work';

export default function Home() {

  const WhatsappNumber = "+92 300 0000000";

  return (
    <main className="flex flex-col bg-[#121212] relative">
      {/* Navbar & Hero Section */}
      <div className="container mx-auto px-3 md:px-6">
        <Navbar />
        <HeroSection />
      </div>

      {/* About & Work Section */}
      <div className="container mx-auto px-3 md:px-6">
        <AboutSection />
      </div>

      {/* Skills & Services Section */}
      <div className="container mx-auto px-3 md:px-6">
        <Skills />
        <Work />
        {/* <Services /> */}
      </div>

      {/* Tech Stack Section */}
      {/* <div className="container mx-auto px-3 md:px-6">
        <TechStack />
      </div> */}

      {/* Blog Section */}
      <div className="container mx-auto px-3 md:px-6">
        <BlogSection />
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-3 md:px-6 mb-4">
        <ContactSection />
      </div>

      {/* WhatsApp Button */}
      <div className="relative group">
        <a 
          href={`https://wa.me/${WhatsappNumber}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-2 right-2 z-50 p-2 bg-green-500 text-white rounded-full shadow-lg transition-transform transform hover:scale-110"
          aria-label="Chat with us on WhatsApp"
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
            alt="WhatsApp" 
            className="w-10 h-10"
          />
        </a>

        {/* Live Chat Tag */}
        <span className="fixed bottom-4 right-[-120px] opacity-0 group-hover:opacity-100 group-hover:right-20 z-40 text-white text-sm bg-green-500 p-2 rounded-md shadow-lg transition-all duration-500 ease-out transform">
          Live
        </span>
      </div>

    </main>
  );
}