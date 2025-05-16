import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { Badge } from "@/components/ui/badge";

// Sample project data
const projects = [
  {
    id: 1,
    title: "Mapping A Website's Internal Links",
    description:
      "Use Python to explore a website's internal links. Then apply D3 to visualize those connections as an interactive network graph with scorecards.",
    image:
      "https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/ad55b31e-edf3-4a21-a6a2-3e61f4d84a0b.jpg",
    tags: [],
    githubUrl: "https://github.com/devbret/website-internal-links",
    liveUrl: "https://github.com/devbret/website-internal-links",
    category: "fullstack",
  },
  {
    id: 2,
    title: "YouTube Playlists Tracker App",
    description:
      "Catalog your viewing progress with specific YouTube playlists, organized by user-defined categories, via this app.",
    image:
      "https://hosting.photobucket.com/images/i/bernhoftbret/youtube-playlists-tracker-home-page.png",
    tags: [],
    githubUrl: "https://github.com/devbret/youtube-playlists-tracker-app",
    liveUrl: "https://github.com/devbret/youtube-playlists-tracker-app",
    category: "fullstack",
  },
  {
    id: 3,
    title: "Detailed Audio Analyses And Visualizations",
    description:
      "Measure the evolution of various audio features for any number of audio tracks. Then visualize that data.",
    image:
      "https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/9b9a3c2a-87bb-416f-bc4a-953e594fea16.png",
    tags: [],
    githubUrl: "https://github.com/devbret/detailed-audio-analysis",
    liveUrl: "https://github.com/devbret/detailed-audio-analysis",
    category: "fullstack",
  },
  {
    id: 4,
    title: "Pi-hole Data Measurement Tools",
    description:
      "A collection of various software tools for measuring DNS queries downloaded from a Pi-hole as a CSV file.",
    image:
      "https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/975f6680-240c-4507-8c73-eb3a1f2b80ba.jpg",
    tags: [],
    githubUrl: "https://github.com/devbret/pihole-data-measurement-tools",
    liveUrl: "https://github.com/devbret/pihole-data-measurement-tools",
    category: "fullstack",
  },
  {
    id: 5,
    title: "Homelab Documentation",
    description:
      "Documentation for a self-hosted Kubernetes homelab running Mistral-7B for local AI, with Pi-hole and TrueNAS and OPNsense for DevOps.",
    image:
      "https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/8f6260aa-3b69-430b-8253-4d5d280e92f6.png",
    tags: [],
    githubUrl: "https://github.com/devbret/homelab",
    liveUrl: "https://github.com/devbret/homelab",
    category: "fullstack",
  },
];

const filters = [
  { label: "All", value: "all" },
  { label: "Full Stack", value: "fullstack" },
];

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 px-4 cyber-bg relative">
      {/* Background elements */}
      <div className="absolute inset-0 cyber-grid opacity-20 z-0"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-cyber-neon font-mono text-lg tracking-widest mb-2">
              <span className="inline-block w-10 h-[1px] bg-cyber-neon mr-3 align-middle"></span>
              PROJECTS
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-2">
              Featured Work
            </h3>
            <p className="text-white/70 max-w-2xl">
              Check out some of my recent full stack projects, showcasing
              design, architecture and everything in between.
            </p>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {filters.map((filter) => (
              <Badge
                key={filter.value}
                className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                  activeFilter === filter.value
                    ? "bg-cyber-neon text-cyber-black"
                    : "bg-transparent border border-white/20 text-white/70 hover:border-cyber-neon hover:text-cyber-neon"
                }`}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/70 text-lg">
              No projects found for this filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
