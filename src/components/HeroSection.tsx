import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const typeText = () => {
      const el = textRef.current;
      if (!el) return;

      const fullText = "I build full stack experiences";
      let currentText = "";
      let index = 0;

      const interval = setInterval(() => {
        if (index < fullText.length) {
          currentText += fullText.charAt(index);
          el.textContent = currentText;
          index++;
        } else {
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    };

    typeText();
  }, []);

  return (
    <section
      className="min-h-screen relative flex flex-col justify-center items-start px-4 lg:px-24 py-24 overflow-hidden cyber-bg"
      id="home"
    >
      {/* Background elements */}
      <div className="absolute inset-0 cyber-grid opacity-20 z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cyber-black via-cyber-black/90 to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyber-black via-cyber-black/90 to-transparent z-10"></div>

      {/* Animated scanline effect */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div
          className="absolute inset-x-0 h-px bg-cyber-neon/20"
          style={{
            top: "50%",
            boxShadow: "0 0 10px rgba(0, 255, 213, 0.5)",
            animation: "scanline 10s linear infinite",
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="w-full max-w-5xl mx-auto z-20 space-y-6">
        <h2 className="text-cyber-neon font-mono text-xl md:text-2xl tracking-widest">
          <span className="inline-block w-16 h-[1px] bg-cyber-neon mr-3 align-middle"></span>
          FULL STACK DEVELOPER
        </h2>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mt-4 leading-tight">
          <span className="block">Coding the future</span>
          <span className="text-cyber-purple neon-purple-text">
            one project at a time
          </span>
        </h1>

        <div className="mt-8 h-8">
          <span
            ref={textRef}
            className="text-xl md:text-2xl font-mono relative after:absolute after:right-0 after:w-3 after:h-full after:border-r-4 after:border-cyber-neon after:animate-[blink_0.7s_infinite]"
          ></span>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button className="relative group bg-transparent border border-cyber-neon text-cyber-neon hover:bg-cyber-neon hover:text-cyber-black transition-all py-6 px-8 overflow-hidden cyber-border">
            View Projects
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            variant="outline"
            className="relative border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all py-6 px-8"
          >
            Contact Me
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20">
        <span className="text-white/50 text-sm mb-2">Scroll Down</span>
        <div className="w-px h-10 bg-gradient-to-b from-cyber-neon/80 to-transparent"></div>
      </div>
    </section>
  );
};

export default HeroSection;
