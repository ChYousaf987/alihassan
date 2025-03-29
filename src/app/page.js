import AboutSection from '@/components/AboutSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import HeroSection from '@/components/HeroSection';
import Navbar from "../components/NavBar"; // ✅ Correct
import Services from '../components/Services';
import Skills from '../components/Skills';
import Work from '../components/Work';

export default function Home() {
  return (
    <main className="flex flex-col bg-[#121212]">
      {/* Navbar & Hero Section */}
      <div className="container mx-auto px-3 md:px-6">
       <Navbar/>
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
        <Services />
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
      <div className="container mx-auto px-3 md:px-6">
        <ContactSection />
      </div>
    </main>
  );
}
