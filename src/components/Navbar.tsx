import { useState, useEffect } from "react";
import { Github, Mail, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cyber-black/90 backdrop-blur-md border-b border-cyber-neon/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a
          href="#"
          className="text-xl md:text-2xl font-bold tracking-wider neon-text"
        >
          Bret<span className="text-cyber-neon"> Bernhoft</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="#about">About</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#endorsements">Endorsements</NavLink>
          <NavLink href="#contact">Contact</NavLink>

          <a
            href="https://www.dropbox.com/scl/fi/4x34726kdipy2tr0xwo2i/Bret-Bernhoft-Resume.pdf?rlkey=8a59gu8jcpg3qmvfgzqxnd81k&st=sv7f4e0u&dl=0"
            download
            className="ml-3"
          >
            <Button
              variant="outline"
              size="sm"
              className="border-cyber-neon text-cyber-neon hover:bg-cyber-neon hover:text-cyber-black transition-colors"
            >
              Download Resume
            </Button>
          </a>

          <div className="flex items-center gap-3 ml-3">
            <a
              href="https://github.com/devbret"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-cyber-neon transition-colors"
              >
                <Github className="h-5 w-5" />
              </Button>
            </a>
            <a href="mailto:contact@bretbernhoft.com" aria-label="Email">
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-cyber-neon transition-colors"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </a>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        } transition-all duration-300 absolute w-full bg-cyber-black/95 border-b border-cyber-neon/20 backdrop-blur-md`}
      >
        <nav className="container mx-auto flex flex-col py-4 px-4">
          <a
            href="#about"
            className="py-3 text-lg hover:text-cyber-neon transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#projects"
            className="py-3 text-lg hover:text-cyber-neon transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Projects
          </a>
          <a
            href="#skills"
            className="py-3 text-lg hover:text-cyber-neon transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Skills
          </a>
          <a
            href="#endorsements"
            className="py-3 text-lg hover:text-cyber-neon transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Endorsements
          </a>
          <a
            href="#contact"
            className="py-3 text-lg hover:text-cyber-neon transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </a>

          <a
            href="https://www.dropbox.com/scl/fi/4x34726kdipy2tr0xwo2i/Bret-Bernhoft-Resume.pdf?rlkey=8a59gu8jcpg3qmvfgzqxnd81k&st=sv7f4e0u&dl=0"
            download
            className="mt-4"
          >
            <Button
              variant="outline"
              size="sm"
              className="border-cyber-neon text-cyber-neon hover:bg-cyber-neon hover:text-cyber-black transition-colors"
            >
              Download Resume
            </Button>
          </a>

          <div className="flex items-center gap-3 mt-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-cyber-neon transition-colors"
              >
                <Github className="h-5 w-5" />
              </Button>
            </a>
            <a href="mailto:contact@example.com" aria-label="Email">
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-cyber-neon transition-colors"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="text-white/80 hover:text-cyber-neon transition-colors relative group"
  >
    {children}
    <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyber-neon group-hover:w-full transition-all duration-300"></div>
  </a>
);

export default Navbar;
