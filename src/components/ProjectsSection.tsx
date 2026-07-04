import { lazy, Suspense, useMemo, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

const ProjectHoloCanvas = lazy(() => import("./ProjectHoloCanvas"));

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach((p) => p.tags?.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const clearTags = () => setSelectedTags(new Set());

  const filteredProjects = useMemo(() => {
    if (selectedTags.size === 0) return projects;

    return projects.filter((p) => p.tags?.some((t) => selectedTags.has(t)));
  }, [selectedTags]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-20 px-4 cyber-bg relative"
    >
      <div className="absolute inset-0 cyber-grid opacity-20 z-0" />

      <Suspense fallback={null}>
        <ProjectHoloCanvas targetRef={sectionRef} />
      </Suspense>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-cyber-neon font-mono text-lg tracking-widest mb-2">
              <span className="inline-block w-10 h-[1px] bg-cyber-neon mr-3 align-middle" />
              PROJECTS
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-2">
              Featured Work
            </h3>
            <p className="text-white/70 max-w-2xl">
              Check out some of my recent full stack projects showcasing design,
              architecture and everything in between.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-10">
          <button
            onClick={clearTags}
            className={`tag-filter-btn ${selectedTags.size === 0 ? "active" : ""}`}
          >
            <span className="dot" />
            All
          </button>

          {allTags.map((tag) => {
            const isActive = selectedTags.has(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`tag-filter-btn ${isActive ? "active" : ""}`}
                aria-pressed={isActive}
              >
                <span className="dot" />
                {tag}
              </button>
            );
          })}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-white/70 font-mono">
            No projects match those tags yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
                tags={project.tags}
                gradient="to-b"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
