import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

const ProjectCard = ({
  title,
  description,
  image,
  githubUrl,
  liveUrl,
  featured = false,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative rounded-lg overflow-hidden transition-all duration-500 ${
        featured ? "md:col-span-2" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Overlay And Border Effect */}
      <div className="absolute inset-0 border border-cyber-neon/0 group-hover:border-cyber-neon/60 transition-all duration-500 z-20 cyber-border opacity-0 group-hover:opacity-100"></div>

      {/* Background Image */}
      <div className="relative h-64 md:h-72 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 scale-105 group-hover:scale-100"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-black/80 to-transparent opacity-80"></div>
      </div>

      {/* Content */}
      <div
        className={`absolute inset-0 flex flex-col justify-end p-6 transform transition-transform duration-500 ${
          isHovered ? "translate-y-0" : "translate-y-16"
        }`}
      >
        {/* Title and description */}
        <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-cyber-neon transition-colors">
          {title}
        </h3>

        <p className="text-white/70 mb-4 line-clamp-2 md:line-clamp-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
          {description}
        </p>

        {/* Links */}
        <div className="flex gap-4 items-center mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-cyber-neon transition-colors"
              aria-label="View GitHub Repository"
            >
              <Github className="w-5 h-5" />
            </a>
          )}

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-cyber-neon transition-colors"
              aria-label="View Live Project"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
