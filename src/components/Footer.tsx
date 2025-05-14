import { Github, Mail, Linkedin, Twitter, Code } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 border-t border-white/10 cyber-bg">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" className="text-xl font-bold tracking-wider neon-text">
              BRET<span className="text-cyber-neon"> BERNHOFT</span>
            </a>
            <p className="text-white/60 text-sm mt-2">
              Empowering ideas through code, one project at a time.
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

const SocialLink = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all hover:text-cyber-neon"
    aria-label={label}
  >
    <Icon className="w-5 h-5" />
  </a>
);

export default Footer;
