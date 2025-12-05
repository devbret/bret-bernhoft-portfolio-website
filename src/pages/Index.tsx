import { useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import SkillsSection from "../components/SkillsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const Index = () => {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (
        link &&
        link.hash &&
        link.hash.startsWith("#") &&
        link.origin === window.location.origin
      ) {
        e.preventDefault();
        const targetId = link.hash.slice(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          });

          history.pushState(null, "", link.hash);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <div className="cyber-bg min-h-screen text-white relative">
      {}
      <div className="fixed inset-0 bg-gradient-to-br from-cyber-black via-cyber-dark-purple to-cyber-black opacity-80 z-0"></div>

      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />

      {}
      <div className="fixed top-0 left-0 w-24 h-24 pointer-events-none z-10">
        <div className="absolute top-8 left-0 w-16 h-1 bg-cyber-neon"></div>
        <div className="absolute top-0 left-8 w-1 h-16 bg-cyber-neon"></div>
      </div>
      <div className="fixed top-0 right-0 w-24 h-24 pointer-events-none z-10">
        <div className="absolute top-8 right-0 w-16 h-1 bg-cyber-pink"></div>
        <div className="absolute top-0 right-8 w-1 h-16 bg-cyber-pink"></div>
      </div>
      <div className="fixed bottom-0 left-0 w-24 h-24 pointer-events-none z-10">
        <div className="absolute bottom-8 left-0 w-16 h-1 bg-cyber-purple"></div>
        <div className="absolute bottom-0 left-8 w-1 h-16 bg-cyber-purple"></div>
      </div>
      <div className="fixed bottom-0 right-0 w-24 h-24 pointer-events-none z-10">
        <div className="absolute bottom-8 right-0 w-16 h-1 bg-cyber-orange"></div>
        <div className="absolute bottom-0 right-8 w-1 h-16 bg-cyber-orange"></div>
      </div>
    </div>
  );
};

export default Index;
