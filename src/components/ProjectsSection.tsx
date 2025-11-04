import ProjectCard from "./ProjectCard";

// Project Data
const projects = [
  {
    id: 1,
    title: "Mapping A Website's Internal Links",
    description:
      "Explore a website's internal links, then visualize those connections as a network graph with analysis using Claude AI.",
    image:
      "https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/f1949fc3-8240-4820-9ead-70aa2f5ef281.jpg",
    tags: ["Python", "JavaScript", "D3"],
    githubUrl: "https://github.com/devbret/website-internal-links",
    liveUrl: "",
  },
  {
    id: 2,
    title: "Tech Knowledge Hub",
    description:
      "An evolving collection of Bret Bernhoft's personally curated glossary terms and resource links.",
    image:
      "https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/dc9873d2-a81b-44cf-88ad-c29785f98fcf.png",
    tags: ["React", "Vite", "TypeScript"],
    githubUrl: "",
    liveUrl: "https://tkh.bretbernhoft.com/",
  },
  {
    id: 3,
    title: "AI Chat Interface",
    description:
      "A chat interface for holding conversations with different locally deployed AI models.",
    image:
      "https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/45ccc622-d504-4a70-9500-3346049c5e2d.png",
    tags: ["Python", "JavaScript", "Ollama"],
    githubUrl: "https://github.com/devbret/ai-chat-interface",
    liveUrl: "",
  },
  {
    id: 4,
    title: "Character Interactions",
    description:
      "Map direct conversations between different characters in a body of text using Python and D3.",
    image:
      "https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/1f62087f-ef61-4cac-b78d-a42f2747f27e.png",
    tags: ["Python", "JavaScript", "D3"],
    githubUrl: "https://github.com/devbret/character-interactions",
    liveUrl: "https://neuromancer.bretbernhoft.com/",
  },
  {
    id: 5,
    title: "YouTube Playlists Tracker App",
    description:
      "Catalog your viewing progress with YouTube playlists, organized by user-defined categories, via this app.",
    image:
      "https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/6663859d-0e07-453b-b904-d8a4eb2baacc.png",
    tags: ["Flask", "Python", "JavaScript"],
    githubUrl: "https://github.com/devbret/youtube-playlists-tracker-app",
    liveUrl: "",
  },
  {
    id: 6,
    title: "Detailed Audio Analyses And Visualizations",
    description:
      "Measure the evolution of audio features for audio tracks. Then visualize the data.",
    image:
      "https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/5294bf06-e212-4af5-91d2-46e6a90a8206.png",
    tags: ["D3", "Python", "JSON", "Librosa"],
    githubUrl: "https://github.com/devbret/detailed-audio-analysis",
    liveUrl: "https://daav.bretbernhoft.com/",
  },
  {
    id: 7,
    title: "Browser Automation Experiments",
    description:
      "Scripts to test, analyze and interact with websites automatically, helping improve performance and reliability.",
    image:
      "https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/ae3971c6-ed8d-4d08-90c0-879edcb15b1a.png",
    tags: ["Selenium", "Puppeteer", "React"],
    githubUrl: "https://github.com/devbret/browser-automation-experiments",
    liveUrl: "",
  },
  {
    id: 8,
    title: "C-TRAN Average Wait Times",
    description:
      "Average wait times for C-TRAN stops in Vancouver, Washington visualized as a map.",
    image:
      "https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/4e0df1ec-4a07-416a-871e-bd1ea7c7646c.png",
    tags: ["JavaScript", "Python", "Public Data"],
    githubUrl: "https://github.com/devbret/c-tran-wait-times",
    liveUrl: "https://ctran.bretbernhoft.com/",
  },
  {
    id: 9,
    title: "Pi-hole Data Measurement Tools",
    description:
      "A collection of various software tools for measuring DNS queries downloaded from a Pi-hole as a CSV file.",
    image:
      "https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/7481dd41-3ac9-4d9c-be96-ed25bc34227e.png",
    tags: ["Raspberry Pi", "Python", "D3"],
    githubUrl: "https://github.com/devbret/pihole-data-measurement-tools",
    liveUrl: "",
  },
  {
    id: 10,
    title: "MCP9808 Sensor Project",
    description:
      "Code for combining a RPi Zero 2 WH with an Adafruit MCP9808 temperature sensor to measure air temperatures.",
    image:
      "https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/40a38b82-aff4-458d-904a-63dad791dd9e.png",
    tags: ["Raspberry Pi", "Flask", "JavaScript"],
    githubUrl: "https://github.com/devbret/mcp9808-sensor-project",
    liveUrl: "",
  },
  {
    id: 11,
    title: "Homelab Documentation",
    description:
      "Documentation for a self-hosted Kubernetes homelab running Mistral-7B, with Pi-hole and OPNsense.",
    image:
      "https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/b5950ae8-e3a6-4f62-a51d-4a7f8226bd90.jpg",
    tags: ["Shell", "Docker", "AI", "Networking"],
    githubUrl: "https://github.com/devbret/homelab",
    liveUrl: "",
  },
  {
    id: 12,
    title: "GeoSpy API Mapping Application",
    description:
      "Query the GeoSpy API for images using Python. Then visualize that data with D3.",
    image:
      "https://hosting.photobucket.com/images/i/bernhoftbret/geospy-api-mapping-app-histogram-update.png",
    tags: ["AI", "Python", "D3"],
    githubUrl: "https://github.com/devbret/geospy-api-mapping",
    liveUrl: "",
  },
  {
    id: 13,
    title: "OSINT Keyword Searches",
    description:
      "Build and organize your OSINT searches on different platforms, including Google, Reddit, YouTube and Bluesky.",
    image:
      "https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/6ac63d6b-a2e7-46f6-90f7-62c691f47025.png",
    tags: ["Flask", "JavaScript", "JSON"],
    githubUrl: "https://github.com/devbret/osint-keyword-searches",
    liveUrl: "",
  },
  {
    id: 14,
    title: "Username Availability Checker",
    description:
      "Check the availability of a username across twenty popular social media platforms.",
    image:
      "https://hosting.photobucket.com/images/i/bernhoftbret/usename-availability-checker-new-dropdown.png",
    tags: ["Python", "JavaScript"],
    githubUrl: "https://github.com/devbret/username-availability-checker",
    liveUrl: "",
    category: "",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 px-4 cyber-bg relative">
      {/* Background Elements */}
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
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
              tags={project.tags} // ✅ Pass tags here
              gradient="to-b"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
