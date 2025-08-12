import ProjectCard from "./ProjectCard";

// Project Data
const projects = [
  {
    id: 1,
    title: "Bluesky Reader",
    description:
      "A web-based, AI-powered social media analysis tool for Bluesky.",
    image:
      "https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/9cc57c32-68ed-4184-b178-b65a94253ebd.png",
    tags: [],
    githubUrl: "",
    liveUrl: "https://bskyreader.com/",
  },
  {
    id: 2,
    title: "Tech Knowledge Hub",
    description:
      "An evolving collection of Bret Bernhoft's personally curated glossary terms and resource links.",
    image:
      "https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/6f1ed921-1e48-433d-856c-aba6e08dcd95.png",
    tags: [],
    githubUrl: "",
    liveUrl: "https://tkh.bretbernhoft.com/",
  },
  {
    id: 3,
    title: "Mapping A Website's Internal Links",
    description:
      "Explore a website's internal links, then visualize those connections as a network graph with scorecards and analysis using Claude AI.",
    image:
      "https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/2022e25c-32a3-40e1-b4c6-f6783d5a7d94.jpg",
    tags: [],
    githubUrl: "https://github.com/devbret/website-internal-links",
    liveUrl: "",
  },
  {
    id: 4,
    title: "YouTube Playlists Tracker App",
    description:
      "Catalog your viewing progress with specific YouTube playlists, organized by user-defined categories, via this app.",
    image:
      "https://hosting.photobucket.com/images/i/bernhoftbret/youtube-playlists-tracker-home-page.png",
    tags: [],
    githubUrl: "https://github.com/devbret/youtube-playlists-tracker-app",
    liveUrl: "",
  },
  {
    id: 5,
    title: "Detailed Audio Analyses And Visualizations",
    description:
      "Measure the evolution of various audio features for any number of audio tracks. Then visualize that data.",
    image:
      "https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/9b9a3c2a-87bb-416f-bc4a-953e594fea16.png",
    tags: [],
    githubUrl: "https://github.com/devbret/detailed-audio-analysis",
    liveUrl: "",
  },
  {
    id: 6,
    title: "Browser Automation Experiments",
    description:
      " Scripts designed to test, analyze and interact with websites automatically, thus helping improve performance, accessibility and reliability. ",
    image:
      "https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/ae3971c6-ed8d-4d08-90c0-879edcb15b1a.png",
    tags: [],
    githubUrl: "https://github.com/devbret/browser-automation-experiments",
    liveUrl: "",
  },
  {
    id: 7,
    title: "Pi-hole Data Measurement Tools",
    description:
      "A collection of various software tools for measuring DNS queries downloaded from a Pi-hole as a CSV file.",
    image:
      "https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/975f6680-240c-4507-8c73-eb3a1f2b80ba.jpg",
    tags: [],
    githubUrl: "https://github.com/devbret/pihole-data-measurement-tools",
    liveUrl: "",
  },
  {
    id: 8,
    title: "MCP9808 Sensor Project",
    description:
      "Code for combining a Raspberry Pi Zero 2 WH computer with an Adafruit MCP9808 temperature sensor to measure ambient air temperatures.",
    image:
      "https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/083a8baa-9cbe-4435-9a2b-825bd9222ec2.jpg",
    tags: [],
    githubUrl: "https://github.com/devbret/mcp9808-sensor-project",
    liveUrl: "",
  },
  {
    id: 9,
    title: "Homelab Documentation",
    description:
      "Documentation for a self-hosted Kubernetes homelab running Mistral-7B for local AI, with Pi-hole and TrueNAS and OPNsense for DevOps.",
    image:
      "https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/8f6260aa-3b69-430b-8253-4d5d280e92f6.png",
    tags: [],
    githubUrl: "https://github.com/devbret/homelab",
    liveUrl: "",
  },
  {
    id: 10,
    title: "GeoSpy API Mapping Application",
    description:
      "Query the GeoSpy API for any allowed number of images using Python. Then visualize that JSON data on a world map with D3.",
    image:
      "https://hosting.photobucket.com/images/i/bernhoftbret/geospy-api-mapping-app-histogram-update.png",
    tags: [],
    githubUrl: "https://github.com/devbret/geospy-api-mapping",
    liveUrl: "",
  },
  {
    id: 11,
    title: "OSINT Keyword Searches",
    description:
      "Build and organize your OSINT searches on different platforms, including Google, Reddit, YouTube and Bluesky.",
    image:
      "https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/e72bbd40-7c45-4172-b046-d0bec18646d7.jpg",
    tags: [],
    githubUrl: "https://github.com/devbret/osint-keyword-searches",
    liveUrl: "",
  },
  {
    id: 12,
    title: "Username Availability Checker",
    description:
      "Check the availability of a username across twenty popular social media platforms.",
    image:
      "https://hosting.photobucket.com/images/i/bernhoftbret/usename-availability-checker-new-dropdown.png",
    tags: [],
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
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
