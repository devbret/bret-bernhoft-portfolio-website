import { Github, ExternalLink } from "lucide-react";

type GradientDir = "to-t" | "to-b" | "to-r" | "to-l";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  tags?: string[];
  gradient?: GradientDir;
}

const gradientClassMap: Record<GradientDir, string> = {
  "to-b": "bg-gradient-to-t from-cyber-black via-cyber-black/80 to-transparent",
  "to-t": "bg-gradient-to-b from-cyber-black via-cyber-black/80 to-transparent",
  "to-r": "bg-gradient-to-r from-cyber-black via-cyber-black/80 to-transparent",
  "to-l": "bg-gradient-to-l from-cyber-black via-cyber-black/80 to-transparent",
};

const ProjectCard = ({
  title,
  description,
  image,
  githubUrl,
  liveUrl,
  featured = false,
  tags = [],
  gradient = "to-t",
}: ProjectCardProps) => {
  const gradientClass = gradientClassMap[gradient];

  return (
    <div
      className={`group relative rounded-lg overflow-hidden transition-all duration-500 ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <div className="absolute inset-0 border border-cyber-neon/0 group-hover:border-cyber-neon/60 transition-colors duration-500 z-20 cyber-border pointer-events-none" />

      <div className="relative h-64 md:h-72 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform-gpu transition-transform duration-700 scale-100 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden="true"
        />
        <div className={`absolute inset-0 ${gradientClass} opacity-80`} />
      </div>

      <div
        className="
          absolute inset-0 flex flex-col p-6
          transform-gpu translate-y-6 group-hover:translate-y-0
          transition-transform duration-500 ease-out
        "
        style={{ willChange: "transform" }}
      >
        {tags.length > 0 && (
          <div
            className="
              mb-3 flex flex-wrap gap-2
              opacity-90 group-hover:opacity-100
              transition-opacity duration-300
            "
          >
            {tags.map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className="px-2 py-1 text-xs rounded-full border border-cyber-neon/40 text-cyber-neon bg-cyber-black/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3
          className="
            text-xl md:text-2xl font-bold mb-3
            transition-colors group-hover:text-cyber-neon
          "
        >
          {title}
        </h3>

        <p
          className="
            text-white/80 mb-4
            opacity-0 group-hover:opacity-100
            transform-gpu translate-y-1 group-hover:translate-y-0
            transition-all duration-500 ease-out
          "
        >
          {description}
        </p>

        <div
          className="
            flex gap-4 items-center
            opacity-0 group-hover:opacity-100
            transform-gpu translate-y-1 group-hover:translate-y-0
            transition-all duration-500 ease-out delay-100
          "
        >
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
