import { Code } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 border-t border-white/10 cyber-bg">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" className="text-xl font-bold tracking-wider neon-text">
              Bret<span className="text-cyber-neon"> Bernhoft</span>
            </a>
            <p className="text-white/60 text-sm mt-2">
              Empowering businesses by automating workflows and scaling
              operations.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t border-white/10 text-sm text-white/60">
          <div className="mb-4 md:mb-0 flex items-center">
            <Code className="w-4 h-4 mr-2" />
            <span>© {currentYear} Bret Bernhoft. All rights reserved.</span>
          </div>

          <div className="flex space-x-6"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
