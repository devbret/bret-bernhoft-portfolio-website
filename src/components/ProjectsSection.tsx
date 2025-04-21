import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { Badge } from "@/components/ui/badge";

// Sample project data
const projects = [
  {
    id: 1,
    title: "CyberConnect Social Platform",
    description:
      "A feature-rich social networking platform with real-time messaging, user profiles, and content sharing capabilities.",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["React", "Node.js", "MongoDB", "WebSockets"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
    category: "fullstack",
  },
  {
    id: 2,
    title: "NeuroTech Dashboard",
    description:
      "An advanced analytics dashboard with data visualization, real-time updates, and customizable widgets.",
    image:
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["React", "D3.js", "Firebase", "Tailwind CSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "frontend",
  },
  {
    id: 3,
    title: "Quantum API Service",
    description:
      "A scalable RESTful API service with comprehensive documentation, authentication, and rate limiting.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["Node.js", "Express", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "backend",
  },
  {
    id: 4,
    title: "HoloSync Mobile App",
    description:
      "A cross-platform mobile application for productivity and task management with cloud synchronization.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["React Native", "Redux", "Firebase", "Expo"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "mobile",
  },
  {
    id: 5,
    title: "DataSphere Analytics",
    description:
      "A big data processing and analytics platform with machine learning capabilities and interactive dashboards.",
    image:
      "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["Python", "TensorFlow", "React", "AWS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
    category: "fullstack",
  },
];

const filters = [
  { label: "All", value: "all" },
  { label: "Full Stack", value: "fullstack" },
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
  { label: "Mobile", value: "mobile" },
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
              front-end design, back-end architecture, and everything in
              between.
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
              featured={project.featured}
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
