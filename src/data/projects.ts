export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  category?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Clark County Vehicle Collisions",
    description:
      "View traffic collision records in Clark County, WA as an interactive web-based heatmap.",
    image: "/projects/clark-county-collisions.jpg",
    tags: ["Python", "Leaflet", "Public Domain"],
    githubUrl: "https://github.com/devbret/clark-county-collisions",
    liveUrl: "https://collisions.bretbernhoft.com/",
  },
  {
    id: 2,
    title: "Cyberpunk Website",
    description:
      "A fictional corporate website set in a cyberpunk universe, built to feel like a real company's public-facing presence.",
    image: "/projects/cyberpunk-corpo-website.jpg",
    tags: ["React", "Vite", "Three.js", "Node.js"],
    githubUrl: "https://github.com/devbret/cyberpunk-corpo-website",
    liveUrl: "https://corpo.bretbernhoft.com/",
  },
  {
    id: 3,
    title: "Mapping A Website's Internal Links",
    description:
      "Explore a website's internal links, then visualize those connections as a network graph with analysis using Claude AI.",
    image: "/projects/website-internal-links.jpg",
    tags: ["Python", "JavaScript", "D3", "OSINT"],
    githubUrl: "https://github.com/devbret/website-internal-links",
    liveUrl: "https://links.bretbernhoft.com/",
  },
  {
    id: 4,
    title: "Tech Knowledge Hub",
    description:
      "An evolving collection of Bret Bernhoft's personally curated glossary terms and resource links.",
    image: "/projects/tech-knowledge-hub.jpg",
    tags: ["React", "Vite", "TypeScript", "FOSS"],
    githubUrl: "https://github.com/devbret/tech-knowledge-hub",
    liveUrl: "https://tkh.bretbernhoft.com/",
  },
  {
    id: 5,
    title: "Detailed Audio Analyses And Visualizations",
    description:
      "Measure the evolution of audio features for sound files. Then visualize the data.",
    image: "/projects/detailed-audio-analysis.jpg",
    tags: ["D3", "Python", "JSON", "Librosa"],
    githubUrl: "https://github.com/devbret/detailed-audio-analysis",
    liveUrl: "https://daav.bretbernhoft.com/",
  },
  {
    id: 6,
    title: "TriMet GTFS Data Visualization",
    description:
      "Processes GTFS data into a JSON file, which a frontend decodes to animate vehicles on a map.",
    image: "/projects/trimet-gtfs-visualization.jpg",
    tags: ["Python", "Leaflet", "JSON"],
    githubUrl: "https://github.com/devbret/trimet-gtfs-visualization",
    liveUrl: "https://trimet.bretbernhoft.com/",
  },
  {
    id: 7,
    title: "FAOSTAT Populations",
    description:
      "Transforms CSV data into an interactive visualization to reveal how country populations change over time.",
    image: "/projects/faostat-populations.jpg",
    tags: ["Python", "CSV", "JSON", "FAOSTAT"],
    githubUrl: "https://github.com/devbret/faostat-populations",
    liveUrl: "https://populations.bretbernhoft.com/",
  },
  {
    id: 8,
    title: "Portland Parks Trees",
    description:
      "View data about trees in parks from Portland, Oregon as an interactive web-based heatmap.",
    image: "/projects/portland-parks-trees.jpg",
    tags: ["JavaScript", "Leaflet", "Public Domain"],
    githubUrl: "https://github.com/devbret/portland-parks-trees",
    liveUrl: "https://trees.bretbernhoft.com/",
  },
  {
    id: 9,
    title: "C-TRAN Average Wait Times",
    description:
      "Average wait times for C-TRAN stops in Vancouver, Washington visualized as a map.",
    image: "/projects/c-tran-wait-times.jpg",
    tags: ["JavaScript", "Python", "Public Domain"],
    githubUrl: "https://github.com/devbret/c-tran-wait-times",
    liveUrl: "https://ctran.bretbernhoft.com/",
  },
  {
    id: 10,
    title: "Character Interactions",
    description:
      "Map direct conversations between different characters in a body of text using Python and D3.",
    image: "/projects/character-interactions.jpg",
    tags: ["Python", "JavaScript", "D3", "JSON"],
    githubUrl: "https://github.com/devbret/character-interactions",
    liveUrl: "https://neuromancer.bretbernhoft.com/",
  },
  {
    id: 11,
    title: "Rhyming Words",
    description:
      "Analyzes a text file to detect rhymes, builds a network from those relationships and visualizes the resulting structure with D3.",
    image: "/projects/networked-rhyming-words.jpg",
    tags: ["Python", "JavaScript", "D3", "JSON"],
    githubUrl: "https://github.com/devbret/networked-rhyming-words",
    liveUrl: "https://rhymes.bretbernhoft.com/",
  },
  {
    id: 12,
    title: "Industrialization Paths",
    description:
      "Renders an animated D3 bubble chart showing how countries move over time across two economic indicators.",
    image: "/projects/global-industrialization-paths.jpg",
    tags: ["FAOSTAT", "Python", "D3", "JSON"],
    githubUrl: "https://github.com/devbret/global-industrialization-paths",
    liveUrl: "https://global.bretbernhoft.com/",
  },
  {
    id: 13,
    title: "Music Events Replay Heatmap",
    description:
      "A timeline of geocoded music events on an interactive Leaflet map for quickly navigating event volume.",
    image: "/projects/music-events-replay-heatmap.jpg",
    tags: ["Leaflet", "MusicBrainz", "JavaScript"],
    githubUrl: "https://github.com/devbret/music-events-replay-heatmap",
    liveUrl: "https://events.bretbernhoft.com/",
  },
  {
    id: 14,
    title: "AI Chat Interface",
    description:
      "A chat interface for holding conversations with different locally deployed AI models.",
    image: "/projects/ai-chat-interface.jpg",
    tags: ["Python", "JavaScript", "Ollama", "LLM"],
    githubUrl: "https://github.com/devbret/ai-chat-interface",
    liveUrl: "",
  },
  {
    id: 15,
    title: "YouTube Playlists Tracker App",
    description:
      "Catalog your viewing progress with YouTube playlists, organized by user-defined categories, via this app.",
    image: "/projects/youtube-playlists-tracker-app.jpg",
    tags: ["Flask", "Python", "JavaScript", "D3"],
    githubUrl: "https://github.com/devbret/youtube-playlists-tracker-app",
    liveUrl: "",
  },
  {
    id: 16,
    title: "Browser Automation Experiments",
    description:
      "Scripts to test, analyze and interact with websites automatically, helping improve performance and reliability.",
    image: "/projects/browser-automation-experiments.jpg",
    tags: ["Selenium", "Puppeteer", "TypeScript"],
    githubUrl: "https://github.com/devbret/browser-automation-experiments",
    liveUrl: "",
  },
  {
    id: 17,
    title: "Pi-hole Data Measurement Tools",
    description:
      "A collection of various software tools for measuring DNS queries downloaded from a Pi-hole as a CSV file.",
    image: "/projects/pihole-data-measurement-tools.jpg",
    tags: ["Raspberry Pi", "Python", "D3", "OPSEC"],
    githubUrl: "https://github.com/devbret/pihole-data-measurement-tools",
    liveUrl: "",
  },
  {
    id: 18,
    title: "MCP9808 Sensor Project",
    description:
      "Code for combining a RPi Zero 2 WH with an Adafruit MCP9808 temperature sensor to measure air temperatures.",
    image: "/projects/mcp9808-sensor-project.jpg",
    tags: ["Raspberry Pi", "Flask", "JavaScript"],
    githubUrl: "https://github.com/devbret/mcp9808-sensor-project",
    liveUrl: "",
  },
  {
    id: 19,
    title: "Homelab Documentation",
    description:
      "Documentation for a self-hosted Kubernetes homelab running Mistral-7B, with Pi-hole and OPNsense.",
    image: "/projects/homelab.jpg",
    tags: ["Shell", "Docker", "AI", "Networking"],
    githubUrl: "https://github.com/devbret/homelab",
    liveUrl: "",
  },
  {
    id: 20,
    title: "GeoSpy API Mapping Application",
    description:
      "Query the GeoSpy API for images using Python. Then visualize that data with D3.",
    image: "/projects/geospy-api-mapping.jpg",
    tags: ["AI", "Python", "D3", "OSINT"],
    githubUrl: "https://github.com/devbret/geospy-api-mapping",
    liveUrl: "",
  },
  {
    id: 21,
    title: "OSINT Keyword Searches",
    description:
      "Build and organize your OSINT searches on different platforms, including Google, Reddit, YouTube and Bluesky.",
    image: "/projects/osint-keyword-searches.jpg",
    tags: ["Flask", "JavaScript", "Quantified Self"],
    githubUrl: "https://github.com/devbret/osint-keyword-searches",
    liveUrl: "",
  },
  {
    id: 22,
    title: "Username Availability Checker",
    description:
      "Check the availability of a username across twenty popular social media platforms.",
    image: "/projects/username-availability-checker.jpg",
    tags: ["Python", "JavaScript", "Social Media"],
    githubUrl: "https://github.com/devbret/username-availability-checker",
    liveUrl: "",
    category: "",
  },
];
